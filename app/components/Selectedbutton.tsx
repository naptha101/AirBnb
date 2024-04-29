"use client"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { useFormStatus } from 'react-dom'

type Props = {}

const Selectedbutton = (props: Props) => {
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

export default Selectedbutton