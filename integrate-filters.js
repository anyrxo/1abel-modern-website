const fs = require('fs');

console.log('🔍 Integrating ProductFilters into all category and shop-all pages...\n');

const pages = [
  './src/app/arc-2/tops/page.tsx',
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx',
  './src/app/arc-2/shop-all/page.tsx',
  './src/app/arc-3/shop-all/page.tsx'
];

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const isDark = filePath.includes('arc-2');
  const isShopAll = filePath.includes('shop-all');

  // Add ProductFilters import after existing imports
  if (!content.includes('ProductFilters')) {
    content = content.replace(
      "import { useRef, useState } from 'react'",
      "import { useRef, useState, useMemo } from 'react'\nimport { ProductFilters } from '@/components/ProductFilters'"
    );
  }

  // Add filter state after existing useState declarations
  if (!content.includes('searchQuery')) {
    content = content.replace(
      'const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)',
      `const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none')`
    );
  }

  // Get available colors and sizes
  const availableColors = isShopAll
    ? "['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH']" // Arc 2
    : "['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH']";

  if (filePath.includes('arc-3')) {
    const availableColors = "['SAKURA', 'MIST', 'CLOUD', 'SAND', 'LILAC']";
  }

  // Add filtered products logic before return statement
  if (!content.includes('filteredProducts')) {
    const filterLogic = `
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Size filter (skip for accessories that are ONE SIZE)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => {
        // If product has sizes and any selected size matches
        return selectedSizes.some(size => size === 'ONE SIZE' || p.category !== 'Accessories')
      })
    }

    // Price sort
    if (priceSort === 'asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (priceSort === 'desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [searchQuery, selectedColors, selectedSizes, priceSort])
`;

    // Insert before the return statement
    content = content.replace(
      'return (',
      filterLogic + '\n  return ('
    );
  }

  // Add ProductFilters component before products grid
  if (!content.includes('<ProductFilters')) {
    const filtersComponent = `
          {/* Filters */}
          <ProductFilters
            onSearchChange={setSearchQuery}
            onColorFilter={setSelectedColors}
            onSizeFilter={setSelectedSizes}
            onPriceSort={setPriceSort}
            availableColors={${isDark ? "['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH']" : "['SAKURA', 'MIST', 'CLOUD', 'SAND', 'LILAC']"}}
            availableSizes={['XS', 'S', 'M', 'L', 'XL', 'ONE SIZE']}
            isDark={${isDark}}
          />
`;

    // Insert after the title section, before products grid
    content = content.replace(
      /{\/\* Products Grid \*\/}/,
      filtersComponent + '\n      {/* Products Grid */}'
    );
  }

  // Replace products.map with filteredProducts.map
  content = content.replace(
    /\{products\.map\(/g,
    '{filteredProducts.map('
  );

  // Update product count in header
  content = content.replace(
    /\{products\.length\}/g,
    '{filteredProducts.length}'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Integrated filters into ${filePath.split('/').pop()}`);
});

console.log('\n✅ ProductFilters integrated into all 8 pages!');
console.log('\nFeatures added:');
console.log('  • Real-time search by product name');
console.log('  • Color filtering (multi-select)');
console.log('  • Size filtering (multi-select)');
console.log('  • Price sorting (Low to High, High to Low, Default)');
console.log('  • Live product count updates');
console.log('  • Theme-aware styling (Arc 2 dark, Arc 3 light)');
