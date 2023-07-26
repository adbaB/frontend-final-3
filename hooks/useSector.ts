import { Sector } from "@/models/sector.models"
import { findAllSectores } from "@/services/sector/sector.service"
import { useEffect, useState } from "react"

function useSector (){

  const [sectores, setSectores] = useState<Sector[]|[]>([])

  useEffect(()=>{
    findAllSectores().then((response)=>{
      setSectores(response)
    }).catch(error => {
      setSectores([])
      console.log(error)
    })
  },[])

  function getIdsSectores():[string,...string[]]{
    const ids = sectores?.map((sector)=>{
      return sector.id
    })
    return [ids[0],...ids.slice(1)]
  }
  return {sectores,setSectores,getIdsSectores}
}

export { useSector}