import Image from 'next/image';

// next/image for site assets, plain <img> for admin uploads (data URLs)
export default function Img({ src, alt = '', className = '', sizes = '(max-width:768px) 100vw, 33vw', priority = false, style }) {
  if (!src) return <div className={`bg-navy-50 ${className}`} />;
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} style={style} loading={priority ? 'eager' : 'lazy'} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} style={style} />;
}
