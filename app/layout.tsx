import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: {
    default: '林翰 - 独立游戏开发者 & AI开发者',
    template: '%s | 林翰',
  },
  description: '独立游戏开发者 & 人工智能开发者，专注于Unreal Engine开发与AI技术融合。',
  keywords: ['林翰', 'LinJohn', '游戏开发', 'Unreal Engine', 'AI', '独立开发者'],
}

export const viewport: Viewport = {
  themeColor: '#050510',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
