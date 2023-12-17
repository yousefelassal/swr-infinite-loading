import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Error() {
  const router = useRouter()
  return (
    <div className="w-full py-4 gap-2 h-full flex flex-col items-center justify-center text-center">
        <ExclamationCircleIcon className="w-20 h-20 text-red-500" />
        <span>
            Oops something went wrong.
        </span>
        <Button variant="ghost" onClick={router.refresh} >
          Retry
        </Button>
    </div>
  )
}
