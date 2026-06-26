import { useEffect, useRef } from 'react'
import styles from './MatrixRain.module.css'

/**
 * Subtle Matrix-style glyph rain rendered to a full-screen canvas.
 * Kept low-opacity and slow so it reads as ambient texture, not a screensaver.
 * Disables itself when the user prefers reduced motion.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const glyphs = 'アカサタナハマヤラワ0123456789<>/\\|=+*#'
    const fontSize = 16
    let columns = 0
    let drops: number[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * canvas.height) / fontSize),
      )
    }
    resize()

    let lastTime = 0
    const stepMs = 70 // throttle so the rain falls slowly
    let frame = 0

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (time - lastTime < stepMs) return
      lastTime = time

      // translucent fill leaves fading trails behind each glyph
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px ui-monospace, monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // occasional brighter leading glyph
        ctx.fillStyle = Math.random() > 0.975 ? '#4dffa0' : '#0f7a3f'
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className={styles.matrixRain} aria-hidden="true" />
  )
}
