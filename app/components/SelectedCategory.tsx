"use client"
import React, { useState } from 'react'
import { categoryItems } from '../libs/categoryItems'
import { Card, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

type Props = {}

const SelectedCategory = (props: Props) => {
  const [selected,SetSelected]=useState<string|undefined>(undefined);
  return (
    <div className='grid grid-cols-4 gap-8 mt-10 w-4/5 mx-auto'>

       <input type='hidden' name='category' value={selected as string}></input> 
{
    categoryItems.map((item,id)=>(
     <div className='cursor-pointer ' key={id} >
        <Card onClick={()=>{SetSelected(item.title)}} className={selected==item.title ? "border-primary border-2 flex flex-col items-center justify-center p-2 ": "border items-center justify-center border-black flex flex-col p-2"} >
            <CardHeader className='flex flex-col w-fit items-center justify-center p-2'>
                <Image src={item.imageUrl} width={35} height={35 } alt='Image' >
                </Image>
                <p className='font-semibold'>{item.title}</p>
            </CardHeader>
        </Card>
        </div>
    ))
}

    </div>
  )
}

export default SelectedCategory