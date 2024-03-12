import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

const Tarjeta = ({ modeloNombre, marcaNombre, anio, imagen }) => {
  return (
    <Card className="py-4 h-min">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{modeloNombre}</h4>
        <p className="text-default-500">{`Marca: ${marcaNombre}`}</p>
        <small className="text-default-500">{`Año ${anio}`}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={`Imagen de ${modeloNombre}`}
          className="object-cover py-3 aspect-square"
          src={imagen || '../images/logo.jpg'}
          width={270}
          height={270}
        />
      <Button className="bg-purple-800 text-white font-bold">
        Ver mas
      </Button>  
      </CardBody>
    </Card>
  );
};

export default Tarjeta;