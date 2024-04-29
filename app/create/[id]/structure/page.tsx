import { createCategory } from '@/app/action'
import SelectedCategory from '@/app/components/SelectedCategory'
import Selectedbutton from '@/app/components/Selectedbutton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = ({params}:{params:{id:string}}) => {
  return (
    <div className='w-3/5 mx-auto'>
        <h1 className='text-3xl font-semibold tracking-tight transition-colors'>
    Which is best describer of your home 
        </h1>
        <form action={createCategory}>
          <input type='hidden' name='homeId' value={params.id}></input>
          <SelectedCategory>
          </SelectedCategory>

<div className='fixed bottom-0 left-0 right-0 p-3 border-t bg-white border-black'>
  <div className='flex justify-between px-3 '>

    <Button variant="secondary" size={"lg"} asChild>
      
      <Link href="/">Cancel</Link>
      </Button>
     <Selectedbutton></Selectedbutton>
  </div>
  </div>

        </form>

    </div>
  )
}

export default page