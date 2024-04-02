import React, { useState, useEffect, useContext } from "react";
import Tarjeta from '../components/Tarjeta';
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { FiltrosContext } from "../components/FiltrosContext";

const NuestrosCoches = () => {
  const { filtros } = useContext(FiltrosContext);
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    fetchData();
  }, [filtros]); // Vuelve a cargar los datos cada vez que los filtros cambien

  const fetchData = async () => {
    try {
      const cochesResult = await axios.get('http://127.0.0.1:8000/coches');
      const cochesConImagenes = await Promise.all(cochesResult.data.map(async (coche) => {
        try {
          const [marcaResult, modeloResult, imagenResult] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/marcas-coche/${coche.marca_id}`),
            axios.get(`http://127.0.0.1:8000/modelos/${coche.modelo}`),
            axios.get(`http://127.0.0.1:8000/imagenes-coche/imagen/${coche.id}`, { responseType: 'arraybuffer' })
          ]);

          const marcaNombre = marcaResult.data.nombreMarca || '';
          const modeloNombre = modeloResult.data.nombre || '';
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
        const filtroKilometros = !filtros.Kilometros || coche.precio <= filtros.Kilometros ;
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-wrap justify-center gap-4 py-4">
          {coches.map((coche) => (
            <Tarjeta key={coche.id} {...coche} />
          ))}
        </div>
    </div>
  );
};

export default NuestrosCoches;