
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import prisma from "../libs/db";
import NoHotel from "../components/NoHotel";
import CardHotel from "../components/CardHotel";
import { Skeleton } from "../page";


type Props = {}

const getData=async (id:string)=>{

    const data=await prisma.reservation.findMany({
        where:{
            userId:id
        },
        select:{
            
           home:{
                select:{
                    id:true,
                    title:true,
                    description:true,
                    country:true,
                    price:true,
                    photo:true,
                    Favorite:{
                        where:{
                            userId:id
                        }
                    }
                }
            }
        }
    })
    return data;
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
    export const SpreadData= async ()=>{
    
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
                key={item.home.id}
                  description={item.home.description as string}
                  id={item.home.id as string}
                  price={item.home.price as number}
                  photo={item.home.photo as string}
                  userId={user?.id}
                  country={item.home.country as string}
                  isInFavourite={item?.home.Favorite.length > 0 ? true:false}
                  FavId={item?.home.Favorite[0]?.id as string}
                  pathname="/reservation"
                  >
                </CardHotel>
              ))}
            </div>}
    
      </>
      
      );
    
    }
    
    export default page