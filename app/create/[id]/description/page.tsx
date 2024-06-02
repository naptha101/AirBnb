import { createRoom } from '@/app/action'
import Counter from '@/app/components/Counter'
import CreationBottom from '@/app/components/CreationBottom'
import ImageInput from '@/app/components/ImageInput'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'

type Props = {}

const page = ({params}: {params:{id:string}}) => {
  return (
    <div >
   <div className='w-3/5 mx-auto'>
    <h1 className='text-[30px] font-bold font-sans underline'>Describe your Home!..</h1>
    </div>
    <form
    action={createRoom }
     className='w-3/5 mx-auto my-10 flex flex-col gap-4'
    >
      <input hidden name='homeId' value={params.id}></input>
        <div className='flex flex-col gap-y-2'>
        <label className='text-[18px]'>Title</label>
        <Input name='title' type='text' required title='Enter Title'></Input>
        </div>
        <div className='flex flex-col gap-y-2'>
        <label className='text-[18px]'>Description</label>
        <Textarea name='description'  required title='Enter Description'></Textarea>
       
        </div>
        <div className='flex flex-col gap-y-2'>
        <label className='text-[18px]'>Price</label>
        <Input name='price' type='number' required title='Enter price' min={10}></Input>
        </div>
       <ImageInput></ImageInput>
        <Card>
          <CardHeader className='flex flex-col gap-y-3'>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Guests</h2>
        <p className='text-xl '>How many guests do you want ?</p>
        </div>
        <Counter name="guest"></Counter>
       </div>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Rooms</h2>
        <p className='text-xl '>How many Rooms are available ?</p>
        </div>
        <Counter name='rooms'></Counter>
       </div>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Bathroom</h2>
        <p className='text-xl '>How many Bathroom are available ?</p>
        </div>
        <Counter name='bathrooms'></Counter>
       </div>
 
          </CardHeader>
        </Card>
        
        <CreationBottom></CreationBottom>
    </form>
  

    </div>
  )
}

export default page