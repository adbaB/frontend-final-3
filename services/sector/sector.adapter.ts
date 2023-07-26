import { Sector, SectorEndpoint } from "@/models/sector.models";

function sectorAdapter (sectorEndpoint: SectorEndpoint):Sector{
  return {
    id: sectorEndpoint.id,
    descripcion: sectorEndpoint.descripcion,
    idZona : sectorEndpoint.idZona,
    zonaCatastral : sectorEndpoint.zonaCatastral,
    estado : sectorEndpoint.estado
  }

}
export {sectorAdapter}