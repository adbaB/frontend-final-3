"use client";
import { Button } from "@/components/ui/button";
import { BackpackIcon, GearIcon, CircleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Logo } from "./components/Logo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

export const Sidebar = () => {
  return (
    <div className="w-[15%] min-w-[200px] border-r border-gray-300 border-dashed ">
      <div >
      <Logo />
      <ul className="mt-5 px-5">
        <li>
          <Button
            variant={"link"}
            asChild
            className="hover:text-blue-800 hover:font-bold p-0"
          >
            <Link href={"/home/contribuyente"}>
              <BackpackIcon className="mr-2 h-4 w-4" />
              <p>Contribuyente</p>
            </Link>
          </Button>
        </li>
        <li>
          <Accordion type="single" collapsible>
            <AccordionItem value="configuracion">
              <AccordionTrigger>
                <p className="hover:text-blue-800 hover:font-bold flex">
                  <GearIcon className="mr-2 h-4 w-4" />
                  Configuración
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                  <Button
            variant={"link"}
            asChild
            className="hover:text-blue-800 hover:font-bold"
          >
            <Link href={"/home/contribuyente"}>
              <CircleIcon className="mr-2 h-2 w-2" />
              <p>Parroquias</p>
            </Link>
          </Button>
                  </li>
                  <li>
                  <Button
            variant={"link"}
            asChild
            className="hover:text-blue-800 hover:font-bold"
          >
            <Link href={"/home/contribuyente"}>
              <CircleIcon className="mr-2 h-2 w-2" />
              <p>Sectores</p>
            </Link>
          </Button>
                  </li>
                  <li>
                  <Button
            variant={"link"}
            asChild
            className="hover:text-blue-800 hover:font-bold"
          >
            <Link href={"/home/contribuyente"}>
              <CircleIcon className="mr-2 h-2 w-2" />
              <p>Tipo de Contribuyente</p>
            </Link>
          </Button>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
      </ul>
      </div>

    </div>
  );
};
