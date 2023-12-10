import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import './globals.css'
import MainNav from '@/components/MainNav'

export const metadata: Metadata = {
  title: 'SWR Infinite Loading',
  description: 'Fullstack data fetching app using MondoDB, Postgres, and SWR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <MainNav />
        <div className="md:ml-60">
          {children}
        </div>
      </body>
    </html>
  )
}
