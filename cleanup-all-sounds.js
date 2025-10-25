const fs = require('fs');

const files = [
  'src/components/GeniusCard.tsx',
  'src/components/GeniusHero.tsx',
  'src/components/TypingText.tsx'
];

files.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf-8');

  // Remove import
  content = content.replace(/import { useSound } from '@\/lib\/soundManager'\n/g, '');

  // Remove const destructuring (handles both single and multi-line)
  content = content.replace(/const \{[^}]+\} = useSound\(\)\n*/g, '');

  // Remove all play function calls
  content = content.replace(/\s*playClick\(\)/g, '');
  content = content.replace(/\s*playEnter\(\)/g, '');
  content = content.replace(/\s*playLeave\(\)/g, '');
  content = content.replace(/\s*playHover\(\)/g, '');
  content = content.replace(/\s*playMystical\(\)/g, '');
  content = content.replace(/\s*playTypingSound\(\)/g, '');

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`✓ Cleaned ${file}`);
});

console.log('\n✅ All sound references removed from components');
