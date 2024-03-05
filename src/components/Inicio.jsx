import React from "react";
import { Image } from "@nextui-org/react";

const Inicio = () => {
  return (
    <div className="flex justify-items-center align-middle mx-auto w-10/12 h-100">
      <section className="w-10/12">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Concesionario
        </h1>
        <p>
          Explora la excelencia automotriz en nuestro concesionario, donde cada
          vehículo refleja calidad y estilo. Desde elegantes sedanes hasta
          todoterrenos robustos, estamos aquí para hacer realidad tus sueños de
          conducción. Visítanos y encuentra tu automóvil perfecto.
        </p>
      </section>

      <Image
        className="w-10/12 mx-auto"
        src="https://scene7.toyota.eu/is/image/toyotaeurope/Corolla-14:Small-Landscape?ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0"
        alt="cocheInicio"
      />
    </div>
  );
};

export default Inicio;
