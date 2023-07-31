"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Contribuyente,
  Estado,
  TypeContribuyente,
} from "@/models/contribuyente.models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useContribuyente } from "../hooks/useContribuyente";
import { useFormContribuyente } from "../register/hooks/useFormContribuyente";
import { useInputCedula } from "../register/hooks/useInputCedula";

interface PropsContribuyente {
  params: {
    idContribuyente: string;
  };
}
function Contribuyente({ params }: PropsContribuyente) {
  const { getOneContribuyente } = useContribuyente();
  const [contribuyente, setContribuyente] = useState<
    Contribuyente | undefined
  >();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    getOneContribuyente(+params.idContribuyente).then((response) => {
      console.log(response);
      setContribuyente(response);
    });
  }, [params.idContribuyente, getOneContribuyente]);

  const {
    tipoContribuyenteArray,
    parroquia,
    sectores,
    getFilteredParroquia,
    getFilteredSector,
    filteredParroquia,
    filteredSector,
    updateSchema,
    onUpdateForm,
    estadoArray
  } = useFormContribuyente();

  const { handlerChange } = useInputCedula();

  const value = {
    nombre: contribuyente?.nombre || "",
    cedula: contribuyente?.numeroIdentificacion || "",
    telefono: contribuyente?.telefono || "",
    direccion: contribuyente?.direccion || "",
    email: contribuyente?.correo || "",
    parroquia: contribuyente?.parroquia?.id || "",
    sectores: contribuyente?.sector?.id || "",
    typeContribuyente:
      contribuyente?.typeContribuyente ||
      TypeContribuyente.PersonaNaturalComercial,
    estado: contribuyente?.estado || Estado.Suspendido
  };
  const form = useForm<Zod.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      nombre: "",
      cedula: "",
      telefono: "",
      direccion: "",
      email: "",
      parroquia: "",
      sectores: "",
    },
    values: value,
  });
  return (
    <div className="h-full">
      <div
        className={`mt-6 px-10 py-3 border pb-5 ${
          !isEdit ? "border-slate-200" : " border-slate-300"
        }  rounded-xl shadow-md`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data)=>  (onUpdateForm(+params.idContribuyente,data,setIsEdit)))} className="mt-4">
            <div className="flex justify-end">
              {!isEdit ? (
                <>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    <Edit />
                    <p className="font-bold">Editar</p>
                  </Button>
                </>
              ) : (
                <div className="flex gap-3 ">
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setIsEdit(false);
                      form.reset(value);
                    }}
                  >
                    <X />
                    <p className="font-bold">Cancelar</p>
                  </Button>
                  <Button className="flex gap-3 p-3 bg-green-600 hover:bg-green-500" 
                  >
                    <Save />
                    <p className="font-bold"

                    >Guardar</p>
                  </Button>
                </div>
              )}
            </div>
            <h1 className=" text-2xl font-medium uppercase mb-5">
              Contribyente:
              <span className="font-bold pl-2">{contribuyente?.ruc}</span>
            </h1>
            <div className="flex gap-12 mb-4">
              <FormField
                control={form.control}
                name="cedula"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cedula</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[250px]"
                        autoComplete="off"
                        disabled={!isEdit}
                        {...field}
                        {...form.register("cedula", {
                          onChange: (e) => {
                            handlerChange(e, field);
                          },
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nombre/Razón Social</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        {...field}
                        autoComplete="off"
                        disabled={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start gap-12 mb-4 flex-wrap	">
              <FormField
                control={form.control}
                name="typeContribuyente"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Razón Social</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={!isEdit}
                            className={cn(
                              "w-[250px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? tipoContribuyenteArray.find(
                                  (tipo) =>
                                    TypeContribuyente[
                                      tipo.value
                                    ].toLowerCase() === field.value
                                )?.label
                              : "Razón Social"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Razón Social..." />
                          <CommandEmpty>No Encotrado.</CommandEmpty>
                          <CommandGroup>
                            {tipoContribuyenteArray.map((tipo) => (
                              <CommandItem
                                value={TypeContribuyente[tipo.value]}
                                key={tipo.value}
                                onSelect={(value) => {
                                  form.setValue(
                                    "typeContribuyente",
                                    value as any
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    TypeContribuyente[tipo.value] ===
                                      field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tipo.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="flex gap-10 w-full justify-start"> */}
                <FormField
                  control={form.control}
                  name="parroquia"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Parroquia</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!isEdit}
                              className={cn(
                                "w-[250px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? parroquia.find(
                                    (parroquia) => parroquia.id === field.value
                                  )?.descripcion
                                : "Parroquia"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="w-[250px] p-0">
                          <ScrollArea className="h-72 w-full rounded-md border">
                            <Command shouldFilter={false}>
                              <CommandInput
                                placeholder="Parroquias..."
                                onValueChange={(search) => {
                                  getFilteredParroquia(search);
                                }}
                              />
                              <CommandEmpty>
                                Parroquia no encontrada.
                              </CommandEmpty>
                              <CommandGroup>
                                {filteredParroquia.map((parroquia) => (
                                  <CommandItem
                                    value={parroquia.id}
                                    key={parroquia.id}
                                    onSelect={(value) => {
                                      form.setValue("parroquia", value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        parroquia.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {parroquia.descripcion}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sectores"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel>Sector</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={!isEdit}
                              className={cn(
                                "w-[70%] min-w-[250px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? sectores.find(
                                    (sectores) => sectores.id === field.value
                                  )?.descripcion
                                : "Sector"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <ScrollArea className="h-72 w-full rounded-md border">
                            <Command shouldFilter={false}>
                              <CommandInput
                                placeholder="Sectores..."
                                onValueChange={(search) => {
                                  getFilteredSector(search);
                                }}
                              />
                              <CommandEmpty>Sector no encontrado.</CommandEmpty>
                              <CommandGroup>
                                {filteredSector.map((sectores) => (
                                  <CommandItem
                                    value={sectores.id}
                                    key={sectores.id}
                                    onSelect={(value) => {
                                      form.setValue("sectores", value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        sectores.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {`${sectores.idZona}-${sectores.descripcion}`}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              {/* </div> */}
            </div>
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="direccion"
                render={({ field }) => (
                  <FormItem className="w-[59%] mb-4">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Direccion..."
                        className="resize-none"
                        autoComplete="off"
                        disabled={!isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" mb-4 w-[45%]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electronico</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="off"
                          disabled={!isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-6 items-center">

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[250px]"
                      {...field}
                      disabled={!isEdit}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Estado</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={!isEdit}
                            className={cn(
                              "w-[250px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? estadoArray.find(
                                  (tipo) =>
                                                    tipo.value
                                     === field.value
                                )?.value
                              : "Estado"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Razón Social..." />
                          <CommandEmpty>No Encotrado.</CommandEmpty>
                          <CommandGroup>
                            {estadoArray.map((tipo) => (
                              <CommandItem
                                value={tipo.value}
                                key={tipo.value}
                                onSelect={(value) => {
                                  form.setValue(
                                    "estado",
                                    value as any
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    tipo.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tipo.value}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div>
        <Card></Card>
      </div>
      <div className="h-[50%]">
        <div className="flex gap-10 mt-10 md:max-lg:block">
          <Card className="w-[60%] md:max-lg:w-full h-[50%] md:max-lg:h-[30%]">
            <CardHeader>
              <CardTitle>Liquidaciones</CardTitle>
              <CardDescription>Ultimas liquidaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex font-bold gap-2 border-b-2 border-blue-600 pb-3 mb-4">
                <p className="grow">N° Liquidación</p>
                <p className="grow">Fecha</p>
                <p className="grow">Monto</p>
                <p>Estado</p>
              </div>
              <ScrollArea className="h-[200px] md:h-[100px]">
                <div className="flex gap-4 border-2 rounded-lg p-4 items-center mt-2 text-sm">
                  <div className="grow font-medium">0000015845</div>
                  <div className="font-medium grow text-sm">2023/01/23</div>
                  <div className="font-bold grow text-sm">100000.52</div>
                  <div className="bg-yellow-400 p-1 rounded-lg px-3 capitalize font-semibold text-sm">
                    pendiente
                  </div>
                </div>
                <div className="flex gap-4 border-2 rounded-lg p-4 items-center mt-2 text-sm">
                  <div className="grow font-medium">0000015845</div>
                  <div className="font-medium grow text-sm">2023/01/23</div>
                  <div className="font-bold grow text-sm">100000.52</div>
                  <div className="bg-yellow-400 p-1 rounded-lg px-3 capitalize font-semibold text-sm">
                    pendiente
                  </div>
                </div>
                <div className="flex gap-4 border-2 rounded-lg p-4 items-center mt-2 text-sm">
                  <div className="grow font-medium">0000015845</div>
                  <div className="font-medium grow text-sm">2023/01/23</div>
                  <div className="font-bold grow text-sm">100000.52</div>
                  <div className="bg-yellow-400 p-1 rounded-lg px-3 capitalize font-semibold text-sm">
                    pendiente
                  </div>
                </div>
                <div className="flex gap-4 border-2 rounded-lg p-4 items-center mt-2 text-sm">
                  <div className="grow font-medium">0000015845</div>
                  <div className="font-medium grow text-sm">2023/01/23</div>
                  <div className="font-bold grow text-sm">100000.52</div>
                  <div className="bg-yellow-400 p-1 rounded-lg px-3 capitalize font-semibold text-sm">
                    pendiente
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="w-[40%]">
            <CardHeader>
              <CardTitle>inspecciones </CardTitle>
              <CardDescription>Ultimas inspecciones </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Contribuyente;
