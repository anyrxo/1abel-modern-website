const fs = require('fs');
const glob = require('glob');

console.log('Fixing Product Detail page buttons to liquid glass style...\n');

// Find all ProductDetail.tsx files manually
const files = [
  './src/app/arc-2/tops/[id]/ProductDetail.tsx',
  './src/app/arc-2/bottoms/[id]/ProductDetail.tsx',
  './src/app/arc-2/accessories/[id]/ProductDetail.tsx',
  './src/app/arc-3/tops/[id]/ProductDetail.tsx',
  './src/app/arc-3/bottoms/[id]/ProductDetail.tsx',
  './src/app/arc-3/accessories/[id]/ProductDetail.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix "View Cart" button
  content = content.replace(
    /className="flex-1 py-2 border border-(black|white) hover:bg-(black|white) hover:text-(white|black) transition-colors text-xs tracking-wider uppercase"/g,
    (match, borderColor, bgColor, textColor) => {
      if (borderColor === 'black') {
        // Arc 2 (dark) style
        return 'className="flex-1 py-4 border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-white/10 transition-all btn-liquid hover-elevate text-xs tracking-wider uppercase"';
      } else {
        // Arc 3 (light) style
        return 'className="flex-1 py-4 border border-black/20 bg-white/50 backdrop-blur-sm text-black hover:bg-black/5 transition-all btn-liquid hover-elevate text-xs tracking-wider uppercase"';
      }
    }
  );

  // Fix "Checkout" button
  content = content.replace(
    /className="flex-1 py-2 bg-(black|white) text-(white|black) hover:bg-gray-(\d+) transition-colors text-xs tracking-wider uppercase"/g,
    (match, bgColor, textColor, grayShade) => {
      if (bgColor === 'black') {
        // Arc 2 (dark) style
        return 'className="flex-1 py-4 bg-gradient-to-r from-white via-gray-50 to-white text-black hover:bg-white transition-all btn-liquid hover-elevate pulse-glow magnetic-button ripple text-xs tracking-wider uppercase font-semibold shadow-xl"';
      } else {
        // Arc 3 (light) style
        return 'className="flex-1 py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white hover:bg-black transition-all btn-liquid hover-elevate pulse-glow magnetic-button ripple text-xs tracking-wider uppercase font-semibold shadow-xl"';
      }
    }
  );

  // Fix standalone checkout/view cart buttons (old style with just "className")
  content = content.replace(
    /className="text-xs uppercase tracking-wider underline hover:no-underline"/g,
    'className="text-xs uppercase tracking-wider underline hover:no-underline smooth-color glow-on-hover"'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Fixed ${file.split('/').pop()}`);
});

console.log(`\n✅ Fixed ${files.length} Product Detail pages!`);
console.log('\nAll buttons now have:');
console.log('  • Liquid glass styling (btn-liquid)');
console.log('  • Hover elevation effects');
console.log('  • Gradient backgrounds where appropriate');
console.log('  • Pulse glow for CTAs');
console.log('  • Magnetic button interactions');
console.log('  • Ripple effects');
