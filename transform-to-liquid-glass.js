const fs = require('fs');

console.log('🌊 Starting Liquid Glass UI Transformation...\n');

// 1. Import premium-interactions.css into globals.css
const globalsPath = './src/app/globals.css';
let globalsContent = fs.readFileSync(globalsPath, 'utf8');

if (!globalsContent.includes('premium-interactions.css')) {
  globalsContent = globalsContent.replace(
    "@import '../styles/animations.css';",
    "@import '../styles/animations.css';\n@import './premium-interactions.css';"
  );
  fs.writeFileSync(globalsPath, globalsContent, 'utf8');
  console.log('✓ Imported premium-interactions.css into globals.css');
}

// 2. Transform all category pages to liquid glass
const categoryPages = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx'
];

categoryPages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const isArc2 = file.includes('arc-2');

  // Transform product cards to glass cards with hover effects
  content = content.replace(
    /className="aspect-\[3\/4\] bg-gradient-to-br from-gray-50 to-white border border-black\/10 relative"/g,
    `className="aspect-[3/4] glass-card${isArc2 ? '-dark' : ''} hover-elevate shimmer-on-hover relative overflow-hidden"`
  );

  // Transform breadcrumb links to liquid style
  content = content.replace(
    /className="group inline-flex items-center gap-2 text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-\[0\.2em\]"/g,
    'className="group inline-flex items-center gap-2 text-xs smooth-color uppercase tracking-[0.2em] hover:text-black transition-all duration-300"'
  );

  // Add spring-in animation to product cards
  content = content.replace(
    /transition={{ duration: 0\.8, ease: \[0\.16, 1, 0\.3, 1\] }}/g,
    'transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 300, damping: 25 }}'
  );

  // Transform "Explore Colors" / "See Details" buttons to liquid glass
  content = content.replace(
    /className="mt-4 flex items-center gap-2 text-xs tracking-\[0\.2em\] uppercase text-gray-400 group-hover:text-gray-600 transition-colors"/g,
    'className="mt-4 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-600 smooth-color glow-on-hover"'
  );

  // Add magnetic effect to product images
  content = content.replace(
    /whileHover={{ scale: 1\.02 }}/g,
    'whileHover={{ scale: 1.03, rotateZ: 0.5 }}'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Transformed ${file.split('/').pop()} to liquid glass`);
});

// 3. Transform checkout page buttons and inputs
const checkoutPath = './src/app/checkout/page.tsx';
let checkoutContent = fs.readFileSync(checkoutPath, 'utf8');

// Transform input fields to glass inputs
checkoutContent = checkoutContent.replace(
  /className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/g,
  'className="w-full glass-input"'
);

// Transform place order button to premium liquid
checkoutContent = checkoutContent.replace(
  /className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"/g,
  'className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 btn-liquid shadow-2xl hover-elevate ripple magnetic-button font-semibold"'
);

// Transform apply discount button
checkoutContent = checkoutContent.replace(
  /className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"/g,
  'className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid hover-elevate ripple magnetic-button"'
);

fs.writeFileSync(checkoutPath, checkoutContent, 'utf8');
console.log('✓ Transformed checkout page to liquid glass');

// 4. Transform cart page
const cartPath = './src/app/cart/page.tsx';
let cartContent = fs.readFileSync(cartPath, 'utf8');

// Transform checkout button
cartContent = cartContent.replace(
  /className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"/g,
  'className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 btn-liquid shadow-2xl hover-elevate pulse-glow magnetic-button font-semibold"'
);

// Transform remove buttons
cartContent = cartContent.replace(
  /className="text-xs text-gray-500 hover:text-red-600 transition-colors"/g,
  'className="text-xs text-gray-500 hover:text-red-600 smooth-color hover-elevate"'
);

fs.writeFileSync(cartPath, cartContent, 'utf8');
console.log('✓ Transformed cart page to liquid glass');

// 5. Transform ProductPage component
const productPagePath = './src/components/ProductPage.tsx';
let productPageContent = fs.readFileSync(productPagePath, 'utf8');

// Transform color selector buttons
productPageContent = productPageContent.replace(
  /className={`relative w-16 h-16 rounded-full border-2 transition-all cursor-pointer/g,
  'className={`relative w-16 h-16 rounded-full border-2 transition-all cursor-pointer hover-elevate magnetic-button'
);

// Transform size selector buttons
productPageContent = productPageContent.replace(
  /className={`py-3 border rounded-xl transition-all/g,
  'className={`py-3 border rounded-xl transition-all btn-liquid hover-elevate'
);

// Transform Add to Cart button (make it ultra premium)
productPageContent = productPageContent.replace(
  /className={`w-full py-4 \$\{arc === 'ARC_2' \? 'bg-gradient-to-r from-white to-gray-100' : 'bg-gradient-to-r from-black to-gray-800'\} btn-liquid shadow-xl/g,
  'className={`w-full py-4 ${arc === \'ARC_2\' ? \'bg-gradient-to-r from-white via-gray-50 to-white\' : \'bg-gradient-to-r from-black via-gray-900 to-black\'} btn-liquid shadow-2xl hover-elevate pulse-glow ripple magnetic-button'
);

// Transform "Pairs With" cards
productPageContent = productPageContent.replace(
  /className="group cursor-pointer"/g,
  'className="group cursor-pointer hover-elevate spring-in"'
);

fs.writeFileSync(productPagePath, productPageContent, 'utf8');
console.log('✓ Transformed ProductPage component to liquid glass');

// 6. Transform DiscountNotification component (make it even more premium)
const notificationPath = './src/components/DiscountNotification.tsx';
let notificationContent = fs.readFileSync(notificationPath, 'utf8');

// Enhance the notification backdrop
notificationContent = notificationContent.replace(
  /className="backdrop-blur-2xl bg-gradient-to-br from-white\/90 to-white\/70/g,
  'className="glass-card backdrop-blur-2xl bg-gradient-to-br from-white/95 to-white/80 shadow-2xl hover-elevate'
);

// Enhance the apply button in suggestion
notificationContent = notificationContent.replace(
  /className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500/g,
  'className="btn-liquid bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 shadow-xl hover-elevate magnetic-button ripple'
);

fs.writeFileSync(notificationPath, notificationContent, 'utf8');
console.log('✓ Enhanced DiscountNotification component');

// 7. Transform Arc landing pages
const arcPages = [
  './src/app/arc-2/page.tsx',
  './src/app/arc-3/page.tsx'
];

arcPages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Transform "Shop Arc" buttons to ultra premium
  content = content.replace(
    /className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all"/g,
    'className="px-8 py-4 bg-gradient-to-r from-white via-gray-50 to-white text-black rounded-full font-semibold btn-liquid hover-elevate pulse-glow magnetic-button ripple shadow-2xl"'
  );

  content = content.replace(
    /className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"/g,
    'className="px-8 py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-full font-semibold btn-liquid hover-elevate pulse-glow magnetic-button ripple shadow-2xl"'
  );

  // Transform category cards
  content = content.replace(
    /className="bg-gradient-to-br from-gray-50 to-white border border-black\/10/g,
    'className="glass-card hover-elevate shimmer-on-hover'
  );

  content = content.replace(
    /className="bg-gradient-to-br from-gray-900 to-black border border-white\/10/g,
    'className="glass-card-dark hover-elevate shimmer-on-hover'
  );

  // Transform color palette swatches
  content = content.replace(
    /className="aspect-square border border-white\/10"/g,
    'className="aspect-square border border-white/10 hover-elevate magnetic-button transition-all duration-300"'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Transformed ${file.split('/').pop()} arc page`);
});

// 8. Transform homepage
const homepagePath = './src/app/page.tsx';
let homepageContent = fs.readFileSync(homepagePath, 'utf8');

// Transform hero buttons
homepageContent = homepageContent.replace(
  /className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"/g,
  'className="px-8 py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-full font-semibold btn-liquid hover-elevate pulse-glow magnetic-button ripple shadow-2xl"'
);

homepageContent = homepageContent.replace(
  /className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all"/g,
  'className="px-8 py-4 bg-gradient-to-r from-white via-gray-50 to-white text-black rounded-full font-semibold btn-liquid hover-elevate magnetic-button ripple shadow-2xl"'
);

// Transform arc preview cards
homepageContent = homepageContent.replace(
  /className="aspect-square bg-gradient-to-br from-gray-900 to-black/g,
  'className="aspect-square glass-card-dark hover-elevate shimmer-on-hover'
);

homepageContent = homepageContent.replace(
  /className="aspect-square bg-gradient-to-br from-gray-50 to-white/g,
  'className="aspect-square glass-card hover-elevate shimmer-on-hover'
);

fs.writeFileSync(homepagePath, homepageContent, 'utf8');
console.log('✓ Transformed homepage to liquid glass');

console.log('\n🌊 ✅ LIQUID GLASS TRANSFORMATION COMPLETE!\n');
console.log('All components now feature:');
console.log('  • Glassmorphic cards with backdrop blur');
console.log('  • Hover elevation with shadow expansion');
console.log('  • Shimmer effects on hover');
console.log('  • Magnetic button interactions');
console.log('  • Ripple effects on click');
console.log('  • Spring physics animations');
console.log('  • Glow effects for premium CTAs');
console.log('  • Pulse animations for important actions');
console.log('  • Smooth color transitions everywhere');
console.log('\nNo more harsh corners. Everything is liquid glass. 🧊✨\n');
