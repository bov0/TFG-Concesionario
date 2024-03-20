import React, { useState, useEffect } from "react";
import Parametro from "./Parametro";
import axios from "axios";

export const Sidebar = () => {

  const [opcionesMarcas, setOpcionesMarcas] = useState([]);
  const [opcionesModelos, setOpcionesModelos] = useState([]);
  const [opcionesCajaCambios, setOpcionesCajaCambios] = useState([]);
  const [opcionesCombustible, setOpcionesCombustible] = useState([]);
  const [opcionesDistAmbiental, setOpcionesDistAmbiental] = useState([]);
  const [opcionesTipoCarr, setOpcionesTipoCarr] = useState([]);
  const [opcionesColor, setOpcionesColor] = useState([]);

  const handleMarcaChange = async (event) => {
    try {
      const selectedMarcaName = event.target.value;
      // Encontrar el objeto de la marca seleccionada por su nombre
      const selectedMarca = opcionesMarcas.find(marca => marca.nombreMarca === selectedMarcaName);
      if (!selectedMarca) {
        console.error("No se encontró la marca seleccionada:", selectedMarcaName);
      }
      // Hacer la solicitud a la API para obtener los modelos por marca
      const response = await axios.get(`http://127.0.0.1:8000/modelosMarca/${selectedMarca.id}`);
      // Actualizar el estado de opcionesModelos con los nombres de los modelos
      setOpcionesModelos(response.data.map((modelo) => modelo.nombre));
    } catch (error) {
      console.error("Error fetching modelos:", error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opcionesMarcasResponse = await axios.get("http://127.0.0.1:8000/marcas-coche");
        setOpcionesMarcas(opcionesMarcasResponse.data);

        const opcionesCajaCambiosResponse = await axios.get("http://127.0.0.1:8000/opcionesCajaCambios");
        setOpcionesCajaCambios(opcionesCajaCambiosResponse.data);

        const opcionesCombustibleResponse = await axios.get("http://127.0.0.1:8000/opcionesCombustible");
        setOpcionesCombustible(opcionesCombustibleResponse.data);

        const opcionesDistAmbientalResponse = await axios.get("http://127.0.0.1:8000/opcionesDistAmbiental");
        setOpcionesDistAmbiental(opcionesDistAmbientalResponse.data);

        const opcionesTipoCarrResponse = await axios.get("http://127.0.0.1:8000/opcionesTipoCarr");
        setOpcionesTipoCarr(opcionesTipoCarrResponse.data);

        const opcionesColorResponse = await axios.get("http://127.0.0.1:8000/opcionesColor");
        setOpcionesColor(opcionesColorResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
      <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        class=" w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <ul class="space-y-2 font-medium">

            <Parametro nombre="Marca" tipo="Select" opciones={opcionesMarcas.map(marca => marca.nombreMarca)} onChange={handleMarcaChange} />

            <Parametro nombre="Modelo" tipo="Select" opciones={opcionesModelos} />

            <Parametro nombre="Precio" tipo="Slider" minValue={0} maxValue={1000000} />

            <Parametro nombre="Km" tipo="Slider" minValue={0} maxValue={800000} />

            <Parametro nombre="Año" tipo="Select" opciones={['2022', '2021', '2020']} />

            <Parametro nombre="Caja de cambios" tipo="Checkbox" opciones={opcionesCajaCambios} />

            <Parametro nombre="Combustible" tipo="Checkbox" opciones={opcionesCombustible} />

            <Parametro nombre="Distintivo medioambiental" tipo="Checkbox" opciones={opcionesDistAmbiental} />

            <Parametro nombre="Cilindrada" tipo="Slider" minValue={60} maxValue={800000} defaultValue={60} />

            <Parametro nombre="Tipo de Carroceria" tipo="Select" opciones={opcionesTipoCarr} />

            <Parametro nombre="Color" tipo="Checkbox" opciones={opcionesColor} />
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64"></div>
    </div>
  );
};