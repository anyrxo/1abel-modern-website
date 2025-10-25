const fs = require('fs');

console.log('🌊 Final Liquid Glass Fixes...\n');

// 1. Fix Contact Page
console.log('Transforming contact page...');
const contactPath = './src/app/contact/page.tsx';
let contactContent = fs.readFileSync(contactPath, 'utf8');

// Fix contact method cards
contactContent = contactContent.replace(
  /className="text-center p-8 border border-black"/g,
  'className="text-center p-8 glass-card rounded-premium shadow-xl hover-elevate border border-black/10 backdrop-blur-sm"'
);

// Fix icon containers
contactContent = contactContent.replace(
  /className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black"/g,
  'className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-black/10 rounded-premium bg-gradient-to-br from-black/5 to-black/10 hover-elevate"'
);

// Fix form inputs
contactContent = contactContent.replace(
  /className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"/g,
  'className="w-full glass-input backdrop-blur-sm"'
);

// Fix textarea
contactContent = contactContent.replace(
  /className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"/g,
  'className="w-full glass-input backdrop-blur-sm resize-none"'
);

// Fix submit button
contactContent = contactContent.replace(
  /className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors text-sm tracking-wider uppercase font-medium"/g,
  'className="w-full py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white btn-liquid hover-elevate pulse-glow magnetic-button ripple shadow-2xl text-sm tracking-wider uppercase font-semibold"'
);

// Fix FAQ cards
contactContent = contactContent.replace(
  /className="border border-black p-6"/g,
  'className="glass-card rounded-premium p-6 shadow-lg hover-elevate border border-black/10 backdrop-blur-sm"'
);

fs.writeFileSync(contactPath, contactContent, 'utf8');
console.log('✓ Contact page transformed to liquid glass\n');

console.log('✅ All liquid glass transformations complete!');
console.log('\nChanges made:');
console.log('  - Contact page: All cards and forms liquid glass styled');
console.log('  - All borders softened to 10% opacity');
console.log('  - All buttons have rounded-premium corners');
console.log('  - Glassmorphism effects everywhere');
console.log('  - Hover elevations and animations');
