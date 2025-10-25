const fs = require('fs');

const files = [
  'src/components/GeniusCard.tsx',
  'src/components/GeniusHero.tsx',
  'src/components/TypingText.tsx',
  'src/components/magicui/shimmer-button.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping ${file} (not found)`);
    return;
  }

  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf-8');

  // Remove import (with various quote styles)
  content = content.replace(/import { useSound } from ['"]@\/lib\/soundManager['"]\n?/g, '');
  content = content.replace(/import { useSound } from ['"]@\/lib\/soundManager['"];?\n?/g, '');

  // Remove const destructuring - be more aggressive
  content = content.replace(/const {\s*[\s\S]*?\s*} = useSound\(\)\n*/g, '');
  content = content.replace(/const { [^}]+ } = useSound\(\);?\n*/g, '');

  // Remove all standalone calls
  const soundCalls = [
    'playClick',
    'playEnter',
    'playLeave',
    'playHover',
    'playMystical',
    'playTypingSound',
    'playShimmerButtonHover',
    'playShimmerButtonClick'
  ];

  soundCalls.forEach(call => {
    // Remove standalone calls
    const regex1 = new RegExp(`\\s*${call}\\(\\)`, 'g');
    content = content.replace(regex1, '');

    // Remove calls with semicolons
    const regex2 = new RegExp(`\\s*${call}\\(\\);?`, 'g');
    content = content.replace(regex2, '');
  });

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`✓ Cleaned ${file}`);
});

console.log('\n✅ All sound references removed');
