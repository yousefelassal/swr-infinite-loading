import { useState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { createOrder } from '@/app/(home)/postgres/actions'
import { useForm } from 'react-hook-form'

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

export default function Form({ name, setName, value, setValue, handleSubmit }:any) {
  // const [state, formAction] = useFormState(createOrder, initialState)
  const form = useForm()
    return <form 
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
      {/* <Submit /> */}
      {/* <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p> */}
    </form>
}
