"use client"
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

type Props = {}

const Counter = ({name}: {name:string}) => {
    const [guests,setGuest]=useState(0);
  return (
    <div className='flex items-center gap-2 justify-between'>
   <Button variant={'outline'} onClick={()=>{setGuest(guests+1)}} className='p-1'>
   <Plus></Plus>
   </Button>
   <input hidden value={guests} name={name}></input>
   <p className='font-bold text-xl' >
  {guests}
   </p>
<Button onClick={()=>{if(guests>0)setGuest(guests-1)}}  variant={'outline'} className='p-1'>
  
    <Minus></Minus>
</Button>

    </div>
  )
}

export default Counter