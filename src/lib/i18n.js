'use client';
import { useStore } from './store';

export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'si', label: 'සිංහල', short: 'සිං' },
  { code: 'ta', label: 'தமிழ்', short: 'த' },
];

const D = {
  en: {
    nav_home: 'Home', nav_shop: 'Shop', nav_categories: 'Categories', nav_custom: 'Team orders', nav_about: 'About', nav_contact: 'Contact', nav_showroom: '3D showroom',
    search_ph: 'Search jerseys, polos, hoodies…', search: 'Search', account: 'Account', wishlist: 'Wishlist', cart: 'Cart',
    shop_by_cat: 'Shop by category', view_all: 'View all', products_count: '{n} products', ask_stock: 'Photos coming soon – ask us on WhatsApp',
    featured: 'Best sellers from the workshop', new_in: 'New in', sale: 'Sale', made_to_order: 'Made to order',
    add_to_cart: 'Add to cart', added: 'Added to cart', buy_now: 'Buy now', order_whatsapp: 'Order on WhatsApp', quick_view: 'Quick view', view_3d: 'View in 3D', photos: 'Photos',
    size: 'Size', colour: 'Colour', qty: 'Quantity', size_guide: 'Size guide', in_stock: 'In stock', low_stock: 'Only {n} left', out_stock: 'Out of stock',
    fabric: 'Fabric', description: 'Description', delivery_returns: 'Delivery & returns', related: 'You may also like', reviews: 'Reviews', write_review: 'Write a review',
    bulk_note: 'Ordering for a team? {a}% off from {b} pieces, {c}% off from {d} pieces.', choose_size: 'Choose a size first',
    showroom_title: 'Turn it, recolour it, size it', showroom_sub: 'These are real garments from our workshop, lifted from their photos into 3D. Drag to turn it, use + and − to zoom.',
    drag_hint: 'Drag to rotate', auto_rotate: 'Auto-rotate', front: 'Front', back: 'Back', original: 'As shown', reset: 'Reset', fit_size: 'Fit size',
    chest: 'Chest', length: 'Length', inches: 'in', cm: 'cm',
    process_title: 'How a team order comes together', p1: 'Send your idea', p1d: 'A sketch, an old shirt or just your logo on WhatsApp.', p2: 'Free design mockup', p2d: 'We send a front and back mockup in your colours.', p3: 'Approve a sample', p3d: 'Check the fabric, fit and print before full production.', p4: 'Made in Kandy', p4d: 'Printed, embroidered and stitched in our own workshop.', p5: 'Delivered islandwide', p5d: 'Packed by size and name, sent by courier to your door.',
    teams_title: 'Teams in our kits', teams_sub: 'Every squad here played the HCC Back to School Cricket Trophy 2025 in kits we made.',
    why_title: 'Why schools and clubs come back', why1: 'Colours that last', why1d: 'Sublimation dyes the design into the fabric – no cracking or peeling.', why2: 'Any quantity', why2d: 'One shirt for yourself or two hundred for the whole school.', why3: 'Talk to the maker', why3d: 'You deal directly with the workshop, in Sinhala, Tamil or English.', why4: 'Fair team pricing', why4d: 'Bulk prices kick in automatically as your order grows.',
    cta_title: 'Planning kits for your team?', cta_sub: 'Send us your logo and colours. We reply with a free mockup and price.', cta_btn: 'Start a team order', cta_wa: 'Chat on WhatsApp',
    footer_about: 'Sportswear, uniforms and custom prints, made in our own workshop in Talathuoya, Kandy.', quick_links: 'Shop', help: 'Help', contact_us: 'Contact us', follow: 'Follow us', rights: 'All rights reserved.', pay_methods: 'We accept',
    faq: 'FAQ', size_guide_page: 'Size guide', track: 'Track order', privacy: 'Privacy', terms: 'Terms',
    filters: 'Filters', category: 'Category', all: 'All', price: 'Price', sort: 'Sort', sort_new: 'Newest', sort_low: 'Price: low to high', sort_high: 'Price: high to low', sort_pop: 'Featured', clear: 'Clear', results: '{n} results', no_results: 'Nothing matches those filters. Try clearing one.', in_stock_only: 'In stock only', showing_for: 'Results for “{q}”',
    cart_title: 'Your cart', cart_empty: 'Your cart is empty. Add a few favourites from the shop.', subtotal: 'Subtotal', delivery: 'Delivery', free: 'Free', total: 'Total', checkout: 'Checkout', continue_shopping: 'Continue shopping', remove: 'Remove', bulk_discount: 'Team discount ({n}%)', free_delivery_left: 'Add {amt} more for free delivery',
    signin_needed: 'Sign in to place your order', signin_needed_sub: 'Browsing is open to everyone. We only ask you to sign in when you order, so you can track it later.',
    sign_in: 'Sign in', create_account: 'Create account', sign_out: 'Sign out', email: 'Email', password: 'Password', name: 'Full name', phone: 'Phone number', have_account: 'Already have an account?', no_account: 'New here?', auth_err: 'Email or password is incorrect.', email_taken: 'An account with this email already exists. Sign in instead.', welcome: 'Welcome, {n}',
    shipping: 'Delivery details', address: 'Address', city: 'City / town', district: 'District', notes: 'Order notes (names, numbers, logo details)', payment: 'Payment', cod: 'Cash on delivery', bank: 'Bank transfer', card: 'Card (PayHere) – coming soon', place_order: 'Place order', order_placed: 'Order placed', order_placed_sub: 'Thank you! Your order number is {id}. We will call you to confirm.', send_wa_copy: 'Send a copy on WhatsApp', bank_details: 'Transfer to the account below and send the slip on WhatsApp.',
    my_orders: 'My orders', no_orders: 'You have not placed an order yet.', status: 'Status', date: 'Date', items: 'Items',
    st_pending: 'Pending', st_confirmed: 'Confirmed', st_in_production: 'In production', st_dispatched: 'Dispatched', st_delivered: 'Delivered', st_cancelled: 'Cancelled',
    wishlist_empty: 'Tap the heart on any product to save it here.',
    custom_title: 'Team & bulk orders', custom_sub: 'Tell us what you need. We reply within a working day with a mockup and a price.', org: 'School / club / company', garment: 'Garment type', quantity: 'Approximate quantity', needed_by: 'Needed by', upload_logo: 'Logo or reference image', message: 'Anything else?', send_request: 'Send request', request_sent: 'Request sent. We will contact you soon – or chat with us on WhatsApp now.',
    contact_title: 'Visit or message the workshop', send: 'Send message', msg_sent: 'Message sent. We usually reply the same day.', open_maps: 'Open in Google Maps', call: 'Call', hours: 'Opening hours',
    about_title: 'A garment workshop in the Kandy hills', our_work: 'Our work',
    required: 'Please fill this in.', lang: 'Language', menu: 'Menu', close: 'Close', save: 'Save', cancel: 'Cancel', back_home: 'Back to home', not_found: 'We could not find that page.', loading: 'Loading…',
    wa_hello: 'Hello Brave Sports Wears! I would like to ask about',
  },
  si: {
    nav_home: 'මුල් පිටුව', nav_shop: 'සාප්පුව', nav_categories: 'කාණ්ඩ', nav_custom: 'කණ්ඩායම් ඇණවුම්', nav_about: 'අප ගැන', nav_contact: 'සම්බන්ධ වන්න', nav_showroom: '3D ප්‍රදර්ශනාගාරය',
    search_ph: 'ජර්සි, පොලෝ, හුඩි සොයන්න…', search: 'සොයන්න', account: 'ගිණුම', wishlist: 'ප්‍රියතම', cart: 'කරත්තය',
    shop_by_cat: 'කාණ්ඩ අනුව මිලදී ගන්න', view_all: 'සියල්ල බලන්න', products_count: 'නිෂ්පාදන {n}', ask_stock: 'ඡායාරූප ඉක්මනින් – WhatsApp හරහා විමසන්න',
    featured: 'වැඩපොළේ වැඩිපුරම අලෙවි වන', new_in: 'අලුත්', sale: 'වට්ටම්', made_to_order: 'ඇණවුමට සාදනු ලැබේ',
    add_to_cart: 'කරත්තයට එක් කරන්න', added: 'කරත්තයට එක් කළා', buy_now: 'දැන් මිලදී ගන්න', order_whatsapp: 'WhatsApp හරහා ඇණවුම් කරන්න', quick_view: 'ඉක්මන් බැල්ම', view_3d: '3D වලින් බලන්න', photos: 'ඡායාරූප',
    size: 'ප්‍රමාණය', colour: 'වර්ණය', qty: 'ප්‍රමාණය (ගණන)', size_guide: 'ප්‍රමාණ මාර්ගෝපදේශය', in_stock: 'තොගයේ ඇත', low_stock: 'ඉතිරි {n} යි', out_stock: 'තොගයේ නැත',
    fabric: 'රෙදි වර්ගය', description: 'විස්තරය', delivery_returns: 'බෙදාහැරීම සහ ආපසු දීම', related: 'ඔබ කැමති විය හැකි', reviews: 'සමාලෝචන', write_review: 'සමාලෝචනයක් ලියන්න',
    bulk_note: 'කණ්ඩායමකට ඇණවුම් කරනවාද? කෑලි {b}ක සිට {a}% ක්, කෑලි {d}ක සිට {c}% ක් වට්ටම්.', choose_size: 'පළමුව ප්‍රමාණයක් තෝරන්න',
    showroom_title: 'කරකවන්න, වර්ණය වෙනස් කරන්න, ප්‍රමාණය බලන්න', showroom_sub: 'මේ අපේ වැඩපොළේ සැබෑ ඇඳුම්, ඡායාරූපවලින් 3D බවට පත් කළා. කරකවීමට ඇදගෙන යන්න, + සහ − මගින් විශාලනය කරන්න.',
    drag_hint: 'කරකවන්න ඇදගෙන යන්න', auto_rotate: 'ස්වයං කරකැවීම', front: 'ඉදිරිපස', back: 'පිටුපස', original: 'පෙන්වා ඇති පරිදි', reset: 'යළි සකසන්න', fit_size: 'ගැළපෙන ප්‍රමාණය',
    chest: 'පපුව', length: 'දිග', inches: 'අඟල්', cm: 'සෙ.මී.',
    process_title: 'කණ්ඩායම් ඇණවුමක් සකස් වන ආකාරය', p1: 'ඔබේ අදහස එවන්න', p1d: 'සටහනක්, පරණ ඇඳුමක් හෝ ඔබේ ලාංඡනය WhatsApp කරන්න.', p2: 'නොමිලේ මෝස්තර සැලැස්ම', p2d: 'ඔබේ වර්ණවලින් ඉදිරි සහ පසු මෝස්තර එවමු.', p3: 'සාම්පලය අනුමත කරන්න', p3d: 'සම්පූර්ණ නිෂ්පාදනයට පෙර රෙද්ද, ප්‍රමාණය සහ මුද්‍රණය බලන්න.', p4: 'මහනුවර නිපදවේ', p4d: 'අපේම වැඩපොළේ මුද්‍රණය, එම්බ්‍රොයිඩරි සහ මැසීම.', p5: 'දිවයින පුරා බෙදාහැරීම', p5d: 'ප්‍රමාණය සහ නම අනුව ඇසුරුම් කර කුරියර් මගින් ඔබ වෙත.',
    teams_title: 'අපේ කට්ටල ඇඳි කණ්ඩායම්', teams_sub: 'මෙහි සිටින සෑම කණ්ඩායමක්ම HCC Back to School Cricket Trophy 2025 හි අප සැදූ කට්ටල ඇඳ ක්‍රීඩා කළා.',
    why_title: 'පාසල් සහ සමාජ නැවත අප වෙත එන්නේ ඇයි', why1: 'කල් පවතින වර්ණ', why1d: 'සබ්ලිමේෂන් මගින් මෝස්තරය රෙද්දටම වර්ණ ගැන්වේ – ඉරිතැලීම් නැත.', why2: 'ඕනෑම ප්‍රමාණයක්', why2d: 'ඔබට එක ඇඳුමක් හෝ මුළු පාසලටම දෙසීයක්.', why3: 'නිෂ්පාදකයා සමඟම කතා කරන්න', why3d: 'සිංහල, දෙමළ හෝ ඉංග්‍රීසියෙන් වැඩපොළ සමඟ සෘජුවම.', why4: 'සාධාරණ කණ්ඩායම් මිල', why4d: 'ඇණවුම වැඩි වන විට තොග මිල ස්වයංක්‍රීයව.',
    cta_title: 'ඔබේ කණ්ඩායමට කට්ටල සැලසුම් කරනවාද?', cta_sub: 'ඔබේ ලාංඡනය සහ වර්ණ එවන්න. නොමිලේ මෝස්තරයක් සහ මිලක් එවමු.', cta_btn: 'කණ්ඩායම් ඇණවුමක් අරඹන්න', cta_wa: 'WhatsApp හරහා කතා කරන්න',
    footer_about: 'මහනුවර තලාතුඔය අපේම වැඩපොළේ නිපදවන ක්‍රීඩා ඇඳුම්, නිල ඇඳුම් සහ අභිරුචි මුද්‍රණ.', quick_links: 'සාප්පුව', help: 'උදව්', contact_us: 'සම්බන්ධ වන්න', follow: 'අපව අනුගමනය කරන්න', rights: 'සියලු හිමිකම් ඇවිරිණි.', pay_methods: 'අපි පිළිගන්නේ',
    faq: 'නිතර අසන ප්‍රශ්න', size_guide_page: 'ප්‍රමාණ මාර්ගෝපදේශය', track: 'ඇණවුම සොයන්න', privacy: 'පෞද්ගලිකත්වය', terms: 'නියම',
    filters: 'පෙරහන්', category: 'කාණ්ඩය', all: 'සියල්ල', price: 'මිල', sort: 'අනුපිළිවෙල', sort_new: 'අලුත්ම', sort_low: 'මිල: අඩු සිට වැඩි', sort_high: 'මිල: වැඩි සිට අඩු', sort_pop: 'විශේෂිත', clear: 'ඉවත් කරන්න', results: 'ප්‍රතිඵල {n}', no_results: 'එම පෙරහන්වලට ගැළපෙන කිසිවක් නැත. එකක් ඉවත් කර බලන්න.', in_stock_only: 'තොගයේ ඇති ඒවා පමණි', showing_for: '“{q}” සඳහා ප්‍රතිඵල',
    cart_title: 'ඔබේ කරත්තය', cart_empty: 'ඔබේ කරත්තය හිස්ය. සාප්පුවෙන් ප්‍රියතම කිහිපයක් එක් කරන්න.', subtotal: 'උප එකතුව', delivery: 'බෙදාහැරීම', free: 'නොමිලේ', total: 'මුළු එකතුව', checkout: 'ගෙවීමට යන්න', continue_shopping: 'දිගටම මිලදී ගන්න', remove: 'ඉවත් කරන්න', bulk_discount: 'කණ්ඩායම් වට්ටම ({n}%)', free_delivery_left: 'නොමිලේ බෙදාහැරීමට තව {amt} ක් එක් කරන්න',
    signin_needed: 'ඇණවුම කිරීමට පුරනය වන්න', signin_needed_sub: 'ඕනෑම කෙනෙකුට බලන්න පුළුවන්. ඇණවුම් කරන විට පමණක් පුරනය වීමට කියන්නේ, පසුව ඇණවුම සොයා බැලීමට.',
    sign_in: 'පුරනය වන්න', create_account: 'ගිණුමක් සාදන්න', sign_out: 'ඉවත් වන්න', email: 'විද්‍යුත් තැපෑල', password: 'මුරපදය', name: 'සම්පූර්ණ නම', phone: 'දුරකථන අංකය', have_account: 'දැනටමත් ගිණුමක් තිබේද?', no_account: 'අලුත්ද?', auth_err: 'විද්‍යුත් තැපෑල හෝ මුරපදය වැරදියි.', email_taken: 'මෙම විද්‍යුත් තැපෑලෙන් ගිණුමක් දැනටමත් ඇත. පුරනය වන්න.', welcome: 'ආයුබෝවන්, {n}',
    shipping: 'බෙදාහැරීමේ විස්තර', address: 'ලිපිනය', city: 'නගරය', district: 'දිස්ත්‍රික්කය', notes: 'ඇණවුම් සටහන් (නම්, අංක, ලාංඡන විස්තර)', payment: 'ගෙවීම', cod: 'භාණ්ඩ ලැබුණු පසු ගෙවීම', bank: 'බැංකු මාරුව', card: 'කාඩ්පත (PayHere) – ඉක්මනින්', place_order: 'ඇණවුම තහවුරු කරන්න', order_placed: 'ඇණවුම ලැබුණා', order_placed_sub: 'ස්තූතියි! ඔබේ ඇණවුම් අංකය {id}. තහවුරු කිරීමට අපි ඔබට අමතන්නෙමු.', send_wa_copy: 'WhatsApp හරහා පිටපතක් යවන්න', bank_details: 'පහත ගිණුමට මුදල් මාරු කර රිසිට්පත WhatsApp කරන්න.',
    my_orders: 'මගේ ඇණවුම්', no_orders: 'ඔබ තවම ඇණවුමක් කර නැත.', status: 'තත්ත්වය', date: 'දිනය', items: 'අයිතම',
    st_pending: 'පොරොත්තුවෙන්', st_confirmed: 'තහවුරුයි', st_in_production: 'නිෂ්පාදනයේ', st_dispatched: 'යවා ඇත', st_delivered: 'ලැබී ඇත', st_cancelled: 'අවලංගුයි',
    wishlist_empty: 'ඕනෑම නිෂ්පාදනයක හදවත ඔබා මෙහි සුරකින්න.',
    custom_title: 'කණ්ඩායම් සහ තොග ඇණවුම්', custom_sub: 'ඔබට අවශ්‍ය දේ කියන්න. වැඩ කරන දිනයක් ඇතුළත මෝස්තරයක් සහ මිලක් සමඟ පිළිතුරු දෙමු.', org: 'පාසල / සමාජය / ආයතනය', garment: 'ඇඳුම් වර්ගය', quantity: 'ආසන්න ප්‍රමාණය', needed_by: 'අවශ්‍ය දිනය', upload_logo: 'ලාංඡනය හෝ ආදර්ශ රූපය', message: 'වෙනත් දෙයක්?', send_request: 'ඉල්ලීම යවන්න', request_sent: 'ඉල්ලීම යැව්වා. අපි ඉක්මනින් ඔබව සම්බන්ධ කරගන්නෙමු – නැත්නම් දැන්ම WhatsApp කරන්න.',
    contact_title: 'වැඩපොළට පැමිණෙන්න හෝ පණිවිඩයක් එවන්න', send: 'පණිවිඩය යවන්න', msg_sent: 'පණිවිඩය යැව්වා. සාමාන්‍යයෙන් එදිනම පිළිතුරු දෙමු.', open_maps: 'Google Maps හි විවෘත කරන්න', call: 'අමතන්න', hours: 'විවෘත වේලාවන්',
    about_title: 'මහනුවර කඳුකරයේ ඇඟලුම් වැඩපොළක්', our_work: 'අපේ නිර්මාණ',
    required: 'කරුණාකර මෙය පුරවන්න.', lang: 'භාෂාව', menu: 'මෙනුව', close: 'වසන්න', save: 'සුරකින්න', cancel: 'අවලංගු කරන්න', back_home: 'මුල් පිටුවට', not_found: 'එම පිටුව සොයාගත නොහැක.', loading: 'පූරණය වෙමින්…',
    wa_hello: 'ආයුබෝවන් Brave Sports Wears! මට විමසීමට අවශ්‍යයි',
  },
  ta: {
    nav_home: 'முகப்பு', nav_shop: 'கடை', nav_categories: 'வகைகள்', nav_custom: 'அணி ஆர்டர்கள்', nav_about: 'எங்களைப் பற்றி', nav_contact: 'தொடர்பு', nav_showroom: '3D காட்சியறை',
    search_ph: 'ஜெர்சி, போலோ, ஹூடி தேடுங்கள்…', search: 'தேடு', account: 'கணக்கு', wishlist: 'விருப்பப்பட்டியல்', cart: 'கூடை',
    shop_by_cat: 'வகை வாரியாக வாங்குங்கள்', view_all: 'அனைத்தையும் பார்', products_count: '{n} பொருட்கள்', ask_stock: 'புகைப்படங்கள் விரைவில் – WhatsApp இல் கேளுங்கள்',
    featured: 'பட்டறையின் அதிக விற்பனை', new_in: 'புதியது', sale: 'தள்ளுபடி', made_to_order: 'ஆர்டருக்கு தயாரிப்பு',
    add_to_cart: 'கூடையில் சேர்', added: 'கூடையில் சேர்க்கப்பட்டது', buy_now: 'இப்போது வாங்கு', order_whatsapp: 'WhatsApp இல் ஆர்டர்', quick_view: 'விரைவுப் பார்வை', view_3d: '3D இல் பார்', photos: 'புகைப்படங்கள்',
    size: 'அளவு', colour: 'நிறம்', qty: 'எண்ணிக்கை', size_guide: 'அளவு வழிகாட்டி', in_stock: 'கையிருப்பில்', low_stock: '{n} மட்டுமே உள்ளது', out_stock: 'கையிருப்பில் இல்லை',
    fabric: 'துணி', description: 'விவரம்', delivery_returns: 'விநியோகம் & திருப்பி அனுப்புதல்', related: 'உங்களுக்கும் பிடிக்கலாம்', reviews: 'மதிப்புரைகள்', write_review: 'மதிப்புரை எழுது',
    bulk_note: 'அணிக்காக ஆர்டரா? {b} துண்டுகளிலிருந்து {a}%, {d} துண்டுகளிலிருந்து {c}% தள்ளுபடி.', choose_size: 'முதலில் அளவைத் தேர்ந்தெடுக்கவும்',
    showroom_title: 'சுழற்றுங்கள், நிறம் மாற்றுங்கள், அளவு பாருங்கள்', showroom_sub: 'இவை எங்கள் பட்டறையின் உண்மையான உடைகள், புகைப்படங்களிலிருந்து 3D ஆக மாற்றப்பட்டவை. சுழற்ற இழுக்கவும், + / − மூலம் பெரிதாக்கவும்.',
    drag_hint: 'சுழற்ற இழுக்கவும்', auto_rotate: 'தானியங்கு சுழற்சி', front: 'முன்பக்கம்', back: 'பின்பக்கம்', original: 'காட்டியபடி', reset: 'மீட்டமை', fit_size: 'பொருந்தும் அளவு',
    chest: 'மார்பு', length: 'நீளம்', inches: 'அங்', cm: 'செ.மீ',
    process_title: 'அணி ஆர்டர் எப்படி உருவாகிறது', p1: 'உங்கள் யோசனையை அனுப்புங்கள்', p1d: 'ஒரு வரைவு, பழைய சட்டை அல்லது லோகோவை WhatsApp இல் அனுப்புங்கள்.', p2: 'இலவச வடிவமைப்பு மாதிரி', p2d: 'உங்கள் நிறங்களில் முன், பின் மாதிரியை அனுப்புவோம்.', p3: 'மாதிரியை அங்கீகரியுங்கள்', p3d: 'முழு உற்பத்திக்கு முன் துணி, அளவு, அச்சைச் சரிபாருங்கள்.', p4: 'கண்டியில் தயாரிப்பு', p4d: 'எங்கள் சொந்த பட்டறையில் அச்சு, எம்பிராய்டரி, தையல்.', p5: 'தீவு முழுவதும் விநியோகம்', p5d: 'அளவு, பெயர் வாரியாகப் பொதிந்து கூரியர் மூலம் உங்களிடம்.',
    teams_title: 'எங்கள் உடைகளில் அணிகள்', teams_sub: 'இங்குள்ள ஒவ்வொரு அணியும் HCC Back to School Cricket Trophy 2025 இல் நாங்கள் செய்த உடைகளில் விளையாடின.',
    why_title: 'பள்ளிகளும் கழகங்களும் மீண்டும் வருவது ஏன்', why1: 'நீடிக்கும் நிறங்கள்', why1d: 'சப்லிமேஷன் வடிவமைப்பைத் துணியிலேயே சாயமிடுகிறது – விரிசல் இல்லை.', why2: 'எந்த அளவிலும்', why2d: 'உங்களுக்கு ஒரு சட்டை அல்லது முழுப் பள்ளிக்கும் இருநூறு.', why3: 'தயாரிப்பாளரிடம் நேரடியாக', why3d: 'சிங்களம், தமிழ், ஆங்கிலத்தில் பட்டறையுடன் நேரடியாக.', why4: 'நியாயமான அணி விலை', why4d: 'ஆர்டர் பெரிதாகும்போது மொத்த விலை தானாகவே.',
    cta_title: 'உங்கள் அணிக்கு உடைகள் திட்டமிடுகிறீர்களா?', cta_sub: 'உங்கள் லோகோ, நிறங்களை அனுப்புங்கள். இலவச மாதிரி மற்றும் விலையுடன் பதிலளிப்போம்.', cta_btn: 'அணி ஆர்டரைத் தொடங்கு', cta_wa: 'WhatsApp இல் பேசுங்கள்',
    footer_about: 'கண்டி, தலாத்துஓயாவில் எங்கள் சொந்த பட்டறையில் தயாரிக்கப்படும் விளையாட்டு உடைகள், சீருடைகள், தனிப்பயன் அச்சுகள்.', quick_links: 'கடை', help: 'உதவி', contact_us: 'தொடர்பு கொள்ள', follow: 'எங்களைப் பின்தொடருங்கள்', rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.', pay_methods: 'ஏற்றுக்கொள்ளும் முறைகள்',
    faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', size_guide_page: 'அளவு வழிகாட்டி', track: 'ஆர்டரைக் கண்காணி', privacy: 'தனியுரிமை', terms: 'விதிமுறைகள்',
    filters: 'வடிகட்டிகள்', category: 'வகை', all: 'அனைத்தும்', price: 'விலை', sort: 'வரிசை', sort_new: 'புதியவை', sort_low: 'விலை: குறைவிலிருந்து', sort_high: 'விலை: அதிகத்திலிருந்து', sort_pop: 'சிறப்பு', clear: 'அழி', results: '{n} முடிவுகள்', no_results: 'அந்த வடிகட்டிகளுக்கு எதுவும் பொருந்தவில்லை. ஒன்றை அழித்துப் பாருங்கள்.', in_stock_only: 'கையிருப்பில் உள்ளவை மட்டும்', showing_for: '“{q}” க்கான முடிவுகள்',
    cart_title: 'உங்கள் கூடை', cart_empty: 'உங்கள் கூடை காலியாக உள்ளது. கடையிலிருந்து சிலவற்றைச் சேருங்கள்.', subtotal: 'கூட்டுத்தொகை', delivery: 'விநியோகம்', free: 'இலவசம்', total: 'மொத்தம்', checkout: 'பணம் செலுத்து', continue_shopping: 'தொடர்ந்து வாங்குங்கள்', remove: 'நீக்கு', bulk_discount: 'அணி தள்ளுபடி ({n}%)', free_delivery_left: 'இலவச விநியோகத்திற்கு இன்னும் {amt} சேருங்கள்',
    signin_needed: 'ஆர்டர் செய்ய உள்நுழையுங்கள்', signin_needed_sub: 'பார்வையிட அனைவருக்கும் திறந்திருக்கிறது. ஆர்டர் செய்யும்போது மட்டுமே உள்நுழையக் கேட்கிறோம், பின்னர் கண்காணிக்க.',
    sign_in: 'உள்நுழை', create_account: 'கணக்கை உருவாக்கு', sign_out: 'வெளியேறு', email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', name: 'முழுப் பெயர்', phone: 'தொலைபேசி எண்', have_account: 'ஏற்கனவே கணக்கு உள்ளதா?', no_account: 'புதியவரா?', auth_err: 'மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.', email_taken: 'இந்த மின்னஞ்சலில் ஏற்கனவே கணக்கு உள்ளது. உள்நுழையுங்கள்.', welcome: 'வணக்கம், {n}',
    shipping: 'விநியோக விவரங்கள்', address: 'முகவரி', city: 'நகரம்', district: 'மாவட்டம்', notes: 'ஆர்டர் குறிப்புகள் (பெயர்கள், எண்கள், லோகோ விவரங்கள்)', payment: 'கட்டணம்', cod: 'பொருள் கிடைத்ததும் பணம்', bank: 'வங்கி பரிமாற்றம்', card: 'அட்டை (PayHere) – விரைவில்', place_order: 'ஆர்டர் செய்', order_placed: 'ஆர்டர் பெறப்பட்டது', order_placed_sub: 'நன்றி! உங்கள் ஆர்டர் எண் {id}. உறுதிப்படுத்த அழைப்போம்.', send_wa_copy: 'WhatsApp இல் நகலை அனுப்பு', bank_details: 'கீழே உள்ள கணக்கிற்குப் பணம் அனுப்பி, ரசீதை WhatsApp செய்யுங்கள்.',
    my_orders: 'என் ஆர்டர்கள்', no_orders: 'நீங்கள் இன்னும் ஆர்டர் செய்யவில்லை.', status: 'நிலை', date: 'தேதி', items: 'பொருட்கள்',
    st_pending: 'நிலுவையில்', st_confirmed: 'உறுதி', st_in_production: 'உற்பத்தியில்', st_dispatched: 'அனுப்பப்பட்டது', st_delivered: 'வழங்கப்பட்டது', st_cancelled: 'ரத்து',
    wishlist_empty: 'எந்தப் பொருளிலும் இதயத்தைத் தட்டி இங்கே சேமியுங்கள்.',
    custom_title: 'அணி & மொத்த ஆர்டர்கள்', custom_sub: 'உங்களுக்கு என்ன தேவை என்று சொல்லுங்கள். ஒரு வேலை நாளுக்குள் மாதிரி மற்றும் விலையுடன் பதிலளிப்போம்.', org: 'பள்ளி / கழகம் / நிறுவனம்', garment: 'உடை வகை', quantity: 'தோராயமான எண்ணிக்கை', needed_by: 'தேவைப்படும் தேதி', upload_logo: 'லோகோ அல்லது மாதிரிப் படம்', message: 'வேறு ஏதேனும்?', send_request: 'கோரிக்கையை அனுப்பு', request_sent: 'கோரிக்கை அனுப்பப்பட்டது. விரைவில் தொடர்புகொள்வோம் – அல்லது இப்போதே WhatsApp செய்யுங்கள்.',
    contact_title: 'பட்டறைக்கு வாருங்கள் அல்லது செய்தி அனுப்புங்கள்', send: 'செய்தி அனுப்பு', msg_sent: 'செய்தி அனுப்பப்பட்டது. பொதுவாக அன்றே பதிலளிப்போம்.', open_maps: 'Google Maps இல் திற', call: 'அழை', hours: 'திறந்திருக்கும் நேரம்',
    about_title: 'கண்டி மலைகளில் ஒரு ஆடைப் பட்டறை', our_work: 'எங்கள் படைப்புகள்',
    required: 'இதை நிரப்பவும்.', lang: 'மொழி', menu: 'பட்டி', close: 'மூடு', save: 'சேமி', cancel: 'ரத்து', back_home: 'முகப்புக்கு', not_found: 'அந்தப் பக்கத்தைக் கண்டுபிடிக்க முடியவில்லை.', loading: 'ஏற்றுகிறது…',
    wa_hello: 'வணக்கம் Brave Sports Wears! நான் கேட்க விரும்புவது',
  },
};

export function translate(lang, key, vars) {
  let s = (D[lang] && D[lang][key]) || D.en[key] || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replaceAll(`{${k}}`, v); });
  return s;
}

export function useT() {
  const lang = useStore((s) => s.lang);
  const t = (key, vars) => translate(lang, key, vars);
  const tx = (obj) => (obj ? (typeof obj === 'string' ? obj : obj[lang] || obj.en || '') : '');
  return { t, tx, lang };
}

export const fmt = (n) => 'Rs. ' + Number(n || 0).toLocaleString('en-LK', { maximumFractionDigits: 0 });
