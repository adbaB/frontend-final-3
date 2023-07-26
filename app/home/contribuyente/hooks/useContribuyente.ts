import { Contribuyente } from "@/models/contribuyente.models"
import { findAllContribuyente,findOneContribuyente } from "@/services/contribuyente/contribuyente"
import { useState,useEffect, useCallback } from "react"

function useContribuyente(){
  
  const [contribuyente,setContribuyente] = useState<Contribuyente[] | undefined>([])
   const  getContribuyente = useCallback(async () =>{
    const response =  await findAllContribuyente()
    setContribuyente(response)
   },[]) 

   const getOneContribuyente = useCallback(async(id:number)=>{
    const response = await findOneContribuyente(id)
    return response
   },[])
  useEffect(() => {  
    getContribuyente()
  }, [getContribuyente])
  
  return {contribuyente,setContribuyente,getOneContribuyente}
}
export {useContribuyente}