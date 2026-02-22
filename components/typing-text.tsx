"use client"

import { useState, useEffect, useCallback } from "react"

interface TypingTextProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  className?: string
}

export function TypingText({ strings, typeSpeed = 80, backSpeed = 50, className = "" }: TypingTextProps) {
  const [text, setText] = useState("")
  const [stringIndex, setStringIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = strings[stringIndex]
    if (!isDeleting) {
      if (charIndex < current.length) {
        setText(current.substring(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      } else {
        setTimeout(() => setIsDeleting(true), 2000)
        return
      }
    } else {
      if (charIndex > 0) {
        setText(current.substring(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      } else {
        setIsDeleting(false)
        setStringIndex((s) => (s + 1) % strings.length)
      }
    }
  }, [charIndex, isDeleting, stringIndex, strings])

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? backSpeed : typeSpeed)
    return () => clearTimeout(timeout)
  }, [tick, isDeleting, backSpeed, typeSpeed])

  return (
    <span className={className}>
      {text}
      <span className="text-primary animate-pulse">|</span>
    </span>
  )
}
