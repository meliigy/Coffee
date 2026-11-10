import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import CinematicSection from './components/CinematicSection'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import ProductsSection from './sections/ProductsSection'
import StorySection from './sections/StorySection'
import ContactSection from './sections/ContactSection'
import './styles/global.css'

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app">
      <Navbar />
      <CinematicSection />
      <main className="main-content">
        <HeroSection />
        <ProductsSection />
        <StorySection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
