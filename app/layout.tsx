import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'SWR Infinite Loading',
  description: 'Fullstack data fetching app using MondoDB, Postgres, and SWR',
}

const tabs = [
  { href: '/', label: 'Mongo' },
  { href: '/postgres', label: 'Postgres' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Nav tabs={tabs} />
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
