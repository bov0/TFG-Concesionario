import React from "react";
import imagenes from "../assets/imagenes";

const Inicio = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto md:w-8/12">
      <section className="w-8/12 text-center h-screen flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Compra tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-indigo-400">
            nuevo coche
          </span>{" "}
          en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-indigo-400">
            GetMyCar
          </span>
        </h1>
        <p className="w-full text-lg">
          Desde elegantes sedanes hasta todoterrenos robustos, estamos aquí
          para hacer realidad tus sueños de conducción.
        </p>
      </section>
      <section className="w-8/12 flex flex-col lg:flex-row justify-center items-center gap-4 h-screen">
        <aside>
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-indigo-400">
            ¡Bienvenido a GetMyCar!
          </p>
          <p>
            En el vibrante corazón de Madrid, comenzamos como un modesto concesionario de automóviles con una visión audaz: redefinir la experiencia de compra de automóviles. En GetMyCar, nos enorgullece ofrecer mucho más que una simple transacción; nos esforzamos por crear un destino donde los sueños de conducción se conviertan en realidad.
          </p>
          <p>
            En GetMyCar, entendemos que la compra de un automóvil es una experiencia personal y emocionante. Nuestro equipo de expertos está aquí para brindarte un servicio excepcional y ayudarte a encontrar el vehículo perfecto que se adapte a tus necesidades y estilo de vida.
          </p>
          <p>
            Descubre la diferencia en GetMyCar. Tu próxima aventura en la carretera te espera aquí.
          </p>
        </aside>
        <img src={imagenes.img2} alt="concesionario" className="rounded-xl"/>
      </section>
    </div>
  );
};

export default Inicio;

