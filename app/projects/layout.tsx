import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "项目经历",
  description: "林翰的项目经历、展览比赛和插件开发。",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
