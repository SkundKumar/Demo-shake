'use client'

import * as React from 'react'

import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import menuData from '@/data/menu.json'
import { useCart } from '@/context/CartContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

type MenuCategory = {
  id: string
  name: string
  items: MenuItem[]
}

type MenuData = {
  categories: MenuCategory[]
}

type MenuVariant = 'featured' | 'full'

type MenuProps = {
  variant?: MenuVariant
  featuredCount?: number
}

const categoryLabelMap: Record<string, string> = {
  signature: 'Signature',
  protein: 'Protein',
  sides: 'Sides',
}

const categoryStyleMap: Record<string, React.CSSProperties> = {
  signature: { background: 'var(--primary)', color: 'white' },
  protein: { background: 'var(--secondary)', color: 'white' },
  sides: { background: 'var(--accent)', color: 'var(--dark)' },
}

function formatInr(price: number) {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)

  return `INR ${formatted}`
}

export function Menu({ variant = 'featured', featuredCount = 4 }: MenuProps) {
  const { addToCart } = useCart()
  const menu = menuData as MenuData
  const [query, setQuery] = React.useState('')
  const searchId = React.useId()
  const isFeatured = variant === 'featured'

  const categories = React.useMemo(() => {
    const allCategories = menu.categories
    if (isFeatured) {
      const signatureCategory =
        allCategories.find((category) => category.id === 'signature') ??
        allCategories[0]

      if (!signatureCategory) return []

      return [
        {
          ...signatureCategory,
          items: signatureCategory.items.slice(0, featuredCount),
        },
      ]
    }

    const searchTerm = query.trim().toLowerCase()
    if (!searchTerm) return allCategories

    return allCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const name = item.name.toLowerCase()
          const description = item.description.toLowerCase()
          return name.includes(searchTerm) || description.includes(searchTerm)
        }),
      }))
      .filter((category) => category.items.length > 0)
  }, [featuredCount, isFeatured, menu.categories, query])

  const sectionTitle = isFeatured ? 'Signature Shakes' : 'Full Menu'
  const headerLink = isFeatured
    ? { href: '/menu', label: 'See Full Menu →' }
    : { href: '/', label: 'Back Home →' }
  const quickLinks = !isFeatured
    ? query.trim()
      ? categories
      : menu.categories
    : []

  return (
    <section className="section-padding" id="menu">
      <div className="section-header">
        <h2 className="section-title">{sectionTitle}</h2>
        <Link
          href={headerLink.href}
          className="text-sm md:text-base"
          style={{
            color: 'var(--dark)',
            fontWeight: 800,
            textTransform: 'uppercase',
          }}
        >
          {headerLink.label}
        </Link>
      </div>

      {!isFeatured ? (
        <div className="mt-8 !mb-7 flex flex-col gap-4 ">
          <div className="w-full md:max-w-sm">
            <label htmlFor={searchId} className="sr-only">
              Search menu
            </label>
            <Input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shakes, protein, or sides"
              className="rounded-none bg-white !pl-3 text-sm md:text-base"
              style={{ border: 'var(--border)', boxShadow: '4px 4px 0 var(--dark)' }}
            />
          </div>
        </div>
      ) : null}

      {categories.length === 0 ? (
        <div
          className="mt-6 rounded-none bg-white !p-4 text-sm"
          style={{ border: 'var(--border)' }}
        >
          No items match your search. Try another keyword.
        </div>
      ) : (
        categories.map((category, index) => (
          <div
            key={category.id}
            id={category.id}
            className={`${!isFeatured ? 'pt-4 md:pt-6' : ''} ${
              index < categories.length - 1 ? 'mb-12 md:mb-16' : ''
            }`}
          >
            {!isFeatured ? (
              <div className="!mb-3 md:!mb-5 !mt-3 md:!mt-5 flex items-end justify-between gap-4">
                <h3
                  className="text-xl md:text-2xl uppercase"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
                >
                  {category.name}
                </h3>
              </div>
            ) : null}

            <div className="menu-grid">
              {category.items.map((item) => (
                <Card
                  key={item.id}
                  className="menu-card rounded-none shadow-none gap-0 px-0 py-0"
                >
                  <Badge
                    className="menu-tag rounded-none border-none"
                    style={categoryStyleMap[category.id]}
                  >
                    {categoryLabelMap[category.id] ?? category.name}
                  </Badge>
                  <img src={item.image} alt={item.name} />
                  <div className="menu-card-body">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3>{item.name}</h3>
                      <span className="price">{formatInr(item.price)}</span>
                    </div>
                    <p className="text-[14px] text-[#666]">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <Button
                        className="btn-cta rounded-none w-full text-[var(--dark)]"
                        onClick={() =>
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        }
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      {!isFeatured ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                background: 'white',
                border: 'var(--border)',
                boxShadow: '4px 4px 0 var(--dark)',
              }}
              aria-label="Open menu categories"
            >
              <MenuIcon className="size-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            side="top"
            sideOffset={12}
            className="w-auto min-w-[180px] rounded-none border-0 !p-3"
            style={{
              background: 'var(--bg)',
              border: 'var(--border)',
              boxShadow: '4px 4px 0 var(--dark)',
            }}
          >
            <div
              className="text-xs uppercase"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
            >
              Categories
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {quickLinks.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="text-sm uppercase"
                  style={{ fontWeight: 800, color: 'var(--dark)' }}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </section>
  )
}
