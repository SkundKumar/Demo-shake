'use client'

import Link from 'next/link'

import { Cart } from '@/components/Cart'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
  { label: 'Menu', href: '/menu' },
]

export function SiteHeader() {
  return (
    <header className="header">
      <Link href="/" className="logo">
        VIBE
      </Link>
      <nav>
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Sheet>
      
          <SheetContent
            side="left"
            className="border-0"
            style={{ background: 'var(--bg)', borderRight: 'var(--border)' }}
          >
            <SheetHeader
              className="border-b"
              style={{ borderBottom: 'var(--border)' }}
            >
              <SheetTitle
                className="uppercase"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Navigate
              </SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6 pt-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm uppercase"
                  style={{ fontWeight: 800, color: 'var(--dark)' }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Cart triggerClassName="rounded-none" />
      </div>
    </header>
  )
}
