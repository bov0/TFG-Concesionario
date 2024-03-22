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

  const [filtros, setFiltros] = useState({
    Marca: [],
    Modelo: [],
    Precio: [],
    Kilometros: [],
    Anio: [],
    cajaCambio: [],
    combustible: [],
    distAmbiental: [],
    Cilindrada: [],
    Carroceria: [],
    color: []
  });

  const ManejoCambioMarca = async (event) => {
    try {
      const selectedMarcaName = event.target.value;
      console.log(selectedMarcaName);

      // Encontrar el objeto de la marca seleccionada por su nombre
      const selectedMarca = opcionesMarcas.find(marca => marca.nombreMarca === selectedMarcaName);
      if (!selectedMarca) {
        console.error("No se encontró la marca seleccionada:", selectedMarcaName);
        return; // Salir de la función si no se encuentra la marca seleccionada
      }

      // Hacer la solicitud a la API para obtener los modelos por marca
      const response = await axios.get(`http://127.0.0.1:8000/modelosMarca/${selectedMarca.id}`);

      // Actualizar el estado de opcionesModelos con los nombres de los modelos
      setOpcionesModelos(response.data.map((modelo) => modelo.nombre));

      // Actualizar el estado filtros con el id de la marca seleccionada para filtrar por id de la marca
      setFiltros(prevState => ({ ...prevState, Marca: selectedMarca.id }));
    } catch (error) {
      console.error("Error fetching modelos:", error);
    }
  };

  const ManejoCambioModelo = async (event) => {
    try {
      const modeloSeleccionado = event.target.value;
      console.log(modeloSeleccionado);
      setFiltros(prevState => ({ ...prevState, Modelo: modeloSeleccionado }));
    } catch (error) {
      console.error("Error manejo cambio en modelo:", error);
    }
  };

  const ManejoCambioPrecio = ({ target: { value: precio } }) => {
    console.log(precio);
    setFiltros(prevState => ({ ...prevState, Precio: precio }));
  };

  const ManejoCambioKm = ({ target: { value: kilometros } }) => {
    console.log(kilometros);
    setFiltros(prevState => ({ ...prevState, Kilometros: kilometros }));
  };

  const ManejoCambioAnio = (event) => {
    const anioSeleccionado = event.target.value;
    console.log(anioSeleccionado);
    setFiltros(prevState => ({ ...prevState, Anio: anioSeleccionado }));
  };

  const ManejoCambioCajaCambios = (event) => {
    const cajaCambiosSeleccionada = event.target.value;

    setFiltros(prevState => {
      const updatedCajaCambio = prevState.cajaCambio.includes(cajaCambiosSeleccionada)
        ? prevState.cajaCambio.filter(item => item !== cajaCambiosSeleccionada) // Eliminar el tipo de caja de cambios
        : [...prevState.cajaCambio, cajaCambiosSeleccionada]; // Agregar el tipo de caja de cambios si no está presente

      // Devolver un nuevo objeto de estado con el array actualizado
      return { ...prevState, cajaCambio: updatedCajaCambio };
    });
  };


  const ManejoCambioCombustible = (event) => {
    const combustibleSeleccionado = event.target.value;

    setFiltros(prevState => {
      const updatedCombustible = prevState.combustible.includes(combustibleSeleccionado)
        ? prevState.combustible.filter(item => item !== combustibleSeleccionado) // Eliminar el combustible
        : [...prevState.combustible, combustibleSeleccionado]; // Agregar el combustible si no está presente

      // Devolver un nuevo objeto de estado con el array actualizado
      console.log(filtros)
      return { ...prevState, combustible: updatedCombustible };
    });
  };

  const ManejoCambioCarroceria = (event) => {
    const carroceriaSeleccionada = event.target.value;
    console.log(carroceriaSeleccionada);
    setFiltros(prevState => ({ ...prevState, Carroceria: carroceriaSeleccionada }));
  };

  const ManejoCambioCilindrada = (event) => {
    const cilindradaSeleccionada = event.target.value;
    console.log(cilindradaSeleccionada);
    setFiltros(prevState => ({ ...prevState, Cilindrada: cilindradaSeleccionada }));
  };

  const ManejoCambioDistAmbiental = (event) => {
    const DistAmbientalSeleccionada = event.target.value;

    setFiltros(prevState => {
      const updatedDistAmbiental = prevState.distAmbiental.includes(DistAmbientalSeleccionada)
        ? prevState.distAmbiental.filter(item => item !== DistAmbientalSeleccionada) // Eliminar la opción
        : [...prevState.distAmbiental, DistAmbientalSeleccionada]; // Agregar la opción si no está presente

      // Devolver un nuevo objeto de estado con el array actualizado
      return { ...prevState, distAmbiental: updatedDistAmbiental };
    });
  };

  const ManejoCambioColor = (event) => {
    const colorSeleccionado = event.target.value;

    setFiltros(prevState => {
      const updatedColor = prevState.color.includes(colorSeleccionado)
        ? prevState.color.filter(item => item !== colorSeleccionado) // Eliminar el color
        : [...prevState.color, colorSeleccionado]; // Agregar el color si no está presente

      // Devolver un nuevo objeto de estado con el array actualizado
      return { ...prevState, color: updatedColor };
    });
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

            <Parametro nombre="Marca" tipo="Select" opciones={opcionesMarcas.map(marca => marca.nombreMarca)} onChange={ManejoCambioMarca} />

            <Parametro nombre="Modelo" tipo="Select" opciones={opcionesModelos} onChange={ManejoCambioModelo} />

            <Parametro nombre="Precio" tipo="Slider" minValue={0} maxValue={1000000} onChange={ManejoCambioPrecio} />

            <Parametro nombre="Kilometros" tipo="Slider" minValue={0} maxValue={800000} onChange={ManejoCambioKm} />

            <Parametro nombre="Año" tipo="Select" opciones={['2022', '2021', '2020']} onChange={ManejoCambioAnio} />

            <Parametro nombre="Caja de cambios" tipo="Checkbox" opciones={opcionesCajaCambios} onChange={ManejoCambioCajaCambios} />

            <Parametro nombre="Combustible" tipo="Checkbox" opciones={opcionesCombustible} onChange={ManejoCambioCombustible} />

            <Parametro nombre="Distintivo medioambiental" tipo="Checkbox" opciones={opcionesDistAmbiental} onChange={ManejoCambioDistAmbiental} />

            <Parametro nombre="Cilindrada" tipo="Slider" minValue={60} maxValue={800000} defaultValue={60} onChange={ManejoCambioCilindrada} />

            <Parametro nombre="Tipo de Carroceria" tipo="Select" opciones={opcionesTipoCarr} onChange={ManejoCambioCarroceria} />

            <Parametro nombre="Color" tipo="Checkbox" opciones={opcionesColor} onChange={ManejoCambioColor} />
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:ml-64"></div>
    </div>
  );
};