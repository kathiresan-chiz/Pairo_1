import { lazy, Suspense, type ComponentType } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

// Each page loads on demand, so a visitor downloads only the page they open (the home
// hero's three.js, for one, is not fetched by the other pages).
const Home = lazy(() => import('./pages/Home'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Solution = lazy(() => import('./pages/Solution'))
const ParrotAi = lazy(() => import('./pages/ParrotAi'))
const HealthCheck = lazy(() => import('./pages/HealthCheck'))
const Compliance = lazy(() => import('./pages/Compliance'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Keeps the page height while a page's code arrives, so the footer doesn't jump up.
const page = (Page: ComponentType) => (
  <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
    <Page />
  </Suspense>
)

// Site architecture from the PairO content document: Home, Agentic solutions (hub and
// twelve solution pages), Parrot AI, Health Check, Compliance and Pricing.
// /contact is where every "Book a demo" leads.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={page(Home)} />
        <Route path="solutions" element={page(Solutions)} />
        <Route path="solutions/:slug" element={page(Solution)} />
        <Route path="parrot-ai" element={page(ParrotAi)} />
        <Route path="health-check" element={page(HealthCheck)} />
        <Route path="compliance" element={page(Compliance)} />
        <Route path="pricing" element={page(Pricing)} />
        <Route path="contact" element={page(Contact)} />
        <Route path="privacy" element={page(() => <Legal page="privacy" />)} />
        <Route path="terms" element={page(() => <Legal page="terms" />)} />

        {/* Pages from the previous site structure */}
        <Route path="services" element={<Navigate to="/solutions" replace />} />
        <Route path="about" element={<Navigate to="/" replace />} />
        <Route path="insights/*" element={<Navigate to="/" replace />} />

        <Route path="*" element={page(NotFound)} />
      </Route>
    </Routes>
  )
}
