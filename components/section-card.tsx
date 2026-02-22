"use client"

import type { ReactNode } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface SectionCardProps {
  id?: string
  title: string
  icon: ReactNode
  children: ReactNode
  className?: string
  revealDirection?: "up" | "left" | "right" | "scale" | "blur"
  delay?: string
}

export function SectionCard({
  id,
  title,
  icon,
  children,
  className = "",
  revealDirection = "up",
  delay = "0.6s",
}: SectionCardProps) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id={id}
      ref={ref}
      style={{ animationDuration: delay }}
      className={`reveal reveal-${revealDirection} glass-elevated rounded-2xl p-6 md:p-8 card-hover card-scan gradient-border ${className}`}
    >
      <h2 className="flex items-center gap-3 text-lg font-semibold text-foreground mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/8 text-primary">
          {icon}
        </span>
        <span className="text-balance">{title}</span>
        <span className="flex-1" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      </h2>
      {children}
    </section>
  )
}
