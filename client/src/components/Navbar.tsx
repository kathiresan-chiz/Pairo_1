import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import NavTabs from './NavTabs'
import { nav } from '../content/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="container-x pt-3">
        <nav
          aria-label="Main"
          className={`flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5 transition-all duration-300 ${
            scrolled || open ? 'bg-white/85 shadow-lg ring-1 shadow-navy/5 ring-line backdrop-blur-md' : ''
          }`}
        >
          <Link to="/" onClick={close} aria-label="PAIRO home" className="shrink-0">
            <Logo glow={false} className="h-8 sm:h-9" />
          </Link>

          <NavTabs />

          <div className="flex items-center gap-2">
            <Link
              to="/contact?intent=sales"
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-white xl:block"
            >
              Talk to sales
            </Link>
            <Button to="/contact?intent=demo" className="hidden sm:inline-flex">
              Book a demo
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="mt-2 rounded-3xl bg-white p-3 shadow-xl ring-1 shadow-navy/10 ring-line lg:hidden"
          >
            <ul className="grid gap-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 text-base font-medium ${isActive ? 'bg-seal text-navy' : 'text-ink hover:bg-mist'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button to="/contact?intent=demo" onClick={close} className="mt-3 w-full">
              Book a demo
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
