import React, { useState, useEffect, useContext, useCallback } from "react";
import Tarjeta from '../components/Tarjeta';
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { FiltrosContext } from "../components/FiltrosContext";
import { Skeleton } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

const NuestrosCoches = () => {
  const { filtros } = useContext(FiltrosContext);
  const [coches, setCoches] = useState([]);
  const [cargandoCoches, setCargandoCoches] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const cochesPorPagina = 12;

  const fetchData = useCallback(async () => {
    try {
      setCargandoCoches(true);
      const cochesResult = await axios.get('https://tfg-backendconcesionario.onrender.com/coches');
      const cochesConImagenes = await Promise.all(cochesResult.data.map(async (coche) => {
        try {
          const [marcaResult, modeloResult, imagenResult] = await Promise.all([
            axios.get(`https://tfg-backendconcesionario.onrender.com/marcas-coche/${coche.marca_id}`),
            axios.get(`https://tfg-backendconcesionario.onrender.com/modelos/${coche.modelo}`),
            axios.get(`https://tfg-backendconcesionario.onrender.com/imagenes-coche/imagen/${coche.id}`, { responseType: 'arraybuffer' })
          ]);

          const marcaNombre = marcaResult.data.nombreMarca || 'Error marca';
          const modeloNombre = modeloResult.data.nombre || 'Error modelo';
          const imagenBlob = new Blob([imagenResult.data], { type: 'image/png' });
          const imagenURL = URL.createObjectURL(imagenBlob);

          return { ...coche, marcaNombre, modeloNombre, imagen: imagenURL };
        } catch (error) {
          return { ...coche, marcaNombre: '', modeloNombre: '', imagen: '../images/logo.jpg' };
        }
      }));

      // Filtrar los coches en función de los filtros seleccionados
      const cochesFiltrados = cochesConImagenes.filter(coche => {
        const filtroMarca = !filtros.Marca.length || filtros.Marca.includes(coche.marcaNombre);
        const filtroModelo = !filtros.Modelo.length || filtros.Modelo.includes(coche.modeloNombre);
        const filtroPrecio = !filtros.Precio || coche.precio <= filtros.Precio;
        const filtroKilometros = !filtros.Kilometros || coche.precio <= filtros.Kilometros;
        const filtroAnio = !filtros.Anio.length || filtros.Anio.includes(coche.anio);
        const filtroCajaCambios = !filtros.cajaCambio.length || filtros.cajaCambio.includes(coche.cajaCambios);
        const filtroCombustible = !filtros.combustible.length || filtros.combustible.includes(coche.combustible);
        const filtroDistAmbiental = !filtros.distAmbiental.length || filtros.distAmbiental.includes(coche.distAmbiental);
        const filtroCilindrada = !filtros.Cilindrada || coche.cilindrada >= filtros.Cilindrada;
        const filtroCarroceria = !filtros.Carroceria.length || filtros.Carroceria.includes(coche.tipCarr);
        const filtroColor = !filtros.color.length || filtros.color.includes(coche.color);

        return (
          filtroMarca &&
          filtroModelo &&
          filtroPrecio &&
          filtroKilometros &&
          filtroAnio &&
          filtroCajaCambios &&
          filtroCombustible &&
          filtroDistAmbiental &&
          filtroCilindrada &&
          filtroCarroceria &&
          filtroColor
        );
      });

      setCoches(cochesFiltrados);
      setCargandoCoches(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [filtros]);

  useEffect(() => {
    fetchData();
  }, [filtros, fetchData]);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="flex h-full 2xl:h-[133.7vh]">
      <Sidebar />
      <div className="flex flex-col justify-items-center items-center w-full h-full p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-2 gap-4 justify-center items-center w-full">
          {cargandoCoches ? (
            <div className="absolute z-30 left-2/4 w-64 shadow-2xl bg-danger-500 transition-all rounded-xl p-2">
              <p className="font-bold text-white text-center">CARGANDO COCHES</p>
                <p className="font-bold text-white text-center">Por favor paciencia, esta página depende de una BBDD gratuita la cual no dispone de mucha velocidad, perdon por las inconveniencias, 
              </p>
                <p className="font-bold text-white text-center">TIEMPO EST: 1min</p>
            </div>
          ) : (
            <div className="hidden"></div>
          )}
          {cargandoCoches ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex justify-center hover:scale-[1.01] transition-all ease-in h-fit">
              <Skeleton key={index} className="w-[120%] h-[250px] lg:w-[280px] lg:h-[350px] rounded-lg" />
              </div>
            ))
          ) : (
            <>
              {coches
                .slice((paginaActual - 1) * cochesPorPagina, paginaActual * cochesPorPagina)
                .map((coche) => (
                  <Tarjeta key={coche.id} {...coche} />
                ))}
            </>
          )}
        </div>
        <div className="flex justify-center w-full m-5 lg:m-0">
          <Pagination
            total={Math.ceil(coches.length / cochesPorPagina)}
            initialPage={paginaActual}
            onChange={cambiarPagina}
            classNames={{
              cursor:
                "shadow-2xl bg-lime-200 text-black font-bold",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NuestrosCoches;