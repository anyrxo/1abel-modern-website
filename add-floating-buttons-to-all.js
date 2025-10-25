const fs = require('fs');

const files = [
  './src/app/arc-2/bottoms/page.tsx',
  './src/app/arc-2/accessories/page.tsx',
  './src/app/arc-3/tops/page.tsx',
  './src/app/arc-3/bottoms/page.tsx',
  './src/app/arc-3/accessories/page.tsx',
  './src/app/arc-2/shop-all/page.tsx',
  './src/app/arc-3/shop-all/page.tsx'
];

console.log('🔄 Adding floating filter/sort buttons to all category pages...\n');

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has floating buttons
  if (content.includes('Floating Filter & Sort Buttons')) {
    console.log(`⏭️  Already has buttons: ${filePath}`);
    return;
  }

  // Add imports
  if (!content.includes('SlidersHorizontal')) {
    content = content.replace(
      "import { ProductFilters } from '@/components/ProductFilters'",
      "import { ProductFilters } from '@/components/ProductFilters'\nimport { SlidersHorizontal, ArrowUpDown } from 'lucide-react'"
    );
  }

  // Add state
  const stateToAdd = `  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)\n`;

  if (!content.includes('filterMenuOpen')) {
    content = content.replace(
      /const \[priceSort, setPriceSort\] = useState<'asc' \| 'desc' \| 'none'>\('none'\)/,
      `const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none')\n${stateToAdd}`
    );
  }

  // Determine if it's Arc 2 or Arc 3
  const isArc2 = filePath.includes('arc-2');
  const colorList = isArc2 ? "['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH']" : "['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC']";

  // Add floating buttons and popups before footer
  const floatingButtonsCode = `
      {/* Floating Filter & Sort Buttons - Mobile Only */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-40 flex gap-3">
        <motion.button
          onClick={() => {
            setFilterMenuOpen(!filterMenuOpen)
            setSortMenuOpen(false)
          }}
          className="${isArc2 ? 'flex items-center gap-2 px-6 py-3 bg-white text-black' : 'flex items-center gap-2 px-6 py-3 bg-black text-white'} text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl"
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </motion.button>
        <motion.button
          onClick={() => {
            setSortMenuOpen(!sortMenuOpen)
            setFilterMenuOpen(false)
          }}
          className="${isArc2 ? 'flex items-center gap-2 px-6 py-3 bg-white text-black' : 'flex items-center gap-2 px-6 py-3 bg-black text-white'} text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </motion.button>
      </div>

      {/* Filter Menu Popup */}
      {filterMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden fixed inset-0 bg-black/50 z-45"
            onClick={() => setFilterMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 ${isArc2 ? 'bg-black' : 'bg-white'} rounded-t-premium-xl p-6 pb-8 max-h-[70vh] overflow-y-auto"
          >
            <h3 className="text-lg font-bold tracking-wider uppercase mb-6 ${isArc2 ? 'text-white' : 'text-black'}">Filters</h3>
            <ProductFilters
              onSearchChange={setSearchQuery}
              onColorFilter={setSelectedColors}
              onSizeFilter={setSelectedSizes}
              onPriceSort={setPriceSort}
              availableColors={${colorList}}
              availableSizes={['XS', 'S', 'M', 'L', 'XL', 'ONE SIZE']}
              isDark={${isArc2}}
            />
            <motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4 ${isArc2 ? 'bg-white text-black' : 'bg-black text-white'} text-sm font-bold tracking-wider uppercase rounded-premium"
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Sort Menu Popup */}
      {sortMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden fixed inset-0 bg-black/50 z-45"
            onClick={() => setSortMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 ${isArc2 ? 'bg-black' : 'bg-white'} rounded-t-premium-xl p-6 pb-8"
          >
            <h3 className="text-lg font-bold tracking-wider uppercase mb-6 ${isArc2 ? 'text-white' : 'text-black'}">Sort By</h3>
            <div className="space-y-3">
              {[
                { label: 'Price: Low to High', value: 'asc' as const },
                { label: 'Price: High to Low', value: 'desc' as const },
                { label: 'Default', value: 'none' as const }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setPriceSort(option.value)
                    setSortMenuOpen(false)
                  }}
                  className={\`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                    priceSort === option.value
                      ? '${isArc2 ? 'border-white bg-white text-black' : 'border-black bg-black text-white'}'
                      : '${isArc2 ? 'border-white/20 text-white hover:border-white/40' : 'border-black/20 text-black hover:border-black/40'}'
                  }\`}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
`;

  content = content.replace(/(\s+{\/\* Footer \*\/\})/,`${floatingButtonsCode}\n$1`);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${filePath}`);
});

console.log('\n✨ Floating buttons added to all category pages!\n');
