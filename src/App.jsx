import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import OrderTray from './components/OrderTray'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Reserve from './pages/Reserve'
import NotFound from './pages/NotFound'
import { LEGACY_CATEGORY } from './data/menu'

const TITLES = {
  '/': 'Bites of Paradise — Restaurant in Kano',
  '/menu': 'Menu — Bites of Paradise',
  '/about': 'Our story — Bites of Paradise',
  '/reserve': 'Book a table — Bites of Paradise',
}

function LegacyMenu() {
  const { cat } = useParams()
  return <Navigate to={`/menu/${LEGACY_CATEGORY[cat] || cat.toLowerCase()}`} replace />
}

function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  // Category changes on /menu scroll within the page, so key the transition on the section only.
  const section = '/' + (location.pathname.split('/')[1] || '')

  useEffect(() => {
    document.title = TITLES[section] || 'Bites of Paradise'
  }, [section])

  // Scroll to top once the old page has faded out, not while it is still on screen.
  const onExitComplete = () => {
    if (!location.pathname.startsWith('/menu/')) window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <Routes location={location} key={section}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/menu/:category" element={<Page><Menu /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/reserve" element={<Page><Reserve /></Page>} />
          {/* old URLs */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/book" element={<Navigate to="/reserve" replace />} />
          <Route path="/menus" element={<Navigate to="/menu" replace />} />
          <Route path="/menus/:cat" element={<LegacyMenu />} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <OrderTray />
    </>
  )
}
