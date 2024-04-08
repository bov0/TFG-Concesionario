import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardHeader, CardBody, Image,Button } from "@nextui-org/react";

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
  distAmbiental,
  cilindrada,
  tipCarr,
  color
}) => {
  return (
    <Card className="py-4 h-min">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{modeloNombre}</h4>
        <p className="text-default-500">{`ID: ${id}`}</p>
        <p className="text-default-500">{`Marca: ${marcaNombre}`}</p>
        <small className="text-default-500">{`Año ${anio}`}</small>
        <small className="text-default-500">{`Precio: ${precio}`}</small>
        <small className="text-default-500">{`Kilómetros: ${km}`}</small>
        <small className="text-default-500">{`Caja de cambios: ${cajaCambios}`}</small>
        <small className="text-default-500">{`combustible: ${combustible}`}</small>
        <small className="text-default-500">{`Distintivo: ${distAmbiental}`}</small>
        <small className="text-default-500">{`cilindrada: ${cilindrada}`}</small>
        <small className="text-default-500">{`carroceria: ${tipCarr}`}</small>
        <small className="text-default-500">{`color: ${color}`}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={`Imagen de ${modeloNombre}`}
          className="object-cover py-3 aspect-square"
          src={imagen || '../images/logo.jpg'}
          width={270}
          height={270}
        />
        <NavLink to={`/coche/${id}`} className="flex justify-center">
          <Button className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg">
            Ver más
          </Button>
        </NavLink>
      </CardBody>
    </Card>
  );
};

export default Tarjeta;