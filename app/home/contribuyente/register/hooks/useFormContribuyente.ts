import { useState } from "react";
import * as zod from "zod";


function useFormContribuyente(){
  enum TypeContribuyenteEnum  {
     PersonaNatural = "1",
     PersonaNaturalComercial ="2" ,
     PersonaJuridica = "3",
  }
  const schema = zod.object({
    cedula : zod.string().min(7,"CI/RIF no valido").max(15,"CI/RIF no valido"),
    nombre: zod.string().min(3, "Nombre no valido").max(150, "Nombre no valido"),
    typeContribuyente: zod.nativeEnum(TypeContribuyenteEnum),
    direccion : zod.string().min(10,"direccion no valida"),
    parroquia: zod.enum(["Germán Ríos Linares", "Ambrosio", "Carmen Herrera", "La Rosa", "San Benito", "Miguel Lara", "Jorge Hernández", "Rómulo Betancourt", "Punta Gorda"]),
    sectores: zod.enum(["Germán Ríos Linares 1", "Ambrosio 2 ", "Carmen Herrera 3", "La Rosa 4", "San Benito 5", "Miguel Lara 6", "Jorge Hernández 7", "Rémulo Betancourt 8", "Punta Gorda 9"]),
    telefono: zod.string().min(10,"telefono no valido").max(15,"telefono no valido"),
    email: zod.string().email("email no valido"),
  
  })
  const [typeContribuyentes,setTypeContribuyentes] = useState([])
  const [sectores,setSectores] = useState([])
  const [parroquias,setParroquias] = useState([])

  return { schema,TypeContribuyenteEnum}
}

export {useFormContribuyente}