"use client"

import { useState } from "react"
import { IdCard, Info, Laptop, UserCircle, Images, Mail, ArrowRight, ArrowUp, Github, ExternalLink, Terminal, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ParticleCanvas } from "@/components/particle-canvas"
import { TypingText } from "@/components/typing-text"
import { SectionCard } from "@/components/section-card"
import { Lightbox } from "@/components/lightbox"
import { VisitorCounter } from "@/components/visitor-counter"
import { AnimeMascot } from "@/components/anime-mascot"
import { MatrixRain } from "@/components/matrix-rain"
import Link from "next/link"

const IMAGE_BASE = "https://linjohn8.github.io"

const galleryImages = [
  { src: `${IMAGE_BASE}/assets/Self/1.jpg`, alt: "个人照" },
  { src: `${IMAGE_BASE}/assets/Self/2.jpg`, alt: "2023 乌镇世界互联网峰会" },
  { src: `${IMAGE_BASE}/assets/Self/3.jpg`, alt: "第三届济南国际双年展" },
  { src: `${IMAGE_BASE}/assets/Self/4.jpg`, alt: "上海油罐艺术中心 - 未来样本" },
  { src: `${IMAGE_BASE}/assets/Self/5.jpg`, alt: "未来样本线下版首展" },
  { src: `${IMAGE_BASE}/assets/Self/6.jpg`, alt: "未来样本项目理念展示" },
  { src: `${IMAGE_BASE}/assets/Self/7.jpg`, alt: "上海油罐艺术中心展览现场" },
  { src: `${IMAGE_BASE}/assets/Self/8.jpg`, alt: "第二届 SOULSCAPES 灵源 AIGC 艺术展" },
  { src: `${IMAGE_BASE}/assets/Self/9.jpg`, alt: "m360 人机共振" },
  { src: `${IMAGE_BASE}/assets/Self/10.jpg`, alt: "毛雯婧分享未来样本项目" },
  { src: `${IMAGE_BASE}/assets/Self/11.jpg`, alt: "第十届全球区块链峰会" },
  { src: `${IMAGE_BASE}/assets/Self/12.jpg`, alt: "第三届济南国际双年展合影" },
  { src: `${IMAGE_BASE}/assets/Self/13.jpg`, alt: "Unreal Fest 合影" },
  { src: `${IMAGE_BASE}/assets/Self/14.jpg`, alt: "Unreal 开发者社区" },
  { src: `${IMAGE_BASE}/assets/Self/15.jpg`, alt: "Unreal Engine 技术分享" },
  { src: `${IMAGE_BASE}/assets/Self/16.jpg`, alt: "团队合影" },
]

// --- Scroll to top button ---
function ScrollToTopButton() {
  return (
    <button
      onClick={() => {
        const el = document.getElementById("home-content")
        el?.scrollTo({ top: 0, behavior: "smooth" })
      }}
      className="fixed bottom-6 right-6 z-40 glass-elevated rounded-xl p-3 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300 group"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </button>
  )
}

// --- Profile card hero (replaces code-block style) ---
const techStack = [
  { label: "UE5", category: "Engine" },
  { label: "C++", category: "Lang" },
  { label: "Blueprint", category: "Lang" },
  { label: "Python", category: "Lang" },
  { label: "Next.js", category: "Web" },
]
const aiStack = [
  { label: "LLM", icon: "brain" },
  { label: "GenAI", icon: "image" },
  { label: "TTS", icon: "mic" },
  { label: "RAG", icon: "search" },
  { label: "ComfyUI", icon: "layers" },
  { label: "Diffusion", icon: "sparkles" },
]

function ProfileCard() {
  return (
    <div className="mt-6 rounded-2xl glass-elevated p-5 gradient-border">
      {/* Status bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/20">
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
          <Terminal className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">{"Indie Dev"}</span>
          <span className="text-[9px] text-muted-foreground/50 font-mono">{"since Oct 2021 (UE 4.26)"}</span>
        </div>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[9px] text-neon-green/60 font-mono">{"ACTIVE"}</span>
        </span>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <span className="text-[9px] text-muted-foreground/40 font-mono uppercase tracking-[0.15em] mb-2 block">{"Tech Stack"}</span>
        <div className="flex flex-wrap gap-1.5">
          {techStack.map((t) => (
            <span key={t.label} className="px-2.5 py-1 rounded-lg bg-primary/6 border border-primary/10 text-[10px] font-mono text-primary/80 hover:bg-primary/12 hover:text-primary transition-colors duration-200 cursor-default">
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* AI Skills */}
      <div className="mb-4">
        <span className="text-[9px] text-muted-foreground/40 font-mono uppercase tracking-[0.15em] mb-2 block">{"AI Skills"}</span>
        <div className="flex flex-wrap gap-1.5">
          {aiStack.map((a) => (
            <span key={a.label} className="px-2.5 py-1 rounded-lg bg-accent/6 border border-accent/10 text-[10px] font-mono text-accent/80 hover:bg-accent/12 hover:text-accent transition-colors duration-200 cursor-default">
              {a.label}
            </span>
          ))}
        </div>
      </div>

      {/* Mission quote */}
      <div className="rounded-xl bg-secondary/30 border border-border/15 p-3.5">
        <div className="flex items-start gap-2">
          <Sparkles className="h-3 w-3 text-chart-5 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            {'"我想做一款自己真正满意的游戏，同时也在探索 AI 与交互的无限可能。"'}
          </p>
        </div>
      </div>
    </div>
  )
}

// ===== Main Page =====
export default function HomePage() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null)

  return (
    <div className="flex h-screen flex-col lg:flex-row bg-background noise-overlay grid-bg">
      <Navigation />
      <AnimeMascot />

      {/* === Left Content Panel === */}
      <div
        id="home-content"
        className="flex-1 overflow-y-auto pt-20 pb-8 px-4 md:px-8 lg:w-1/2 lg:max-w-none relative"
      >
        <div className="mx-auto max-w-2xl flex flex-col gap-5">

          {/* Hero */}
          <div className="py-10 md:py-14 page-enter">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag-chip">Indie Developer</span>
              <span className="status-dot" />
              <span className="text-[10px] text-muted-foreground/50 font-mono">{"online"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-4 leading-[1.1] tracking-tight text-balance">
              <span className="text-shimmer">{"林翰"}</span>
              <span className="text-primary glow-cyan">{" / Han Lin"}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              {"独立游戏开发者 & AI 开发者"}
            </p>
            <p className="text-sm text-muted-foreground/50 mt-2 leading-relaxed max-w-lg">
              {"专注于 Unreal Engine 5 游戏开发与人工智能技术融合，探索交互式数字体验的无限可能。"}
            </p>
            <ProfileCard />
            <div className="divider-glow mt-8" />
          </div>

          {/* Terminal ID */}
          <SectionCard id="myself" title="网名 / Aliases" icon={<IdCard className="h-4 w-4" />} revealDirection="blur" delay="0.6s">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="h-3.5 w-3.5 text-neon-green/60" />
              <span className="text-[10px] text-neon-green/40 font-mono">{"$"}</span>
              <div className="text-xl md:text-2xl font-mono font-bold text-primary glow-cyan">
                <TypingText
                  strings={["多方通行8", "翰文侍林", "LinJohn8", "HWSL", "DFTX8"]}
                  typeSpeed={80}
                  backSpeed={50}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["多方通行8", "翰文侍林", "翰文侍林&多方通行8", "HWSLandDFTX8", "HWSL", "DFTX8", "LinJohn8"].map((alias) => (
                <span key={alias} className="px-2.5 py-1 rounded-lg bg-primary/6 border border-primary/10 text-[10px] font-mono text-primary/70 cursor-default hover:bg-primary/12 hover:text-primary transition-colors duration-200">
                  {alias}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* About brief */}
          <SectionCard id="about" title="关于我 / About" icon={<Info className="h-4 w-4" />} revealDirection="up" delay="0.6s">
            <div className="rounded-xl bg-primary/4 border border-primary/8 p-5 mb-5 gradient-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3 w-3 text-accent" />
                <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">{"BIO"}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {"独立游戏开发者 & AI 开发者。2021年10月起深入学习 Unreal Engine，从地编到蓝图再到 C++ 开发，逐步成长为全栈游戏开发者。曾参与2023年乌镇世界互联网峰会项目（UE5 + AI），并在 AI 领域掌握了大模型对话、图像生成、视频处理、TTS 及 RAG 等技术。"}
              </p>
            </div>
            <Link
              href="/about"
              className="btn-glow inline-flex items-center gap-2 text-sm font-medium text-primary px-5 py-2.5 rounded-xl border border-primary/15 bg-primary/5 hover:bg-primary/10 transition-all"
            >
              {"查看完整介绍"} <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionCard>

          {/* Projects brief */}
          <SectionCard id="projects" title="项目经历 / Projects" icon={<Laptop className="h-4 w-4" />} revealDirection="up" delay="0.6s">
            <div className="flex flex-col gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                <span className="text-sm text-muted-foreground">{"Unreal Engine 游戏与交互体验开发"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent/50" />
                <span className="text-sm text-muted-foreground">{"AI 驱动的数字艺术与展览项目"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neon-green/50" />
                <span className="text-sm text-muted-foreground">{"国际峰会与双年展技术项目"}</span>
              </div>
            </div>
            <Link
              href="/projects"
              className="btn-glow inline-flex items-center gap-2 text-sm font-medium text-primary px-5 py-2.5 rounded-xl border border-primary/15 bg-primary/5 hover:bg-primary/10 transition-all"
            >
              {"查看我的项目"} <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionCard>

          {/* Personal Statement */}
          <SectionCard
            id="statement"
            title="个人自述 / Statement"
            icon={<UserCircle className="h-4 w-4" />}
            revealDirection="up"
            delay="0.7s"
          >
            <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                {"大家好，这是一段关于我个人经历的分享。2021年10月，我开始接触并学习 Unreal Engine 相关技术，当时用的是 4.26 版本，至今仍是记忆犹新。"}
              </p>
              <p>
                {"学习之初，我并没有直接接触编程，而是先从地编入手。那段时间，我花了大量时间在模型制作、UV 拆分、光照烘焙、贴图绘制、材质调试以及场景搭建上，甚至还深入研究了粒子特效。蓝图对那时的我而言，还是一片陌生的领域。"}
              </p>
              <p>
                {"做了一些简单场景后，我意识到自己不满足于此。我想要的是做出一款真正的游戏，于是我开始学习蓝图，制作了一些小项目。随后发现仅靠蓝图远远不够，便从 C 语言入手，逐渐掌握 C++，最终进入了 UE 的 C++ 编程领域。"}
              </p>
              <p>
                {"我曾有一次宝贵的实习经历，期间利用 UE5 结合 AI 技术，参与了由习近平主席致辞的2023年乌镇世界互联网峰会项目。此后我开始系统学习 AI，掌握了大模型对话、图像生成、视频处理、语音合成（TTS）及检索增强生成（RAG）等技术。"}
              </p>
              <p>
                {"我很喜欢\"独立游戏开发者\"这个称号，也许是因为它带有一种独行侠的意味。如今我越来越觉得自己在向全栈开发者方向靠近，但仍需继续努力。我依然渴望制作一款令自己满意的游戏。"}
              </p>
            </div>
          </SectionCard>

          {/* Gallery */}
          <SectionCard id="pictures" title="相关图片 / Gallery" icon={<Images className="h-4 w-4" />} revealDirection="scale" delay="0.6s">
            <p className="text-sm text-muted-foreground mb-5">{"点击图片查看大图"}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((img) => (
                <button
                  key={img.src}
                  className="img-zoom group relative aspect-square rounded-xl overflow-hidden card-scan"
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
                    <span className="text-[10px] text-foreground font-medium truncate font-mono">
                      {img.alt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Contact */}
          <SectionCard id="contact" title="联系我 / Contact" icon={<Mail className="h-4 w-4" />} revealDirection="up" delay="0.5s">
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {"个人比较少看邮箱，回复可能较慢。如果您有项目合作意向，我会尽快回复。"}
            </p>
            <a
              href="mailto:q244645787@gmail.com"
              className="inline-flex items-center gap-2 text-primary font-mono text-sm glow-cyan hover:underline"
            >
              {"q244645787@gmail.com"}
              <ExternalLink className="h-3 w-3" />
            </a>
          </SectionCard>

          {/* Footer */}
          <footer className="flex flex-col items-center gap-6 py-10">
            <div className="divider-glow w-full" />

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/LinJohn8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>

            {/* Network Analytics Dashboard */}
            <VisitorCounter variant="dashboard" className="w-full" />

            <p className="text-[10px] text-muted-foreground/30 font-mono tracking-wider">
              {"// 2025 林翰 (Han Lin) | Next.js + Three.js + TailwindCSS"}
            </p>
          </footer>
        </div>
      </div>

      {/* === Right Visual Panel === */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 relative">
        <MatrixRain opacity={0.025} />
        <ParticleCanvas />
      </div>

      <ScrollToTopButton />

      <Lightbox
        src={lightboxImg?.src ?? ""}
        alt={lightboxImg?.alt ?? ""}
        isOpen={!!lightboxImg}
        onClose={() => setLightboxImg(null)}
      />
    </div>
  )
}
