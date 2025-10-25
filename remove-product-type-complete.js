const fs = require('fs');
const path = require('path');

const categoryPages = [
  'src/app/arc-2/tops/page.tsx',
  'src/app/arc-2/bottoms/page.tsx',
  'src/app/arc-2/accessories/page.tsx',
  'src/app/arc-3/tops/page.tsx',
  'src/app/arc-3/bottoms/page.tsx',
  'src/app/arc-3/accessories/page.tsx'
];

console.log('🗑️  REMOVING PRODUCT TYPE FILTERS FROM ALL CATEGORY PAGES\n');

categoryPages.forEach(filePath => {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove the Product Type filter section more aggressively
  // Match the entire section from comment to closing div
  const variations = [
    // Variation 1: With comment
    /\s*\{\/\* Category\/Product Type \*\/\}\s*<div className="mb-6">[\s\S]*?<p className="text-xs tracking-wider uppercase text-gray-(?:600|500) mb-3">Product Type<\/p>[\s\S]*?<\/div>\s*<\/div>/g,
    // Variation 2: Without comment
    /<div className="mb-6">\s*<p className="text-xs tracking-wider uppercase text-gray-(?:600|500) mb-3">Product Type<\/p>[\s\S]*?<\/div>\s*<\/div>/g,
  ];

  variations.forEach(regex => {
    content = content.replace(regex, '');
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`   ✓ Removed Product Type filter`);
});

console.log('\n✅ Successfully removed Product Type filters from all 6 category pages');
