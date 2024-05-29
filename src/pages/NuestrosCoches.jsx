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
  const cochesPorPagina = 8;

  const fetchData = useCallback(async () => {
    try {
      setCargandoCoches(true);
      const cochesResult = await axios.get('http://127.0.0.1:8000/coches');
      const cochesConImagenes = await Promise.all(cochesResult.data.map(async (coche) => {
        try {
          const [marcaResult, modeloResult, imagenResult] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/marcas-coche/${coche.marca_id}`),
            axios.get(`http://127.0.0.1:8000/modelos/${coche.modelo}`),
            axios.get(`http://127.0.0.1:8000/imagenes-coche/imagen/${coche.id}`, { responseType: 'arraybuffer' })
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
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col justify-items-center items-center w-full p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-2 gap-4 justify-center items-center w-full">
          {cargandoCoches ? (
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-[280px] h-[350px] rounded-lg m-10" />
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
        <div className="flex justify-center w-full absolute bottom-20">
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