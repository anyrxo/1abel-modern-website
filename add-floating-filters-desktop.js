const fs = require('fs');
const path = require('path');

// Pages to update
const pages = [
  { arc: 'arc-2', category: 'tops', arcName: 'Arc 2 Shadow', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'] },
  { arc: 'arc-2', category: 'bottoms', arcName: 'Arc 2 Shadow', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'] },
  { arc: 'arc-2', category: 'accessories', arcName: 'Arc 2 Shadow', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'] },
  { arc: 'arc-2', category: 'shop-all', arcName: 'Arc 2 Shadow', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'] },
  { arc: 'arc-3', category: 'tops', arcName: 'Arc 3 Light', colors: ['SAND', 'MIST', 'CLAY', 'SAGE', 'IVORY'] },
  { arc: 'arc-3', category: 'bottoms', arcName: 'Arc 3 Light', colors: ['SAND', 'MIST', 'CLAY', 'SAGE', 'IVORY'] },
  { arc: 'arc-3', category: 'accessories', arcName: 'Arc 3 Light', colors: ['SAND', 'MIST', 'CLAY', 'SAGE', 'IVORY'] },
  { arc: 'arc-3', category: 'shop-all', arcName: 'Arc 3 Light', colors: ['SAND', 'MIST', 'CLAY', 'SAGE', 'IVORY'] },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

pages.forEach(({ arc, category, arcName, colors }) => {
  const filePath = path.join(__dirname, 'src', 'app', arc, category, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove old ProductFilters import if it exists
  content = content.replace(/import { ProductFilters } from '@\/components\/ProductFilters'\n/g, '');

  // Ensure X icon is imported
  if (!content.includes('import { SlidersHorizontal, ArrowUpDown')) {
    content = content.replace(
      /import { SlidersHorizontal, ArrowUpDown }/,
      'import { SlidersHorizontal, ArrowUpDown, X }'
    );
  } else if (!content.includes(', X }')) {
    content = content.replace(
      /import { SlidersHorizontal, ArrowUpDown }/,
      'import { SlidersHorizontal, ArrowUpDown, X }'
    );
  }

  // Find the closing </section> tag for the products grid section
  // We want to add the floating buttons just before the final closing </div> of the component

  const isArc2 = arc === 'arc-2';
  const bgClass = isArc2 ? 'bg-white' : 'bg-black';
  const textClass = isArc2 ? 'text-black' : 'text-white';
  const borderClass = isArc2 ? 'border-black/20' : 'border-white/20';
  const borderActiveClass = isArc2 ? 'border-black bg-black text-white' : 'border-white bg-white text-black';
  const buttonBg = isArc2 ? 'bg-white text-black' : 'bg-black text-white';
  const popupBg = isArc2 ? 'bg-white' : 'bg-black';
  const popupText = isArc2 ? 'text-black' : 'text-white';
  const grayText = isArc2 ? 'text-gray-600' : 'text-gray-500';
  const closeIconColor = isArc2 ? 'text-black' : 'text-white';

  // Create color buttons HTML
  const colorButtonsHTML = colors.map(color => `            <motion.button
              key="${color}"
              onClick={() => {
                setSelectedColors(prev =>
                  prev.includes('${color}') ? prev.filter(c => c !== '${color}') : [...prev, '${color}']
                )
              }}
              className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                selectedColors.includes('${color}')
                  ? '${borderActiveClass}'
                  : '${borderClass} hover:${isArc2 ? 'border-black/40' : 'border-white/40'}'
              }\`}
              whileTap={{ scale: 0.95 }}
            >
              ${color}
            </motion.button>`).join('\n');

  // Create size buttons HTML
  const sizeButtonsHTML = sizes.map(size => `            <motion.button
              key="${size}"
              onClick={() => {
                setSelectedSizes(prev =>
                  prev.includes('${size}') ? prev.filter(s => s !== '${size}') : [...prev, '${size}']
                )
              }}
              className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                selectedSizes.includes('${size}')
                  ? '${borderActiveClass}'
                  : '${borderClass} hover:${isArc2 ? 'border-black/40' : 'border-white/40'}'
              }\`}
              whileTap={{ scale: 0.95 }}
            >
              ${size}
            </motion.button>`).join('\n');

  const floatingButtonsHTML = `
      {/* Floating Filter & Sort Buttons - Bottom Center */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-40 flex gap-3">
        <motion.button
          onClick={() => {
            setFilterMenuOpen(!filterMenuOpen)
            setSortMenuOpen(false)
          }}
          className="flex items-center gap-2 px-6 py-3 ${buttonBg} text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl backdrop-blur-md"
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
          className="flex items-center gap-2 px-6 py-3 ${buttonBg} text-sm font-bold tracking-wide uppercase rounded-premium shadow-2xl backdrop-blur-md"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort
        </motion.button>
      </div>

      {/* Filter Popup */}
      {filterMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setFilterMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 ${popupBg} rounded-t-premium-xl p-6 pb-8 max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-wider uppercase ${popupText}">Filters</h3>
              <motion.button
                onClick={() => setFilterMenuOpen(false)}
                className="${closeIconColor} hover:opacity-70"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${grayText} mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
${colorButtonsHTML}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${grayText} mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
${sizeButtonsHTML}
              </div>
            </div>

            <motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4 ${buttonBg} text-sm font-bold tracking-wider uppercase rounded-premium"
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Sort Popup */}
      {sortMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setSortMenuOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 ${popupBg} rounded-t-premium-xl p-6 pb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold tracking-wider uppercase ${popupText}">Sort By</h3>
              <motion.button
                onClick={() => setSortMenuOpen(false)}
                className="${closeIconColor} hover:opacity-70"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => {
                  setPriceSort('asc')
                  setSortMenuOpen(false)
                }}
                className={\`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                  priceSort === 'asc'
                    ? '${borderActiveClass}'
                    : '${borderClass} hover:${isArc2 ? 'border-black/40' : 'border-white/40'}'
                }\`}
                whileTap={{ scale: 0.98 }}
              >
                Price: Low to High
              </motion.button>
              <motion.button
                onClick={() => {
                  setPriceSort('desc')
                  setSortMenuOpen(false)
                }}
                className={\`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                  priceSort === 'desc'
                    ? '${borderActiveClass}'
                    : '${borderClass} hover:${isArc2 ? 'border-black/40' : 'border-white/40'}'
                }\`}
                whileTap={{ scale: 0.98 }}
              >
                Price: High to Low
              </motion.button>
              <motion.button
                onClick={() => {
                  setPriceSort('none')
                  setSortMenuOpen(false)
                }}
                className={\`w-full py-4 text-sm font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                  priceSort === 'none'
                    ? '${borderActiveClass}'
                    : '${borderClass} hover:${isArc2 ? 'border-black/40' : 'border-white/40'}'
                }\`}
                whileTap={{ scale: 0.98 }}
              >
                Default
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </div>`;

  // Find the last </div> before the final closing brace
  const lastDivMatch = content.lastIndexOf('    </div>\n  )\n}');

  if (lastDivMatch !== -1) {
    content = content.slice(0, lastDivMatch) + floatingButtonsHTML + '\n' + content.slice(lastDivMatch);
  } else {
    console.log(`⚠️  Could not find insertion point in ${filePath}`);
    return;
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Updated ${arc}/${category}/page.tsx`);
});

console.log('\n✨ All category pages updated with floating filter/sort buttons!');
