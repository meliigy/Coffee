import { useEffect, useRef, useCallback } from 'react'

const TOTAL_FRAMES = 285
const FRAME_PATH = (n) => `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`

export function useFrameSequence(canvasRef) {
  const imagesRef    = useRef([])
  const loadedRef    = useRef(new Set())
  const currentFrame = useRef(0)
  const rafRef       = useRef(null)

  // ── Draw one frame onto canvas ──────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = imagesRef.current[index]
    if (!img || !loadedRef.current.has(index)) return

    const ctx = canvas.getContext('2d')
    const { width: cw, height: ch } = canvas

    // Cover-fit: maintain aspect ratio, center crop
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale
    const sh = ih * scale
    const ox = (cw - sw) / 2
    const oy = (ch - sh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, ox, oy, sw, sh)
  }, [canvasRef])

  // ── Smooth frame update via RAF ─────────────────────────────
  const setFrame = useCallback((progress) => {
    const index = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    )
    if (index === currentFrame.current) return

    currentFrame.current = index

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => drawFrame(index))
  }, [drawFrame])

  // ── Load frames progressively ───────────────────────────────
  useEffect(() => {
    const imgs = new Array(TOTAL_FRAMES)
    imagesRef.current = imgs

    const load = (i) => {
      if (i >= TOTAL_FRAMES) return
      const img = new Image()
      img.src = FRAME_PATH(i + 1)
      img.onload = () => {
        loadedRef.current.add(i)
        // Draw first frame as soon as it's ready
        if (i === 0) drawFrame(0)
        // Stagger remaining loads to avoid flooding
        setTimeout(() => load(i + 1), 10)
      }
      img.onerror = () => {
        // Skip broken frames gracefully
        setTimeout(() => load(i + 1), 10)
      }
      imgs[i] = img
    }

    load(0)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [drawFrame])

  // ── Resize handler ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      const ctx = canvas.getContext('2d')
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      drawFrame(currentFrame.current)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [canvasRef, drawFrame])

  return { setFrame, totalFrames: TOTAL_FRAMES }
}
