import { useState } from 'react'
import { useFormStatus } from 'react-dom'

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
    
    return <form onSubmit={handleSubmit} className="grid sm:flex gap-2">
      <input
        className="rounded-xl sm:flex-1 border border-slate-700 p-2 bg-slate-800 text-white"
        type="text"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="rounded-xl sm:flex-1 border border-slate-700 p-2 bg-slate-800 text-white"
        type="text"
        placeholder="value"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Submit />
    </form>
}
