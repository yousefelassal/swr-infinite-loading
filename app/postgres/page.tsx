'use client'

import useSWRInfinite from 'swr/infinite'
import { create, del, update } from '@/actions/postgres'
import { useState } from 'react'

import Form from '@/components/Form'
import ItemsLoading from '@/components/ItemsLoading'
import Loading from '@/components/Loading'
import Search from '@/components/Search'
import Sheet from '@/components/Sheet'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const getKey = (pageIndex:any, previousPageData:any) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `/api?page=${pageIndex}&limit=2`                    // SWR key
}

const fetcher = (url:string) => fetch(url).then(res => res.json())
const LIMIT = 2

export default function Postgres ({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const query = searchParams.q ?? '';
  const {
    data,
    mutate,
    size,
    setSize,
    error,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index:any) =>
      `/api/postgres?q=${query}&limit=${LIMIT}&page=${
        index + 1
      }`,
    fetcher
  );

  // if (isLoading) return <Loading />
  
  if (error) return <div>failed to load</div>

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    await create(name, value)
    mutate()
    setName('')
    setValue('')
  }

  const handleEdit = async (id:any, name:any, value:any) => {
    await update(id, name, value)
    mutate()
  }

  const orders = data ? [].concat(...data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 2)
  const isRefreshing = isValidating && data && data.length === size
 
  return <div className="flex flex-col gap-3 w-full p-4">
    <div className="flex justify-between">
      <p>
        {isLoading ? "loading..." : 
        `${orders.length} orders listed`
        }
      </p>
      <button disabled={isRefreshing} onClick={() => mutate()}>
        {isRefreshing ? "refreshing..." : "refresh"}
      </button>
    </div>
    <div className="flex flex-col gap-4">
      <Search />
      {isEmpty ? <div className="flex px-4 py-8 items-center justify-center">Yay, no orders found.</div> : null}
      {isLoading && <ItemsLoading />}
      {orders.map((order:any) =>
        <div 
          key={order.id}
          className="rounded-xl border bg-violet-900 border-violet-800 flex shadow-lg p-4"
        >
          <div className="flex flex-1 gap-2 items-center justify-center">
            <span>{order.name}</span>
            <span>{order.value}</span>
          </div>
          <div className="flex">
          <Sheet order={order} mutate={mutate} handleEdit={handleEdit} />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:bg-violet-400/20 text-violet-400" variant="ghost">
              <TrashIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
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
              <Button variant="destructive" onClick={
                async () => {
                  await del(order.id)
                  mutate()
                }}
              >
                Delete
              </Button>
            </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        </div>
        </div>)}
    </div>
    <button
      className="rounded-xl text-white border border-slate-500 p-4 bg-slate-600 hover:bg-slate-700 hover:border-slate-600 transition-all disabled:bg-slate-400 disabled:border-slate-400 disabled:cursor-not-allowed"
      disabled={isLoadingMore || isReachingEnd}
      onClick={() => setSize(size + 1)}
    >
      {isLoadingMore
        ? "loading..."
        : isReachingEnd
        ? "no more issues"
        : "load more"}
    </button>
    <Form name={name} setName={setName} value={value} setValue={setValue} handleSubmit={handleSubmit} />
  </div>
}