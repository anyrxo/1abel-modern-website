const fs = require('fs');

const checkoutPath = './src/app/checkout/page.tsx';
let content = fs.readFileSync(checkoutPath, 'utf8');

// Add imports
content = content.replace(
  "import { useState } from 'react'",
  "import { useState, useEffect } from 'react'"
);

content = content.replace(
  "import Link from 'next/link'",
  "import Link from 'next/link'\nimport { DiscountNotification } from '@/components/DiscountNotification'"
);

// Add notification state after other useState declarations
content = content.replace(
  "const [showSuccess, setShowSuccess] = useState(false)",
  `const [showSuccess, setShowSuccess] = useState(false)
  const [discountNotification, setDiscountNotification] = useState<any>(null)
  const [checkedDiscounts, setCheckedDiscounts] = useState<Set<string>>(new Set())`
);

// Add useEffect to trigger notifications when auto-discounts apply
const useEffectCode = `
  // Auto-detect and show discount notifications
  useEffect(() => {
    autoDiscounts.forEach(discount => {
      if (!checkedDiscounts.has(discount.code)) {
        const savingsAmount = discount.type === 'percentage'
          ? (totalPrice * discount.value) / 100
          : discount.value

        setDiscountNotification({
          code: discount.code,
          message: discount.message,
          value: discount.value,
          type: discount.type,
          savingsAmount
        })

        setCheckedDiscounts(prev => new Set([...prev, discount.code]))

        // Only show one at a time
        return
      }
    })
  }, [autoDiscounts.length, totalPrice])
`;

content = content.replace(
  "if (items.length === 0) {",
  useEffectCode + "\n\n  if (items.length === 0) {"
);

// Update all border and rounded classes to be more rounded
content = content.replace(/border border-black\/10/g, 'border border-black/5 rounded-premium');
content = content.replace(/rounded-full/g, 'rounded-3xl');
content = content.replace(/rounded-2xl/g, 'rounded-premium-lg');
content = content.replace(/py-4 bg-black text-white/g, 'py-4 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid shadow-xl');
content = content.replace(/py-2 bg-black text-white/g, 'py-2 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid');

// Add notification component before closing div
content = content.replace(
  "</div>\n    </div>\n  )\n}",
  `</div>

      {/* Discount Notification Popup */}
      <DiscountNotification
        show={!!discountNotification}
        discount={discountNotification || {}}
        onClose={() => setDiscountNotification(null)}
      />
    </div>
  )
}`
);

fs.writeFileSync(checkoutPath, content, 'utf8');
console.log('✓ Updated checkout page with premium UI and notifications');
