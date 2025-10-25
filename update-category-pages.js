const fs = require('fs');
const path = require('path');

// Product data
const productData = {
  tops: [
    { slug: "thermal", name: "THERMAL", price: { arc2: 185, arc3: 182 }, category: "Heavyweight" },
    { slug: "hoodie", name: "HOODIE", price: { arc2: 195, arc3: 192 }, category: "Essential" },
    { slug: "coach-jacket", name: "COACH JACKET", price: { arc2: 205, arc3: 202 }, category: "Outerwear" },
    { slug: "crewneck", name: "CREWNECK", price: { arc2: 175, arc3: 172 }, category: "Essential" },
    { slug: "longsleeve", name: "LONG-SLEEVE TEE", price: { arc2: 95, arc3: 92 }, category: "Layering" },
    { slug: "tee", name: "TEE", price: { arc2: 75, arc3: 72 }, category: "Essential" },
    { slug: "overshirt", name: "OVERSHIRT", price: { arc2: 165, arc3: 162 }, category: "Hybrid" },
    { slug: "puffer", name: "PUFFER", price: { arc2: 285, arc3: 275 }, category: "Outerwear" }
  ],
  bottoms: [
    { slug: "cargo", name: "CARGO PANTS", price: { arc2: 165, arc3: 162 }, category: "Utility" },
    { slug: "sweats", name: "SWEATPANTS", price: { arc2: 135, arc3: 132 }, category: "Comfort" },
    { slug: "denim", name: "DENIM", price: { arc2: 185, arc3: 178 }, category: "Selvedge" },
    { slug: "joggers", name: "JOGGERS", price: { arc2: 145, arc3: 142 }, category: "Technical" },
    { slug: "shorts", name: "SHORTS", price: { arc2: 95, arc3: 92 }, category: "Summer" },
    { slug: "wide-pants", name: "WIDE PANTS", price: { arc2: 155, arc3: 152 }, category: "Relaxed" }
  ],
  accessories: [
    { slug: "chain", name: "CHAIN", price: { arc2: 145, arc3: 142 }, category: "Jewelry" },
    { slug: "ring", name: "RING", price: { arc2: 95, arc3: 92 }, category: "Jewelry" },
    { slug: "beanie", name: "BEANIE", price: { arc2: 55, arc3: 52 }, category: "Headwear" },
    { slug: "gloves", name: "GLOVES", price: { arc2: 85, arc3: 82 }, category: "Winter" },
    { slug: "belt", name: "BELT", price: { arc2: 125, arc3: 122 }, category: "Essential" },
    { slug: "cap", name: "CAP", price: { arc2: 65, arc3: 62 }, category: "Headwear" },
    { slug: "socks", name: "SOCKS", price: { arc2: 45, arc3: 42 }, category: "Essential" },
    { slug: "tote", name: "TOTE BAG", price: { arc2: 85, arc3: 82 }, category: "Carry" }
  ]
};

// Template for the products array in each category page
const generateProductsArray = (category, arc) => {
  const products = productData[category];
  const priceKey = arc === 'arc-2' ? 'arc2' : 'arc3';

  return `  const products = [\n${products.map(p => `    {
      slug: "${p.slug}",
      name: "${p.name}",
      price: ${p.price[priceKey]}.00,
      category: "${p.category}",
      soldOut: false
    }`).join(',\n')}\n  ]`;
};

// Update function
const updateCategoryPage = (arcDir, category) => {
  const filePath = path.join(__dirname, 'src', 'app', arcDir, category, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the products array
  const productsArrayRegex = /const products = \[[^\]]*\]/s;
  const newProductsArray = generateProductsArray(category, arcDir);

  content = content.replace(productsArrayRegex, newProductsArray);

  // Replace product.id with product.slug in map key
  content = content.replace(/key={product\.id}/g, 'key={product.slug}');

  // Replace href links
  content = content.replace(
    new RegExp(`href={\`/${arcDir}/${category}/\\$\\{product\\.id\\}\`}`, 'g'),
    `href={\`/${arcDir}/${category}/\${product.slug}\`}`
  );

  // Replace hoveredProduct comparisons
  content = content.replace(/hoveredProduct === product\.id/g, 'hoveredProduct === index');
  content = content.replace(/setHoveredProduct\(product\.id\)/g, 'setHoveredProduct(index)');

  // Update map to include index
  content = content.replace(
    /products\.map\(\(product\) =>/g,
    'products.map((product, index) =>'
  );

  // Add "5 colors available" text and change "View Details" to "View Colors"
  content = content.replace(
    /(\$\{product\.price\.toFixed\(2\)\} AUD\s*{\w+\.soldOut && <span[^>]*>.*?<\/span>}\s*<\/p>)/,
    '$1\n                    <p className="text-xs text-gray-400 mt-1">5 colors available</p>'
  );

  content = content.replace(/View Details/g, 'View Colors');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${arcDir}/${category}/page.tsx`);
};

// Update all category pages
console.log('Updating category pages...\n');

['arc-2', 'arc-3'].forEach(arc => {
  ['tops', 'bottoms', 'accessories'].forEach(category => {
    updateCategoryPage(arc, category);
  });
});

console.log('\n✓ All category pages updated!');
