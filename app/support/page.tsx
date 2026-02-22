"use client"

import { Navigation } from "@/components/navigation"
import { SectionCard } from "@/components/section-card"
import { AnimeMascot } from "@/components/anime-mascot"
import { VisitorCounter } from "@/components/visitor-counter"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { HandCoins, MailOpen, ExternalLink, Sparkles } from "lucide-react"

const IMAGE_BASE = "https://linjohn8.github.io"

export default function SupportPage() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-background noise-overlay grid-bg">
      <Navigation />
      <AnimeMascot side="right" />
      <main className="mx-auto max-w-4xl px-4 md:px-8 pt-24 pb-16 flex flex-col gap-6">
        {/* Page Header */}
        <div ref={headerRef} className="reveal reveal-blur py-6 page-enter" style={{ animationDuration: "0.6s" }}>
          <span className="tag-chip mb-4 inline-block">Support</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance tracking-tight">
            <span className="text-shimmer">{"支持一下"}</span>
            <span className="text-primary glow-cyan">{" / Support Me"}</span>
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">{"感谢您对我的项目和探索的支持。"}</p>
          <div className="divider-glow mt-6" />
        </div>

        {/* Payment */}
        <SectionCard title="我臭不要脸 / Support Me" icon={<HandCoins className="h-4 w-4" />} revealDirection="scale" delay="0.6s">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="h-3.5 w-3.5 text-accent/60" />
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {"感谢您对我的项目和探索的支持。您的鼓励是我继续下去的最大动力！"}
            </p>
            <Sparkles className="h-3.5 w-3.5 text-accent/60" />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <div className="glass-elevated rounded-2xl p-6 text-center card-hover card-scan flex flex-col items-center gradient-border">
              <div className="img-zoom rounded-xl overflow-hidden border-2 border-accent/20 w-44 h-44">
                <img
                  src={`${IMAGE_BASE}/assets/Support/zfb.jpg`}
                  alt="支付宝"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-4 font-semibold text-foreground text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {"支付宝"}
              </p>
            </div>
            <div className="glass-elevated rounded-2xl p-6 text-center card-hover card-scan flex flex-col items-center gradient-border">
              <div className="img-zoom rounded-xl overflow-hidden border-2 border-primary/20 w-44 h-44">
                <img
                  src={`${IMAGE_BASE}/assets/Support/wx.jpg`}
                  alt="微信"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-4 font-semibold text-foreground text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                {"微信"}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Contact */}
        <SectionCard title="联系与说明" icon={<MailOpen className="h-4 w-4" />} revealDirection="up" delay="0.5s">
          <div className="rounded-xl bg-primary/4 border border-primary/8 p-6 border-l-4 border-l-primary gradient-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"我的邮箱在下面，但是我一般不怎么看，所以回复的一般都比较晚，请见谅。"}
            </p>
            <p className="mt-4 text-sm font-mono">
              <span className="text-neon-green">{"$ "}</span>
              <span className="text-muted-foreground">{"mail "}</span>
              <a
                href="mailto:q244645787@gmail.com"
                className="text-accent font-semibold hover:underline inline-flex items-center gap-1.5"
              >
                q244645787@gmail.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </SectionCard>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-5 py-10">
          <div className="divider-glow w-full" />
          <VisitorCounter variant="compact" className="pt-2" />
          <p className="text-[10px] text-muted-foreground/40 font-mono">{"// 2025 林翰 | ありがとう!"}</p>
        </footer>
      </main>
    </div>
  )
}
