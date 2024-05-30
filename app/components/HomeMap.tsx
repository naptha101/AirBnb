import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"


type Props = {}

const HomeMap = ({locationValue}:{locationValue:string}) => {

    const LazyMap=dynamic(()=>import('./Map'),{
ssr:false,loading:()=><Skeleton className="h-[50vh] w-full"></Skeleton>
    })
 return <LazyMap lacationValue={locationValue}></LazyMap>
}

export default HomeMap