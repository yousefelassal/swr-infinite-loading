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
        <div className="px-4 md:container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <MainNav />
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
