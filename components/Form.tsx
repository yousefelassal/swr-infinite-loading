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

export default function Form({ mutate }:any) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const handleSubmit = async (e:any) => {
      e.preventDefault()
      await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value })
      })
      mutate()
      setName('')
      setValue('')
    }
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
