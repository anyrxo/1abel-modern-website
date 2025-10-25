const fs = require('fs');

const files = [
  { path: './src/app/arc-2/bottoms/page.tsx', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'], arc: 2 },
  { path: './src/app/arc-2/accessories/page.tsx', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'], arc: 2 },
  { path: './src/app/arc-3/tops/page.tsx', colors: ['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC'], arc: 3 },
  { path: './src/app/arc-3/bottoms/page.tsx', colors: ['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC'], arc: 3 },
  { path: './src/app/arc-3/accessories/page.tsx', colors: ['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC'], arc: 3 },
  { path: './src/app/arc-2/shop-all/page.tsx', colors: ['VOID', 'STEEL', 'BLOOD', 'MOSS', 'EARTH'], arc: 2 },
  { path: './src/app/arc-3/shop-all/page.tsx', colors: ['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC'], arc: 3 },
];

console.log('🔄 Removing old filters and showing options directly...\n');

files.forEach(({ path: filePath, colors, arc }) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the old desktop ProductFilters section
  content = content.replace(/\n\s*{\/\* Filters \*\/\}\s*<ProductFilters[\s\S]*?\/>\n/, '\n');

  const textColor = arc === 2 ? 'text-white' : 'text-black';
  const bgColor = arc === 2 ? 'bg-black' : 'bg-white';
  const borderSelected = arc === 2 ? 'border-white bg-white text-black' : 'border-black bg-black text-white';
  const borderUnselected = arc === 2 ? 'border-white/20 text-white hover:border-white/40' : 'border-black/20 text-black hover:border-black/40';
  const buttonBg = arc === 2 ? 'bg-white text-black' : 'bg-black text-white';
  const labelColor = arc === 2 ? 'text-gray-500' : 'text-gray-400';

  const colorsList = `['${colors.join("', '")}']`;

  // Replace ProductFilters in filter popup with direct controls
  const oldFilterPopup = /<h3 className="text-lg font-bold tracking-wider uppercase mb-6 [^"]*">Filters<\/h3>\s*<ProductFilters[\s\S]*?Apply Filters\s*<\/motion\.button>/;

  const newFilterContent = `<h3 className="text-lg font-bold tracking-wider uppercase mb-6 ${textColor}">Filters</h3>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${labelColor} mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
                {${colorsList}.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => {
                      setSelectedColors(prev =>
                        prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
                      )
                    }}
                    className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                      selectedColors.includes(color)
                        ? '${borderSelected}'
                        : '${borderUnselected}'
                    }\`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${labelColor} mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => {
                      setSelectedSizes(prev =>
                        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                      )
                    }}
                    className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                      selectedSizes.includes(size)
                        ? '${borderSelected}'
                        : '${borderUnselected}'
                    }\`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4 ${buttonBg} text-sm font-bold tracking-wider uppercase rounded-premium"
              whileTap={{ scale: 0.98 }}
            >
              Apply Filters
            </motion.button>`;

  content = content.replace(oldFilterPopup, newFilterContent);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${filePath}`);
});

console.log('\n✨ All pages updated with direct filter controls!\n');
