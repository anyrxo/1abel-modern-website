const fs = require('fs');
const path = require('path');

// Pages to fix
const pages = [
  'src/app/arc-2/tops/page.tsx',
  'src/app/arc-2/bottoms/page.tsx',
  'src/app/arc-2/accessories/page.tsx',
  'src/app/arc-2/shop-all/page.tsx',
  'src/app/arc-3/tops/page.tsx',
  'src/app/arc-3/bottoms/page.tsx',
  'src/app/arc-3/accessories/page.tsx',
  'src/app/arc-3/shop-all/page.tsx',
];

pages.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove the old mobile-only Filter Menu Popup section
  // This starts with {/* Filter Menu Popup */} and ends before {/* Sort Menu Popup */}
  const filterMenuRegex = /{\/\* Filter Menu Popup \*\/}\s+{filterMenuOpen && \([\s\S]*?\s+{\/\* Sort Menu Popup \*\/}/;

  if (filterMenuRegex.test(content)) {
    content = content.replace(filterMenuRegex, '{/* Sort Menu Popup */}');
    console.log(`✅ Removed old mobile filter popup from ${filePath}`);
  } else {
    console.log(`⚠️  Old mobile filter popup not found in ${filePath}`);
  }

  // Remove the old mobile-only Sort Menu Popup section if it exists separately
  // Look for md:hidden popups with older styling
  const oldSortRegex = /{\/\* Sort Menu Popup \*\/}\s+{sortMenuOpen && \(\s+<>\s+<motion\.div[\s\S]*?className="md:hidden fixed inset-0[\s\S]*?<\/>\s+\)\}/;

  if (oldSortRegex.test(content)) {
    // Find the new Sort Popup section (without md:hidden) and keep it
    // Remove only if there's a duplicate
    const newSortExists = content.includes('{/* Sort Popup */}');
    if (newSortExists) {
      content = content.replace(oldSortRegex, '');
      console.log(`✅ Removed old mobile sort popup from ${filePath}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('\n✨ All old mobile popups removed!');
