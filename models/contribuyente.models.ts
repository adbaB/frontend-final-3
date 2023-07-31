export interface ContribuyenteEndpoint {
  id: number;
  ruc: string;
  numeroIdentificacion: string;
  nombre: string;
  typeContribuyente: TypeContribuyente;
  direccion: string;
  telefono: string;
  correo: string;
  parroquia: Parroquia | null;
  sector: Sector | null;
  estado: Estado;
}

export interface Contribuyente {
  id: number;
  ruc: string;
  numeroIdentificacion: string;
  nombre: string;
  typeContribuyente: TypeContribuyente;
  direccion: string;
  telefono: string;
  parroquia: Parroquia | null;
  sector: Sector | null;
  correo: string;
  estado?: Estado;
}

export interface ContribuyenteCreate {
  numeroIdentificacion: string;
  nombre: string;
  typeContribuyente: TypeContribuyente;
  direccion: string;
  parroquia: string;
  sector: string;
  telefono: string;
  correo: string;
}
export interface ContribuyenteUpdate  extends Partial<ContribuyenteCreate> {
  estado?: Estado
}

export enum Estado {
  Activo = "activo",
  Inactivo = "inactivo",
  Suspendido = "suspendido",
}
export interface Parroquia {
  id: string;
  descripcion: string;
  estado: boolean;
}
export interface Sector {
  id: string;
  idZona: number;
  descripcion: string;
  zonaCatastral: number;
  estado: boolean;
}

export enum TypeContribuyente {
  PersonaJuridica = "persona juridica",
  PersonaNatural = "persona natural",
  PersonaNaturalComercial = "persona natural comercial",
}
