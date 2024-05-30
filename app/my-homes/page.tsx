import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../libs/db"
import { redirect } from "next/navigation"
import { Suspense, use } from "react"
import NoHotel from "../components/NoHotel"
import CardHotel from "../components/CardHotel"
import { Skeleton } from "../page"



type Props = {}

async function GetData(userId:any) {
    const data=await prisma.home.findMany({
        where:{userId:userId,
            addedCategory:true,
            addedDescription:true,
            addedLocation:true
        },
        select:{ id: true, photo: true, description: true, price: true, country: true,
            Favorite:{
                where:{
                    userId:userId
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }

    })
    return data;
}

async function page(props:Props) {
    //console.log(searchParams?.filter)
    return (
      <main className="container  w-full mx-auto px-5 lg:px-10">
       
        <Suspense fallback={<Skeleton></Skeleton>} >
       <PageData></PageData>
        </Suspense>
      </main>
    );
  }

export const PageData = async (props: Props) => {
    const { getUser } = await getKindeServerSession();
  const user = await getUser();

  
    if(!user){
        
        return redirect('/');
    }
    
    const data=await GetData(user?.id);
    //console.log(data);
  return (
<section className="container mx-auto px-5 lg:px-10 mt-10 ">
<p className="px-2 py-2 w-full align-left text-3xl font-bold ">Your Listings:</p>
<div className="h-[1px] bg-black w-full"></div>

{
    (data.length === 0)?
    <NoHotel></NoHotel>:<div className="w-full grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 p-3 mt-4">
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
                  pathname="/my-homes"
                  >
                </CardHotel>
              ))
        }

    </div>
}


</section>
  )
}

export default page;