'use client'

import { useEffect, useState } from 'react'
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { HomeIcon, BookmarkIcon, CodeBracketIcon  } from "@heroicons/react/24/solid"
import styles from '@/styles/nav.module.css'
import { useWindowSize } from "@uidotdev/usehooks";
import { useIsMounted } from "@/hooks/useIsMounted"

type Tab = {
    href: string
    label: string
    isActive: boolean
    icon: any
}

export default function MainNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { width } = useWindowSize()
  const isMounted = useIsMounted()
  const pathname = usePathname()
  const tabs:Tab[] = [
    { href: '/', label: 'Home', isActive: pathname === '/' || pathname === '/postgres', icon: HomeIcon },
    { href: '/saved', label: 'Saved', isActive: pathname === '/saved', icon: BookmarkIcon },
    { href: '/documentation', label: 'Documentation', isActive: pathname === '/documentation', icon: CodeBracketIcon },
  ]
  const toggle = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if(isMounted()) {
        setMounted(true)
    }
    }, [isMounted])


  const animateCss = () => {
    if(width! > 768) return
    return (
        mounted ?
        (open ? `flex ${styles.slideInTop}` : `${styles.slideOutTop}`)
        : 'hidden'
    )
  }

  return (
    <div className="sticky top-4 md:top-12 z-[9999]">
        { open && width! < 768 ? <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10" onClick={toggle} /> : null}
        <div className="md:hidden absolute top-3">
            <label className={styles.bar} htmlFor="check">
                <input
                    type="checkbox"
                    id="check"
                    checked={open}
                    onChange={toggle}
                />
                <span className={styles.top}></span>
                <span className={styles.middle}></span>
                <span className={styles.bottom}></span>
            </label>
        </div>
        <div className={`${animateCss()} absolute top-10 md:top-0 transition-all md:flex flex-col gap-3 h-fit p-2 w-full rounded-2xl bg-violet-950 md:bg-violet-950/20 border-violet-900 md:border-violet-900/20 z-[9999] shadow-md`}>
            {tabs.map((tab) => (
                <Link 
                    href={tab.href}
                    key={tab.label}
                    className={`flex rounded-xl flex-col gap-1 relative items-center sm:text-lg justify-center p-4 ${tab.isActive ? 'text-white' : 'text-gray-300 hover:text-gray-100'} cursor-pointer transition-colors`}
                    onClick={
                        () => {
                            if(width! > 768) return
                            setTimeout(() => {
                                setOpen(false)
                            }, 700)
                        }
                    }
                >
                    <div className="flex w-full items-center justify-start gap-2">
                        <tab.icon className="w-5 h-5" />
                        <span className="z-10 font-medium">{tab.label}</span>
                    </div>
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
            <div className="flex h-fit w-full justify-end">
                <a href="https://github.com/yousefelassal/swr-infinite-loading" className="group hover:scale-105 transition-all" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" fill="white" className="group-hover:fill-neutral-300"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
  )
}
