import { NavLink, useLocation } from 'react-router-dom'
import { liquidColor, useLiquidPill } from './LiquidPill'
import { nav } from '../content/site'

const isActivePath = (to: string, pathname: string) =>
  to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

// Main navigation as a liquid segmented control (see useLiquidPill).
export default function NavTabs() {
  const { pathname } = useLocation()
  const activeIndex = nav.findIndex((item) => isActivePath(item.to, pathname))
  const { itemRef, layer } = useLiquidPill(activeIndex)

  return (
    <ul className="relative hidden items-center gap-1 rounded-full bg-white/70 p-1 ring-1 ring-line lg:flex">
      {layer}
      {nav.map((item, i) => (
        <li key={item.to} ref={itemRef(i)} className="relative">
          <NavLink
            to={item.to}
            end={item.to === '/'}
            className={`block rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 xl:px-4 xl:text-sm ${
              i === activeIndex ? `${liquidColor(i).text} delay-300` : 'text-muted hover:text-ink'
            }`}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
