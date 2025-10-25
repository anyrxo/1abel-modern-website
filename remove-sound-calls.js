const fs = require('fs');

console.log('🔇 REMOVING ALL SOUND FUNCTION CALLS\n');

const files = [
  'src/components/Header.tsx',
  'src/components/magicui/shimmer-button.tsx'
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filePath} (not found)`);
    return;
  }

  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove all playClick(), playLogo(), playHover(), etc. calls
  // Keep the onClick/onMouseEnter handlers but remove sound calls
  content = content.replace(/playClick\(\);\s*/g, '');
  content = content.replace(/playLogo\(\);\s*/g, '');
  content = content.replace(/playHover\(\);\s*/g, '');
  content = content.replace(/playShimmerButtonHover\(\);\s*/g, '');
  content = content.replace(/playShimmerButtonClick\(\);\s*/g, '');

  // Clean up empty onClick={() => { }} patterns
  content = content.replace(/onClick=\{\(\) => \{\s*\}\}/g, 'onClick={() => {}}');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`   ✓ Removed sound calls from ${filePath}`);
});

console.log('\n✅ All sound function calls removed');
