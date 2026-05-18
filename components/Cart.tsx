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
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)

  return `INR ${formatted}`
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
        className="border-0"
        style={{ background: 'var(--bg)', borderLeft: 'var(--border)' }}
      >
        <SheetHeader
          className="border-b"
          style={{ borderBottom: 'var(--border)' }}
        >
          <SheetTitle
            className="uppercase"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-[#666]">
            Review your shakes and send the order to WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        color: 'var(--secondary)',
                      }}
                    >
                      {formatInr(item.price * item.quantity)}
                    </div>
                  </div>

                  <div className="!mt-4 flex items-center gap-2">
                    <Button
                      type="button"
                      className="btn-cta rounded-none text-black"
                      style={{ padding: '4px 12px', fontSize: '12px' }}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </Button>
                    <span className="min-w-[32px] text-center font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      className="btn-cta rounded-none text-black"
                      style={{ padding: '4px 12px', fontSize: '12px' }}
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
          className="border-t"
          style={{ borderTop: 'var(--border)' }}
        >
          <div className="flex items-center !p-2 md:!p-4 justify-between text-sm font-bold uppercase">
            <span>Total</span>
            <span>{formatInr(cartTotal)}</span>
          </div>
          <Button
            type="button"
            className="btn-cta text-black rounded-none w-full"
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
