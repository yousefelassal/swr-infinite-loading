import { useState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { createOrder } from '@/app/(home)/postgres/actions'
import { useForm } from 'react-hook-form'

import { PlusIcon } from '@heroicons/react/24/outline'

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

const initialState = {
  message: '',
}

function Submit(){
    const { pending } = useFormStatus()
    return <button 
        disabled={pending}
        type="submit"
        className="rounded-xl border py-2 px-6 bg-slate-200 text-black hover:bg-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
     >
        {pending ? "saving..." : "save"}
     </button>
}

export default function Form({ isOpen, setIsOpen, setName, setValue, handleSubmit }:any) {
  // const [state, formAction] = useFormState(createOrder, initialState)
  const form = useForm()
    return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
              <button className="fixed p-4 w-40 hover:text-gray-200 bg-gradient-to-br border-violet-500 from-violet-600 to-violet-400 hover:bg-gradient-to-tl grid place-content-center text-white bottom-8 right-12 border z-50 rounded-full shadow-2xl text-lg hover:scale-[1.02] active:scale-95 transition-all">
                <PlusIcon className="h-6 w-6" />
              </button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          Create a new card
        </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    <SheetContent side="bottom">
      <SheetHeader>
        <SheetTitle>Create Card</SheetTitle>
        <SheetDescription>
          Create a new card
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name"className="text-right">
            Name
          </Label>
          <Input
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
          disabled={form.formState.isSubmitting}
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
        >
          {form.formState.isSubmitting ? "Saving..." : "Create"}
        </Button>
        </SheetClose>
      </SheetFooter>
    {/* <form 
        // action={formAction}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid sm:flex gap-2"
      >
      <input
        id="name"
        name="name"
        className="rounded-xl sm:flex-1 border border-slate-700 p-2 bg-slate-800 text-white"
        type="text"
        placeholder="name"
        value={name}
        autoComplete='off'
        onChange={e => setName(e.target.value)}
      />
      <input
        id="value"
        name="value"
        type="number"
        className="rounded-xl sm:flex-1 border border-slate-700 p-2 bg-slate-800 text-white"
        placeholder="value"
        value={value}
        autoComplete='off'
        onChange={e => setValue(e.target.value)}
      />
      <button disabled={form.formState.isSubmitting} type="submit" className="rounded-xl border py-2 px-6 bg-slate-200 text-black hover:bg-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed">
        {form.formState.isSubmitting ? "saving..." : "save"}
      </button>
      <Submit />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form> */}
    </SheetContent>
  </Sheet>
}
