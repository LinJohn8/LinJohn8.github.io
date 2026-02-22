"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface AnimeMascotProps {
  initialX?: number
  initialY?: number
  side?: "left" | "right"
}

export function AnimeMascot({ initialX, initialY, side = "right" }: AnimeMascotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const lastPos = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const homePos = useRef({ x: 0, y: 0 })

  // Set initial position after mount
  useEffect(() => {
    const computeHome = () => {
      if (typeof window === "undefined") return { x: 0, y: 0 }
      const defaultX = side === "right"
        ? window.innerWidth - 140
        : 40
      const defaultY = window.innerHeight - 220
      return {
        x: initialX ?? defaultX,
        y: initialY ?? defaultY,
      }
    }
    const home = computeHome()
    homePos.current = home
    setPos(home)
    setMounted(true)
  }, [initialX, initialY, side])

  // Spring physics: return to home position when released
  useEffect(() => {
    if (isDragging || !mounted) return

    let running = true
    const spring = { stiffness: 0.03, damping: 0.85 }
    let vx = velocity.x
    let vy = velocity.y
    let cx = pos.x
    let cy = pos.y

    const animate = () => {
      if (!running) return

      const dx = homePos.current.x - cx
      const dy = homePos.current.y - cy

      // Spring force
      vx = (vx + dx * spring.stiffness) * spring.damping
      vy = (vy + dy * spring.stiffness) * spring.damping

      cx += vx
      cy += vy

      setPos({ x: cx, y: cy })

      // Stop when close enough
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
        setPos(homePos.current)
        return
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
    }
  }, [isDragging, mounted]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setIsBouncing(false)
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    lastPos.current = { x: pos.x, y: pos.y }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [pos])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.current.x
    const newY = e.clientY - dragStart.current.y
    setVelocity({
      x: (newX - lastPos.current.x) * 0.3,
      y: (newY - lastPos.current.y) * 0.3,
    })
    lastPos.current = { x: newX, y: newY }
    setPos({ x: newX, y: newY })
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 600)
  }, [])

  const handleClick = useCallback(() => {
    if (!isDragging) {
      setIsBouncing(true)
      setTimeout(() => setIsBouncing(false), 600)
    }
  }, [isDragging])

  if (!mounted) return null

  return (
    <div
      ref={ref}
      className="fixed z-[100] select-none touch-none"
      style={{
        left: pos.x,
        top: pos.y,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : undefined,
        willChange: "transform",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Speech bubble */}
      <div
        className={`absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono px-3 py-1.5 rounded-lg glass-elevated text-primary transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ pointerEvents: "none" }}
      >
        {"Hello! (^_^)/"}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[rgba(0,212,245,0.2)]" />
      </div>

      <div
        className={`relative w-[90px] h-[90px] ${isBouncing ? "spring-bounce" : ""}`}
        style={{
          transform: isDragging ? "scale(1.1) rotate(-5deg)" : isHovered ? "scale(1.05)" : "scale(1)",
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Glow ring behind mascot */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isHovered || isDragging ? "opacity-100" : "opacity-0"}`}
          style={{ boxShadow: "0 0 30px rgba(0, 212, 245, 0.15), 0 0 60px rgba(232, 121, 168, 0.1)" }}
        />
        <img
          src="/images/LKBHZ.png"
          alt="Mascot"
          className="w-full h-full rounded-full object-cover border-2 border-primary/20 shadow-lg"
          draggable={false}
          style={{ imageRendering: "auto" }}
        />
        {/* Floating indicator */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-neon-green border-2 border-background status-dot" />
      </div>
    </div>
  )
}
