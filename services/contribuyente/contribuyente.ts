import { Contribuyente, ContribuyenteCreate, ContribuyenteEndpoint } from "@/models/contribuyente.models";
import axios from "axios";
import {contribuyenteAdapter } from "./contribuyente.adapter";



export async function findAllContribuyente(){
  const options = {
    method: "GET",
    url: "http://localhost:3002/contribuyente",
  };
  try {
    const response  = await axios.request(options)
    const dataFormatted: Contribuyente[] = response.data.map((contribuyente: ContribuyenteEndpoint)=>{
       return contribuyenteAdapter(contribuyente)
    })
    return dataFormatted
  } catch (error) {
    console.error(error);
  }
}
export async function createContribuyente(data:ContribuyenteCreate){

  const options = {
    method: 'POST',
    url: 'http://localhost:3002/contribuyente',
    headers: {'Content-Type': 'application/json'},
    data
  };
  try {
    const response = await axios.request(options)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function findOneContribuyente(id:number){

  const options = {
    method: "GET",
    url: `http://localhost:3002/contribuyente/${id}`,
  };
  try {
    const response  = await axios.request(options)
    const dataFormatted: Contribuyente = contribuyenteAdapter(response.data)
    return dataFormatted
  } catch (error) {
    console.error(error);
  }
}