'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"

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

import { put } from '@/services/mongo'
import { update } from '@/services/postgres'

const SheetBody = ({ order, setName, setValue, handleEdit }:any) => {
    const form = useForm()

    return (
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
        <SheetFooter className="grid grid-cols-4">
            <SheetClose asChild>
            <Button
                className="col-start-2 col-span-3 md:col-start-6 md:col-span-1"
                type="submit"
                disabled={form.formState.isSubmitting}
                onClick={form.handleSubmit(handleEdit)}
            >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
            </SheetClose>
        </SheetFooter>
    </SheetContent>
    )
}

export default function MySheet({ order, mutate, db, dropdown = false }: any) {

    const [name, setName] = useState(order.name)
    const [value, setValue] = useState(order.value)
    const [isOpen, setIsOpen] = useState(false)

    const handleEdit = async () => {
        const newOrder = {
            ...order,
            name,
            value
        }
        if (db === "mongo") {
            await put(newOrder)
            mutate()
            setIsOpen(false)
        } else {
            await update(newOrder)
            mutate()
            setIsOpen(false)
        }
    }

    if ( dropdown ) {
        return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="flex w-full">
            <PencilSquareIcon className="h-4 w-4 mr-2" />
            <span>Edit</span>
        </SheetTrigger>
        <SheetBody
            order={order}
            setName={setName}
            setValue={setValue}
            handleEdit={handleEdit}
        />
    </Sheet>
        )
    }

    return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <SheetBody
            order={order}
            setName={setName}
            setValue={setValue}
            handleEdit={handleEdit}
        />
    </Sheet>
  )
}
