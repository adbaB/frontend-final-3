import {  ContribuyenteCreate, ContribuyenteUpdate } from "@/models/contribuyente.models"


function createContribuyenteInterceptor (endPointContribuyente: any):ContribuyenteCreate{

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
function updateContribuyenteInterceptor (endPointContribuyente: any): ContribuyenteUpdate {
  let contribuyenteUpdate: ContribuyenteUpdate = {};
  if (endPointContribuyente.typeContribuyente)   contribuyenteUpdate.typeContribuyente = endPointContribuyente.typeContribuyente
  if (endPointContribuyente.cedula)   contribuyenteUpdate.numeroIdentificacion = endPointContribuyente.cedula
  if (endPointContribuyente.nombre)   contribuyenteUpdate.nombre = endPointContribuyente.nombre
  if (endPointContribuyente.direccion)   contribuyenteUpdate.direccion = endPointContribuyente.direccion
  if (endPointContribuyente.parroquia)   contribuyenteUpdate.parroquia = endPointContribuyente.parroquia
  if (endPointContribuyente.sectores)   contribuyenteUpdate.sector = endPointContribuyente.sectores
  if (endPointContribuyente.telefono)   contribuyenteUpdate.telefono = endPointContribuyente.telefono
  if (endPointContribuyente.email)   contribuyenteUpdate.correo = endPointContribuyente.email
  contribuyenteUpdate.estado = endPointContribuyente.estado
  return contribuyenteUpdate
}
export {createContribuyenteInterceptor, updateContribuyenteInterceptor}

