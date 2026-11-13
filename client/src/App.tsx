import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Solutions from './pages/Solutions'
import Solution from './pages/Solution'
import ParrotAi from './pages/ParrotAi'
import HealthCheck from './pages/HealthCheck'
import Compliance from './pages/Compliance'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

// Site architecture from the PairO content document: Home, Agentic solutions (hub and
// twelve solution pages), Parrot AI, Health Check, Compliance and Pricing.
// /contact is where every "Book a demo" leads.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<Solution />} />
        <Route path="parrot-ai" element={<ParrotAi />} />
        <Route path="health-check" element={<HealthCheck />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal page="privacy" />} />
        <Route path="terms" element={<Legal page="terms" />} />

        {/* Pages from the previous site structure */}
        <Route path="services" element={<Navigate to="/solutions" replace />} />
        <Route path="about" element={<Navigate to="/" replace />} />
        <Route path="insights/*" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
