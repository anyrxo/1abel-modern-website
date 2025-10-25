const fs = require('fs');

// Fix homepage Arc 3 description
const homepagePath = 'src/app/page.tsx';
let homepage = fs.readFileSync(homepagePath, 'utf-8');

homepage = homepage.replace(
  /SAND\. MIST\. CLAY\. SAGE\. IVORY\./g,
  'CLOUD. SAKURA. MIST. SAND. LILAC.'
);

fs.writeFileSync(homepagePath, homepage, 'utf-8');
console.log('✅ Fixed homepage Arc 3 colors');

// Fix all filter pages with wrong Arc 3 colors
const arc3Pages = [
  'src/app/arc-3/tops/page.tsx',
  'src/app/arc-3/bottoms/page.tsx',
  'src/app/arc-3/accessories/page.tsx',
  'src/app/arc-3/shop-all/page.tsx',
];

arc3Pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace the wrong color array with correct one
  const wrongColors = /\['SAND', 'MIST', 'CLAY', 'SAGE', 'IVORY'\]/g;
  const correctColors = "['CLOUD', 'SAKURA', 'MIST', 'SAND', 'LILAC']";

  content = content.replace(wrongColors, correctColors);

  // Replace individual button keys if they exist
  content = content.replace(/key="CLAY"/g, 'key="LILAC"');
  content = content.replace(/key="SAGE"/g, 'key="SAKURA"');
  content = content.replace(/key="IVORY"/g, 'key="CLOUD"');

  // Fix the button text content
  content = content.replace(/>CLAY</g, '>LILAC<');
  content = content.replace(/>SAGE</g, '>SAKURA<');
  content = content.replace(/>IVORY</g, '>CLOUD<');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Fixed ${filePath}`);
});

// Fix layout.tsx SEO keywords
const layoutPath = 'src/app/layout.tsx';
let layout = fs.readFileSync(layoutPath, 'utf-8');

// Update keywords to include correct Arc 3 colors
layout = layout.replace(
  /Arc 2 Shadow, Arc 3 Light,/g,
  'Arc 2 Shadow (VOID STEEL BLOOD MOSS EARTH), Arc 3 Light (CLOUD SAKURA MIST SAND LILAC),'
);

fs.writeFileSync(layoutPath, layout, 'utf-8');
console.log('✅ Fixed layout.tsx SEO keywords');

console.log('\n✨ All Arc 3 colors fixed!');
console.log('Correct Arc 3 colors: CLOUD, SAKURA, MIST, SAND, LILAC');
