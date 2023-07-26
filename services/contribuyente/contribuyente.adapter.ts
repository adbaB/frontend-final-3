import {
  Contribuyente,
  ContribuyenteEndpoint,
} from "@/models/contribuyente.models";

function contribuyenteAdapter(
  endPointContribuyente: ContribuyenteEndpoint
): Contribuyente {
  return {
    id: endPointContribuyente.id,
    ruc: endPointContribuyente.ruc,
    numeroIdentificacion: endPointContribuyente.numeroIdentificacion,
    nombre: endPointContribuyente.nombre,
    typeContribuyente: endPointContribuyente.typeContribuyente,
    direccion: endPointContribuyente.direccion,
    telefono: endPointContribuyente.telefono,
    correo: endPointContribuyente.correo,
    parroquia: {
      id: endPointContribuyente.parroquia?.id || "",
      descripcion: endPointContribuyente.parroquia?.descripcion || "",
      estado: endPointContribuyente.parroquia?.estado || false,
    },
    sector: {
      id: endPointContribuyente.sector?.id || "",
      descripcion: endPointContribuyente.sector?.descripcion || "",
      idZona: endPointContribuyente.sector?.idZona || 0,
      zonaCatastral: endPointContribuyente.sector?.zonaCatastral || 0,
      estado: endPointContribuyente.sector?.estado || false,
    },
    estado: endPointContribuyente.estado,
  };
}
export { contribuyenteAdapter };
