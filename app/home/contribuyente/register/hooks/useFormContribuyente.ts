import { useToast } from "@/components/ui/use-toast";
import { useParroquia } from "@/hooks/useParroquia";
import { useSector } from "@/hooks/useSector";
import { Parroquia } from "@/models/parroquia.models";
import { Sector } from "@/models/sector.models";
import { createContribuyente, updateContribuyente } from "@/services/contribuyente/contribuyente";
import { createContribuyenteInterceptor, updateContribuyenteInterceptor } from "@/services/contribuyente/contribuyente.interceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as zod from "zod";
import { Estado, TypeContribuyente } from "@/models/contribuyente.models";

function useFormContribuyente() {
  const { toast } = useToast()
  const { getParroquiasId, parroquia } = useParroquia();
  const { getIdsSectores, sectores } = useSector();
  const route = useRouter()

 
  const tipoContribuyenteArray : {label:string, value:"PersonaNatural"|"PersonaJuridica"|"PersonaNaturalComercial" }[] = [
    { label: "Persona Natural", value: "PersonaNatural" },
    {
      label: "Persona Juridica",
      value: "PersonaJuridica",
    },
    {
      label: "Persona Natural Comercial",
      value: "PersonaNaturalComercial",
    },
  ];
  const estadoArray: {value:Estado}[] = [
    {value:Estado.Activo},
    {value:Estado.Inactivo},
    {value:Estado.Suspendido}
  ]

  const [filteredParroquia, setFilteredParroquia] = useState<Parroquia[] | []>(
    []
  );
  const [filteredSector, setFilteredSector] = useState<Sector[] | []>([]);

  useEffect(() => {
    setFilteredParroquia(parroquia);
    setFilteredSector(sectores);
  }, [parroquia, sectores]);

  const schema = zod.object({
    cedula: zod.string().min(7, "CI/RIF no valido").max(15, "CI/RIF no valido"),
    nombre: zod
      .string()
      .min(3, "Nombre no valido")
      .max(150, "Nombre no valido"),
    typeContribuyente: zod.nativeEnum(TypeContribuyente),
    direccion: zod.string().min(10, "direccion no valida"),
    parroquia: zod.enum(getParroquiasId()),
    sectores: zod.enum(getIdsSectores()),
    telefono: zod
      .string()
      .min(10, "telefono no valido")
      .max(15, "telefono no valido"),
    email: zod.string().email("email no valido"),
  });

  const updateSchema = zod.object({
    cedula: zod.string().min(7, "CI/RIF no valido").max(15, "CI/RIF no valido"),
    nombre: zod
      .string()
      .min(3, "Nombre no valido")
      .max(150, "Nombre no valido"),
    typeContribuyente: zod.nativeEnum(TypeContribuyente),
    direccion: zod.string().min(10, "direccion no valida"),
    parroquia: zod.enum(getParroquiasId()),
    sectores: zod.enum(getIdsSectores()),
    telefono: zod
      .string()
      .min(10, "telefono no valido")
      .max(15, "telefono no valido"),
    email: zod.string().email("email no valido"),
    estado: zod.nativeEnum(Estado)
  });
  const form = useForm<Zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      cedula: "",
      telefono: "",
      direccion: "",
      email: "",
    },
  });

  function getFilteredParroquia(search: string): void {
    const data = parroquia.filter((parroquia) =>
      parroquia.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    search ? setFilteredParroquia(data) : setFilteredParroquia(parroquia);
  }


  function getFilteredSector(search: string): void {
    const data = sectores.filter((sector) =>
      sector.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    search ? setFilteredSector(data) : setFilteredSector(sectores);
  }


  async function onSubmitForm (data: Zod.infer<typeof schema>){
    const dataFormatted = createContribuyenteInterceptor(data)
    const responseData =  await createContribuyente(dataFormatted)
    console.log(responseData)
    toast({
      variant: responseData?.data.ruc? "default": "destructive",
      title: responseData?.data.ruc ? `Registro completado RUC: ${responseData?.data.ruc}`: "Algo ha salido mal",
      description:responseData?.data.ruc ? "Registro exitoso... redireccionando al perfil de contribuyente" : "comuniquese con soporte tecnico"
    })
    if (responseData?.data.id) {
      route.push(`${responseData.data.id}`)
    }
  
    
  }
  async function onUpdateForm(id:number,data: Zod.infer<typeof updateSchema>,handlerUpdate: Function) {
   const dataFormatted = updateContribuyenteInterceptor(data)
   const responseData = await updateContribuyente(id,dataFormatted)
   if(responseData?.data.affected){
     toast({
      title: 'Contribuyente Actualizado correctamente'
     })
   }
   handlerUpdate(false)
  }
  return {
    schema,
    updateSchema,
    form,
    tipoContribuyenteArray,
    estadoArray,
    parroquia,
    getFilteredParroquia,
    getFilteredSector,
    filteredParroquia,
    filteredSector,
    sectores,
    onSubmitForm,
    onUpdateForm
  };
}

export { useFormContribuyente };
