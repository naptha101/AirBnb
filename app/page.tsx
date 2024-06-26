import { Suspense } from "react";
import CardHotel from "./components/CardHotel";
import MapFiltering from "./components/MapFiltering";
import prisma from "./libs/db";
import SkeletonCard from "./components/SkeletonCard";
import NoHotel from "./components/NoHotel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Skeleton } from "./components/Skeleton";
import {unstable_noStore as nocache} from 'next/cache'

const data1 = async ({ searchParams, userId }: { searchParams?: { filter?: string,country?:string,guests?:string,rooms?:string,bathrooms?:string }, userId: string | undefined }) => {
 
 nocache();
  return await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country:searchParams?.country??undefined,
      guests:searchParams?.guests??undefined,
      bedrooms:searchParams?.rooms??undefined,
      bathrooms:searchParams?.bathrooms??undefined

      
    },
    select: {
      id: true, photo: true, description: true, price: true, country: true,
      
      Favorite:{
        where: {
        
          userId: userId ?? undefined
        }
      }
    }
  })
}

export default async function Home({ searchParams }: { searchParams?: { filter?: string,country?:string,guests?:string,rooms?:string,bathrooms?:string } }) {
  //console.log(searchParams?.filter)
  return (
    
    <main className="container  w-full mx-auto px-5 lg:px-10">
      <MapFiltering></MapFiltering>
      <Suspense fallback={<Skeleton></Skeleton>} key={searchParams?.filter}>
        <GetHome searchParams={searchParams}></GetHome>
      </Suspense>
    </main>
  );
}

 async function GetHome({ searchParams }: { searchParams?: { filter?: string,country?:string,guests?:string,rooms?:string,bathrooms?:string } }) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const data = await data1({ searchParams: searchParams, userId: user?.id });
//  console.log(user);
 
  return (
    <>
      {data.length === 0 ? <NoHotel></NoHotel> :
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-2 gap-8 mt-8">
          
          {
          
          data.map((item: any) => (
            
            <CardHotel
            key={item.id}
              description={item.description as string}
              id={item.id as string}
              price={item.price as number}
              photo={item.photo as string}
              userId={user?.id}
              country={item.country as string}
              isInFavourite={item?.Favorite.length > 0 ? true:false}
              FavId={item?.Favorite[0]?.id as string}
              pathname="/"
              >
            </CardHotel>
          ))}
        </div>}
    </>
  );
}

