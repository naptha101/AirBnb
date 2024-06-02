import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../libs/db"
import NoHotel from "../components/NoHotel";
import CardHotel from "../components/CardHotel";
import MapFiltering from "../components/MapFiltering";
import { Suspense } from "react";
import { Skeleton } from "../components/Skeleton";



type Props = {}
async function getData(userId:string) {
  const response= await prisma.favorite.findMany({
    where: {
       userId:userId    
       
    },
    select: {
      Home:{
    select:{  id: true,
      title: true,
      description: true,
      userId: true,
      price:true,
      country:true,
      Favorite:true,

      createdAt: true,
      photo:true
    } 
    }
      }
      

  });
  return response;
}
const page = async (props: Props) => {

//console.log(data);
  return (
    <main className="container  w-full mx-auto px-5 lg:px-10">
    
    <Suspense fallback={<Skeleton></Skeleton>} >
      <SpreadData></SpreadData>
    </Suspense>
  </main>
  
  );

}
 const SpreadData= async ()=>{
  const {getUser}=await getKindeServerSession();
  const user=await getUser();
const data=await getData(user?.id as string);
//console.log(data);
  return (
  <>
   {data.length === 0 ? <NoHotel></NoHotel> :
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-col-2 gap-8 mt-8 px-6">
          
          {
          
          data.map((item: any) => (
            
            <CardHotel
            key={item?.Home?.id}
              description={item?.Home?.description as string}
              id={item?.Home?.id as string}
              price={item?.Home?.price as number}
              photo={item?.Home?.photo as string}
              userId={user?.id}
              country={item?.Home?.country as string}
              isInFavourite={item?.Home.Favorite.length > 0 ? true:false}
              FavId={item?.Home?.Favorite[0]?.id as string}
              pathname="/favorites"
              >
            </CardHotel>
          ))}
        </div>}

  </>
  
  );

}

export default page