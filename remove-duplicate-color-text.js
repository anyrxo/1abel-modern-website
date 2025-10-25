const fs = require('fs');

console.log('Removing duplicate "5 colors available" text...\n');

const categoryPages = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx'
];

categoryPages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Remove duplicate "5 colors available" or "1 signature color" lines
  content = content.replace(
    /(<p className="text-xs text-gray-400 mt-1">.*?colors available<\/p>)\s*<p className="text-xs text-gray-400 mt-1">.*?colors available<\/p>/g,
    '$1'
  );

  content = content.replace(
    /(<p className="text-xs text-gray-400 mt-1">1 signature color<\/p>)\s*<p className="text-xs text-gray-400 mt-1">1 signature color<\/p>/g,
    '$1'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Fixed ${file.split('/').pop()}`);
});

console.log('\n✅ All duplicates removed!');
