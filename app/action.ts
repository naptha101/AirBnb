"use server"

import { redirect } from "next/navigation"
import prisma from "./libs/db"
import { Supabase } from "./libs/SupaClient";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const nodemailer=require('nodemailer');

export async function createAirbnb({userId}:{userId:string}){
    "use server"
    console.log("hello");
    const data= await prisma.home.findFirst({
        where:{
            userId:userId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    
    if(data === null){
        const data= await prisma.home.create({
            data:{
                userId:userId
            }
        }).catch((err)=>{
            console.log(err);
        })
        //console.log(data);
       return    redirect(`/create/${data?.id}/structure`);
    }else if(!data.addedCategory){
        return redirect(`/create/${data?.id}/structure`);
    }else if(data.addedCategory&&!data.addedDescription){
    return redirect(`/create/${data?.id}/description`);
    }
    else if(data.addedCategory&&data.addedDescription&&!data.addedLocation){
       return  redirect(`/create/${data.id}/address`);
    }
    else{
        const data= await prisma.home.create({
            data:{
                userId:userId
            }
        }).catch((err)=>{
            console.log(err);
        })
        //console.log(data);
       return    redirect(`/create/${data?.id}/structure`);

    }
}

export async function createCategory (formData:FormData) {
    const homeId=formData.get("homeId") as string;
    const category= formData.get("category") as string;

    const data=await prisma.home.update({
        where:{
          id:homeId
        }
        ,
        data:{ 
            categoryName: category ,
            addedCategory: true

        }
    })
    redirect(`/create/${data?.id}/description`);
}

export async function createRoom(formData:FormData){
    console.log('hello');
    const title= formData.get("title") as string;
    const description =formData.get("description") as string
    const price =formData.get("price") ;
    const image=formData.get("Image") as File;
    const guests=formData.get("guest") as string;
    const rooms=formData.get("rooms") as string;
    const bathrooms=formData.get("bathrooms") as string;
    const homeId=formData.get("homeId") as string;
    const {data}= await Supabase.storage.from('Images').upload(`${image.name}-${Date.now()}`,image,{
        cacheControl:"259200",
        contentType:'image/png'||'image/jpg'||'image/jpeg'
    })

    const room = await prisma.home.update({
        where:{
   id:homeId
    },
    data:{
        title:title,
        description:description,
        price:Number(price),
        guests:guests,
        bedrooms:rooms,
        bathrooms:bathrooms,
        photo:data?.path,
        addedDescription:true

    }

})

redirect(`/create/${homeId}/address`)


}
export async function address(formData:FormData){
    const homeId=formData.get("homeId") as string;
    const address=formData.get("countryValue") as string;
  const data=await prisma.home.update({
        where:{
            id:homeId
        },
        data:{
            country:address,
            addedLocation:true
        }
    });
    
   redirect('/');
}

export async function FavNot(formData:FormData) {
    const homeId=formData.get("homeId") as string;
    const userId=formData.get("userId") as string;
    const pathname=formData.get("pathname") as string;
    const data=await prisma.favorite.create({
        data:{
            homeId:homeId,
            userId:userId
        }
    })

    revalidatePath(pathname);
}

export async function FavDel(formData:FormData) {
    const favouriteId=formData.get("favouriteId") as string;
    const userId=formData.get("userId") as string;
    const pathname=formData.get("pathname") as string;

    const data=await prisma.favorite.delete({
        where:{
         id:favouriteId,
         userId:userId   
        }
    })

    revalidatePath(pathname);
}

export async function MakeReservation(formData:FormData){
    const homeId=formData.get("homeId") as string;
    const userId=formData.get("userId") as string;
    const startDate=formData.get("startDate") as string;
    const endDate=formData.get("endDate") as string;
 const {getUser}=await getKindeServerSession();
 const user=await getUser();

 const homeData = await prisma.home.findUnique({
    where:{
        id:homeId
    },
    select:{
        title:true,
        description:true,
        price:true,
        country:true,

    }
 });

    const data=await prisma.reservation.create({
        data:{
            homeId:homeId,
            userId:userId,
            startDate:startDate,
            endDate:endDate
            }
            });

             await MailController({
                email: user?.email, 
                startDate: new Date(startDate), 
                endDate: new Date(endDate), 
                homeInfo: homeData,
                homeId: homeId
              });
            
              // Assuming you have a redirect function defined somewhere
              redirect('/');
            }
            
            export async function MailController({ email, startDate, endDate, homeInfo, homeId }: { email: string|undefined|null, startDate: Date, endDate: Date, homeInfo: any, homeId: string }): Promise<void> {
              var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: process.env.MAIL_USER!,
                  pass: process.env.MAIL_PASS!
                }
              });
            
              const mailoption = {
                from: "yashverma2121212121@gmail.com",
                to: email,
                subject: `Reservation from ${startDate} to ${endDate}`,
                html: `
                  <p>You made a reservation for hotel ${homeInfo.title} at ${homeInfo.country}</p>
                  <p>Click: <a href="http://localhost:3000/home/${homeId}">Here</a> to view your house and details</p>
                `
              };
            
              const mail = await transport.sendMail(mailoption);
              console.log(mail);
            }