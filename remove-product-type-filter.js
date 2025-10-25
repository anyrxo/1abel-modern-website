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

categoryPages.forEach(filePath => {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove the Product Type filter section
  // This includes the entire div block from "Category/Product Type" comment to the closing div
  const productTypeRegex = /\s*\{\/\* Category\/Product Type \*\/\}[\s\S]*?<div className="mb-6">[\s\S]*?<p className="text-xs tracking-wider uppercase text-gray-600 mb-3">Product Type<\/p>[\s\S]*?<\/div>\s*<\/div>/g;

  content = content.replace(productTypeRegex, '');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Removed Product Type filter from ${filePath}`);
});

console.log('\n✓ Successfully removed Product Type filters from all 6 category pages');
