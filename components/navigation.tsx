"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code, Heart, Command } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const navLinks = [
  { href: "/", label: "主页", icon: Home, key: "H" },
  { href: "/about", label: "关于我", icon: User, key: "A" },
  { href: "/projects", label: "项目经历", icon: Code, key: "P" },
  { href: "/support", label: "支持一下", icon: Heart, key: "S" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    const panel = document.getElementById("home-content")
    const handlePanelScroll = () => {
      if (panel) setScrolled(panel.scrollTop > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    panel?.addEventListener("scroll", handlePanelScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      panel?.removeEventListener("scroll", handlePanelScroll)
    }
  }, [])

  // Morphing indicator position
  useEffect(() => {
    if (!navRef.current) return
    const activeLink = navRef.current.querySelector("[data-active='true']") as HTMLElement
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      })
    }
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${
        scrolled
          ? "glass-elevated shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[60px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/8 group-hover:bg-primary/15 transition-all duration-300 gradient-border">
            <Command className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground tracking-wide group-hover:text-primary transition-colors duration-300 leading-none">
              {"林翰"}
            </span>
            <span className="text-[9px] text-muted-foreground/50 font-mono leading-none mt-0.5 tracking-widest">{"LINJOHN"}</span>
          </div>
        </Link>

        {/* Desktop Nav with morphing indicator */}
        <nav ref={navRef} className="hidden md:flex items-center gap-0.5 relative" aria-label="Main navigation">
          {/* Sliding indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-primary/8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.width > 0 ? 1 : 0,
            }}
          />
          {navLinks.map(({ href, label, icon: Icon, key }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                data-active={isActive}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 z-10 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
                <kbd className={`hidden lg:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ml-1 transition-colors duration-300 ${
                  isActive
                    ? "border-primary/20 text-primary/50 bg-primary/5"
                    : "border-border text-muted-foreground/30 bg-secondary/30"
                }`}>
                  {key}
                </kbd>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-xl hover:bg-secondary/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute left-0 block w-5 h-[1.5px] bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileOpen ? "top-[9px] rotate-45" : "top-1"
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] block w-5 h-[1.5px] bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            <span
              className={`absolute left-0 block w-5 h-[1.5px] bg-current transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileOpen ? "top-[9px] -rotate-45" : "top-[17px]"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="glass-elevated border-t border-border/30 px-6 py-3 flex flex-col gap-0.5" aria-label="Mobile navigation">
          {navLinks.map(({ href, label, icon: Icon, key }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary/8 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{label}</span>
                <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border border-border text-muted-foreground/30">
                  {key}
                </kbd>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
