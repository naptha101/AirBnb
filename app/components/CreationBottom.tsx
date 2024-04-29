import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Selectedbutton from './Selectedbutton'

type Props = {}

const CreationBottom = (props: Props) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-3 border-t bg-white border-black'>
    <div className='flex justify-between px-3 '>
  
      <Button variant="secondary" size={"lg"} asChild>
        
        <Link href="/">Cancel</Link>
        </Button>
       <Selectedbutton></Selectedbutton>
    </div>
    </div>
  )
}

export default CreationBottom