import { Skeleton } from "@/app/components/Skeleton"
import SkeletonCard from "@/app/components/SkeletonCard"



type Props = {}

const loading = (props: Props) => {
  return (
    
    <div className="w-[75%] mx-auto mt-10">
        <Skeleton className="h-4 w-1/3"></Skeleton>
        <Skeleton className="w-full h-[550px] mt-5"></Skeleton>
        <div className="mt-8 flex justify-between gap-x-24 ">
            <div className="w-2/3">
              <Skeleton className='h-4 w-1/3'></Skeleton>
             <Skeleton className="h-4 w-1/3 mt-3"></Skeleton>
            </div>

        </div>

    </div>
  )
}

export default loading