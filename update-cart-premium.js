const fs = require('fs');

const cartPath = './src/app/cart/page.tsx';
let content = fs.readFileSync(cartPath, 'utf8');

// Add import
content = content.replace(
  "import { useCart } from '@/lib/cartContext'",
  "import { useCart } from '@/lib/cartContext'\nimport { DiscountSuggestion } from '@/components/DiscountNotification'\nimport { useState } from 'react'"
);

// Add state for suggested discount
content = content.replace(
  "const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()",
  `const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [appliedSuggestion, setAppliedSuggestion] = useState(false)

  // Check if eligible for WELCOME15
  const showWelcomeDiscount = items.length > 0 && totalPrice > 100 && !appliedSuggestion`
);

// Add discount suggestion before the summary section
const discountSection = `
          {/* Suggested Discount */}
          {showWelcomeDiscount && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <DiscountSuggestion
                code="WELCOME15"
                message="Get 15% off your first order!"
                onApply={() => {
                  setAppliedSuggestion(true)
                  // This will actually apply in checkout
                  setTimeout(() => router.push('/checkout'), 500)
                }}
                applied={appliedSuggestion}
              />
            </motion.div>
          )}
`;

content = content.replace(
  '{/* Cart Summary */}',
  discountSection + '\n          {/* Cart Summary */}'
);

// Update buttons to liquid style
content = content.replace(/rounded-full/g, 'rounded-3xl');
content = content.replace(/rounded-\[12px\]/g, 'rounded-premium');
content = content.replace(/border-2 border-black/g, 'border border-black/10 rounded-premium');

// Make checkout button liquid
content = content.replace(
  /className="w-full px-8 py-4 bg-black text-white hover:bg-gray-800/,
  'className="w-full px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid shadow-xl hover:shadow-2xl'
);

// Round product cards
content = content.replace(
  /className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pb-6 border-b border-gray-200"/g,
  'className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pb-6 mb-6 p-6 rounded-premium-lg border border-black/5 hover:border-black/10 transition-all hover:shadow-lg"'
);

fs.writeFileSync(cartPath, content, 'utf8');
console.log('✓ Updated cart page with discount suggestions and liquid UI');
