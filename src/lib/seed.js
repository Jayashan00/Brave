// Seed catalogue built from the client's own product photos.
// Prices, stats and delivery fees are DEMO defaults – the admin can change all of them in /admin.

const P = (n) => `/images/products/p${n}.webp`;
const C = (n) => `/images/cutouts/c${n}.webp`;
const G = (n) => `/images/gallery/g${n}.webp`;

export const ADULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
export const KIDS_SIZES = ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'];

export const PALETTE = [
  { name: 'Navy', hex: '#1B2A4E' },
  { name: 'Black', hex: '#1A1A1C' },
  { name: 'White', hex: '#F2F2EE' },
  { name: 'Maroon', hex: '#6E1E2B' },
  { name: 'Royal Blue', hex: '#1F4FB8' },
  { name: 'Sky Blue', hex: '#5FB4E5' },
  { name: 'Emerald', hex: '#1F7A55' },
  { name: 'Gold', hex: '#D9A21B' },
  { name: 'Red', hex: '#C62F36' },
  { name: 'Purple', hex: '#5B2C8F' },
];

export const seedCategories = [
  { id: 'cat-print', slug: 'print-tshirts', name: { en: 'Print T-Shirts', si: 'මුද්‍රිත ටී-ෂර්ට්', ta: 'அச்சு டி-சர்ட்கள்' }, image: P(22), order: 1, blurb: { en: 'Screen, DTF and full-colour event prints.', si: 'තිර මුද්‍රණ, DTF සහ පූර්ණ වර්ණ මුද්‍රණ.', ta: 'திரை, DTF மற்றும் முழு வண்ண அச்சுகள்.' } },
  { id: 'cat-emb', slug: 'embroidery', name: { en: 'Embroidery T-Shirts & Polos', si: 'එම්බ්‍රොයිඩරි ටී-ෂර්ට් සහ පොලෝ', ta: 'எம்பிராய்டரி டி-சர்ட் & போலோ' }, image: P(28), order: 2, blurb: { en: 'Stitched logos for staff, clubs and schools.', si: 'කාර්ය මණ්ඩල, සමාජ සහ පාසල් සඳහා මැසූ ලාංඡන.', ta: 'ஊழியர்கள், கழகங்கள், பள்ளிகளுக்கு தைத்த லோகோக்கள்.' } },
  { id: 'cat-sub', slug: 'sublimation-jerseys', name: { en: 'Sublimation Jerseys', si: 'සබ්ලිමේෂන් ජර්සි', ta: 'சப்லிமேஷன் ஜெர்சிகள்' }, image: P(42), order: 3, blurb: { en: 'Edge-to-edge designs dyed into the fabric.', si: 'රෙද්දටම වර්ණ ගැන්වූ සම්පූර්ණ මෝස්තර.', ta: 'துணியிலேயே சாயமிடப்பட்ட முழு வடிவமைப்புகள்.' } },
  { id: 'cat-team', slug: 'team-kits', name: { en: 'Cricket & Team Kits', si: 'ක්‍රිකට් සහ කණ්ඩායම් කට්ටල', ta: 'கிரிக்கெட் & அணி உடைகள்' }, image: G(15), order: 4, blurb: { en: 'Matching kits for the whole squad.', si: 'මුළු කණ්ඩායමටම ගැළපෙන කට්ටල.', ta: 'முழு அணிக்கும் பொருந்தும் உடைகள்.' } },
  { id: 'cat-jacket', slug: 'jackets-hoodies', name: { en: 'Jackets & Hoodies', si: 'ජැකට් සහ හුඩි', ta: 'ஜாக்கெட்கள் & ஹூடிகள்' }, image: P(0), order: 5, blurb: { en: 'Warm layers in your club colours.', si: 'ඔබේ සමාජ වර්ණවලින් උණුසුම් ඇඳුම්.', ta: 'உங்கள் கழக நிறங்களில் கதகதப்பான உடைகள்.' } },
  { id: 'cat-martial', slug: 'martial-arts', name: { en: 'Martial Arts Wear', si: 'සටන් කලා ඇඳුම්', ta: 'தற்காப்புக் கலை உடைகள்' }, image: P(3), order: 6, blurb: { en: 'Kung fu and wushu uniforms with dragon prints.', si: 'මකර මෝස්තර සහිත කුංෆු සහ වුෂු නිල ඇඳුම්.', ta: 'டிராகன் அச்சுடன் குங்ஃபூ, வூஷூ உடைகள்.' } },
  { id: 'cat-school', slug: 'school-club', name: { en: 'School & Club Uniforms', si: 'පාසල් සහ සමාජ නිල ඇඳුම්', ta: 'பள்ளி & கழக சீருடைகள்' }, image: P(24), order: 7, blurb: { en: 'House colours, athletics and sports meet kits.', si: 'නිවාස වර්ණ, මලල ක්‍රීඩා සහ ක්‍රීඩා උළෙල කට්ටල.', ta: 'இல்ல நிறங்கள், தடகள மற்றும் விளையாட்டு விழா உடைகள்.' } },
  { id: 'cat-caps', slug: 'caps', name: { en: 'Caps', si: 'තොප්පි', ta: 'தொப்பிகள்' }, image: '', order: 8, blurb: { en: 'Embroidered and printed caps.', si: 'එම්බ්‍රොයිඩරි සහ මුද්‍රිත තොප්පි.', ta: 'எம்பிராய்டரி மற்றும் அச்சு தொப்பிகள்.' } },
  { id: 'cat-indian', slug: 'indian-tshirts', name: { en: 'Indian T-Shirts', si: 'ඉන්දියානු ටී-ෂර්ට්', ta: 'இந்திய டி-சர்ட்கள்' }, image: '', order: 9, blurb: { en: 'Imported casual tees in ready stock.', si: 'ආනයනික සාමාන්‍ය ටී-ෂර්ට්, තොගයේ ඇත.', ta: 'இறக்குமதி செய்த சாதாரண டி-சர்ட்கள், கையிருப்பில்.' } },
];

const T = (en, si, ta) => ({ en, si, ta });

export const seedProducts = [
  {
    id: 'p-swim-polo', slug: 'swimming-club-polo', categoryId: 'cat-sub',
    name: T('Swimming Club Polo – White, Maroon & Gold', 'පිහිනුම් සමාජ පොලෝ – සුදු, මෙරූන් සහ රන්', 'நீச்சல் கழக போலோ – வெள்ளை, மெரூன் & தங்கம்'),
    description: T(
      'Mandarin-collar sublimation polo made for a school swimming squad. Club crest on the chest, SWIMMING across the back, and sweeping maroon, gold and grey panels that will not fade or crack because the ink is dyed into the polyester.',
      'පාසල් පිහිනුම් කණ්ඩායමක් සඳහා සැකසූ මැන්ඩරින් කොලර් සබ්ලිමේෂන් පොලෝ. පපුවේ සමාජ ලාංඡනය, පිටුපස SWIMMING ලෙස, තීන්ත රෙද්දටම වර්ණ ගැන්වෙන නිසා වර්ණ මැකී නොයයි.',
      'பள்ளி நீச்சல் அணிக்காக செய்யப்பட்ட மாண்டரின் காலர் சப்லிமேஷன் போலோ. மார்பில் கழக சின்னம், பின்புறம் SWIMMING, மை துணியிலேயே சாயமிடப்படுவதால் நிறம் மங்காது.'),
    price: 3200, compareAt: 0, images: [P(6), P(7)], model3d: { front: C(6), back: C(7), mode: 'cutout' },
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'], colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'Royal Blue', 'Black'])],
    fabric: 'Micro-mesh polyester, 160 GSM', stock: 120, featured: true, isNew: true, published: true, tags: ['polo', 'swimming', 'school'],
  },
  {
    id: 'p-campbell', slug: 'aqua-sublimation-polo', categoryId: 'cat-sub',
    name: T('Heritage Pattern Sublimation Polo – Aqua & Navy', 'උරුම රටා සබ්ලිමේෂන් පොලෝ – ඇක්වා සහ නේවි', 'பாரம்பரிய வடிவ சப்லிமேஷன் போலோ – அக்வா & நேவி'),
    description: T(
      'Full-print company polo with a dotted heritage pattern, sponsor logos front and back and a contrast navy collar. Shown here as made for a corporate client – we redraw it with your own logos and colours.',
      'තිත් රටා, ඉදිරිපස හා පිටුපස අනුග්‍රාහක ලාංඡන සහ නේවි කොලරය සහිත සම්පූර්ණ මුද්‍රිත ආයතනික පොලෝ. ඔබේම ලාංඡන සහ වර්ණවලින් නැවත සකසා දෙමු.',
      'புள்ளி வடிவம், முன்னும் பின்னும் ஸ்பான்சர் லோகோக்கள், நேவி காலருடன் முழு அச்சு நிறுவன போலோ. உங்கள் லோகோ மற்றும் நிறங்களுடன் மீண்டும் வடிவமைப்போம்.'),
    price: 3600, compareAt: 3900, images: [P(42), P(33), P(44)], model3d: { front: C(42), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Royal Blue', 'Emerald', 'Maroon'])],
    fabric: 'Bird-eye polyester, 180 GSM', stock: 80, featured: true, isNew: false, published: true, tags: ['polo', 'corporate'],
  },
  {
    id: 'p-comvass', slug: 'corporate-sublimation-polo-white-navy', categoryId: 'cat-sub',
    name: T('Corporate Sublimation Polo – White & Navy', 'ආයතනික සබ්ලිමේෂන් පොලෝ – සුදු සහ නේවි', 'நிறுவன சப்லிமேஷன் போலோ – வெள்ளை & நேவி'),
    description: T(
      'Clean white body with navy side and sleeve panels, chest logos and sleeve sponsor badge. A favourite for company outings, sports days and staff uniforms.',
      'නේවි පැති සහ අත් පැනල, පපුවේ ලාංඡන සහ අතේ අනුග්‍රාහක ලාංඡනය සහිත සුදු පොලෝ. ආයතන විනෝද චාරිකා, ක්‍රීඩා දින සහ කාර්ය මණ්ඩල නිල ඇඳුම් සඳහා ප්‍රියතම.',
      'நேவி பக்க மற்றும் கை பேனல்கள், மார்பு லோகோக்கள் கொண்ட வெள்ளை போலோ. நிறுவன சுற்றுலா, விளையாட்டு நாள், ஊழியர் சீருடைக்கு ஏற்றது.'),
    price: 3500, compareAt: 0, images: [P(38), P(39), P(41)], model3d: { front: C(38), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Sky Blue', 'Maroon', 'Black'])],
    fabric: 'Dri-fit polyester, 160 GSM', stock: 60, featured: true, isNew: true, published: true, tags: ['polo', 'corporate'],
  },
  {
    id: 'p-toys-polo', slug: 'embroidered-logo-polo-black', categoryId: 'cat-emb',
    name: T('Embroidered Logo Polo – Black', 'එම්බ්‍රොයිඩරි ලාංඡන පොලෝ – කළු', 'எம்பிராய்டரி லோகோ போலோ – கருப்பு'),
    description: T(
      'Classic pique polo with a colourful embroidered logo on the chest and a large print on the back. Made for an early learning centre’s teachers – ideal for staff, shops and small businesses.',
      'පපුවේ වර්ණවත් එම්බ්‍රොයිඩරි ලාංඡනයක් සහ පිටුපස විශාල මුද්‍රණයක් සහිත සම්භාව්‍ය පොලෝ. කාර්ය මණ්ඩල, සාප්පු සහ කුඩා ව්‍යාපාර සඳහා සුදුසුයි.',
      'மார்பில் வண்ண எம்பிராய்டரி லோகோ, பின்புறம் பெரிய அச்சுடன் கிளாசிக் போலோ. ஊழியர்கள், கடைகள், சிறு வணிகங்களுக்கு ஏற்றது.'),
    price: 2800, compareAt: 0, images: [P(28), P(27), P(29), P(30), P(31), P(32)], model3d: { front: C(28), back: C(30), mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'Maroon', 'Emerald', 'Royal Blue'])],
    fabric: 'Cotton-rich pique, 200 GSM', stock: 150, featured: true, isNew: false, published: true, tags: ['polo', 'embroidery', 'staff'],
  },
  {
    id: 'p-rotary-polo', slug: 'embroidered-club-polo-royal-blue', categoryId: 'cat-emb',
    name: T('Embroidered Club Polo – Royal Blue', 'එම්බ්‍රොයිඩරි සමාජ පොලෝ – රාජකීය නිල්', 'எம்பிராய்டரி கழக போலோ – ராயல் நீலம்'),
    description: T(
      'Royal blue polo with two embroidered chest badges, made for a service club. Soft collar, two-button placket and a neat finish that holds up to weekly washing.',
      'සේවා සමාජයක් සඳහා සැකසූ, පපුවේ එම්බ්‍රොයිඩරි ලාංඡන දෙකක් සහිත රාජකීය නිල් පොලෝ.',
      'சேவை கழகத்திற்காக செய்யப்பட்ட, மார்பில் இரண்டு எம்பிராய்டரி பேட்ஜ்கள் கொண்ட ராயல் நீல போலோ.'),
    price: 2900, compareAt: 0, images: [P(37)], model3d: { front: C(37), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'White', 'Black', 'Gold'])],
    fabric: 'Polyester-cotton pique, 190 GSM', stock: 90, featured: false, isNew: false, published: true, tags: ['polo', 'embroidery', 'club'],
  },
  {
    id: 'p-colour-run', slug: 'charity-colour-run-tee', categoryId: 'cat-print',
    name: T('Charity Colour-Run Event Tee – Black Splash', 'පුණ්‍ය වර්ණ ධාවන ටී-ෂර්ට් – කළු', 'தொண்டு வண்ண ஓட்ட டி-சர்ட் – கருப்பு'),
    description: T(
      'Event tee with a paint-splash hem, bold front title and a full sponsor wall on the back. The kind of shirt people keep wearing long after the event.',
      'තීන්ත විසිරුණු පහළ කොටස, නිර්භීත ඉදිරි මාතෘකාව සහ පිටුපස අනුග්‍රාහක ලාංඡන සහිත උත්සව ටී-ෂර්ට්.',
      'வண்ணத் தெறிப்பு கீழ்ப்பகுதி, முன்னால் தடித்த தலைப்பு, பின்னால் ஸ்பான்சர் லோகோக்களுடன் நிகழ்வு டி-சர்ட்.'),
    price: 2200, compareAt: 2500, images: [P(22), P(20), P(23), P(18), P(19), P(21)], model3d: { front: C(23), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'White', 'Red'])],
    fabric: 'Polyester jersey, 150 GSM', stock: 200, featured: true, isNew: true, published: true, tags: ['event', 'print'],
  },
  {
    id: 'p-gymnast-tee', slug: 'kids-gymnast-print-tee', categoryId: 'cat-print',
    name: T('Kids Gymnast Print Tee – White', 'ළමා ජිම්නාස්ටික් මුද්‍රිත ටී-ෂර්ට් – සුදු', 'குழந்தைகள் ஜிம்னாஸ்ட் அச்சு டி-சர்ட் – வெள்ளை'),
    description: T(
      'Soft white kids tee with a watercolour gymnast print. Great for dance classes, gymnastics clubs and birthday gifts.',
      'ජල වර්ණ ජිම්නාස්ටික් ක්‍රීඩිකාවකගේ මුද්‍රණයක් සහිත මෘදු සුදු ළමා ටී-ෂර්ට්.',
      'நீர்வண்ண ஜிம்னாஸ்ட் அச்சுடன் மென்மையான வெள்ளை குழந்தைகள் டி-சர்ட்.'),
    price: 1650, compareAt: 0, images: [P(34)], model3d: { front: C(34), back: '', mode: 'cutout' },
    sizes: KIDS_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Sky Blue', 'Gold', 'Purple'])],
    fabric: '100% combed cotton, 180 GSM', stock: 75, featured: false, isNew: true, published: true, tags: ['kids', 'print'],
  },
  {
    id: 'p-kandy-royal', slug: 'school-athletics-polo-navy-yellow', categoryId: 'cat-school',
    name: T('School Athletics Polo – Navy & Yellow', 'පාසල් මලල ක්‍රීඩා පොලෝ – නේවි සහ කහ', 'பள்ளி தடகள போலோ – நேவி & மஞ்சள்'),
    description: T(
      'Athletics team polo made for an international school in Kandy: yellow collar and cuffs, red and yellow placket stripe, and a running horse and sprinter on the back.',
      'මහනුවර ජාත්‍යන්තර පාසලක් සඳහා සැකසූ මලල ක්‍රීඩා පොලෝ: කහ කොලරය, රතු-කහ ඉරි සහ පිටුපස දුවන අශ්වයා සහ ක්‍රීඩකයා.',
      'கண்டியிலுள்ள சர்வதேச பள்ளிக்காக செய்யப்பட்ட தடகள போலோ: மஞ்சள் காலர், சிவப்பு-மஞ்சள் கோடு, பின்னால் ஓடும் குதிரை.'),
    price: 3400, compareAt: 0, images: [P(24), P(25)], model3d: { front: C(24), back: '', mode: 'cutout' },
    sizes: [...KIDS_SIZES.slice(2), 'S', 'M', 'L', 'XL'], colors: [{ name: 'As shown', hex: '' }, ...pick(['Maroon', 'Emerald', 'Black'])],
    fabric: 'Micro-mesh polyester, 160 GSM', stock: 110, featured: true, isNew: false, published: true, tags: ['school', 'athletics'],
  },
  {
    id: 'p-house-polo', slug: 'school-house-polo-red-grey', categoryId: 'cat-school',
    name: T('School House Polo – Red & Grey', 'පාසල් නිවාස පොලෝ – රතු සහ අළු', 'பள்ளி இல்ல போலோ – சிவப்பு & சாம்பல்'),
    description: T(
      'Kids house polo with grey sleeves, navy collar, embroidered school crest and the school name printed on the back.',
      'අළු අත්, නේවි කොලරය, එම්බ්‍රොයිඩරි පාසල් ලාංඡනය සහ පිටුපස පාසල් නම සහිත ළමා නිවාස පොලෝ.',
      'சாம்பல் கைகள், நேவி காலர், எம்பிராய்டரி பள்ளி சின்னம், பின்னால் பள்ளி பெயருடன் குழந்தைகள் இல்ல போலோ.'),
    price: 2300, compareAt: 0, images: [P(36), P(35)], model3d: { front: C(36), back: C(35), mode: 'cutout' },
    sizes: KIDS_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Royal Blue', 'Emerald', 'Gold'])],
    fabric: 'Cotton pique, 200 GSM', stock: 140, featured: false, isNew: false, published: true, tags: ['school', 'kids', 'house'],
  },
  {
    id: 'p-cricket-kit', slug: 'custom-cricket-team-kit', categoryId: 'cat-team',
    name: T('Custom Cricket Team Kit – Jersey & Trouser', 'අභිරුචි ක්‍රිකට් කණ්ඩායම් කට්ටලය – ජර්සිය සහ කලිසම', 'தனிப்பயன் கிரிக்கெட் அணி உடை – ஜெர்சி & கால்சட்டை'),
    description: T(
      'Full sublimation cricket kits in your team colours – names, numbers and sponsors included. These squads all played in our kits at the HCC Back to School Cricket Trophy 2025.',
      'ඔබේ කණ්ඩායම් වර්ණවලින් සම්පූර්ණ සබ්ලිමේෂන් ක්‍රිකට් කට්ටල – නම්, අංක සහ අනුග්‍රාහකයින් ඇතුළුව. HCC Back to School Cricket Trophy 2025 හි මෙම කණ්ඩායම් අපේ කට්ටල ඇඳ ක්‍රීඩා කළා.',
      'உங்கள் அணி நிறங்களில் முழு சப்லிமேஷன் கிரிக்கெட் உடைகள் – பெயர், எண், ஸ்பான்சர்கள் உட்பட. HCC Back to School Cricket Trophy 2025 இல் இந்த அணிகள் எங்கள் உடைகளில் விளையாடின.'),
    price: 5800, compareAt: 0, images: [G(15), G(9), G(16), G(10), G(8), G(12), G(14), G(17)], model3d: { front: '', back: '', mode: 'panel' },
    sizes: ADULT_SIZES, colors: [{ name: 'Your colours', hex: '' }],
    fabric: 'Sublimation polyester set', stock: 999, featured: true, isNew: false, published: true, tags: ['cricket', 'team'], madeToOrder: true,
  },
  {
    id: 'p-hoodie', slug: 'club-panel-hoodie-navy-sky', categoryId: 'cat-jacket',
    name: T('Club Panel Hoodie – Navy & Sky', 'සමාජ පැනල හුඩි – නේවි සහ ලා නිල්', 'கழக பேனல் ஹூடி – நேவி & வான நீலம்'),
    description: T(
      'Pull-over hoodie with a sky-blue chest band, white piping, kangaroo pocket and an embroidered club badge. Warm enough for early-morning practice in the hills.',
      'ලා නිල් පපු තීරුව, සුදු ඉරි, ඉදිරි සාක්කුව සහ එම්බ්‍රොයිඩරි සමාජ ලාංඡනය සහිත හුඩිය. කඳුකරයේ උදෑසන පුහුණුවට උණුසුම්.',
      'வான நீல மார்புப் பட்டை, வெள்ளைக் கோடு, முன் பாக்கெட், எம்பிராய்டரி கழக பேட்ஜுடன் ஹூடி.'),
    price: 5900, compareAt: 6500, images: [P(0)], model3d: { front: C(0), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Black', 'Maroon', 'Emerald'])],
    fabric: 'Brushed fleece, 280 GSM', stock: 45, featured: true, isNew: true, published: true, tags: ['hoodie', 'winter'],
  },
  {
    id: 'p-taichi-jacket', slug: 'tai-chi-jacket-sky-fade', categoryId: 'cat-jacket',
    name: T('Tai Chi Jacket – Sky Fade', 'තායි චි ජැකට් – ලා නිල් වර්ණ ගැලීම', 'தாய் சி ஜாக்கெட் – வான நீல மங்கல்'),
    description: T(
      'Lightweight satin jacket fading from sky blue to white, with traditional frog buttons and a printed floral motif.',
      'ලා නිල් සිට සුදු දක්වා වර්ණ ගැලෙන, සාම්ප්‍රදායික බොත්තම් සහ මල් මෝස්තරය සහිත සැහැල්ලු ජැකට්ටුව.',
      'வான நீலத்திலிருந்து வெள்ளைக்கு மங்கும், பாரம்பரிய பொத்தான்களுடன் இலகுவான ஜாக்கெட்.'),
    price: 6800, compareAt: 0, images: [P(1)], model3d: { front: P(1), back: '', mode: 'auto' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Purple', 'Red', 'Black'])],
    fabric: 'Satin-finish polyester', stock: 25, featured: false, isNew: false, published: true, tags: ['martial', 'jacket'],
  },
  {
    id: 'p-dragon-top', slug: 'dragon-kung-fu-top-purple', categoryId: 'cat-martial',
    name: T('Dragon Kung Fu Uniform Top – Purple', 'මකර කුංෆු නිල ඇඳුම – දම්', 'டிராகன் குங்ஃபூ சீருடை – ஊதா'),
    description: T(
      'Wushu competition top with a full golden dragon print, traditional knot buttons and a mandarin collar. Made to order for martial arts academies.',
      'සම්පූර්ණ රන් මකර මුද්‍රණය, සාම්ප්‍රදායික ගැට බොත්තම් සහ මැන්ඩරින් කොලරය සහිත වුෂු තරඟ ඇඳුම.',
      'முழு தங்க டிராகன் அச்சு, பாரம்பரிய முடிச்சு பொத்தான்கள், மாண்டரின் காலருடன் வூஷூ போட்டி உடை.'),
    price: 6500, compareAt: 0, images: [P(3), P(5)], model3d: { front: P(3), back: '', mode: 'panel' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Red', 'Black', 'Royal Blue'])],
    fabric: 'Satin-finish polyester', stock: 30, featured: true, isNew: false, published: true, tags: ['martial', 'wushu'],
  },
  {
    id: 'p-dragon-pants', slug: 'dragon-training-pants-royal-blue', categoryId: 'cat-martial',
    name: T('Dragon Training Pants – Royal Blue Fade', 'මකර පුහුණු කලිසම – රාජකීය නිල්', 'டிராகன் பயிற்சி கால்சட்டை – ராயல் நீலம்'),
    description: T(
      'Loose wushu trousers fading from white to royal blue with a coiled dragon printed down the leg. Elastic waist and cuffs.',
      'කකුල දිගේ මකර මුද්‍රණයක් සහිත, සුදු සිට රාජකීය නිල් දක්වා වර්ණ ගැලෙන ලිහිල් වුෂු කලිසම.',
      'காலில் டிராகன் அச்சுடன், வெள்ளையிலிருந்து ராயல் நீலத்திற்கு மங்கும் தளர்வான வூஷூ கால்சட்டை.'),
    price: 4500, compareAt: 0, images: [P(2)], model3d: { front: C(2), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Red', 'Purple', 'Black'])],
    fabric: 'Satin-finish polyester', stock: 30, featured: false, isNew: false, published: true, tags: ['martial', 'pants'],
  },
  {
    id: 'p-phoenix-vest', slug: 'phoenix-dragon-sleeveless-top-black', categoryId: 'cat-martial',
    name: T('Phoenix & Dragon Sleeveless Top – Black', 'ෆීනික්ස් සහ මකර අත් නැති ඇඳුම – කළු', 'பீனிக்ஸ் & டிராகன் கையில்லா மேலாடை – கருப்பு'),
    description: T(
      'Sleeveless performance top with a fiery phoenix and dragon artwork, white knot buttons and contrast trim.',
      'ගිනිමය ෆීනික්ස් සහ මකර චිත්‍ර, සුදු ගැට බොත්තම් සහිත අත් නැති ඇඳුම.',
      'தீப்பறவை மற்றும் டிராகன் ஓவியம், வெள்ளை முடிச்சு பொத்தான்களுடன் கையில்லா மேலாடை.'),
    price: 5500, compareAt: 0, images: [P(4)], model3d: { front: C(4), back: '', mode: 'cutout' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'Maroon'])],
    fabric: 'Satin-finish polyester', stock: 20, featured: false, isNew: true, published: true, tags: ['martial'],
  },
  {
    id: 'p-tribal-polo', slug: 'tribal-pattern-sublimation-polo-navy', categoryId: 'cat-sub',
    name: T('Tribal Pattern Sublimation Polo – Navy', 'ගෝත්‍රික රටා සබ්ලිමේෂන් පොලෝ – නේවි', 'பழங்குடி வடிவ சப்லிமேஷன் போலோ – நேவி'),
    description: T(
      'Navy polo covered in a fine tribal pattern with a bold shoulder band and red-gold flash on the hem.',
      'උරහිසේ නිර්භීත තීරුවක් සහ පහළ රතු-රන් ඉරක් සහිත, සියුම් ගෝත්‍රික රටාවලින් ආවරණය වූ නේවි පොලෝ.',
      'தோளில் தடித்த பட்டையும், கீழே சிவப்பு-தங்கக் கோடும் கொண்ட நேவி போலோ.'),
    price: 3500, compareAt: 0, images: [P(26)], model3d: { front: P(26), back: '', mode: 'panel' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Black', 'Maroon'])],
    fabric: 'Dri-fit polyester, 160 GSM', stock: 50, featured: false, isNew: false, published: true, tags: ['polo'],
  },
  {
    id: 'p-waterpolo-tee', slug: 'swimming-water-polo-tee-ocean-blue', categoryId: 'cat-sub',
    name: T('Swimming & Water Polo Tee – Ocean Blue', 'පිහිනුම් සහ ජල පෝලෝ ටී-ෂර්ට් – සාගර නිල්', 'நீச்சல் & நீர் போலோ டி-சர்ட் – கடல் நீலம்'),
    description: T(
      'Round-neck team tee with a wave panel running across the body and the squad name printed on the sleeve.',
      'ශරීරය හරහා දිවෙන රළ පැනලයක් සහ අතේ කණ්ඩායම් නම සහිත වටකර ටී-ෂර්ට්.',
      'உடல் முழுவதும் அலை பேனல், கையில் அணி பெயருடன் வட்டக் கழுத்து டி-சர்ட்.'),
    price: 2900, compareAt: 0, images: [P(43), P(40)], model3d: { front: P(43), back: '', mode: 'panel' },
    sizes: ADULT_SIZES, colors: [{ name: 'As shown', hex: '' }, ...pick(['Navy', 'Emerald'])],
    fabric: 'Micro-mesh polyester, 150 GSM', stock: 70, featured: false, isNew: false, published: true, tags: ['swimming', 'team'],
  },
];

function pick(names) {
  return PALETTE.filter((c) => names.includes(c.name));
}

export const seedBanners = [
  { id: 'b1', image: '/images/banners/b15.webp', title: T('Kits made in Kandy, worn across the island', 'මහනුවර නිපදවූ කට්ටල, දිවයින පුරා', 'கண்டியில் தயாரித்து, தீவு முழுவதும் அணியப்படும் உடைகள்'), subtitle: T('Sublimation jerseys, polos and team kits for schools, clubs and companies.', 'පාසල්, සමාජ සහ ආයතන සඳහා ජර්සි, පොලෝ සහ කණ්ඩායම් කට්ටල.', 'பள்ளிகள், கழகங்கள், நிறுவனங்களுக்கு ஜெர்சி, போலோ, அணி உடைகள்.'), cta: T('Shop the collection', 'එකතුව බලන්න', 'தொகுப்பைப் பாருங்கள்'), link: '/shop', position: 'center 30%' },
  { id: 'b2', image: '/images/banners/b9.webp', title: T('Your team colours, edge to edge', 'ඔබේ කණ්ඩායම් වර්ණ, මුළු ඇඳුම පුරාම', 'உங்கள் அணி நிறங்கள், முழுவதும்'), subtitle: T('Names, numbers and sponsors dyed into the fabric, so they never crack.', 'නම්, අංක සහ අනුග්‍රාහකයින් රෙද්දටම වර්ණ ගැන්වේ.', 'பெயர், எண், ஸ்பான்சர்கள் துணியிலேயே சாயமிடப்படும்.'), cta: T('Get a team quote', 'කණ්ඩායම් මිල ගණන් ඉල්ලන්න', 'அணி விலைக்கோரிக்கை'), link: '/custom-order', position: 'center 35%' },
  { id: 'b3', image: '/images/banners/b16.webp', title: T('Uniforms that make the photo', 'ඡායාරූපයට ලස්සන නිල ඇඳුම්', 'புகைப்படத்தில் ஜொலிக்கும் சீருடைகள்'), subtitle: T('From the first sketch to delivery, made in our own workshop in Talathuoya.', 'පළමු සටහනේ සිට බෙදාහැරීම දක්වා, තලාතුඔය අපේම වැඩපොළේ.', 'முதல் வரைவிலிருந்து விநியோகம் வரை, தலாத்துஓயாவில் எங்கள் பட்டறையில்.'), cta: T('See how we work', 'අපි වැඩ කරන ආකාරය', 'நாங்கள் செயல்படும் விதம்'), link: '/about', position: 'center 35%' },
  { id: 'b4', image: '/images/banners/b10.webp', title: T('Try every shirt in 3D', 'සෑම ඇඳුමක්ම 3D වලින් බලන්න', 'ஒவ்வொரு சட்டையையும் 3D இல் பாருங்கள்'), subtitle: T('Turn it around, change the colour and check the size before you order.', 'ඇණවුම් කිරීමට පෙර කරකවා, වර්ණය වෙනස් කර, ප්‍රමාණය බලන්න.', 'ஆர்டர் செய்யும் முன் சுழற்றி, நிறம் மாற்றி, அளவைப் பாருங்கள்.'), cta: T('Open the 3D showroom', '3D ප්‍රදර්ශනාගාරය', '3D காட்சியறை'), link: '/#showroom', position: 'center 30%' },
];

export const seedGallery = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((n) => ({ id: `g${n}`, image: G(n), caption: 'HCC Back to School Cricket Trophy 2025' }));

export const seedSettings = {
  storeName: 'Brave Sports Wears',
  legalName: 'Niran Fashion Garments',
  phone: '+94 77 910 4767',
  whatsapp: '94779104767',
  email: 'ajithniranfashion@gmail.com',
  address: '77/4, Batagalla, Talathuoya, Kandy, Sri Lanka',
  hours: T('Mon – Sat, 8.30 am – 6.00 pm', 'සඳු – සෙන, පෙ.ව. 8.30 – ප.ව. 6.00', 'திங்கள் – சனி, காலை 8.30 – மாலை 6.00'),
  facebook: 'https://www.facebook.com/people/Brave-Sports-Wears/100075976932239/',
  instagram: '',
  tiktok: '',
  announcement: T('Islandwide delivery · Team orders get bulk prices · Order on WhatsApp', 'දිවයින පුරා බෙදාහැරීම · කණ්ඩායම් ඇණවුම්වලට තොග මිල · WhatsApp හරහා ඇණවුම් කරන්න', 'தீவு முழுவதும் விநியோகம் · அணி ஆர்டர்களுக்கு மொத்த விலை · WhatsApp இல் ஆர்டர்'),
  deliveryFee: 450,
  freeDeliveryOver: 15000,
  bulkTiers: [{ min: 12, off: 10 }, { min: 50, off: 15 }],
  bank: { name: 'Bank name', account: 'Account number', holder: 'Niran Fashion Garments', branch: 'Branch' },
  stats: [
    { value: '9', label: T('Garment categories', 'ඇඳුම් වර්ග', 'உடை வகைகள்') },
    { value: '25', label: T('Districts we deliver to', 'බෙදාහරින දිස්ත්‍රික්ක', 'விநியோக மாவட்டங்கள்') },
    { value: '1', label: T('Own workshop in Kandy', 'මහනුවර අපේම වැඩපොළ', 'கண்டியில் சொந்த பட்டறை') },
    { value: '3', label: T('Languages on this site', 'මෙම වෙබ් අඩවියේ භාෂා', 'இத்தளத்தில் மொழிகள்') },
  ],
  about: T(
    'Brave Sports Wears is the sportswear label of Niran Fashion Garments, a family-run garment workshop in Talathuoya, Kandy. We design, print, embroider and stitch t-shirts, polos, sublimation jerseys, hoodies, track suits, trousers, shorts and martial-arts uniforms – for single customers and for whole schools, clubs and companies.',
    'Brave Sports Wears යනු මහනුවර තලාතුඔය පිහිටි පවුල් ව්‍යාපාරයක් වන Niran Fashion Garments ආයතනයේ ක්‍රීඩා ඇඳුම් සන්නාමයයි. අපි ටී-ෂර්ට්, පොලෝ, සබ්ලිමේෂන් ජර්සි, හුඩි, ට්‍රැක් සූට්, කලිසම් සහ සටන් කලා නිල ඇඳුම් නිර්මාණය කර, මුද්‍රණය කර, මසා දෙමු – තනි පාරිභෝගිකයින්ට මෙන්ම මුළු පාසල්, සමාජ සහ ආයතන සඳහාද.',
    'Brave Sports Wears என்பது கண்டி, தலாத்துஓயாவில் உள்ள குடும்ப ஆடை பட்டறையான Niran Fashion Garments இன் விளையாட்டு உடை முத்திரை. டி-சர்ட், போலோ, சப்லிமேஷன் ஜெர்சி, ஹூடி, ட்ராக் சூட், கால்சட்டை, தற்காப்புக் கலை சீருடைகளை வடிவமைத்து, அச்சிட்டு, தைக்கிறோம் – தனி வாடிக்கையாளர்களுக்கும், முழுப் பள்ளிகள், கழகங்கள், நிறுவனங்களுக்கும்.'),
  adminEmail: 'admin@bravesportswear.lk',
  adminPassHash: '', // empty = use default demo password (see README)
};

// A few sample orders so the dashboard charts are not empty in the demo. Admin can clear them.
export function seedOrders() {
  const now = Date.now();
  const day = 86400000;
  const mk = (n, d, items, status, name, district) => ({
    id: `BSW-${1000 + n}`, sample: true, createdAt: now - d * day, status,
    customer: { name, phone: '07X XXX XXXX', email: '', address: 'Sample address', district },
    items, payment: 'cod',
    subtotal: items.reduce((s, i) => s + i.price * i.qty, 0), delivery: 450,
  });
  const it = (productId, name, price, qty, size) => ({ productId, name, price, qty, size, color: 'As shown' });
  const o = [
    mk(1, 13, [it('p-swim-polo', 'Swimming Club Polo', 3200, 2, 'M')], 'delivered', 'Sample customer A', 'Kandy'),
    mk(2, 11, [it('p-colour-run', 'Colour-Run Event Tee', 2200, 4, 'L')], 'delivered', 'Sample customer B', 'Colombo'),
    mk(3, 9, [it('p-hoodie', 'Club Panel Hoodie', 5900, 1, 'XL')], 'delivered', 'Sample customer C', 'Matale'),
    mk(4, 7, [it('p-toys-polo', 'Embroidered Logo Polo', 2800, 12, 'M')], 'dispatched', 'Sample customer D', 'Kurunegala'),
    mk(5, 5, [it('p-cricket-kit', 'Cricket Team Kit', 5800, 15, 'L')], 'in_production', 'Sample customer E', 'Kandy'),
    mk(6, 3, [it('p-gymnast-tee', 'Kids Gymnast Tee', 1650, 2, '6-7Y')], 'confirmed', 'Sample customer F', 'Gampaha'),
    mk(7, 1, [it('p-dragon-top', 'Dragon Kung Fu Top', 6500, 1, 'M')], 'pending', 'Sample customer G', 'Nuwara Eliya'),
  ];
  o.forEach((x) => { x.total = x.subtotal + x.delivery; });
  return o;
}

export const DISTRICTS = ['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];

// Standard size chart (inches). Admin can edit later in code if the client's chart differs.
export const SIZE_CHART = {
  adult: [
    { size: 'XS', chest: 34, length: 26 }, { size: 'S', chest: 36, length: 27 }, { size: 'M', chest: 38, length: 28 },
    { size: 'L', chest: 40, length: 29 }, { size: 'XL', chest: 42, length: 30 }, { size: '2XL', chest: 44, length: 31 }, { size: '3XL', chest: 46, length: 32 },
  ],
  kids: [
    { size: '2-3Y', chest: 22, length: 16 }, { size: '4-5Y', chest: 24, length: 18 }, { size: '6-7Y', chest: 26, length: 20 },
    { size: '8-9Y', chest: 28, length: 22 }, { size: '10-11Y', chest: 30, length: 23 }, { size: '12-13Y', chest: 32, length: 24 },
  ],
};
