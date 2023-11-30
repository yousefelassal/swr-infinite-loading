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
        <div className="flex items-center justify-center w-full">
          <div className="flex-1 max-w-4xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
