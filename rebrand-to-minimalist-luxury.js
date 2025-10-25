const fs = require('fs');

console.log('✨ Rebranding to premium minimalist lifestyle...\n');

const replacements = [
  // Remove "streetwear" completely
  {
    from: /streetwear/gi,
    to: 'minimalist essentials',
    files: ['./src/app/layout.tsx', './src/app/page.tsx', './src/app/about/page.tsx']
  },
  // Update brand descriptions
  {
    from: /Premium Streetwear & Fashion/g,
    to: 'Premium Minimalist Essentials',
    files: ['./src/app/layout.tsx']
  },
  {
    from: /1ABEL is a premium streetwear brand offering minimalist black and white designs/g,
    to: '1ABEL creates intentional essentials for those who value quality, clarity, and purpose in what they wear',
    files: ['./src/app/layout.tsx']
  },
  {
    from: /Premium streetwear brand offering minimalist black and white designs/g,
    to: 'Premium minimalist essentials designed for intention and ease',
    files: ['./src/app/layout.tsx']
  }
];

replacements.forEach(({from, to, files}) => {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      const before = content;
      content = content.replace(from, to);
      if (content !== before) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✓ Updated ${file}`);
      }
    }
  });
});

// Fix empty cart message
console.log('\nFixing empty cart messaging...');
const cartPath = './src/app/cart/page.tsx';
if (fs.existsSync(cartPath)) {
  let cartContent = fs.readFileSync(cartPath, 'utf8');

  // Find and replace empty cart message
  cartContent = cartContent.replace(
    /Your cart is empty/g,
    'Nothing here yet'
  );

  cartContent = cartContent.replace(
    /Start shopping to add items to your cart\./g,
    'Begin with intention.'
  );

  fs.writeFileSync(cartPath, cartContent, 'utf8');
  console.log('✓ Updated cart empty state');
}

console.log('\n✅ Rebrand complete!');
console.log('\nNew brand positioning:');
console.log('  • Premium minimalist essentials');
console.log('  • Intentional design for purpose-driven living');
console.log('  • Quality, clarity, ease');
console.log('  • Not yoga-specific, not streetwear');
console.log('  • Like Alo\'s quality but for everyday life');
console.log('\nNo cringe. Just thoughtful.');
