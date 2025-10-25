const fs = require('fs');
const path = require('path');

// All category pages and shop-all pages that have product grids
const pagesToUpdate = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx',
  './src/app/arc-2/shop-all/page.tsx',
  './src/app/arc-3/shop-all/page.tsx',
  './src/app/arc-2/page.tsx',
  './src/app/arc-3/page.tsx',
];

console.log('🔄 Adding rounded corners to all product card images...\n');

pagesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Fix 1: Add rounded-premium-xl to aspect-[3/4] divs that don't have it
  const aspectPattern = /className="aspect-\[3\/4\]([^"]*?)"/g;
  let match;
  while ((match = aspectPattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const classContent = match[1];

    // Only update if it doesn't already have rounded-premium
    if (!classContent.includes('rounded-premium')) {
      const newClass = fullMatch.replace(
        /className="aspect-\[3\/4\]/,
        'className="aspect-[3/4] rounded-premium-xl'
      );
      content = content.replace(fullMatch, newClass);
      updated = true;
    }
  }

  // Fix 2: Add rounded-premium-xl to relative overflow-hidden divs (image containers)
  content = content.replace(
    /className="relative overflow-hidden mb-6"/g,
    'className="relative overflow-hidden mb-6 rounded-premium-xl"'
  );

  // Fix 3: Ensure glass-card divs have rounded corners
  const glassCardPattern = /className="glass-card([^"]*?)"/g;
  content = content.replace(glassCardPattern, (match, classContent) => {
    if (!classContent.includes('rounded-premium')) {
      return match.replace('className="glass-card', 'className="glass-card rounded-premium-xl');
    }
    return match;
  });

  if (updated || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed: ${filePath}`);
  }
});

console.log('\n✨ Product image corner rounding complete!\n');
