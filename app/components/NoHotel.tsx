import React from 'react'
import { File } from 'lucide-react'
type Props = {}

const NoHotel = (props: Props) => {
  return (
    <div className='flex flex-col min-h-[500px] items-center justify-center border border-black border-dashed  animate-in fade-in-50 mt-10 p-10'>

<div className='flex size-10 flex-col justify-center items-center rounded-full bg-primary/10'>
<File></File>
</div>
<h2 className='mt-10 text-xl font-bold'>No homes to show</h2>
    </div>
  )
}

export default NoHotel