'use client'

import * as React from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartItemInput = {
  id: string
  name: string
  price: number
}

type CartContextValue = {
  cartItems: CartItem[]
  addToCart: (item: CartItemInput, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  cartTotal: number
}

const STORAGE_KEY = 'shake_cart'

const CartContext = React.createContext<CartContextValue | null>(null)

export function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider.')
  }

  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setIsHydrated(true)
        return
      }

      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setCartItems(
          parsed.filter(
            (item): item is CartItem =>
              typeof item === 'object' &&
              item !== null &&
              'id' in item &&
              'name' in item &&
              'price' in item &&
              'quantity' in item,
          ),
        )
      }
    } catch {
      // Ignore storage errors and start with an empty cart.
    } finally {
      setIsHydrated(true)
    }
  }, [])

  React.useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // Ignore storage errors.
    }
  }, [cartItems, isHydrated])

  const addToCart = React.useCallback(
    (item: CartItemInput, quantity = 1) => {
      setCartItems((items) => {
        const existing = items.find((entry) => entry.id === item.id)
        if (!existing) {
          return [...items, { ...item, quantity }]
        }

        return items.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        )
      })
    },
    [],
  )

  const removeFromCart = React.useCallback((id: string) => {
    setCartItems((items) => items.filter((entry) => entry.id !== id))
  }, [])

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    setCartItems((items) => {
      if (quantity <= 0) {
        return items.filter((entry) => entry.id !== id)
      }

      return items.map((entry) =>
        entry.id === id ? { ...entry, quantity } : entry,
      )
    })
  }, [])

  const cartTotal = React.useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }, [cartItems])

  const value = React.useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal }),
    [cartItems, addToCart, removeFromCart, updateQuantity, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export type { CartItem, CartItemInput }
