import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warden Property Search',
  description: 'Weather-based property search application',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}