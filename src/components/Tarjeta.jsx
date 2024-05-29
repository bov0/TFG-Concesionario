import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const Tarjeta = ({
  id,
  modeloNombre,
  marcaNombre,
  anio,
  imagen,
  precio,
  km,
  cajaCambios,
  combustible,
}) => {
  return (
    <NavLink to={`/coche/${id}`} className="flex justify-center hover:scale-[1.01] transition-all ease-in h-fit">
      <Card isPressable className="py-4 h-min bg-default-50 shadow-xl rounded-xl">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{marcaNombre} {modeloNombre}</h4>
          <p className="text-default-500 font-bold">{`Precio: ${precio}€`}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={`Imagen de ${modeloNombre}`}
            className="object-cover py-3 aspect-square"
            src={imagen || '../images/logo.jpg'}
            width={250}
            height={250}
          />
          <div className="flex justify-around pb-2 flex-wrap">
            <small className="text-default-500 font-bold text-xs lg:text-sm">{anio}</small>
            <small className="text-default-500 font-bold text-xs lg:text-sm">{`${km} km`}</small>
            <small className="text-default-500 font-bold text-xs lg:text-sm">{combustible}</small>
            <small className="text-default-500 font-bold text-xs lg:text-sm">{cajaCambios}</small>
          </div>
        </CardBody>
      </Card>
    </NavLink>
  );
};

export default Tarjeta;