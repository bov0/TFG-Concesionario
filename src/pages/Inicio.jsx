import React from "react";
import imagenes from "../assets/imagenes";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const Inicio = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto md:w-8/12">
      <section className="w-8/12 text-center h-[95vh] flex flex-col justify-center items-center relative">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Compra tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-400 from-indigo-400">
            nuevo coche
          </span>{" "}
          en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            GetMyCar
          </span>
        </h1>
        <p className="w-8/12 text-center text-lg">
          Desde elegantes sedanes hasta todoterrenos robustos, estamos aquí
          para hacer realidad tus sueños de conducción.
        </p>
        <img src={imagenes.Flecha} className="w-16 absolute left-0 right-0 bottom-5 mx-auto" alt="imagenes.Flecha" />
      </section>


      <section className="flex flex-col 2xl:flex-row justify-center items-center gap-4 h-[100vh] 2xl:h-[40vh]">
        <aside className="flex flex-col gap-3 shadow-xl p-5 backdrop-blur-3xl bg-white/30 rounded-xl w-[80%] lg:w-[50%] 2xl:w-[50%]">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-400">
            ¡Bienvenido a GetMyCar!
          </p>
          <p>
            En el vibrante corazón de Madrid, comenzamos como un modesto concesionario de automóviles con una visión audaz: redefinir la experiencia de compra de automóviles. En GetMyCar, nos enorgullece ofrecer mucho más que una simple transacción, nos esforzamos por crear un destino donde los sueños de conducción se conviertan en realidad.
          </p>
          <p className="hidden 2xl:block">
            En GetMyCar, entendemos que la compra de un automóvil es una experiencia personal y emocionante. Nuestro equipo de expertos está aquí para brindarte un servicio excepcional y ayudarte a encontrar el vehículo perfecto que se adapte a tus necesidades y estilo de vida.
          </p>
          <p>
            Descubre la diferencia en GetMyCar. Tu próxima aventura en la carretera te espera aquí.
          </p>
        </aside>
        <img src={imagenes.Concesionario} alt="concesionario" className="w-[80%] lg:w-[50%] 2xl:w-[30%] rounded-xl shadow-xl" />
      </section>

      <section className="flex flex-col 2xl:flex-row justify-center items-center gap-4 h-[40vh] w-[80%]">
        <aside className="flex flex-col gap-5 shadow-xl p-14 backdrop-blur-3xl bg-white/30 rounded-xl w-[80%] lg:w-[50%] 2xl:w-full items-center justify-center">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-400 w-[80%] text-center">
            ¿Aun sigues buscando?
          </p>
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-400 w-[80%] text-center">
            ¡A que esperas para buscar tu coche ideal!
          </p>
          <NavLink to="/NuestrosCoches">
            <Button className="w-fit font-bold bg-lime-300 shadow-xl">Explorar</Button>
          </NavLink>
        </aside>
      </section>
    </div>
  );
};

export default Inicio;

