'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { useCart } from '@/lib/cartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Tag, Sparkles, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import { DiscountNotification } from '@/components/DiscountNotification'

// This will be integrated with pricingContext later
const TEMP_DISCOUNT_RULES = [
  {
    code: 'BOGO_ACCESS',
    type: 'bogo',
    value: 50,
    message: 'Buy one accessory, get 50% off another!',
    autoApply: true,
    conditions: (items: any[]) => items.filter(item => item.category === 'ACCESSORIES').length >= 2
  },
  {
    code: 'SHADOW_LIGHT',
    type: 'percentage',
    value: 10,
    message: 'Mixing arcs? Here\'s 10% off your order!',
    autoApply: true,
    conditions: (items: any[]) => {
      const hasArc2 = items.some(item => item.arc.includes('Arc 2'))
      const hasArc3 = items.some(item => item.arc.includes('Arc 3'))
      return hasArc2 && hasArc3
    }
  },
  {
    code: 'COMPLETE_ARC',
    type: 'fixed',
    value: 25,
    message: 'Complete your Arc! $25 off for 3+ pieces',
    autoApply: true,
    conditions: (items: any[]) => {
      const arc2Count = items.filter(item => item.arc.includes('Arc 2')).length
      const arc3Count = items.filter(item => item.arc.includes('Arc 3')).length
      return arc2Count >= 3 || arc3Count >= 3
    }
  },
  {
    code: 'COLOR_SET',
    type: 'percentage',
    value: 12,
    message: 'Building a monochrome wardrobe? 12% off!',
    autoApply: true,
    conditions: (items: any[]) => {
      if (items.length < 3) return false
      const colorCounts: Record<string, number> = {}
      items.forEach(item => {
        const color = item.name.split(' — ')[1]
        if (color) colorCounts[color] = (colorCounts[color] || 0) + 1
      })
      return Object.values(colorCounts).some(count => count >= 3)
    }
  },
  {
    code: 'BIG_SPENDER',
    type: 'percentage',
    value: 15,
    minCartValue: 400,
    message: 'Premium customer perk: 15% off $400+',
    autoApply: true
  },
  {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    message: 'Welcome gift: 15% off your first order!',
    autoApply: false
  }
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [appliedCodes, setAppliedCodes] = useState<string[]>([])
  const [codeError, setCodeError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [discountNotification, setDiscountNotification] = useState<any>(null)
  const [checkedDiscounts, setCheckedDiscounts] = useState<Set<string>>(new Set())

  // Calculate applicable auto-discounts
  const autoDiscounts = TEMP_DISCOUNT_RULES.filter(rule => {
    if (!rule.autoApply) return false
    if (rule.conditions && !rule.conditions(items)) return false
    if (rule.minCartValue && totalPrice < rule.minCartValue) return false
    return true
  })

  // Calculate total discount
  const calculateDiscount = () => {
    let totalDiscount = 0
    const allDiscounts = [...autoDiscounts, ...TEMP_DISCOUNT_RULES.filter(r => appliedCodes.includes(r.code))]

    allDiscounts.forEach(discount => {
      if (discount.type === 'percentage') {
        totalDiscount += (totalPrice * discount.value) / 100
      } else if (discount.type === 'fixed') {
        totalDiscount += discount.value
      } else if (discount.type === 'bogo') {
        // BOGO logic - 50% off second accessory
        const accessories = items.filter(item => item.category === 'ACCESSORIES')
        if (accessories.length >= 2) {
          const prices = accessories.map(a => a.price * a.quantity).sort((a, b) => b - a)
          totalDiscount += (prices[1] * discount.value) / 100
        }
      }
    })

    return Math.min(totalDiscount, totalPrice) // Can't discount more than total
  }

  const discount = calculateDiscount()
  const finalTotal = totalPrice - discount
  const savedPercentage = totalPrice > 0 ? ((discount / totalPrice) * 100).toFixed(0) : 0

  const applyCode = () => {
    const rule = TEMP_DISCOUNT_RULES.find(r => r.code.toLowerCase() === discountCode.toLowerCase())

    if (!rule) {
      setCodeError('Invalid code')
      setTimeout(() => setCodeError(''), 3000)
      return
    }

    if (appliedCodes.includes(rule.code)) {
      setCodeError('Code already applied')
      setTimeout(() => setCodeError(''), 3000)
      return
    }

    setAppliedCodes([...appliedCodes, rule.code])
    setDiscountCode('')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const removeCode = (code: string) => {
    setAppliedCodes(appliedCodes.filter(c => c !== code))
  }

  
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


  if (items.length === 0) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Header />
        <div className="pt-32 pb-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/arc-2" className="text-sm underline">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Header />

      <div className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 uppercase tracking-tight">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Order Summary */}
            <div className="md:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-black/10 pb-6">
                  <div className="w-24 h-32 bg-gray-100 border border-black/5 rounded-premium" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 uppercase">{item.arc} — {item.category}</p>
                    <p className="text-xs text-gray-500 mt-2">Size: {item.size}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Payment Summary with Genius Discount Display */}
            <div className="md:col-span-1">
              <div className="border border-black/5 rounded-premium p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-6 uppercase tracking-wide">Summary</h2>

                {/* Subtotal */}
                <div className="flex justify-between mb-4">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Auto-Applied Discounts - THE GENIUS PART */}
                {autoDiscounts.length > 0 && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-green-800 uppercase tracking-wide">
                        Smart Savings Unlocked!
                      </span>
                    </div>
                    {autoDiscounts.map((discount, idx) => (
                      <div key={idx} className="text-xs text-green-700 mb-1 flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{discount.message}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Manual Discount Code */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wide mb-2 block">Discount Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && applyCode()}
                      placeholder="Enter code"
                      className="flex-1 glass-input backdrop-blur-sm text-sm uppercase"
                    />
                    <button
                      onClick={applyCode}
                      className="px-4 py-2 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid text-xs uppercase tracking-wide hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>

                  {codeError && (
                    <p className="text-xs text-red-600 mt-2">{codeError}</p>
                  )}

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-xs text-green-600 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Code applied successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Applied Manual Codes */}
                  {appliedCodes.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {appliedCodes.map(code => {
                        const rule = TEMP_DISCOUNT_RULES.find(r => r.code === code)
                        return (
                          <div key={code} className="flex items-center justify-between text-xs bg-gray-50 p-2">
                            <span className="flex items-center gap-2">
                              <Tag className="w-3 h-3" />
                              {code}
                            </span>
                            <button
                              onClick={() => removeCode(code)}
                              className="text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Total Discount - PSYCHOLOGICAL WIN */}
                {discount > 0 && (
                  <div className="mb-4 pb-4 border-b border-black/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm flex items-center gap-2 text-green-600">
                        <TrendingDown className="w-4 h-4" />
                        Total Savings
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[10px] text-green-600 mt-1 text-right">
                      You're saving {savedPercentage}%!
                    </p>
                  </div>
                )}

                {/* Final Total */}
                <div className="flex justify-between mb-6 pt-4 border-t border-black/20">
                  <span className="font-bold uppercase">Total</span>
                  <span className="font-bold text-xl">${finalTotal.toFixed(2)}</span>
                </div>

                {/* VIP Treatment Message */}
                {discount > 0 && (
                  <div className="mb-6 p-3 bg-black text-white text-center">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                      Premium Customer Detected
                    </p>
                    <p className="text-[10px]">
                      You've unlocked exclusive savings. This is what smart shopping looks like.
                    </p>
                  </div>
                )}

                <button className="w-full py-4 bg-gradient-to-r from-black to-gray-800 text-white btn-liquid shadow-xl text-sm uppercase tracking-wide font-bold hover:bg-gray-800 transition-colors mb-3">
                  Complete Purchase
                </button>

                <p className="text-[10px] text-gray-500 text-center">
                  Secure checkout · Free shipping on orders over $200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
