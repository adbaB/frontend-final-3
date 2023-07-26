import { Parroquia } from "@/models/parroquia.models"
import { findAllParroquias } from "@/services/parroquia/parroquia.service"
import { useCallback, useEffect, useState } from "react"

function useParroquia(){
  
  const [parroquia, setParroquia] = useState<Parroquia[]|[]>([])
  useEffect(()=>{
    findAllParroquias().then((response)=>{
      setParroquia(response)
    })
  },[])
  function getParroquiasId():[string,...string[]]{
    const ids = parroquia?.map((parroquia)=>{
      return parroquia.id
    })
    return [ids[0],...ids.slice(1)] 
   }
  return {parroquia,setParroquia,getParroquiasId}
}

export {useParroquia}