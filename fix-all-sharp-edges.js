const fs = require('fs');

console.log('🔧 Fixing all remaining sharp edges in ProductPage...\n');

const productPagePath = './src/components/ProductPage.tsx';
let content = fs.readFileSync(productPagePath, 'utf8');

// 1. Fix product image container - add rounded corners
content = content.replace(
  /className="relative aspect-\[3\/4\] overflow-hidden"/g,
  'className="relative aspect-[3/4] overflow-hidden rounded-premium-xl"'
);

// 2. Fix product image inner div - add rounded corners and center text
content = content.replace(
  /className={`absolute inset-0 flex items-center justify-center \$\{arc === 'ARC_2' \? 'text-white\/10' : 'text-black\/10'\} border \$\{borderColor\}`}/g,
  'className={`absolute inset-0 flex items-center justify-center ${arc === \'ARC_2\' ? \'text-white/10\' : \'text-black/10\'} border ${borderColor} rounded-premium-xl`}'
);

// 3. Fix text overlay sizing and centering
content = content.replace(
  /<span className="text-8xl font-bold tracking-tighter">/g,
  '<span className="text-6xl md:text-7xl font-bold tracking-tighter text-center px-4">'
);

// 4. Fix color selector buttons - add rounded-premium
content = content.replace(
  /className={`relative w-12 h-12 border-2 transition-all/g,
  'className={`relative w-12 h-12 rounded-premium border-2 transition-all hover-elevate magnetic-button'
);

// 5. Fix color selector inner border (selected state)
content = content.replace(
  /className={`absolute inset-0 border-2 \$\{arc === 'ARC_2' \? 'border-white' : 'border-black'\}`}/g,
  'className={`absolute inset-0 rounded-premium border-2 ${arc === \'ARC_2\' ? \'border-white\' : \'border-black\'}`}'
);

// 6. Fix size selector buttons - already has rounded-xl, enhance it
content = content.replace(
  /className={`py-3 border text-sm rounded-xl/g,
  'className={`py-3 border text-sm btn-liquid hover-elevate magnetic-button'
);

// 7. Fix Add to Cart button - already has btn-liquid, add more effects
content = content.replace(
  /className={`w-full py-4 \$\{arc === 'ARC_2' \? 'bg-gradient-to-r from-white to-gray-100 text-black hover:shadow-2xl' : 'bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-2xl'\} text-sm tracking-\[0\.2em\] uppercase font-semibold btn-liquid shadow-xl mb-8`}/g,
  'className={`w-full py-4 ${arc === \'ARC_2\' ? \'bg-gradient-to-r from-white via-gray-50 to-white text-black\' : \'bg-gradient-to-r from-black via-gray-900 to-black text-white\'} text-sm tracking-[0.2em] uppercase font-semibold btn-liquid shadow-2xl hover-elevate pulse-glow magnetic-button ripple mb-8`}'
);

// 8. Fix notification modal buttons (View Cart & Checkout in notification)
content = content.replace(
  /className={`flex-1 py-2 text-xs tracking-wider border \$\{[\s\S]*?\} transition-colors`}/g,
  'className={`flex-1 py-3 text-xs tracking-wider border btn-liquid hover-elevate ${arc === \'ARC_2\' ? \'border-black/20 hover:bg-black hover:text-white\' : \'border-white/20 hover:bg-white hover:text-black\'}`}'
);

content = content.replace(
  /className={`flex-1 py-2 text-xs tracking-wider \$\{[\s\S]*?\} transition-colors`}/g,
  'className={`flex-1 py-3 text-xs tracking-wider btn-liquid hover-elevate magnetic-button ${arc === \'ARC_2\' ? \'bg-gradient-to-r from-black to-gray-900 text-white\' : \'bg-gradient-to-r from-white to-gray-100 text-black\'}`}'
);

fs.writeFileSync(productPagePath, content, 'utf8');
console.log('✓ Fixed ProductPage.tsx\n');

console.log('✅ All sharp edges eliminated!');
console.log('\nFixes applied:');
console.log('  • Product images: rounded-premium-xl corners');
console.log('  • Text overlays: Centered and properly sized');
console.log('  • Color selectors: rounded-premium + hover-elevate + magnetic');
console.log('  • Size buttons: btn-liquid + hover-elevate + magnetic');
console.log('  • Add to Cart: Enhanced with pulse-glow + ripple');
console.log('  • Modal buttons: btn-liquid styling');
