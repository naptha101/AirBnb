import countries from "world-countries"


const countryFct=countries.map((item)=>({
    value:item.cca2,
    label: item.name.common,
    flag:item.flag,
    latLang: item.latlng,
    region:item.region
}))
export const useCountries:any=()=>{
   // console.log(countryFct);
    const getAllCountries=()=>     countryFct
    
    const getCountryByValue=(value:string)=>{
     //console.log(countryFct)

       return countryFct.find((item)=> item.value===value)
    }
    return{
        getAllCountries,
        getCountryByValue
    }
}