import { MakeReservation } from "@/app/action";
import ComponentShell from "@/app/components/ComponentShell";
import HomeMap from "@/app/components/HomeMap";
import ReactCal from "@/app/components/ReactData";
import { Reservationbutton } from "@/app/components/Selectedbutton";
import { useCountries as usedCountries } from "@/app/libs/GetCountry";
import prisma from "@/app/libs/db"
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";


type Props = {}

const fetchData=async (id:string)=>
    {
        const data=await prisma.home.findUnique({
            where:{id:id},
            select:{
                description:true,
                title:true,
                photo:true,
                categoryName:true,
                createdAt:true,
                price:true,
                country:true,
                guests:true,
                bedrooms:true,
                bathrooms:true,
                User:true,
                Reservation:{
                    where:{
                        homeId:id
                    }
                }
                
            }
        })
return data;
    }



const page = async ({params}: {params:{id:string}}) => {
    const data=await fetchData(params.id as string );
    const {getCountryByValue}=await usedCountries();
    const count=await getCountryByValue(data?.country);
   const {getUser}=await getKindeServerSession();
   const user=await getUser();
 //  console.log(count);




  return (
    
    <div className="w-[90%] mx-auto mt-10">
        
        <div className="flex flex-col items-center justify-center gap-5">
           
                <h1 className="text-3xl w-full align-start font-bold">{data?.title}</h1>
                <Separator className="h-[1px] bg-black" ></Separator>
            <div className="relative h-[550px] w-full">
            <Image className='rounded-lg ' fill src={`https://mdqbkdqhsopdlyiirink.supabase.co/storage/v1/object/public/Images/${data?.photo}`}  alt='Image' ></Image>
            </div>
        </div>
        <div className="flex justify-between w-full p-2">
        <div className="flex flex-col w-[70%] justify-between gap-x-24 mt-8 gap-3 ">
            <div className="w-full">
         <h1 className="font-bold font-xxl">{data?.country+" "+count?.label+"/"}{count?.region}</h1>
            </div>
            <div className="fles justify-between items-center">
                <p className="text-md text-muted-foreground">{data?.guests+" Guests * "+data?.bedrooms+" Bedrooms * "+data?.bathrooms+" Bathrooms"}</p>
            </div>
            <div className="flex justify-start items-center gap-3 w-[1/2] ">
                <img  src={data?.User?.profileName as string} className="rounded-full w-12 h-12" alt="Image">
                </img>
                <div className="flex flex-col p-2">
            <h1>{data?.User?.firstName}</h1> 
            <h1>Hosting since 2015</h1>
            </div>
            </div>
            <Separator className="h-[1px] bg-black" ></Separator>
            <div className="flex justify-start items-center gap-3 w-[1/2] ">
            <ComponentShell category={data?.categoryName as string}></ComponentShell>
            </div>
            <Separator className="h-[1px] bg-black" ></Separator>
            <p className="text-muted-foreground text-md h-[150px] overflow-y-scroll" style={{scrollbarWidth:"none"}}>
                {data?.description}
            </p>
            <Separator className="h-[1px] bg-black" ></Separator>
            <HomeMap locationValue={count?.value}></HomeMap>
        </div>
       
        <form action={MakeReservation} className="flex flex-col mt-24 ms-6">
            <input className="h-none" type="hidden" name='homeId' value={params.id}></input>
            <input className="h-none" type="hidden" name='userId' value={user?.id}></input>
  <ReactCal reservation={data?.Reservation } ></ReactCal>
  {
    user?.id ? <Reservationbutton></Reservationbutton>:
    <Link href={'https://airbh.kinde.com/auth/cx/_:nav&m:login&psid:6141abd1bd6b4e8fa092aed05db08d80'}  className="bg-black text-white font-bold p-2 rounded-lg w-[200px]">Login to make Reservation</Link>
    

  }

  </form>
  </div>

    </div>
  )
}

export default page