import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFrameSequence } from '../hooks/useFrameSequence'

gsap.registerPlugin(ScrollTrigger)

// How many viewport-heights the scroll section occupies
const SCROLL_DURATION = 5 // 5 × 100vh = 500vh total scroll distance

export default function CinematicSection() {
  const sectionRef  = useRef(null)
  const stickyRef   = useRef(null)
  const canvasRef   = useRef(null)
  const overlayRef  = useRef(null)
  const scrollRef   = useRef(null)
  const [loaded, setLoaded]   = useState(false)
  const [progress, setProgress] = useState(0)

  const { setFrame, totalFrames } = useFrameSequence(canvasRef)

  // Show section once first frame ready
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // ── GSAP ScrollTrigger ─────────────────────────────────────
  useEffect(() => {
    if (!loaded) return

    const ctx = gsap.context(() => {
      // Proxy object GSAP animates
      const proxy = { p: 0 }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   'top top',
        end:     `+=${window.innerHeight * SCROLL_DURATION}`,
        pin:     stickyRef.current,
        pinSpacing: true,
        scrub:   0.5,
        onUpdate(self) {
          const p = self.progress
          setProgress(p)
          setFrame(p)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [loaded, setFrame])

  // ── Scroll indicator fade ──────────────────────────────────
  const indicatorOpacity = Math.max(0, 1 - progress * 10)

  return (
    <section
      ref={sectionRef}
      className="cinematic-section"
      style={{ height: `${(SCROLL_DURATION + 1) * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div ref={stickyRef} className="cinematic-sticky">

        {/* Canvas */}
        <canvas ref={canvasRef} className="cinematic-canvas" />

        {/* Cinematic vignette overlay */}
        <div className="cinematic-vignette" />

        {/* Top overlay: logo + nav hint */}
        <div className="cinematic-top" style={{ opacity: loaded ? 1 : 0 }}>
          <div className="cinematic-logo">
            <span className="logo-mark">◈</span>
            <span className="logo-text">AURA COFFEE</span>
          </div>
        </div>

        {/* Center overlay: tagline */}
        <div
          className="cinematic-center"
          style={{ opacity: Math.max(0, 1 - progress * 6) }}
        >
          <p className="cinematic-tagline">Every sip tells a story</p>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator"
          style={{ opacity: indicatorOpacity }}
        >
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>

        {/* Progress bar */}
        <div className="cinematic-progress">
          <div
            className="cinematic-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
