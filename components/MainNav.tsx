'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

type Tab = {
    href: string
    label: string
}

export default function MainNav() {
  const pathname = usePathname()
  const tabs = [
    { href: '/', label: 'All', isActive: pathname === '/' || pathname === '/postgres' },
    { href: '/saved', label: 'Saved', isActive: pathname === '/saved' },
    { href: '/documentation', label: 'Documentation', isActive: pathname === '/documentation' },
  ]
  return (
    <div className="hidden md:flex fixed h-full w-64 p-4 mt-2">
        <div className="flex flex-col gap-3 h-fit p-2 w-full rounded-2xl bg-violet-950/20 border-violet-900/20">
            {tabs.map((tab) => (
                <Link href={tab.href} key={tab.label} className={`flex rounded-xl flex-col gap-1 relative items-center sm:text-lg justify-center p-4 ${tab.isActive ? 'text-white' : 'text-gray-300 hover:text-gray-100'} cursor-pointer transition-colors`}>
                    <span className="z-10 font-medium">{tab.label}</span>
                    {
                        tab.isActive && (
                            <>
                                <motion.div 
                                    layout
                                    layoutId="mainNavBg"
                                    className="absolute w-full h-full rounded-xl border border-violet-900/20 bg-gradient-to-b from-violet-300/20 to-violet-900/20"
                                    initial={false}
                                />
                            </>
                        )
                    }
                </Link>
            ))}
        </div>
    </div>
  )
}
