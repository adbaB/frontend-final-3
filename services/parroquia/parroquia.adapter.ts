import { Parroquia, ParroquiaEndpoint } from "@/models/parroquia.models";

export function parroquiaAdapter(parroquia: ParroquiaEndpoint ):Parroquia{

  return{
    id: parroquia.id,
    descripcion: parroquia.descripcion,
    estado: parroquia.estado,
  }
}