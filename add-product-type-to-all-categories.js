const fs = require('fs');

// Pages to update (excluding shop-all which already has it)
const pages = [
  { path: 'src/app/arc-2/tops/page.tsx', arc: 'arc-2', category: 'Tops' },
  { path: 'src/app/arc-2/bottoms/page.tsx', arc: 'arc-2', category: 'Bottoms' },
  { path: 'src/app/arc-2/accessories/page.tsx', arc: 'arc-2', category: 'Accessories' },
  { path: 'src/app/arc-3/tops/page.tsx', arc: 'arc-3', category: 'Tops' },
  { path: 'src/app/arc-3/bottoms/page.tsx', arc: 'arc-3', category: 'Bottoms' },
  { path: 'src/app/arc-3/accessories/page.tsx', arc: 'arc-3', category: 'Accessories' },
];

pages.forEach(({ path: filePath, arc, category }) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  const isArc2 = arc === 'arc-2';
  const borderClass = isArc2 ? 'border-black/20 text-black hover:border-black/40' : 'border-white/20 text-white hover:border-white/40';
  const borderActiveClass = isArc2 ? 'border-black bg-black text-white' : 'border-white bg-white text-black';
  const grayText = isArc2 ? 'text-gray-600' : 'text-gray-500';

  // For category pages, we want to show all three product types
  const productTypes = ['Tops', 'Bottoms', 'Accessories'];

  const categorySection = `
            {/* Category/Product Type */}
            <div className="mb-6">
              <p className="text-xs tracking-wider uppercase ${grayText} mb-3">Product Type</p>
              <div className="flex flex-wrap gap-2">
                {['Tops', 'Bottoms', 'Accessories'].map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => {
                      // Navigate to that category page
                      const arcSlug = '${arc}'
                      window.location.href = \`/\${arcSlug}/\${cat.toLowerCase()}\`
                    }}
                    className={\`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-premium border-2 transition-all \${
                      cat === '${category}'
                        ? '${borderActiveClass}'
                        : '${borderClass}'
                    }\`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
`;

  // Find the Apply Filters button and add category section before it
  const applyButtonRegex = /(\s+)<motion\.button\s+onClick=\{\(\) => setFilterMenuOpen\(false\)\}\s+className="w-full mt-6 py-4/;

  if (applyButtonRegex.test(content)) {
    content = content.replace(
      applyButtonRegex,
      `${categorySection}$1<motion.button
              onClick={() => setFilterMenuOpen(false)}
              className="w-full mt-6 py-4`
    );
    console.log(`✅ Added Product Type filter to ${filePath}`);
  } else {
    console.log(`⚠️  Could not find Apply Filters button in ${filePath}`);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('\n✨ Product Type filter added to all category pages!');
