//login page with shadcn
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
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
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const schema = zod.object({
  username: zod
    .string()
    .min(1, "El usuario es requerido")
    .max(50, "El usuario es muy largo"),
  password: zod.string().min(1, "La contraseña es requerida"),
});
export default function Login() {
  const route = useRouter()
  const [error, setError] = useState<string>("");
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (data: zod.infer<typeof schema>) => {
    setError("")
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.error) return setError(res.error);
    route.replace("/")

  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col justify-center gap-3 items-center w-[50%] h-[70%] bg-slate-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-3">Inicio de sesión</h1>
        {error && (
          <Alert  variant={"destructive"} className="w-50 bg-red-600 text-white font-medium ">
            
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600">
              Ingresar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
