'use client'

import { useState } from "react"

import { PencilSquareIcon } from '@heroicons/react/24/outline'

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function MySheet({ order, handleEdit }: any) {

    const [name, setName] = useState(order.name)
    const [value, setValue] = useState(order.value)

    return (
    <Sheet>
        <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <SheetTrigger asChild>
        <Button className="hover:bg-violet-400/20 text-violet-400" variant="ghost">
            <PencilSquareIcon className="h-5 w-5" />
        </Button>
        </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
            Edit card
        </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        <SheetContent>
        <SheetHeader>
            <SheetTitle>Edit Card</SheetTitle>
            <SheetDescription>
            Make changes to the card
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name"className="text-right">
                Name
            </Label>
            <Input
                defaultValue={order.name}
                id="name" 
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
                Value
            </Label>
            <Input
                defaultValue={order.value}
                type="number"
                id="value"
                className="col-span-3" 
                onChange={(e) => setValue(e.target.value)}
            />
            </div>
        </div>
        <SheetFooter>
            <SheetClose asChild>
            <Button
                type="submit"
                onClick={() => {
                    const newOrder = {
                        id: order.id,
                        name,
                        value
                    }
                    handleEdit(newOrder)
                    }
                }
            >
                Save changes
            </Button>
            </SheetClose>
        </SheetFooter>
        </SheetContent>
    </Sheet>
  )
}
