const fs = require('fs');

// 1. Update products.ts to add accessory color restriction
const productsPath = './src/data/products.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Add accessory-specific colors after the main COLORS export
// Only CHAIN, RING, BELT have restricted colors (VOID/CLOUD)
// BEANIE, TOTE, SOCKS, CAP get all 5 colors
const accessoryColorsCode = `
// Premium accessories (chain, ring, belt) only come in signature colors
export const PREMIUM_ACCESSORY_COLORS = {
  ARC_2: {
    VOID: COLORS.ARC_2.VOID
  },
  ARC_3: {
    CLOUD: COLORS.ARC_3.CLOUD
  }
}

// Premium accessories that only come in one signature color
export const PREMIUM_ACCESSORIES = ['CHAIN', 'RING', 'BELT']
`;

productsContent = productsContent.replace(
  'export const BASE_PRODUCTS',
  accessoryColorsCode + '\nexport const BASE_PRODUCTS'
);

fs.writeFileSync(productsPath, productsContent, 'utf8');
console.log('✓ Added ACCESSORY_COLORS to products.ts');

// 2. Update ProductPage to use accessory colors for accessories
const productPagePath = './src/components/ProductPage.tsx';
let productPageContent = fs.readFileSync(productPagePath, 'utf8');

// Update imports
productPageContent = productPageContent.replace(
  "import { BASE_PRODUCTS, COLORS } from '@/data/products'",
  "import { BASE_PRODUCTS, COLORS, PREMIUM_ACCESSORY_COLORS, PREMIUM_ACCESSORIES } from '@/data/products'"
);

// Update colors selection logic
productPageContent = productPageContent.replace(
  'const colors = arc === \'ARC_2\' ? COLORS.ARC_2 : COLORS.ARC_3',
  `const colors = PREMIUM_ACCESSORIES.includes(product.id)
    ? (arc === 'ARC_2' ? PREMIUM_ACCESSORY_COLORS.ARC_2 : PREMIUM_ACCESSORY_COLORS.ARC_3)
    : (arc === 'ARC_2' ? COLORS.ARC_2 : COLORS.ARC_3)`
);

fs.writeFileSync(productPagePath, productPageContent, 'utf8');
console.log('✓ Updated ProductPage to use ACCESSORY_COLORS');

// 3. Update category pages - change "View Colors" to "Explore" and show actual color count
const categoryFiles = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx'
];

categoryFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Accessories still show "5 colors available" (beanie, tote, socks, cap have all colors)
  // Only chain, ring, belt are restricted but category page doesn't need to show "1 color"
  const isAccessories = file.includes('accessories');

  if (!isAccessories) {
    // For tops and bottoms, ensure it says "5 colors available"
    content = content.replace(
      /<p className="text-xs text-gray-400 mt-1">.*?colors available<\/p>/g,
      `<p className="text-xs text-gray-400 mt-1">5 colors available</p>`
    );
  }

  // Change CTAs to psychologically better ones
  const ctaText = isAccessories ? 'See Details' : 'Explore Colors';
  content = content.replace(
    /(View Colors|Explore Colors|See Details)/g,
    ctaText
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Updated ${file.split('/').pop()}`);
});

console.log('\n✅ All files updated!');
console.log('\nChanges made:');
console.log('- Premium accessories (CHAIN, RING, BELT) restricted to VOID (Arc 2) or CLOUD (Arc 3)');
console.log('- Regular accessories (BEANIE, TOTE, SOCKS, CAP) get all 5 colors');
console.log('- Tops/Bottoms CTA: "Explore Colors"');
console.log('- Accessories CTA: "See Details"');
