'use client'

import useSWRInfinite from 'swr/infinite'
import { update } from './actions'

import Form from '@/components/Form'
import ItemsLoading from '@/components/ItemsLoading'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import Search from '@/components/Search'
import Sheet from '@/components/Sheet'
import Checkbox from '@/components/Checkbox'
import DeleteDialog from '@/components/DeleteDialog'

import { ArrowPathIcon } from '@heroicons/react/24/outline'

import { Button } from "@/components/ui/button"


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
  
  // if (error) return <div>failed to load</div>

  const orders = data ? [].concat(...data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 2)
  const isRefreshing = isValidating && data && data.length === size
 
  return <div className="flex flex-col gap-3 w-full py-4">
    <div className="flex justify-between">
      <p>
        {isLoading ? "loading..." : 
        `${orders.length} orders listed`
        }
      </p>
      <Button variant="ghost" disabled={isRefreshing} onClick={() => mutate()}>
        {isRefreshing ? <ArrowPathIcon className="h-5 w-5 animate-spin" />
         : "Refresh"}
      </Button>
    </div>
    <div className="flex flex-col gap-4">
      <Search />
      {isEmpty ? <div className="flex px-4 py-8 items-center justify-center">Yay, no cards found.</div> : null}
      {isLoading ? <ItemsLoading /> :
        error ? <Error /> : null}
      {orders.map((order:any) =>
        <div 
          key={order.id}
          className="rounded-xl border bg-violet-900 border-violet-800 flex shadow-lg p-4"
        >
          <div className="flex flex-1 gap-2 items-center justify-center">
            <span>{order.name}</span>
            <span>{order.value}</span>
          </div>
          <div className="flex items-center">
          <Checkbox order={order} mutate={mutate} db="postgres" />
          <Sheet order={order} db="postgres" mutate={mutate} />
          <DeleteDialog order={order} mutate={mutate} db="postgres" />
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
        ? "no more cards"
        : "load more"}
    </button>
    <Form mutate={mutate} db="postgres" />
  </div>
}