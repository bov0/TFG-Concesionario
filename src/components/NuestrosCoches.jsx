import React from "react";
import { Tarjeta } from './Tarjeta';
import { Sidebar } from "./Sidebar";

export const NuestrosCoches = () => {

  return (
    <div className="flex">
     <Sidebar/>
     <Tarjeta rating={4}/>
    </div>
  );
};
