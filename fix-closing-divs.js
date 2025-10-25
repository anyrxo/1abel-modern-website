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

  // Fix the duplicate closing div issue
  // Replace:     </div>
  //     </div>
  //   )
  // }
  // With:     </div>
  //   )
  // }
  content = content.replace(
    /(\s*<\/div>\s*)\s*<\/div>\s*\)\s*\}/g,
    '$1)\n}'
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed ${filePath}`);
});

console.log('\n✨ All closing divs fixed!');
