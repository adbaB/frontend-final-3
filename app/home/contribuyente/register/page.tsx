"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { set, useForm } from "react-hook-form";
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
import { BaseSyntheticEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function RegisterContribuyente() {
  const { schema, TypeContribuyenteEnum } = useFormContribuyente();
  const [InputCedula, setInputCedula] = useState<string>("");

  const languages = [
    { label: "Persona Natural", value: TypeContribuyenteEnum.PersonaNatural },
    {
      label: "Germán Ríos Linares",
      value: TypeContribuyenteEnum.PersonaNaturalComercial,
    },
    {
      label: "Persona Natural Comercial",
      value: TypeContribuyenteEnum.PersonaJuridica,
    },
  ];
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

  return (
    <div className="mt-6 px-10">
      <h1 className="text-center text-2xl font-bold uppercase">
        Registro del contribuyente
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(console.log)} className="mt-4">
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
                      {...field}
                      {...form.register("cedula", {
                        onChange: (e) => {
                          if (e.target.value.length === 1) {
                            if (InputCedula.length === 2) {
                              field.onChange("");
                              setInputCedula("");
                            } else {
                              if (e.target.value.match(/^[VGJEvgje]+$/)) {
                                field.onChange(
                                  `${e.target.value.toUpperCase()}-`
                                );
                                setInputCedula(
                                  `${e.target.value.toUpperCase()}-`
                                );
                              } else {
                                if (e.target.value.match(/^[0-9]+$/)) {
                                  field.onChange(`V-${e.target.value}`);
                                  setInputCedula(`V-${e.target.value}`);
                                } else {
                                  field.onChange("");
                                }
                              }
                            }
                          }
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
                <FormItem className="w-[70%]">
                  <FormLabel>Nombre/Razón Social</FormLabel>
                  <FormControl>
                    <Input className="w-full" {...field} />
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
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                            : "Razón Social"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Razón Social..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.value}
                              key={language.value}
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
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.label}
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
            <div className="flex gap-10 ">
              <FormField
                control={form.control}
                name="typeContribuyente"
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
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Parroquia"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Parroquias..." />
                          <CommandEmpty>Parroquia no encontrada.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.value}
                                key={language.value}
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
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
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
              <FormField
                control={form.control}
                name="typeContribuyente"
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
                              "w-[400px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Sector"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Sectores..." />
                          <CommandEmpty>Sector no encontrado.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.value}
                                key={language.value}
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
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
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
                  <FormItem >
                    <FormLabel>Correo Electronico</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input className="w-[250px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <div className="w-full flex justify-center items-center">

          <Button   type="submit">Registrar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterContribuyente;
