import Image from 'next/image'
import React from 'react'
import { useCountries } from '../libs/GetCountry'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Favourite, FavouriteDelete } from './Selectedbutton'
import {FavNot,FavDel} from '../action'
type Props = {}

const CardHotel = ({ id, description, photo, country, price ,userId,
isInFavourite,FavId,pathname

}: { id: string, description: string, photo: string, country: string, price: number,userId:string|undefined,isInFavourite:boolean, FavId:string,pathname:string }) => {
   // console.log(country)
    const { getCountryByValue } = useCountries()
    const countryName = getCountryByValue(country)
    

    return (
        <div className='flex flex-col'>
            <div className='relative h-72 p-2'>
              { 
              
              userId&&<div className='top-2 right-2 z-10 absolute'>
                {
                   isInFavourite?<form action={FavDel} >
                     <input hidden={true} value={FavId} name='favouriteId'></input>
               <input hidden={true} value={userId} name='userId'></input>
               <input hidden={true} value={pathname} name='pathname'></input>
                    <FavouriteDelete></FavouriteDelete>
                    </form>:<form
                   action={FavNot}
                   >
               <input hidden={true} value={id} name='homeId'></input>
               <input hidden={true} value={userId} name='userId'></input>
               <input hidden={true} value={pathname} name='pathname'></input>
                    <Favourite></Favourite>
                   </form>
                }
                </div> }
                <Image className='rounded-lg' src={`https://mdqbkdqhsopdlyiirink.supabase.co/storage/v1/object/public/Images/${photo}`} fill alt='Image' ></Image>
            </div>

            <Link className='p-2 pb-0' href={`/home/${id}`}>
                <h1>
                    {countryName?.flag}/ {countryName.label}
                    <br></br>
                    <span className="region">{countryName.region}</span>
                </h1>
            </Link>
            <div className='flex flex-col p-2 pt-0'>
                <h2 className="text-muted-foreground text-xs line-clamp-2  ">{description}</h2>
               <h1 className='flex'><p className="font-bold ">${price}</p>/Night</h1>
            </div>
        </div>
    )
}

export default CardHotel;
