import { Parroquia, ParroquiaEndpoint } from "@/models/parroquia.models";
import axios from "axios";
import { parroquiaAdapter } from "./parroquia.adapter";



export async function findAllParroquias (){
  const options = { method: "GET", url: "http://localhost:3002/parroquia" };
  try{
   const response = await axios.request(options)
    const dataFormatted:Parroquia[] = response.data.map((parroquia:ParroquiaEndpoint)=>{
      return parroquiaAdapter(parroquia)
    })
    return dataFormatted
  }catch(error){
    console.error(error);
    return []

  }

}