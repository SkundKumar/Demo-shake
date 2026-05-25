'use client'

import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

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
          <SheetTrigger asChild>
            <button
              className="btn-cta rounded-none md:hidden"
              aria-label="Open navigation menu"
            >
              <span className="flex items-center gap-2">
                <MenuIcon className="size-4" />
                Menu
              </span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="border-0 w-full sm:w-3/4 sm:max-w-sm"
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
