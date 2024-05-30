import Image from "next/image";
import { categoryItems } from "../libs/categoryItems"


type Props = {}

const ComponentShell = ({category}: {category:string}) => {
    const categoryInfo=categoryItems.find((data)=>data.title===category);

  return (
    <div
    className="flex items-center"
    >
<Image src={categoryInfo?.imageUrl as string} alt="category image" width={44} height={44}></Image>
<div className="flex flex-col ml-4 gap-2">
    <h1>{categoryInfo?.title}</h1>
     <h1 className="text-sm text-muted-foreground">{categoryInfo?.description}</h1>
</div>

    </div>
  )
}

export default ComponentShell