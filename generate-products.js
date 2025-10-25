const fs = require('fs');
const path = require('path');

// All products and their categories
const products = {
  tops: ['THERMAL', 'HOODIE', 'COACH_JACKET', 'CREWNECK', 'LONGSLEEVE', 'TEE', 'OVERSHIRT', 'PUFFER'],
  bottoms: ['CARGO', 'SWEATS', 'DENIM', 'JOGGERS', 'SHORTS', 'WIDE_PANTS'],
  accessories: ['CHAIN', 'RING', 'BEANIE', 'GLOVES', 'BELT', 'CAP', 'SOCKS', 'TOTE']
};

const arcs = ['arc-2', 'arc-3'];

// Template for page.tsx
const pageTemplate = (productSlug) => {
  // Convert slug to PascalCase for function name (remove hyphens)
  const functionName = productSlug.split('-').map(part =>
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');

  return `import { ProductDetail } from './ProductDetail'

export default function ${functionName}Page() {
  return <ProductDetail />
}
`;
};

// Template for ProductDetail.tsx
const productDetailTemplate = (productId, arc) => {
  const arcType = arc === 'arc-2' ? 'ARC_2' : 'ARC_3';
  const colors = arcType === 'ARC_2'
    ? ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH']
    : ['SAKURA', 'MIST', 'CLOUD', 'SAND', 'LILAC'];

  return `'use client'

import { ProductPage } from '@/components/ProductPage'
import { getGenericColorStory, getDefaultPairings } from '@/data/productVariants'

const productId = '${productId}'
const arc = '${arcType}' as const

// Color stories for this product
const colorStories: Record<string, string> = {
${colors.map(color => `  ${color}: getGenericColorStory(productId, '${color}', arc),`).join('\n')}
}

// Pairing recommendations
const pairsWith: Record<string, any[]> = {
${colors.map(color => `  ${color}: getDefaultPairings('${color}', arc),`).join('\n')}
}

export function ProductDetail() {
  return (
    <ProductPage
      productId={productId}
      arc={arc}
      colorStories={colorStories}
      pairsWith={pairsWith}
    />
  )
}
`;
};

// Create product pages
arcs.forEach(arc => {
  Object.entries(products).forEach(([category, productList]) => {
    productList.forEach(productId => {
      const productSlug = productId.toLowerCase().replace(/_/g, '-');
      const dirPath = path.join(__dirname, 'src', 'app', arc, category, productSlug);

      // Create directory
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Create page.tsx
      fs.writeFileSync(
        path.join(dirPath, 'page.tsx'),
        pageTemplate(productSlug)
      );

      // Create ProductDetail.tsx
      fs.writeFileSync(
        path.join(dirPath, 'ProductDetail.tsx'),
        productDetailTemplate(productId, arc)
      );

      console.log(`Created: ${arc}/${category}/${productSlug}`);
    });
  });
});

console.log('\\nAll product pages generated successfully!');
console.log('Total pages created:', arcs.length * Object.values(products).flat().length * 2);
