import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { TrashIcon } from '@heroicons/react/24/outline'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { del as delMongo } from '@/services/mongo'
import { del as delPostgres} from '@/services/postgres'

const DialogBody = ({ handleDelete }:any) => {
    const form = useForm()
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Card</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this card?
                </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-8">
                <DialogClose>Cancel</DialogClose>
                <DialogClose asChild>
                <Button
                    variant="destructive"
                    type="submit"
                    onClick={form.handleSubmit(handleDelete)}
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Deleting..." : "Delete"}
                </Button>
                </DialogClose>
            </div>
        </DialogContent>
    )
}

export default function DeleteDialog({ className, order, mutate, db, dropdown = false }:any) {
  const [isOpen, setIsOpen] = useState(false)
  const handleDelete = async () => {
    if (db === "mongo") {
      await delMongo(order.id)
      mutate()
      setIsOpen(false)
    } else {
      await delPostgres(order.id)
      mutate()
      setIsOpen(false)
    }
  }

  if(dropdown) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="flex w-full">
            <TrashIcon className="h-4 w-4 mr-2" />
            <span>Delete</span>
          </DialogTrigger>
          <DialogBody handleDelete={handleDelete} />
        </Dialog>
        )
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
        <DialogTrigger asChild>
          <Button className={cn("hover:bg-violet-400/20 text-violet-400", className)} variant="ghost">
            <TrashIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
        Delete card
        </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        <DialogBody handleDelete={handleDelete} />
    </Dialog>
  )
}
