"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContribuyente } from "./hooks/useFormContribuyente";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Textarea } from "@/components/ui/textarea";
import { useInputCedula } from "./hooks/useInputCedula";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeContribuyente } from "@/models/contribuyente.models";

function RegisterContribuyente() {
  const {
    tipoContribuyenteArray,
    parroquia,
    sectores,
    getFilteredParroquia,
    getFilteredSector,
    filteredParroquia,
    filteredSector,
    form,
    onSubmitForm
  } = useFormContribuyente();

  const { handlerChange } = useInputCedula();



  return (
    <div className="mt-6 px-10">
      <h1 className="text-center text-2xl font-bold uppercase">
        Registro del contribuyente
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)} className="mt-4">
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
                    <Input className="w-full" {...field}  autoComplete="off"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-start gap-12 mb-4 	">
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
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? tipoContribuyenteArray.find(
                                (tipo) =>TypeContribuyente[tipo.value].toLowerCase() === field.value
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
                                  TypeContribuyente[tipo.value] === field.value
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
            <div className="flex gap-10 w-full justify-start">
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
                            className={cn(
                              "w-[250px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? parroquia.find(
                                  (parroquia) =>
                                    parroquia.id === field.value
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
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Sector</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
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
                      <Command  shouldFilter={false}>
                          <CommandInput placeholder="Sectores..." onValueChange={(search) => {
                                getFilteredSector(search);
                              }} />
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
            </div>
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
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input className="w-[250px]" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center items-center">
            <Button type="submit">Registrar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterContribuyente;
