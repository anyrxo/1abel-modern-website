const fs = require('fs');

const productPath = './src/components/ProductPage.tsx';
let content = fs.readFileSync(productPath, 'utf8');

// Update Add to Cart button to liquid style
content = content.replace(
  /className={`w-full py-4 \$\{arc === 'ARC_2' \? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'\} text-sm tracking-\[0\.2em\] uppercase font-semibold transition-colors mb-8`}/,
  `className={\`w-full py-4 \${arc === 'ARC_2' ? 'bg-gradient-to-r from-white to-gray-100 text-black hover:shadow-2xl' : 'bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-2xl'} text-sm tracking-[0.2em] uppercase font-semibold btn-liquid shadow-xl mb-8\`}`
);

// Update color selector buttons to be more rounded
content = content.replace(
  /className={`w-12 h-12 border-2/g,
  'className={`w-12 h-12 rounded-2xl border-2'
);

// Update size selector buttons
content = content.replace(
  /className={`py-3 border text-sm/g,
  'className={`py-3 border text-sm rounded-xl'
);

// Update pairs with cards
content = content.replace(
  /className={`border \$\{borderColor\} p-4 transition-colors`}/g,
  'className={`border ${borderColor} p-4 transition-all rounded-premium-lg hover:shadow-lg`}'
);

// Update pairs with buttons
content = content.replace(
  /className={`w-full py-2 text-xs tracking-wider uppercase \$\{.*?\} transition-all`}/g,
  function(match) {
    return match.replace('transition-all', 'transition-all btn-liquid');
  }
);

// Update modal to be more rounded
content = content.replace(
  /className={`relative \$\{arc === 'ARC_2' \? 'bg-white text-black' : 'bg-black text-white'\} p-8 max-w-md w-full`}/,
  `className={\`relative \${arc === 'ARC_2' ? 'bg-white text-black' : 'bg-black text-white'} p-8 max-w-md w-full rounded-premium-xl shadow-2xl\`}`
);

// Update modal size buttons
content = content.replace(
  /className={`py-3 border text-sm \$\{[\s\S]*?\} transition-colors`}/g,
  function(match) {
    return match.replace('transition-colors', 'transition-all btn-liquid');
  }
);

fs.writeFileSync(productPath, content, 'utf8');
console.log('✓ Updated ProductPage with liquid UI');
