"use client"
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom'

type Props = {}

 export function Selectedbutton(props: Props) {
    const {pending} = useFormStatus();
  return (
    <>
    {
    pending?(
        <Button type='submit' size='lg'>
          next
          <Loader2 className=' ml-2 animate-spin'></Loader2>
        </Button>
    ):(
        <Button type='submit' size={'lg'} >
        next
        </Button>
    )
   }
   </>
  )
}

export function Favourite(){
  const {pending}=useFormStatus();
  return (
  < >
  {
pending?
(
 <Button variant={'outline'} size={'icon'} disabled className='bg-primary-foreground'>

  <Loader2 className='h-4 w-4 animate-spin' > </Loader2>
 </Button>
)
:(<Button type='submit' variant={'outline'} size={'icon'}   className='p-2  bg-slate-200 rounded-md'>
<Heart  size={20}></Heart>

</Button>
)
  }
  
  </>
)
}
export function FavouriteDelete(){

  const {pending}=useFormStatus();
  
  return (

  < >
  {
pending?
(

 <Button variant={'outline'} size={'icon'} disabled className='bg-primary-foreground'>

  <Loader2 className='h-4 w-4 animate-spin' > </Loader2>
 </Button>
)
:(<Button type='submit' variant={'outline'} size={'icon'}   className='p-2  bg-slate-200 rounded-md'>
<Heart  size={20} fill='Red'></Heart>

</Button>
)
  }
  
  </>
)
}

