"use client"
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import { useCountries } from '../libs/GetCountry';
import {  icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});
export default function Map({lacationValue}:{lacationValue:string}){
  const {getCountryByValue} =useCountries()
const position=getCountryByValue(lacationValue)?.latLang;
    return (
        
      <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={ICON}>
          <Popup>Here is your location</Popup>
      </Marker>
  </MapContainer>
    );
}