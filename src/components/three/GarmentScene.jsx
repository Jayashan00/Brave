'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Shadow, Line } from '@react-three/drei';
import * as THREE from 'three';
import { prepareGarment } from '@/lib/garment';

const vert = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uAmp;
  uniform float uBack;
  uniform vec2 uSize;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vViewPos;
  varying float vH;
  float dep(vec2 uv){ return texture2D(uDepth, uv).r; }
  void main(){
    vUv = uv;
    vec2 muv = uBack > 0.5 ? vec2(1.0 - uv.x, uv.y) : uv;
    float h = dep(muv);
    vH = h;
    vec3 p = position;
    p.z += h * uAmp;
    float e = 1.5 / 256.0;
    float dx = dep(muv + vec2(e,0.0)) - dep(muv - vec2(e,0.0));
    float dy = dep(muv + vec2(0.0,e)) - dep(muv - vec2(0.0,e));
    if (uBack > 0.5) dx = -dx;
    vec3 n = normalize(vec3(-dx * uAmp / (2.0*e*uSize.x), -dy * uAmp / (2.0*e*uSize.y), 1.0));
    vN = normalize(normalMatrix * n);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uBackMap;
  uniform float uHasBack;
  uniform float uBack;
  uniform vec3 uTint;
  uniform float uTintOn;
  uniform vec3 uDom;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vViewPos;
  varying float vH;

  vec3 toSRGB(vec3 c){ return pow(max(c, 0.0), vec3(1.0/2.2)); }
  void main(){
    vec2 muv = uBack > 0.5 ? vec2(1.0 - vUv.x, vUv.y) : vUv;
    vec4 fm = texture2D(uMap, muv);
    if (fm.a < 0.5) discard;
    vec3 col;
    if (uBack < 0.5) {
      col = fm.rgb;
    } else if (uHasBack > 0.5) {
      vec4 bc = texture2D(uBackMap, vUv);
      vec3 plain = texture2D(uMap, muv, 6.0).rgb;
      col = mix(plain, bc.rgb, smoothstep(0.3, 0.9, bc.a));
    } else {
      // no back photo: a plain back in the fabric colour, shaded from a blurred front
      vec3 blur = texture2D(uMap, muv, 7.0).rgb;
      col = mix(blur, uDom, 0.65);
    }
    if (uTintOn > 0.5) {
      vec3 s = toSRGB(col), d = toSRGB(uDom);
      float w = 1.0 - smoothstep(0.12, 0.30, distance(s, d));
      float L = dot(s, vec3(0.299, 0.587, 0.114));
      float Ld = dot(d, vec3(0.299, 0.587, 0.114));
      float shade = clamp(1.0 + (L - Ld) * 2.4, 0.35, 1.6);
      col = mix(col, uTint * shade, w);
    }
    vec3 N = normalize(vN);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(vViewPos);
    vec3 L1 = normalize(vec3(0.45, 0.65, 0.9));
    vec3 L2 = normalize(vec3(-0.7, 0.15, 0.55));
    float diff = max(dot(N, L1), 0.0) * 0.55 + max(dot(N, L2), 0.0) * 0.22;
    float hemi = mix(0.62, 0.78, N.y * 0.5 + 0.5);
    float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    // subtle knit texture
    float knit = (sin(vUv.x * 1400.0) * sin(vUv.y * 1100.0)) * 0.012;
    vec3 lit = col * (hemi + diff) + vec3(rim * 0.10) + knit;
    lit *= mix(0.86, 1.0, smoothstep(0.0, 0.25, vH));
    gl_FragColor = vec4(lit, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function makeTex(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  return t;
}

function GarmentMesh({ data, tint, view, dragRef, autoRotate, onReady }) {
  const group = useRef();
  const H = 2.1;
  const W = H * data.aspect;
  const amp = data.mode === 'panel' ? 0.06 : Math.min(0.24, 0.125 * Math.max(W, H) / 2);

  const { mapTex, backTex, depthTex, geo } = useMemo(() => {
    const d = new THREE.DataTexture(data.depth.data, data.depth.w, data.depth.h, THREE.RGBAFormat);
    d.flipY = true; d.magFilter = THREE.LinearFilter; d.minFilter = THREE.LinearFilter; d.needsUpdate = true;
    return { mapTex: makeTex(data.front), backTex: data.back ? makeTex(data.back) : null, depthTex: d, geo: new THREE.PlaneGeometry(W, H, 220, Math.round(220 / Math.max(0.5, data.aspect))) };
  }, [data, W, H]);

  const mats = useMemo(() => {
    const common = {
      uMap: { value: mapTex }, uBackMap: { value: backTex || mapTex }, uHasBack: { value: backTex ? 1 : 0 },
      uDepth: { value: depthTex }, uAmp: { value: amp }, uSize: { value: new THREE.Vector2(W, H) },
      uTint: { value: new THREE.Color('#ffffff') }, uTintOn: { value: 0 },
      uDom: { value: new THREE.Color().setRGB(data.dominant[0], data.dominant[1], data.dominant[2], THREE.SRGBColorSpace) },
      uTime: { value: 0 },
    };
    const mk = (back) => new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms: { ...THREE.UniformsUtils.clone(common), uMap: { value: mapTex }, uBackMap: { value: backTex || mapTex }, uDepth: { value: depthTex }, uBack: { value: back ? 1 : 0 } }, side: THREE.FrontSide });
    return [mk(false), mk(true)];
  }, [mapTex, backTex, depthTex, amp, W, H, data.dominant]);

  useEffect(() => () => { mapTex.dispose(); backTex?.dispose(); depthTex.dispose(); geo.dispose(); mats.forEach((m) => m.dispose()); }, [mapTex, backTex, depthTex, geo, mats]);
  useEffect(() => { onReady?.({ W, H }); }, [W, H, onReady]);

  // tint animation
  const tintTarget = useRef(new THREE.Color('#ffffff'));
  const tintAmt = useRef(0);
  useEffect(() => { if (tint) tintTarget.current.set(tint); }, [tint]);

  const rotY = useRef(0);
  useEffect(() => { if (view === 'back') dragRef.current.target = Math.round(dragRef.current.target / (Math.PI * 2)) * Math.PI * 2 + Math.PI; else if (view === 'front') dragRef.current.target = Math.round(dragRef.current.target / (Math.PI * 2)) * Math.PI * 2; }, [view, dragRef]);

  useFrame((state, dt) => {
    const d = dragRef.current;
    if (autoRotate && !d.dragging && Date.now() - d.last > 2500) d.target += dt * 0.45;
    rotY.current += (d.target - rotY.current) * Math.min(1, dt * 6);
    d.tiltV += (d.tilt - d.tiltV) * Math.min(1, dt * 6);
    if (group.current) {
      group.current.rotation.y = rotY.current;
      group.current.rotation.x = d.tiltV;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.025;
    }
    tintAmt.current += ((tint ? 1 : 0) - tintAmt.current) * Math.min(1, dt * 5);
    mats.forEach((m) => {
      m.uniforms.uTint.value.lerp(tintTarget.current, Math.min(1, dt * 6));
      m.uniforms.uTintOn.value = tintAmt.current > 0.02 ? 1 : 0;
    });
  });

  return (
    <group ref={group}>
      <mesh geometry={geo} material={mats[0]} />
      <mesh geometry={geo} material={mats[1]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

function Measure({ dims, sizeInfo, scale }) {
  if (!dims || !sizeInfo) return null;
  const { W, H } = dims;
  const y = H * 0.12, half = W * 0.3;
  const x = Math.min(W / 2 + 0.1, 1.25);
  return (
    <group scale={scale}>
      <Line points={[[-half, y, 0.36], [half, y, 0.36]]} color="#D9A21B" lineWidth={1.5} dashed dashSize={0.04} gapSize={0.025} />
      <Line points={[[x, H / 2 - 0.05, 0], [x, -H / 2 + 0.05, 0]]} color="#A62830" lineWidth={1.5} dashed dashSize={0.04} gapSize={0.025} />
    </group>
  );
}

function Zoomer({ zoom }) {
  const { camera } = useThree();
  useFrame((_, dt) => { camera.position.z += (zoom - camera.position.z) * Math.min(1, dt * 5); camera.updateProjectionMatrix(); });
  return null;
}

function ScaleGroup({ scale, children }) {
  const g = useRef(); const s = useRef(scale);
  useFrame((_, dt) => { s.current += (scale - s.current) * Math.min(1, dt * 5); if (g.current) g.current.scale.setScalar(s.current); });
  return <group ref={g}>{children}</group>;
}

export default function GarmentScene({ src, tint, view, autoRotate = true, scale = 1, zoom = 5, sizeInfo, showMeasure, onStatus, interactive = true, shadow = true }) {
  const [data, setData] = useState(null);
  const [dims, setDims] = useState(null);
  const dragRef = useRef({ target: -0.35, tilt: 0, tiltV: 0, dragging: false, last: 0, x: 0, y: 0 });

  useEffect(() => {
    let alive = true; setData(null); onStatus?.('loading');
    prepareGarment(src).then((d) => { if (alive) { setData(d); onStatus?.('ready'); } }).catch(() => alive && onStatus?.('error'));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src.front, src.back, src.mode]);

  const pointer = interactive ? {
    onPointerDown: (e) => { const d = dragRef.current; d.dragging = true; d.x = e.clientX; d.y = e.clientY; e.currentTarget.setPointerCapture?.(e.pointerId); },
    onPointerMove: (e) => { const d = dragRef.current; if (!d.dragging) return; d.target += (e.clientX - d.x) * 0.01; d.tilt = Math.max(-0.4, Math.min(0.4, d.tilt + (e.clientY - d.y) * 0.004)); d.x = e.clientX; d.y = e.clientY; d.last = Date.now(); },
    onPointerUp: () => { const d = dragRef.current; d.dragging = false; d.last = Date.now(); d.tilt *= 0.4; },
    onPointerLeave: () => { dragRef.current.dragging = false; },
  } : {};

  return (
    <div className="absolute inset-0 touch-pan-y select-none" style={{ cursor: interactive ? 'grab' : 'default' }} {...pointer}>
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, zoom], fov: 32 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}>
        <Zoomer zoom={zoom} />
        {data && (
          <ScaleGroup scale={scale}>
            <GarmentMesh data={data} tint={tint} view={view} dragRef={dragRef} autoRotate={autoRotate} onReady={setDims} />
          </ScaleGroup>
        )}
        {data && showMeasure && <Measure dims={dims} sizeInfo={sizeInfo} scale={scale} />}
        {shadow && data && <Shadow position={[0, -1.24, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[Math.min(2.6, 2.1 * data.aspect * 0.9 * scale), 0.5 * scale, 1]} opacity={0.32} color="#16233F" colorStop={0.05} />}
      </Canvas>
    </div>
  );
}
