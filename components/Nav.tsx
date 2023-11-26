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
    <div className="flex items-center p-2 justify-center w-screen">
        <div className="flex p-1 border border-gray-900 bg-gray-950 rounded-2xl flex-row gap-2 items-center justify-center min-w-[300px] w-1/2">
            {tabs.map((tab) => (
                <Link key={tab.label} href={tab.href} className={`flex rounded-xl flex-1 flex-col gap-1 relative items-center sm:text-lg justify-center p-4 ${pathname === tab.href ? 'text-[#ffffff]' : 'text-gray-300 hover:text-gray-100'} cursor-pointer transition-colors`}>
                    <span className="z-10 font-medium">{tab.label}</span>
                    {
                        pathname === tab.href && (
                            <>
                                <motion.div 
                                    layout
                                    layoutId="bg"
                                    className="absolute w-full h-full rounded-xl border border-gray-900 bg-gradient-to-b from-violet-300/20 to-violet-800/20"
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
