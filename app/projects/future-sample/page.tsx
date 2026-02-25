"use client"

import { Navigation } from "@/components/navigation"
import { AnimeMascot } from "@/components/anime-mascot"
import { VisitorCounter } from "@/components/visitor-counter"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const IMAGE_BASE = "https://linjohn8.github.io"

const members = [
  { name: "毛雯婧", role: "Developer", src: `${IMAGE_BASE}/assets/project_pic/mwj.jpg` },
  { name: "蒙政良", role: "Developer", src: `${IMAGE_BASE}/assets/project_pic/mzl.jpg` },
  { name: "林翰", role: "Developer", src: `${IMAGE_BASE}/assets/project_pic/lh.jpg` },
  { name: "郑路洁", role: "Developer", src: `${IMAGE_BASE}/assets/project_pic/zlj.jpg` },
]

const exhibitions = [
  { label: "展览图1", src: `${IMAGE_BASE}/assets/project_pic/exhibition1.jpg` },
  { label: "展览图2", src: `${IMAGE_BASE}/assets/project_pic/exhibition2.jpg` },
]

export default function FutureSamplePage() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const teamRef = useScrollReveal<HTMLDivElement>()
  const exhibitionRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-background noise-overlay grid-bg">
      <Navigation />
      <AnimeMascot side="right" />
      <main className="mx-auto max-w-4xl px-4 md:px-8 pt-24 pb-16">
        {/* Header */}
        <div ref={headerRef} className="reveal reveal-blur text-center mb-12 page-enter" style={{ animationDuration: "0.6s" }}>
          <span className="tag-chip mb-4 inline-block">Project Detail</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            <span className="text-shimmer">{"未来样本"}</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
            {"2024飞桨杯第三名（二等奖）; 第二届SOULSCAPES灵源AIGC艺术设计展; m360人机共振展; 2024上海交大文创学院中英青年数字创意展[伦敦设计节]; 2024油罐玩家艺术节; 第十八届杭州文化创意产业博览会; 2025中国·杭州艺术与科技国际双年展"}
          </p>
          <div className="divider-glow mt-8 max-w-xs mx-auto" />
        </div>

        {/* Team */}
        <div ref={teamRef} className="reveal reveal-up mb-12" style={{ animationDuration: "0.6s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full glow-line" />
            {"团队成员"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {members.map((m) => (
              <div key={m.name} className="glass-elevated rounded-2xl overflow-hidden text-center card-hover card-scan gradient-border">
                <div className="img-zoom aspect-square">
                  <img
                    src={m.src}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-4">
                  <p className="font-semibold text-foreground text-sm">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exhibition Photos */}
        <div ref={exhibitionRef} className="reveal reveal-up mb-12" style={{ animationDuration: "0.6s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-accent rounded-full" />
            {"展览图片"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {exhibitions.map((e) => (
              <div key={e.label} className="glass-elevated rounded-2xl overflow-hidden text-center card-hover card-scan gradient-border">
                <div className="img-zoom">
                  <img
                    src={e.src}
                    alt={e.label}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
                <p className="py-4 font-semibold text-foreground text-sm">{e.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-5 py-10">
          <div className="divider-glow w-full" />
          <VisitorCounter variant="compact" className="pt-2" />
          <p className="text-[10px] text-muted-foreground/40 font-mono">{"未来样本"}</p>
        </footer>
      </main>
    </div>
  )
}
