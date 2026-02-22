"use client"

import { Eye, Users, Clock, Terminal, Activity, Zap, Server, Code, Cpu, Hash, ArrowUpDown, Layers, RefreshCw } from "lucide-react"
import { useEffect, useState, useRef } from "react"

// ===== Data Layer (honest, localStorage only) =====
interface VisitorData {
  totalViews: number
  totalDays: number
  todayViews: number
  lastDate: string
  sessionCount: number
  firstVisit: string
  currentStreak: number
  maxStreak: number
  lastVisitDate: string
}

const EMPTY_DATA: VisitorData = {
  totalViews: 0, totalDays: 0, todayViews: 0, lastDate: "",
  sessionCount: 0, firstVisit: "", currentStreak: 0, maxStreak: 0, lastVisitDate: ""
}

function getVisitorData(): VisitorData {
  if (typeof window === "undefined") return { ...EMPTY_DATA }
  try {
    const stored = localStorage.getItem("linjohn-visitor-v3")
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return { ...EMPTY_DATA }
}

function updateVisitorData(): VisitorData {
  if (typeof window === "undefined") return { ...EMPTY_DATA }
  const data = getVisitorData()
  const today = new Date().toDateString()
  const now = new Date().toISOString()

  data.totalViews = (data.totalViews || 0) + 1
  data.sessionCount = (data.sessionCount || 0) + 1
  if (!data.firstVisit) data.firstVisit = now

  if (data.lastDate !== today) {
    data.totalDays = (data.totalDays || 0) + 1
    data.todayViews = 1

    // streak calculation
    if (data.lastVisitDate) {
      const lastDay = new Date(data.lastVisitDate)
      const todayDate = new Date(today)
      const diffDays = Math.round((todayDate.getTime() - lastDay.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays === 1) {
        data.currentStreak = (data.currentStreak || 0) + 1
      } else {
        data.currentStreak = 1
      }
    } else {
      data.currentStreak = 1
    }
    data.maxStreak = Math.max(data.maxStreak || 0, data.currentStreak)
    data.lastVisitDate = today
    data.lastDate = today
  } else {
    data.todayViews = (data.todayViews || 0) + 1
  }

  localStorage.setItem("linjohn-visitor-v3", JSON.stringify(data))
  return data
}

// ===== Animated Digit =====
function AnimatedDigit({ value, delay = 0 }: { value: string; delay?: number }) {
  const [display, setDisplay] = useState("0")
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimating(true)
      let tick = 0
      intervalRef.current = setInterval(() => {
        tick++
        if (tick >= 8) {
          setDisplay(value)
          setAnimating(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
        } else {
          setDisplay("0123456789"[Math.floor(Math.random() * 10)])
        }
      }, 45)
    }, delay)
    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [value, delay])

  return (
    <span className={`inline-block font-mono tabular-nums transition-colors duration-150 ${animating ? "text-primary" : "text-foreground"}`}>
      {display}
    </span>
  )
}

// ===== Scramble Number =====
function ScrambleNumber({ value, label, icon: Icon, color = "text-primary" }: { value: number; label: string; icon: typeof Eye; color?: string }) {
  const digits = String(value).split("")
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/6 border border-primary/8">
        <Icon className={`h-3.5 w-3.5 ${color} opacity-60`} />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-[1px] text-sm">
          {digits.map((d, i) => (
            <AnimatedDigit key={`${label}-${i}`} value={d} delay={i * 60 + 300} />
          ))}
        </div>
        <span className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.15em] font-mono mt-0.5">{label}</span>
      </div>
    </div>
  )
}

// ===== Variants =====
interface VisitorCounterProps {
  variant?: "compact" | "detailed" | "terminal" | "dashboard"
  showToday?: boolean
  className?: string
}

export function VisitorCounter({ variant = "detailed", showToday = true, className = "" }: VisitorCounterProps) {
  const [data, setData] = useState<VisitorData | null>(null)
  const [time, setTime] = useState("")

  useEffect(() => {
    setData(updateVisitorData())
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const daysSinceFirst = (() => {
    if (!data.firstVisit) return 0
    const diff = Date.now() - new Date(data.firstVisit).getTime()
    return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)))
  })()

  const avgViewsPerDay = data.totalDays > 0 ? (data.totalViews / data.totalDays).toFixed(1) : "0"

  // --- Compact ---
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 text-xs text-muted-foreground ${className}`}>
        <span className="flex items-center gap-1.5">
          <Eye className="h-3 w-3 text-primary/50" />
          <span className="font-mono text-primary">{data.totalViews}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-primary/50" />
          <span className="font-mono text-primary">{data.totalDays}</span>
        </span>
      </div>
    )
  }

  // --- Terminal ---
  if (variant === "terminal") {
    return (
      <div className={`counter-container px-4 py-3 font-mono text-xs ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="h-3 w-3 text-primary/60" />
          <span className="text-primary/60">{"visitor.log"}</span>
          <span className="ml-auto text-muted-foreground/40">{time}</span>
        </div>
        <div className="flex flex-col gap-1 text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="text-neon-green">{">"}</span>
            <span>{" page_views="}</span>
            <span className="text-primary font-semibold">{data.totalViews}</span>
            <span className="mx-1 text-muted-foreground/20">|</span>
            <span>{"days="}</span>
            <span className="text-accent font-semibold">{data.totalDays}</span>
            {showToday && (
              <>
                <span className="mx-1 text-muted-foreground/20">|</span>
                <span>{"today="}</span>
                <span className="text-neon-green font-semibold">{data.todayViews}</span>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // --- Dashboard (honest, real data only + site tech info) ---
  if (variant === "dashboard") {
    return (
      <div className={`counter-container p-5 ${className}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
          <Activity className="h-3.5 w-3.5 text-primary/60" />
          <span className="text-[10px] text-muted-foreground/60 font-mono uppercase tracking-[0.15em]">{"Site Monitor"}</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            <span className="text-[9px] text-neon-green/60 font-mono">{"LIVE"}</span>
          </span>
          <span className="text-[9px] text-primary/30 font-mono ml-2">{time}</span>
        </div>

        {/* Primary stats -- all from real localStorage */}
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <ScrambleNumber value={data.totalViews} label="Page Views" icon={Eye} />
          <div className="w-px h-9 bg-border/30 hidden sm:block" />
          <ScrambleNumber value={data.todayViews} label="Today" icon={Clock} />
          <div className="w-px h-9 bg-border/30 hidden sm:block" />
          <ScrambleNumber value={data.sessionCount} label="Sessions" icon={RefreshCw} color="text-accent" />
        </div>

        {/* Secondary honest stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          <div className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl bg-secondary/20 border border-border/10">
            <Hash className="h-3 w-3 text-primary opacity-50" />
            <span className="text-xs font-mono font-semibold text-primary">{data.totalDays}</span>
            <span className="text-[8px] text-muted-foreground/40 font-mono uppercase tracking-wider">{"Visit Days"}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl bg-secondary/20 border border-border/10">
            <ArrowUpDown className="h-3 w-3 text-accent opacity-50" />
            <span className="text-xs font-mono font-semibold text-accent">{avgViewsPerDay}</span>
            <span className="text-[8px] text-muted-foreground/40 font-mono uppercase tracking-wider">{"Avg / Day"}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl bg-secondary/20 border border-border/10">
            <Zap className="h-3 w-3 text-chart-5 opacity-50" />
            <span className="text-xs font-mono font-semibold text-chart-5">{data.currentStreak}</span>
            <span className="text-[8px] text-muted-foreground/40 font-mono uppercase tracking-wider">{"Streak"}</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl bg-secondary/20 border border-border/10">
            <Layers className="h-3 w-3 text-neon-green opacity-50" />
            <span className="text-xs font-mono font-semibold text-neon-green">{data.maxStreak}</span>
            <span className="text-[8px] text-muted-foreground/40 font-mono uppercase tracking-wider">{"Best Streak"}</span>
          </div>
        </div>

        {/* Since label */}
        {data.firstVisit && (
          <div className="rounded-lg bg-secondary/20 border border-border/10 px-3 py-2 mb-4 flex items-center gap-2">
            <span className="text-[9px] text-muted-foreground/40 font-mono">{"first_visit:"}</span>
            <span className="text-[9px] text-primary/70 font-mono">
              {new Date(data.firstVisit).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="text-[9px] text-muted-foreground/20 font-mono mx-1">|</span>
            <span className="text-[9px] text-muted-foreground/40 font-mono">{"days_since:"}</span>
            <span className="text-[9px] text-accent/70 font-mono">{daysSinceFirst}</span>
          </div>
        )}

        {/* Site tech footer */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/20">
          <div className="flex items-center gap-1.5">
            <Server className="h-2.5 w-2.5 text-primary/40" />
            <span className="text-[9px] text-muted-foreground/40 font-mono">{"host:"}</span>
            <span className="text-[9px] text-primary font-mono font-medium">{"Vercel Edge"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code className="h-2.5 w-2.5 text-neon-green/40" />
            <span className="text-[9px] text-muted-foreground/40 font-mono">{"stack:"}</span>
            <span className="text-[9px] text-neon-green font-mono font-medium">{"Next.js + Three.js"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="h-2.5 w-2.5 text-accent/40" />
            <span className="text-[9px] text-muted-foreground/40 font-mono">{"data:"}</span>
            <span className="text-[9px] text-accent font-mono font-medium">{"Local Only"}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[8px] text-muted-foreground/20 font-mono mt-3 text-center">
          {"All stats are from your browser's local storage. No server-side tracking."}
        </p>
      </div>
    )
  }

  // --- Detailed (default) ---
  return (
    <div className={`counter-container px-5 py-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
        <span className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-[0.15em]">{"System Monitor"}</span>
        <span className="ml-auto text-[9px] text-primary/30 font-mono">{time}</span>
      </div>
      <div className="flex items-center gap-6">
        <ScrambleNumber value={data.totalViews} label="Views" icon={Eye} />
        <div className="w-px h-8 bg-border/30" />
        <ScrambleNumber value={data.totalDays} label="Days" icon={Users} />
        {showToday && (
          <>
            <div className="w-px h-8 bg-border/30" />
            <ScrambleNumber value={data.todayViews} label="Today" icon={Clock} />
          </>
        )}
      </div>
    </div>
  )
}
