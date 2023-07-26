import {  ContribuyenteCreate } from "@/models/contribuyente.models"


function contribuyenteInterceptor (endPointContribuyente: any):ContribuyenteCreate{

  return {
    numeroIdentificacion: endPointContribuyente.cedula,
    nombre: endPointContribuyente.nombre,
    typeContribuyente : endPointContribuyente.typeContribuyente,
    direccion: endPointContribuyente.direccion,
    parroquia: endPointContribuyente.parroquia,
    sector: endPointContribuyente.sectores,
    telefono : endPointContribuyente.telefono,
    correo: endPointContribuyente.email,
  }
}
export {contribuyenteInterceptor}

