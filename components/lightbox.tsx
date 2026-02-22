"use client"

import { useEffect, useCallback, useState } from "react"
import { X } from "lucide-react"

interface LightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
  const [visible, setVisible] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      setImgLoaded(false)
      // Trigger enter animation
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${
        visible ? "bg-black/90 backdrop-blur-xl" : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        className={`absolute top-6 right-6 z-[10000] w-10 h-10 flex items-center justify-center rounded-full glass text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className={`relative max-w-[92vw] max-h-[88vh] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <img
          src={src}
          alt={alt}
          className={`max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
          onLoad={() => setImgLoaded(true)}
        />
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        {alt && visible && (
          <p className={`absolute -bottom-10 left-0 right-0 text-center text-sm text-muted-foreground font-mono transition-opacity duration-500 delay-200 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}>
            {alt}
          </p>
        )}
      </div>
    </div>
  )
}
