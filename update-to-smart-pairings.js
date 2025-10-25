const fs = require('fs');
const { glob } = require('glob');

// Find all ProductDetail.tsx files
const files = glob.sync('src/app/**/ProductDetail.tsx');

console.log(`Found ${files.length} ProductDetail files to update\n`);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Check if it's already using getSmartPairings
  if (content.includes('getSmartPairings')) {
    console.log(`⏭️  Skipping ${file} - already using getSmartPairings`);
    return;
  }

  // Update import statement
  content = content.replace(
    /import { getGenericColorStory, getDefaultPairings } from '@\/data\/productVariants'/g,
    "import { getGenericColorStory, getSmartPairings } from '@/data/productVariants'"
  );

  // Update all getDefaultPairings calls to getSmartPairings with productId
  // Pattern: VOID: getDefaultPairings('VOID', arc)
  // Replace with: VOID: getSmartPairings(productId, 'VOID', arc)

  content = content.replace(
    /(\w+): getDefaultPairings\('(\w+)', arc\)/g,
    "$1: getSmartPairings(productId, '$2', arc)"
  );

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`✅ Updated ${file}`);
});

console.log(`\n✨ All ProductDetail files updated to use smart pairings!`);
