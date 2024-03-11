import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import axios from "axios";

export const Tarjeta = () => {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/coches');
      console.log(result.data);
      setCoches(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {coches.map((coche) => (
        <Card key={coche.id || Math.random()} className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{coche.id}</p>
          <small className="text-default-500">{`Año ${coche.anio}`}</small>
          <h4 className="font-bold text-large">{coche.modelo}</h4>
          <p className="font-bold text-large">{`${coche.km} km`}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2"></CardBody>
      </Card>
      ))}
    </div>
  );
};
