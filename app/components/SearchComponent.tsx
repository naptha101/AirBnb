"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../libs/GetCountry";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import { Selectedbutton } from "./Selectedbutton";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "./Counter";

type Props = {};

const SearchComponent = (props: Props) => {
    
    const [flag, setFlag] = useState(1);
    
 const [locationValue,SetLocation]=useState("");
 const {getAllCountries}=useCountries();
function SubmitButtonLocal(){
    if(flag===1){
        return (
            
            <Button onClick={()=>{setFlag(flag+1)}}>
Next
            </Button>
        )
    }else if(flag===2){
      return (
        <Selectedbutton></Selectedbutton>
      )
    }
} 


    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex item-center cursor-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4">Anywhere</p>
                        <p className="px-4">Any Week</p>
                        <p className="px-4">Add Guests</p>
                    </div>
                    <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full"></Search>
                </div>
            </DialogTrigger>
            <DialogContent>
            <form className="gap-4 flex flex-col">
                <input type="hidden" name="country" value={locationValue}></input>
                {flag === 1 ? (
                    <>
                    
                        <DialogHeader>
                            <DialogTitle>Select Country</DialogTitle>
                            <DialogDescription>
                                Please choose a country, so that what you want
                            </DialogDescription>
                        </DialogHeader>
                        
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
                     
                    </SelectGroup>
                </SelectContent>
             </Select>
             <HomeMap locationValue={locationValue}></HomeMap>
             
                    </>
                ) : (
                    <>
                    <DialogHeader>
                        <DialogTitle>Select all info</DialogTitle>
                        <DialogDescription>
                            Please choose a country, so that what you want
                        </DialogDescription>
                    </DialogHeader>
                    <Card>
          <CardHeader className='flex flex-col gap-y-3'>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Guests</h2>
        <p className='text-xl '>How many guests do you want ?</p>
        </div>
        <Counter name="guest"></Counter>
       </div>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Rooms</h2>
        <p className='text-xl '>How many Rooms are available ?</p>
        </div>
        <Counter name='rooms'></Counter>
       </div>
       <div className='flex p-2 justify-between'>
        <div className='flex flex-col gap-2'>
        <h2 className='underline font-semibold'>Bathroom</h2>
        <p className='text-xl '>How many Bathroom are available ?</p>
        </div>
        <Counter name='bathrooms'></Counter>
       </div>
 
          </CardHeader>
        </Card>
                    </>
                )}
                <DialogFooter>
                <SubmitButtonLocal></SubmitButtonLocal>
                </DialogFooter>
            </form>
            </DialogContent>
        </Dialog>
    );
};

export default SearchComponent;
