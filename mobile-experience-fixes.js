const fs = require('fs');

console.log('📱 Fixing mobile experience...\n');

// 1. Fix discount code input box in checkout
console.log('Fixing discount code input...');
const checkoutPath = './src/app/checkout/page.tsx';
let checkoutContent = fs.readFileSync(checkoutPath, 'utf8');

checkoutContent = checkoutContent.replace(
  /className="flex-1 px-3 py-2 border border-black\/20 text-sm uppercase"/g,
  'className="flex-1 glass-input backdrop-blur-sm text-sm uppercase"'
);

fs.writeFileSync(checkoutPath, checkoutContent, 'utf8');
console.log('✓ Fixed checkout discount input\n');

// 2. Fix mobile grid to show 2 columns on all category and shop-all pages
console.log('Updating mobile grid layout to 2 columns...');

const pages = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx',
  './src/app/arc-2/shop-all/page.tsx',
  './src/app/arc-3/shop-all/page.tsx'
];

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Change from single column mobile to 2 columns
  content = content.replace(
    /grid grid-cols-1 md:grid-cols-3/g,
    'grid grid-cols-2 md:grid-cols-3'
  );

  // Also update any other single column grids
  content = content.replace(
    /grid-cols-1 sm:grid-cols-2 md:grid-cols-3/g,
    'grid-cols-2 md:grid-cols-3'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Updated ${file.split('/').pop()}`);
});

console.log('\n✅ Mobile experience updated!');
console.log('\nChanges:');
console.log('  • Discount code input: glass-input styling');
console.log('  • Mobile grid: 2 columns (like reference image)');
console.log('  • Desktop grid: 3 columns (unchanged)');
console.log('\nNext: Add bottom navigation bar');
