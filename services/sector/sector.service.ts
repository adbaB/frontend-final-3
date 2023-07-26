import { Sector, SectorEndpoint } from "@/models/sector.models";
import axios from "axios";
import { sectorAdapter } from "./sector.adapter";



export async function findAllSectores(){
  const options = {method: 'GET', url: 'http://localhost:3002/sector/'};
  try {
   const response = await axios.request(options)
   const dataFormatted: Sector[] = response.data.map((sector: SectorEndpoint)=>{

    return sectorAdapter(sector)
   }) 
   return dataFormatted
  } catch (error) {
    console.error(error);
    return []
  }
}