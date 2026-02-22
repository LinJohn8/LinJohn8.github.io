"use client"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  opacity?: number
  className?: string
}

export function MatrixRain({ opacity = 0.04, className = "" }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?~`"
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)

    const draw = () => {
      ctx.fillStyle = `rgba(6, 6, 15, 0.08)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Gradient from cyan to faded
        const alpha = Math.max(0, 1 - (drops[i] * fontSize) / canvas.height)
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(0, 212, 245, ${alpha * 0.8})`
        } else {
          ctx.fillStyle = `rgba(0, 212, 245, ${alpha * 0.3})`
        }

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i] += 0.5 + Math.random() * 0.3
      }
    }

    const interval = setInterval(draw, 60)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      clearInterval(interval)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
