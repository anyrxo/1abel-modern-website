'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  arc: string
  category: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('1abel-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('1abel-cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      )

      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex].quantity += 1
        return updated
      }

      return [...prevItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string, size: string) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
