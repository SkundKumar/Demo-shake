import { Menu } from '@/components/Menu'
import { SiteHeader } from '@/components/SiteHeader'

export default function MenuPage() {
  return (
    <>
      <div className="grain-overlay" />
      <SiteHeader />
      <main>
        <Menu variant="full" />
      </main>
    </>
  )
}
