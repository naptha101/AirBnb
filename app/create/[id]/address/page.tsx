// import Map from '@/app/components/Map'
"use client"
import { address } from '@/app/action'
import CreationBottom from '@/app/components/CreationBottom'
import { useCountries } from '@/app/libs/GetCountry'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

type Props = {}

const page = ({params}:{params:{id:string}}) => {
    const {getAllCountries,getCountryByValue}=useCountries();

    const [locationValue,SetLocation]=useState("");
    const LazyMap= dynamic(
      ()=>import('@/app/components/Map'),
      {
        ssr:false,
        loading:()=><Skeleton className='h-[50vh] w-full'></Skeleton>
      }
    )

  return (
    <div>
  <div className='w-3/4 mx-auto'>
    <h1 className=' font-bold tracking-tight font-sans text-xl md:text-4xl'>Where is your home located</h1>
  </div>

  <form action={address}>
  <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
    <div className='w-3/5 my-10 mx-auto'>
        <div className='mb-5'>
             <Select required onValueChange={(c)=>SetLocation(c)}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a country"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Counteries</SelectLabel>
                        {getAllCountries().map((item:any)=>(
                       <SelectItem key={item.value} value={item.value}>
                        {item.flag}{item.label}/{item.region}
                       </SelectItem>
                       
                        ))

                        }
                      dsvdsv
                    </SelectGroup>
                </SelectContent>
             </Select>

        </div>
        <LazyMap lacationValue={locationValue}></LazyMap>

    </div>
    <CreationBottom></CreationBottom>
  </form>

    </div>
  )
}

export default page