"use client"

import { Navigation } from "@/components/navigation"
import { SectionCard } from "@/components/section-card"
import { AnimeMascot } from "@/components/anime-mascot"
import { VisitorCounter } from "@/components/visitor-counter"
import { GraduationCap, Cog, Globe, Github, ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const techStack = [
  { category: "UE引擎相关", detail: "UE4, UE5, WorldCreator, SpeedTree", color: "primary" as const },
  { category: "编程语言与开发", detail: "C, C++, Python, JavaScript, HTML, CSS, QT", color: "accent" as const },
  { category: "前端 / 编辑器 / IDE", detail: "Typora, HBuilder X, VSCode", color: "primary" as const },
  { category: "三维建模与贴图", detail: "Blender, MAYA, 3DMAX, ZBrush, SP, Marmoset", color: "accent" as const },
  { category: "平面设计 / 视频剪辑", detail: "Photoshop, Premiere, WPS", color: "primary" as const },
  { category: "数据分析与建模", detail: "SPSS, Vensim", color: "accent" as const },
]

const websites = [
  { label: "GitHub", href: "https://github.com/LinJohn8", desc: "开源项目与代码" },
  { label: "CSDN博客", href: "https://blog.csdn.net/q244645787", desc: "技术文章与教程" },
  { label: "Bilibili", href: "https://space.bilibili.com/20210926", desc: "视频内容创作" },
  { label: "知乎", href: "https://www.zhihu.com/people/duo-fang-tong-xing-8", desc: "技术问答与分享" },
]

export default function AboutPage() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-background noise-overlay grid-bg">
      <Navigation />
      <AnimeMascot side="right" />
      <main className="mx-auto max-w-4xl px-4 md:px-8 pt-24 pb-16 flex flex-col gap-6">
        {/* Page Header */}
        <div ref={headerRef} className="reveal reveal-blur py-6 page-enter" style={{ animationDuration: "0.6s" }}>
          <span className="tag-chip mb-4 inline-block">Profile</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance tracking-tight">
            <span className="text-shimmer">{"关于我"}</span>
            <span className="text-primary glow-cyan">{" / About Me"}</span>
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">{"了解我的教育背景、技术能力与在线平台。"}</p>
          <div className="divider-glow mt-6" />
        </div>

        {/* Education */}
        <SectionCard title="教育经历" icon={<GraduationCap className="h-4 w-4" />} revealDirection="left" delay="0.5s">
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-accent/5 border border-accent/10 p-5 border-l-4 border-l-accent/50 hover:border-l-accent card-hover transition-all gradient-border">
              <p className="font-semibold text-accent text-sm">{"浙江长征职业技术学院"}</p>
              <p className="text-sm text-muted-foreground mt-1.5 font-mono text-xs">{"电子竞技运动与管理 // 2021-2024"}</p>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-5 border-l-4 border-l-primary/50 hover:border-l-primary card-hover transition-all gradient-border">
              <p className="font-semibold text-primary text-sm">{"温州大学"}</p>
              <p className="text-sm text-muted-foreground mt-1.5 font-mono text-xs">{"工商管理 // 2024-2026"}</p>
            </div>
          </div>
        </SectionCard>

        {/* Tech Stack */}
        <SectionCard title="技术栈" icon={<Cog className="h-4 w-4" />} revealDirection="up" delay="0.6s">
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{"我会的可多了："}</p>
          <div className="flex flex-col gap-2.5">
            {techStack.map((item, idx) => (
              <div
                key={item.category}
                className={`rounded-xl p-4 border-l-4 card-hover card-scan ${
                  item.color === "primary"
                    ? "bg-primary/4 border border-primary/8 border-l-primary/30 hover:border-l-primary"
                    : "bg-accent/4 border border-accent/8 border-l-accent/30 hover:border-l-accent"
                } transition-all`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  <p className={`font-semibold text-sm ${item.color === "primary" ? "text-primary" : "text-accent"}`}>
                    {item.category}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-mono">{item.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Websites */}
        <SectionCard title="个人网站" icon={<Globe className="h-4 w-4" />} revealDirection="right" delay="0.5s">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {websites.map((site) => (
              <a
                key={site.label}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-elevated rounded-xl p-4 flex items-start gap-3 card-hover card-scan group gradient-border"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/8 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0 mt-0.5">
                  <Github className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                    {site.label}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" />
                  </span>
                  <p className="text-xs text-muted-foreground mt-0.5">{site.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </SectionCard>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-5 py-10">
          <div className="divider-glow w-full" />
          <VisitorCounter variant="compact" className="pt-2" />
          <p className="text-[10px] text-muted-foreground/40 font-mono">{"// 2025 林翰 - 个人介绍"}</p>
        </footer>
      </main>
    </div>
  )
}
