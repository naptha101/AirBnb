import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const SkeletonCard = (props: Props) => {
  return (
    <div className='flex flex-col space-y-2'>
     <Skeleton  className='h-72 w-fullS rounded-lg '>

     </Skeleton>
     <div className='flex flex-col space-y-2'>
     <Skeleton className='h-4 w-full'></Skeleton>
     <Skeleton className='h-4 w-3/4'></Skeleton>
     <Skeleton className='h-4 w-1/2'></Skeleton>
     </div>
     </div>
  )
}

export default SkeletonCard