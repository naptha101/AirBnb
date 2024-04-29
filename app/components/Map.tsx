"use client"
import { MapContainer, TileLayer, useMap,Marker } from 'react-leaflet'
//import 'leaflet/dist/leaflet.css'
//import 'leaflet/dist/leaflet.css'
import { useCountries } from '../libs/GetCountry';
import {  icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});
export default function Map({lacationValue}:{lacationValue:string}){
  const {getCountryByValue} =useCountries()
const latlang=getCountryByValue(lacationValue)?.latLang;
    return (
        
        <MapContainer center={latlang??[51.505, -0.09]} className='w-[50vh] rounded-lg relative z-0' zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
   <Marker position={latlang ?? [52.505, -0.09]} icon={ICON} />
</MapContainer>
    );
}