import React from "react";
import { Tarjeta } from "./Tarjeta";
import { Opciones } from "./Opciones";

export const NuestrosCoches = () => {
  return (
    <div className="flex">
     <Opciones/>
     <Tarjeta/>
    </div>
  );
};
