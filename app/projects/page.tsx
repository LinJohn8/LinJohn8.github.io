"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { SectionCard } from "@/components/section-card"
import { Lightbox } from "@/components/lightbox"
import { AnimeMascot } from "@/components/anime-mascot"
import { VisitorCounter } from "@/components/visitor-counter"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Trophy, BookOpen, Gamepad2, GraduationCap, ExternalLink } from "lucide-react"
import type { ReactNode } from "react"
import Link from "next/link"

const IMAGE_BASE = "https://linjohn8.github.io"

function ProjectItem({
  title,
  description,
  linkHref,
  linkComponent,
}: {
  title: string
  description: string
  linkHref?: string
  linkComponent?: ReactNode
}) {
  return (
    <div className="rounded-xl bg-accent/4 border border-accent/8 p-5 border-l-4 border-l-accent/30 hover:border-l-accent card-hover card-scan transition-all gradient-border">
      {linkHref ? (
        linkHref.startsWith("/") ? (
          <Link
            href={linkHref}
            className="font-semibold text-accent text-sm hover:underline inline-flex items-center gap-1.5 group"
          >
            {title} <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <a
            href={linkHref}
            className="font-semibold text-accent text-sm hover:underline inline-flex items-center gap-1.5 group"
          >
            {title} <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        )
      ) : linkComponent ? (
        linkComponent
      ) : (
        <p className="font-semibold text-accent text-sm">{title}</p>
      )}
      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
    </div>
  )
}

function PluginItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl bg-primary/4 border border-primary/8 p-4 border-l-4 border-l-primary/25 hover:border-l-primary card-hover card-scan transition-all">
      <p className="font-semibold text-primary text-sm font-mono">{title}</p>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
    </div>
  )
}

export default function ProjectsPage() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null)
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="min-h-screen bg-background noise-overlay grid-bg">
      <Navigation />
      <AnimeMascot side="right" />
      <main className="mx-auto max-w-4xl px-4 md:px-8 pt-24 pb-16 flex flex-col gap-6">
        {/* Page Header */}
        <div ref={headerRef} className="reveal reveal-blur py-6 page-enter" style={{ animationDuration: "0.6s" }}>
          <span className="tag-chip mb-4 inline-block">Portfolio</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance tracking-tight">
            <span className="text-shimmer">{"项目经历"}</span>
            <span className="text-primary glow-cyan">{" / Projects"}</span>
          </h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">{"我在 Unreal Engine 和 AI 领域的工作成果。"}</p>
          <div className="divider-glow mt-6" />
        </div>

        {/* Major Projects */}
        <SectionCard title="主要展览与比赛项目" icon={<Trophy className="h-4 w-4" />} revealDirection="left" delay="0.5s">
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {"我参加制作的项目其实挺多的，但我失败的次数其实也不在少数，下面是我的一些比较成功的好的经历："}
          </p>
          <div className="flex flex-col gap-3">
            <ProjectItem
              title="记住我而非存储我 / 蝴蝶回到蛹中"
              description="山东美术馆展览，人智时代·第三届济南国际双年展"
            />
            <ProjectItem
              title="未来样本"
              description="飞桨杯第三名（二等奖）；SOULSCAPES灵源展；伦敦设计节；油罐玩家艺术节"
              linkHref="/projects/future-sample"
            />
            <ProjectItem
              title="5G+AI越韵流芳"
              description="乌镇世界互联网峰会（利用UE5结合AI技术参与的项目）"
            />
          </div>
        </SectionCard>

        {/* Papers */}
        <SectionCard title="相关论文" icon={<BookOpen className="h-4 w-4" />} revealDirection="up" delay="0.6s">
          <p className="text-sm text-muted-foreground mb-5">
            {"论文（"}
            <a
              href="https://orcid.org/0009-0004-7767-2304"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              ORCID <ExternalLink className="h-3 w-3" />
            </a>
            {"）"}
          </p>
          <div className="rounded-xl bg-muted/20 border border-border/50 p-5 code-block">
            <div className="flex items-center gap-2">
              <span className="text-neon-green font-mono text-xs">{"$"}</span>
              <p className="font-medium text-muted-foreground text-sm font-mono">{"status: pending_publication..."}</p>
            </div>
            <p className="text-xs text-muted-foreground/50 mt-1.5 font-mono">{"// 正在被收录中（上了后发布对应名字）"}</p>
          </div>
        </SectionCard>

        {/* Game Plugins */}
        <SectionCard title="游戏与插件开发" icon={<Gamepad2 className="h-4 w-4" />} revealDirection="up" delay="0.6s">
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {"我开发过很多的插件，一开始是为了能够更好的服务我的游戏，但一言难尽，所以在下面你可以看到我做的很多插件："}
          </p>

          <h3 className="text-[10px] font-bold text-foreground mb-3 mt-2 uppercase tracking-widest font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {"项目模版"}
          </h3>
          <div className="flex flex-col gap-2.5 mb-6">
            <PluginItem title="Snake Game Template" description="一款3D的多人贪吃蛇游戏蓝图模板，有可以操控的贪吃蛇，可以无限繁殖的事物等" />
            <PluginItem title="Simple Rhythm Effect" description="一个简单的节奏效果蓝图模板，一个方块的点击从而影响多个方块的项目" />
            <PluginItem title="Easy Change Game Menu" description="一个用于游戏的菜单，包含各种语言翻译" />
          </div>

          <h3 className="text-[10px] font-bold text-foreground mb-3 uppercase tracking-widest font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {"插件"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <PluginItem title="MultiThreadPlugins (MTP)" description="多线程插件，完全U++制作" />
            <PluginItem title="Damage Text Anim Plugin" description="伤害文字动画插件，基于对象池实现" />
            <PluginItem title="QuickAssetOperation (QAO)" description="快速资产操作编辑器插件" />
            <PluginItem title="Base Properties Plugin" description="基础属性插件，提供通用数据结构" />
            <PluginItem title="AlgorithmsAndMathExtensions" description="算法与数学扩展" />
            <PluginItem title="ChartExtendPlugins" description="图表扩展插件，自定义折线图" />
            <PluginItem title="Simple Write Plugin" description="简易写入插件，快速保存导出数据" />
            <PluginItem title="Target Tagging Plugin" description="目标标记插件，识别标记特定对象" />
          </div>
        </SectionCard>

        {/* Courses */}
        <SectionCard title="教学课程" icon={<GraduationCap className="h-4 w-4" />} revealDirection="scale" delay="0.5s">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="glass-elevated rounded-xl overflow-hidden cursor-pointer group card-hover card-scan gradient-border"
              onClick={() =>
                setLightboxImg({
                  src: `${IMAGE_BASE}/assets/UE5编辑器插件实战教程.png`,
                  alt: "UE5插件拓展开发教程",
                })
              }
            >
              <div className="img-zoom aspect-video">
                <img
                  src={`${IMAGE_BASE}/assets/UE5编辑器插件实战教程.png`}
                  alt="UE5插件拓展开发教程"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <a
                  href="https://www.aboutcg.org/courseDetails/2203/introduce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {"UE5插件拓展开发教程"} <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-xs text-muted-foreground mt-1 font-mono">AboutCG</p>
              </div>
            </div>

            <div
              className="glass-elevated rounded-xl overflow-hidden cursor-pointer group card-hover card-scan gradient-border"
              onClick={() =>
                setLightboxImg({
                  src: `${IMAGE_BASE}/assets/UE5多平台AI实战教程.png`,
                  alt: "UE5与AI接口开发教程",
                })
              }
            >
              <div className="img-zoom aspect-video">
                <img
                  src={`${IMAGE_BASE}/assets/UE5多平台AI实战教程.png`}
                  alt="UE5与AI接口开发教程"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <a
                  href="https://www.aboutcg.org/courseDetails/2453/introduce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {"UE5与AI接口开发教程"} <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-xs text-muted-foreground mt-1 font-mono">AboutCG</p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-5 py-10">
          <div className="divider-glow w-full" />
          <VisitorCounter variant="compact" className="pt-2" />
          <p className="text-[10px] text-muted-foreground/40 font-mono">
            {"// 更多项目 -> "}
            <a
              href="https://blog.csdn.net/q244645787"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CSDN
            </a>
          </p>
        </footer>
      </main>

      <Lightbox
        src={lightboxImg?.src ?? ""}
        alt={lightboxImg?.alt ?? ""}
        isOpen={!!lightboxImg}
        onClose={() => setLightboxImg(null)}
      />
    </div>
  )
}
