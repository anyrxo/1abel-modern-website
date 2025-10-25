const fs = require('fs');
const path = require('path');

// Pages to fix with their respective text colors
const arc2Pages = [
  'src/app/arc-2/tops/page.tsx',
  'src/app/arc-2/bottoms/page.tsx',
  'src/app/arc-2/accessories/page.tsx',
  'src/app/arc-2/shop-all/page.tsx',
];

const arc3Pages = [
  'src/app/arc-3/tops/page.tsx',
  'src/app/arc-3/bottoms/page.tsx',
  'src/app/arc-3/accessories/page.tsx',
  'src/app/arc-3/shop-all/page.tsx',
];

// Fix Arc 2 pages - buttons should have black text when not selected
arc2Pages.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix unselected button text color for Arc 2 (should be text-black)
  // Pattern: border-black/20 hover:border-black/40 (missing text color)
  content = content.replace(
    /: 'border-black\/20 hover:border-black\/40'/g,
    ": 'border-black/20 text-black hover:border-black/40'"
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed Arc 2: ${filePath}`);
});

// Fix Arc 3 pages - buttons should have white text when not selected
arc3Pages.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Fix unselected button text color for Arc 3 (should be text-white)
  // Pattern: border-white/20 hover:border-white/40 (missing text color)
  content = content.replace(
    /: 'border-white\/20 hover:border-white\/40'/g,
    ": 'border-white/20 text-white hover:border-white/40'"
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed Arc 3: ${filePath}`);
});

console.log('\n✨ All filter button text colors fixed!');
