import React from "react";
import { Tarjeta } from './Tarjeta';
import { Sidebar } from "./Sidebar";

const NuestrosCoches = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <Tarjeta/>
    </div>
  );
};

export default NuestrosCoches;