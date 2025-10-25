const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'src/app/arc-2/shop-all/page.tsx', arc: 'arc-2' },
  { path: 'src/app/arc-3/shop-all/page.tsx', arc: 'arc-3' },
];

pages.forEach(({ path: filePath, arc }) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Add selectedCategories state after selectedSizes
  if (!content.includes('selectedCategories')) {
    content = content.replace(
      /const \[selectedSizes, setSelectedSizes\] = useState<string\[\]>\(\[\]\)/,
      `const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])`
    );
    console.log(`✅ Added selectedCategories state to ${filePath}`);
  }

  // Update the filter logic to include category filtering
  const oldFilterLogic = /\/\/ Filter and sort products\s+const filteredProducts = useMemo\(\(\) => \{[\s\S]*?\/\/ Price sort/;

  const newFilterLogic = `// Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p =>
        selectedCategories.includes(p.category)
      )
    }

    // Size filter (skip for accessories that are ONE SIZE)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => {
        // If product has sizes and any selected size matches
        return selectedSizes.some(size => size === 'ONE SIZE' || p.category !== 'Accessories')
      })
    }

    // Price sort`;

  if (oldFilterLogic.test(content)) {
    content = content.replace(oldFilterLogic, newFilterLogic);
    console.log(`✅ Updated filter logic in ${filePath}`);
  }

  // Update the useMemo dependency array to include selectedCategories
  content = content.replace(
    /}, \[searchQuery, selectedColors, selectedSizes, priceSort\]\)/,
    `}, [searchQuery, selectedColors, selectedSizes, selectedCategories, priceSort])`
  );

  // Add Category section to the filter popup (after Sizes section, before Apply button)
  const isArc2 = arc === 'arc-2';
  const borderClass = isArc2 ? 'border-black/20 text-black hover:border-black/40' : 'border-white/20 text-white hover:border-white/40';
  const borderActiveClass = isArc2 ? 'border-black bg-black text-white' : 'border-white bg-white text-black';
  const grayText = isArc2 ? 'text-gray-600' : 'text-gray-500';

  const categorySection = `
            {/* Category/Product Type */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${grayText} mb-3">Product Type</p>
              <div className="flex flex-wrap gap-2">
                {['Tops', 'Bottoms', 'Accessories'].map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedCategories(prev =>
                        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                      )
                    }}
                    className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                      selectedCategories.includes(category)
                        ? '${borderActiveClass}'
                        : '${borderClass}'
                    }\`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
`;

  // Find the Apply Filters button and add category section before it
  content = content.replace(
    /(\s+)<motion\.button\s+onClick=\{\(\) => setFilterMenuOpen\(false\)\}\s+className="w-full mt-6 py-4/,
    `${categorySection}$1<motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Added category filter to ${filePath}`);
});

console.log('\n✨ Category/Product Type filter added to all shop-all pages!');
