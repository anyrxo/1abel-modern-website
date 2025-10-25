const fs = require('fs');
const path = require('path');

// All category pages that need updating
const pagesToUpdate = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx',
  './src/app/arc-2/shop-all/page.tsx',
  './src/app/arc-3/shop-all/page.tsx',
];

console.log('🔄 Fixing mobile grid to 2 columns on all category pages...\n');

pagesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Change grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 to grid-cols-2 lg:grid-cols-4
  const updated = content.replace(
    /grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/g,
    'grid grid-cols-2 lg:grid-cols-4'
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
  }
});

console.log('\n✨ Mobile grid update complete! All category pages now show 2 columns on mobile.\n');
