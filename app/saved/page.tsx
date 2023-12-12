'use client'

import useSWRInfinite from 'swr/infinite'

import Loading from '@/components/Loading'
import Error from '@/components/Error'
import Search from '@/components/Search'
import Checkbox from '@/components/Checkbox'

import { SiMongodb as MongoIcon } from "react-icons/si";
import { BiLogoPostgresql as PostgresIcon } from "react-icons/bi";
import { ArrowPathIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import SavedLoading from '@/components/SavedLoading'

const fetcher = (url:string) => fetch(url).then(res => res.json())
const LIMIT = 4

export default function Saved ({
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
      `/api/saved?q=${query}&limit=${LIMIT}&page=${
        index + 1
      }`,
    fetcher
  );

  // if (isLoading) return <Loading />

  // if (error) return <Error />

  const orders = data ? [].concat(...data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 2)
  const isRefreshing = isValidating && data && data.length === size

  const getLocaleDate = (date:string) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
  }

  const getLocaleTime = (date:string) => {
    const newDate = new Date(date)
    return newDate.toLocaleTimeString().split(':').slice(0, 2).join(':').concat(' ', newDate.toLocaleTimeString().split(' ')[1])
  }

  return <div className="flex min-h-screen flex-col gap-3 w-full py-4">
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
    <div className="grid md:grid-cols-2 gap-4">
      <div className="col-span-full">
        <Search />
      </div>
      {isEmpty ? <div className="flex px-4 py-8 items-center justify-center">Yay, no cards found.</div> : null}
      {isLoading ? <SavedLoading /> :
        error ? <Error /> : null}
      {orders.map((order:any) =>
        <div 
          key={order.id}
          className="rounded-xl border bg-gradient-to-t from-violet-400/50 to-violet-400/60 border-violet-300/50 flex flex-col gap-3 shadow-lg p-4"
        >
          <div className="flex justify-between">
            <div className="flex">
              {order.db === 'mongo' ? <MongoIcon className="h-10 w-10 text-slate-900" /> : <PostgresIcon className="h-10 w-10 text-slate-900" />}
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-violet-400/20 rounded-md">
              <span className="text-xs">Saved at</span>
              <span className="text-xs font-thin">{getLocaleTime(order.savedAt)}</span>
              <span className="text-xs font-thin">{getLocaleDate(order.savedAt)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span>{order.name}</span>
            <span>{order.value}</span>
          </div>
          <div className="flex items-center justify-between">
            <Checkbox
              className="px-3"
              order={order}
              mutate={mutate}
              db={order.db}
            />
            <DropdownMenu>
              <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-violet-400/20 px-3 py-0" >
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <span>Options</span>
              </TooltipContent>
              </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <PencilSquareIcon className="h-4 w-4 mr-2" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrashIcon className="h-4 w-4 mr-2" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
    <div className="flex col-span-full">
      {isEmpty ? null
      :
      <button
        className="flex-1 items-center justify-center rounded-xl text-white border border-slate-500 p-4 bg-slate-600 hover:bg-slate-700 hover:border-slate-600 transition-all disabled:bg-slate-400 disabled:border-slate-400 disabled:cursor-not-allowed"
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? "loading..."
          : isReachingEnd
          ? "no more cards"
          : "load more"}
      </button>
      }
    </div>
  </div>
}