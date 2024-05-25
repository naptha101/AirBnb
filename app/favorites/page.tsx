import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../libs/db"


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
      createdAt: true,
      photo:true
    } 
    }
      }
      

  });
  return response;
}
const page = async (props: Props) => {
  const {getUser}=await getKindeServerSession();
  const user=await getUser();
const data=await getData(user?.id as string);
//console.log(data);
  return (
    <div>page</div>
  )
}

export default page