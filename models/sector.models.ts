export interface SectorEndpoint {
  id:            string;
  idZona:        number;
  descripcion:   string;
  zonaCatastral: number;
  createAt:      Date;
  estado:        boolean;
}

export interface Sector{
  id: string,
  idZona: number;
  descripcion:string,
  zonaCatastral:number,
  estado:boolean
}