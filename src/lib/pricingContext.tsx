'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Currency rates (update these periodically)
const CURRENCY_RATES = {
  USD: 1,
  AUD: 1.52,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.36,
  JPY: 149.50
}

const CURRENCY_SYMBOLS = {
  USD: '$',
  AUD: 'A$',
  GBP: '£',
  EUR: '€',
  CAD: 'C$',
  JPY: '¥'
}

type Currency = keyof typeof CURRENCY_RATES

interface DiscountRule {
  code: string
  type: 'percentage' | 'fixed' | 'bogo' | 'bundle'
  value: number
  minCartValue?: number
  productIds?: string[]
  message: string
  autoApply?: boolean
  conditions?: (cartItems: any[]) => boolean
}

// GENIUS DISCOUNT RULES - Psychology-based
const DISCOUNT_RULES: DiscountRule[] = [
  // BOGO on accessories (feels like a steal)
  {
    code: 'BOGO_ACCESS',
    type: 'bogo',
    value: 50, // 50% off second item
    message: 'Buy one accessory, get 50% off another!',
    autoApply: true,
    conditions: (items) => items.filter(item => item.category === 'ACCESSORIES').length >= 2
  },
  // Arc pairing bonus (encourages cross-arc buying)
  {
    code: 'SHADOW_LIGHT',
    type: 'percentage',
    value: 10,
    message: 'Mixing arcs? Here\'s 10% off your order!',
    autoApply: true,
    conditions: (items) => {
      const hasArc2 = items.some(item => item.arc.includes('Arc 2'))
      const hasArc3 = items.some(item => item.arc.includes('Arc 3'))
      return hasArc2 && hasArc3
    }
  },
  // Complete the arc (3+ items from same arc)
  {
    code: 'COMPLETE_ARC',
    type: 'fixed',
    value: 25,
    message: 'Complete your Arc! $25 off for 3+ pieces',
    autoApply: true,
    conditions: (items) => {
      const arc2Count = items.filter(item => item.arc.includes('Arc 2')).length
      const arc3Count = items.filter(item => item.arc.includes('Arc 3')).length
      return arc2Count >= 3 || arc3Count >= 3
    }
  },
  // Color collector (3+ of same color)
  {
    code: 'COLOR_SET',
    type: 'percentage',
    value: 12,
    message: 'Building a monochrome wardrobe? 12% off!',
    autoApply: true,
    conditions: (items) => {
      if (items.length < 3) return false
      const colorCounts: Record<string, number> = {}
      items.forEach(item => {
        const color = item.name.split(' — ')[1]
        if (color) colorCounts[color] = (colorCounts[color] || 0) + 1
      })
      return Object.values(colorCounts).some(count => count >= 3)
    }
  },
  // High cart value reward (psychological - they already committed)
  {
    code: 'BIG_SPENDER',
    type: 'percentage',
    value: 15,
    minCartValue: 400,
    message: 'Premium customer perk: 15% off $400+',
    autoApply: true
  },
  // New customer welcome (random chance - creates FOMO)
  {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    message: 'Welcome gift: 15% off your first order!',
    autoApply: false // They have to enter it
  },
  // Seasonal stealth discount (applies sometimes - creates mystery)
  {
    code: 'SEASONAL',
    type: 'fixed',
    value: 20,
    message: 'Limited time: $20 off',
    autoApply: true,
    conditions: (items) => items.length >= 2 && Math.random() > 0.7 // 30% chance
  }
]

interface PricingContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (usdPrice: number) => number
  formatPrice: (usdPrice: number) => string
  getAppliedDiscounts: (cartItems: any[], cartTotal: number) => DiscountRule[]
  applyDiscount: (code: string) => boolean
  manualDiscounts: string[]
  removeDiscount: (code: string) => void
}

const PricingContext = createContext<PricingContextType | undefined>(undefined)

export function PricingProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [manualDiscounts, setManualDiscounts] = useState<string[]>([])

  // Load saved currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('1abel-currency')
    if (saved && saved in CURRENCY_RATES) {
      setCurrency(saved as Currency)
    }
  }, [])

  // Save currency to localStorage
  useEffect(() => {
    localStorage.setItem('1abel-currency', currency)
  }, [currency])

  const convertPrice = (usdPrice: number): number => {
    return usdPrice * CURRENCY_RATES[currency]
  }

  const formatPrice = (usdPrice: number): string => {
    const converted = convertPrice(usdPrice)
    const symbol = CURRENCY_SYMBOLS[currency]

    // Psychological pricing - end in .00, .95, or .99
    const rounded = Math.round(converted)
    let finalPrice = rounded

    // If over $50, end in .95 or .99
    if (rounded >= 50) {
      const lastDigit = rounded % 10
      if (lastDigit !== 0 && lastDigit !== 5 && lastDigit !== 9) {
        finalPrice = Math.floor(rounded / 10) * 10 + (lastDigit < 5 ? 5 : 9)
      }
    }

    return `${symbol}${finalPrice.toFixed(currency === 'JPY' ? 0 : 2)}`
  }

  const getAppliedDiscounts = (cartItems: any[], cartTotal: number): DiscountRule[] => {
    if (!cartItems.length) return []

    const applicable: DiscountRule[] = []

    // Check all auto-apply rules
    DISCOUNT_RULES.forEach(rule => {
      if (!rule.autoApply) return

      // Check conditions
      if (rule.conditions && !rule.conditions(cartItems)) return
      if (rule.minCartValue && cartTotal < rule.minCartValue) return
      if (rule.productIds) {
        const hasProduct = cartItems.some(item =>
          rule.productIds!.includes(item.id)
        )
        if (!hasProduct) return
      }

      applicable.push(rule)
    })

    // Add manual discounts
    manualDiscounts.forEach(code => {
      const rule = DISCOUNT_RULES.find(r => r.code === code)
      if (rule) applicable.push(rule)
    })

    // Return highest value discount (but show all in UI for psychological effect)
    return applicable
  }

  const applyDiscount = (code: string): boolean => {
    const rule = DISCOUNT_RULES.find(r => r.code.toLowerCase() === code.toLowerCase())
    if (!rule) return false

    if (!manualDiscounts.includes(rule.code)) {
      setManualDiscounts([...manualDiscounts, rule.code])
    }
    return true
  }

  const removeDiscount = (code: string) => {
    setManualDiscounts(manualDiscounts.filter(c => c !== code))
  }

  return (
    <PricingContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        getAppliedDiscounts,
        applyDiscount,
        manualDiscounts,
        removeDiscount
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}

export function usePricing() {
  const context = useContext(PricingContext)
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider')
  }
  return context
}
