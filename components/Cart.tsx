'use client'

import * as React from 'react'

import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type CartProps = {
  phoneNumber?: string
  triggerLabel?: string
  triggerClassName?: string
}

function formatInr(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function Cart({
  phoneNumber = '+918744026821',
  triggerLabel = 'Cart',
  triggerClassName,
}: CartProps) {
  const { cartItems, updateQuantity, cartTotal } = useCart()
  const itemCount = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )
  const isEmpty = cartItems.length === 0

  const handleCheckout = React.useCallback(() => {
    if (isEmpty) return

    const orderItems = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} (${formatInr(
            item.price * item.quantity,
          )})`,
      )
      .join(', ')

    const normalizedPhone = phoneNumber.replace(/\D/g, '')
    if (!normalizedPhone) return

    const message = `Hello, I would like to order: ${orderItems} - Total: ${formatInr(cartTotal)}`
    const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`

    window.location.href = url
  }, [cartItems, cartTotal, isEmpty, phoneNumber])

  const triggerText = itemCount > 0 ? `${triggerLabel} (${itemCount})` : triggerLabel

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className={cn('btn-cta', triggerClassName)}>{triggerText}</button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="cart-sheet w-full sm:w-3/4 sm:max-w-sm border-0 gap-0 overflow-hidden"
        style={{ background: 'var(--bg)', borderLeft: 'var(--border)' }}
      >
        <SheetHeader
          className="cart-sheet-header sticky top-0 z-10 border-b bg-[var(--bg)] p-4"
          style={{ borderBottom: 'var(--border)' }}
        >
          <SheetTitle
            className="cart-sheet-title uppercase text-base sm:text-lg"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Your Cart
          </SheetTitle>
          <SheetDescription className="cart-sheet-description text-sm text-[#666]">
            Review your shakes and send the order to WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="cart-sheet-body flex-1 min-h-0 overflow-y-auto px-4 pb-6">
          {isEmpty ? (
            <div
              className="!mt-6 rounded-none bg-white !p-4 text-sm"
              style={{ border: 'var(--border)' }}
            >
              Your cart is empty. Add a shake to get started.
            </div>
          ) : (
            <div className="!mt-6 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white !p-4"
                  style={{ border: 'var(--border)' }}
                >
                  <div className="cart-item-row">
                    <div className="min-w-0">
                      <div
                        className="text-sm uppercase"
                        style={{ fontWeight: 800 }}
                      >
                        {item.name}
                      </div>
                      <div className="text-xs text-[#666]">
                        {formatInr(item.price)} each
                      </div>
                    </div>
                    <div
                      className="cart-item-price shrink-0 text-base font-mono tabular-nums"
                      style={{
                        fontWeight: 700,
                        color: 'var(--secondary)',
                      }}
                    >
                      {formatInr(item.price * item.quantity)}
                    </div>
                  </div>

                  <div className="cart-item-controls !mt-4 flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      className="btn-cta rounded-none text-black !px-3 !py-2 text-xs"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </Button>
                    <span className="min-w-[32px] text-center text-base font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      className="btn-cta rounded-none text-black !px-3 !py-2 text-xs"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter
          className="cart-sheet-footer mt-auto border-t bg-[var(--bg)] p-4"
          style={{ borderTop: 'var(--border)' }}
        >
          <div className="cart-total-row flex items-center justify-between text-sm font-bold uppercase">
            <span>Total</span>
            <span className="cart-total-value font-mono tabular-nums">
              {formatInr(cartTotal)}
            </span>
          </div>
          <Button
            type="button"
            className="btn-cta cart-checkout-btn h-auto w-full rounded-none text-black !px-4 !py-3 text-sm whitespace-normal text-center leading-tight"
            onClick={handleCheckout}
            disabled={isEmpty}
          >
            Checkout via WhatsApp
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
