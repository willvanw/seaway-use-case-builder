import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seaway Use Case Guide | Enterprise AI Assessment',
  description: 'Discover the highest-impact enterprise AI use cases tailored to your organization through an interactive assessment.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
