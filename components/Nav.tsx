'use client'

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"

type Tab = {
    href: string
    label: string
}

export default function Nav({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname()

  return (
    <>
        <div className="flex bg-white flex-row gap-2 items-center justify-center w-screen">
            {tabs.map((tab) => (
                <Link key={tab.label} href={tab.href} className={`flex flex-col gap-1 relative items-center text-xs justify-center py-2 px-4 ${pathname === tab.href ? 'text-[#2563eb]' : 'text-gray-900 hover:text-gray-500'} cursor-pointer transition-colors`}>
                    <span className="z-10 font-medium">{tab.label}</span>
                    {
                        pathname === tab.href && (
                            <>
                                <motion.div 
                                    layout
                                    layoutId="bg"
                                    className="absolute w-full h-full bg-gradient-to-r from-[#2563eb]/10 to-blue-400/10"
                                    transition={{type: 'spring', bounce: 0.5, duration: 0.5}}
                                    initial={false}
                                />
                                <motion.div 
                                    layout
                                    layoutId="underline"
                                    className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-[#2563eb] to-blue-400"
                                    transition={{type: 'spring', bounce: 0.5, duration: 0.5}}
                                    initial={false}
                                />
                            </>
                        )
                    }
                </Link>
            ))}
        </div>
        </>
  )
}
