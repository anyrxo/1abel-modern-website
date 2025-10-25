const fs = require('fs');
const path = require('path');

// Pages to update
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

  // Remove the old mobile-only floating buttons section (lines ~295-319)
  // This regex finds the mobile-only floating buttons and removes them
  const mobileButtonsRegex = /\s*{\/\* Floating Filter & Sort Buttons - Mobile Only \*\/}\s*<div className="md:hidden fixed bottom-\[72px\] left-1\/2 -translate-x-1\/2 z-40 flex gap-3">[\s\S]*?<\/div>\s*(?=\s*{\/\* Filter Menu Popup \*\/})/;

  if (mobileButtonsRegex.test(content)) {
    content = content.replace(mobileButtonsRegex, '\n');
    console.log(`✅ Removed duplicate mobile-only buttons from ${filePath}`);
  } else {
    console.log(`⚠️  Could not find mobile-only buttons in ${filePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('\n✨ Duplicate floating buttons removed!');
