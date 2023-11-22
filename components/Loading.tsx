export default function Loading() {
  return (
    <div className="flex flex-col gap-3 w-full p-4">
    <div className="flex justify-between">
      <div className=" animate-pulse bg-gray-600 h-6 w-16 rounded-lg" />
      <div className=" animate-pulse bg-gray-600 h-6 w-16 rounded-lg" />
    </div>
    <div className="flex flex-col gap-4">
      <div className="rounded-xl animate-pulse bg-gray-600 h-14 w-full" />
      <div className="rounded-xl animate-pulse bg-gray-600 h-14 w-full" />
      <div className="rounded-xl animate-pulse bg-gray-600 h-14 w-full" />
      <div className="rounded-xl animate-pulse bg-gray-600 h-14 w-full" />
      <div className="rounded-xl animate-pulse bg-gray-600 h-14 w-full" />
    </div>
    
    <div className="grid sm:flex gap-2">
        <div className="rounded-xl sm:flex-1 h-10 animate-pulse bg-gray-600" />
        <div className="rounded-xl sm:flex-1 h-10 animate-pulse bg-gray-600" />
        <div className="rounded-xl sm:w-20 h-10 animate-pulse bg-gray-600" />
    </div>
  </div>
  )
}
