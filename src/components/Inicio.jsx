import React from "react";

const Inicio = () => {
  return (
    <div className="flex justify-center items-center mx-auto w-8/12 h-screen">
      <section className="w-8/12 text-center">
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
    </div>
  );
};

export default Inicio;

