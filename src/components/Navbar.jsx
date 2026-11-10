import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="nav-logo">
          <span className="logo-mark">◈</span>
          <span>AURA COFFEE</span>
        </a>
        <ul className="nav-links">
          <li><a href="#products">Our Coffee</a></li>
          <li><a href="#story">Our Story</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#products" className="nav-cta">Shop Now</a>
      </div>
    </nav>
  )
}
