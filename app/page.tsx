import { Menu } from '@/components/Menu'
import { SiteHeader } from '@/components/SiteHeader'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="grain-overlay" />

      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              NO CAP,
              <br />
              JUST <span>FLAVOR</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Serving 70s aesthetics with a modern twist. Locally sourced, highkey delicious, and strictly for the
              vibers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <Link
                href="/menu"
                className="btn-cta"
                style={{ background: 'var(--primary)', color: 'white' }}
              >
                Order Now
              </Link>
              <Link href="#menu" className="btn-cta" style={{ background: 'white' }}>
                View Menu
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <div className="sticker">
              FRESH AF
              <br />
              EVERY DAY
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #AESTHETIC
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              LOWKEY FIRE
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; ★ BURGERS THAT SLAP ★ CRAFT COCKTAILS ★ RETRO VIBES ONLY ★ OPEN UNTIL 2AM ★ BEST IN THE CITY ★
            BURGERS THAT SLAP ★ CRAFT COCKTAILS ★ RETRO VIBES ONLY ★ OPEN UNTIL 2AM ★ BEST IN THE CITY
          </div>
        </div>

        <Menu variant="featured" featuredCount={4} />

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">THE VIBE CHECK IS PASSED.</h2>
            <p className="vibe-text">
              We don't just do food. We do moments. From the curated 90s hip-hop playlist to the 70s diner seats, every
              corner is designed for your next dump. No reservations needed for the main room, just bring the energy.
            </p>
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }}>
              Our Story
            </button>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            @VIBE.BISTRO
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Insta 1"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Insta 2"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Insta 3"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Insta 4"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">VIBE*BISTRO</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
            Your local spot for high-fidelity food and low-fidelity vibes. Since 2024 but feels like 1974.
          </p>
        </div>
        <div className="footer-links">
          <h4>Nav</h4>
          <ul>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Menu
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Privacy
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Hours</h4>
          <ul>
            <li>Tue-Thu: 12pm - 11pm</li>
            <li>Fri-Sat: 12pm - 2am</li>
            <li>Sun: 11am - 9pm</li>
            <li>Mon: Closed (Mental Health Day)</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© 2025 VIBE BISTRO GROUP</span>
        </div>
      </footer>
    </>
  )
}
