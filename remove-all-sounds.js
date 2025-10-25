const fs = require('fs');

console.log('🔇 REMOVING ALL SOUND SYSTEMS FROM 1ABEL SITE\n');

// 1. Remove GlobalSoundSystem from layout.tsx
console.log('1. Removing GlobalSoundSystem from layout.tsx...');
let layout = fs.readFileSync('src/app/layout.tsx', 'utf-8');
layout = layout.replace(/import { GlobalSoundSystem } from '@\/components\/GlobalSoundSystem'\n/g, '');
layout = layout.replace(/<GlobalSoundSystem \/>/g, '');
fs.writeFileSync('src/app/layout.tsx', layout, 'utf-8');
console.log('   ✓ Removed from layout.tsx\n');

// 2. Delete all sound-related component files
const soundFiles = [
  'src/components/SoundControl.tsx',
  'src/components/GlobalSoundSystem.tsx',
  'src/components/GlobalSoundHooks.tsx',
  'src/lib/soundManager.ts'
];

console.log('2. Deleting sound component files...');
soundFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`   ✓ Deleted ${file}`);
  }
});
console.log('');

console.log('✅ ALL SOUNDS REMOVED FROM SITE');
console.log('   - No more ambient sounds');
console.log('   - No more clicking sounds');
console.log('   - No more UI sounds');
console.log('   - No more atmosphere');
console.log('   - Clean, silent browsing experience');
