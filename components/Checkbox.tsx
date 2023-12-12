import { useState } from 'react'
import { BookmarkIcon as BookmarkOutline, ArrowPathIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { patch } from '@/services/mongo'
import { updateSaved } from '@/services/postgres'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Checkbox({ order, mutate, db }:any) {
  const [loading, setLoading] = useState(false)

    const handleCheck = async (newOrder:any) => {
        if (db === "mongo") {
            await patch(newOrder)
            mutate()
            setLoading(false)
        } else {
            await updateSaved(newOrder)
            mutate()
            setLoading(false)
        }
    }
  
  return (
    <TooltipProvider>
    <Tooltip>
    <TooltipTrigger asChild>
    <label htmlFor={`${order.id}`} className="block py-2 px-4 rounded-md hover:bg-violet-400/20 relative cursor-pointer select-none">
        <input 
            value={order.saved}
            onChange={() => {
                if (!loading) {
                    setLoading(true)
                    const newOrder = {
                        ...order,
                        saved: !order.saved,
                        savedAt: !order.saved ? new Date().toISOString() : null
                    }
                    handleCheck(newOrder)
                }}
            }
            id={`${order.id}`}
            type="checkbox"
            className="peer absolute opacity-0 h-0 w-0"
        />
        { order.saved ?
            <BookmarkIcon className="h-5 w-5 text-violet-400 hover:scale-110 relative top-0 left-0 transition-all duration-300" />
        : loading ? <ArrowPathIcon className="h-5 w-5 text-violet-400 relative top-0 left-0 transition-all animate-spin" />
        : <BookmarkOutline className="h-5 w-5 text-violet-400 hover:scale-110 relative top-0 left-0 transition-all duration-300" />
        }
    </label>
    </TooltipTrigger>
    <TooltipContent>
        { order.saved ? "Remove from saved" : "Save" }
    </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  )
}
