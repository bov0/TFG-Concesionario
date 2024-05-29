import React, { useState, useEffect } from "react";
import Parametro from "./Parametro";
import { useFiltros } from "./FiltrosContext";
import axios from "axios";
import { Button } from "@nextui-org/react";

export const Sidebar = () => {

  const { setFiltros } = useFiltros();
  const [opcionesMarcas, setOpcionesMarcas] = useState([]);
  const [opcionesModelos, setOpcionesModelos] = useState([]);
  const [opcionesCajaCambios, setOpcionesCajaCambios] = useState([]);
  const [opcionesCombustible, setOpcionesCombustible] = useState([]);
  const [opcionesDistAmbiental, setOpcionesDistAmbiental] = useState([]);
  const [opcionesTipoCarr, setOpcionesTipoCarr] = useState([]);
  const [opcionesColor, setOpcionesColor] = useState([]);

  const filtrosIniciales = {
    Marca: "",
    Modelo: "",
    Precio: "",
    Kilometros: "",
    Anio: "",
    cajaCambio: [],
    combustible: [],
    distAmbiental: [],
    Cilindrada: [],
    Carroceria: "",
    color: []
  };

  const resetearFiltros = () => {
    setFiltros(filtrosIniciales);
  };

  const ManejoCambioMarca = async (event) => {
    try {
      const NombreMarcaSeleccionada = event.target.value;
      console.log(NombreMarcaSeleccionada);

      if (NombreMarcaSeleccionada === "") {
        setOpcionesModelos([]);
        setFiltros(prevState => ({ ...prevState, Marca: "" }));
        console.log("Marca seleccionada es una cadena vacía");
        return;
      }

      const marcaSeleccionada = opcionesMarcas.find(marca => marca.nombreMarca === NombreMarcaSeleccionada);
      if (!marcaSeleccionada) {
        console.error("No se encontró la marca seleccionada:", NombreMarcaSeleccionada);
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/modelosMarca/${marcaSeleccionada.id}`);
      setOpcionesModelos(response.data.map((modelo) => modelo.nombre));

      setFiltros(prevState => ({ ...prevState, Marca: NombreMarcaSeleccionada }));
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

  const generarOpcionesAnio = () => {
    const opciones = [];
    const anioActual = new Date().getFullYear();
    for (let anio = anioActual; anio >= 2000; anio--) {
      opciones.push(anio.toString());
    }
    return opciones;
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
      const cajaCambioActualizada = prevState.cajaCambio.includes(cajaCambiosSeleccionada)
        ? prevState.cajaCambio.filter(item => item !== cajaCambiosSeleccionada)
        : [...prevState.cajaCambio, cajaCambiosSeleccionada];

      return { ...prevState, cajaCambio: cajaCambioActualizada };
    });
  };


  const ManejoCambioCombustible = (event) => {
    const combustibleSeleccionado = event.target.value;

    setFiltros(prevState => {
      const combustibleActualizado = prevState.combustible.includes(combustibleSeleccionado)
        ? prevState.combustible.filter(item => item !== combustibleSeleccionado)
        : [...prevState.combustible, combustibleSeleccionado];

      return { ...prevState, combustible: combustibleActualizado };
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
      const distAmbientalActualizado = prevState.distAmbiental.includes(DistAmbientalSeleccionada)
        ? prevState.distAmbiental.filter(item => item !== DistAmbientalSeleccionada)
        : [...prevState.distAmbiental, DistAmbientalSeleccionada];

      return { ...prevState, distAmbiental: distAmbientalActualizado };
    });
  };

  const ManejoCambioColor = (event) => {
    const colorSeleccionado = event.target.value;

    setFiltros(prevState => {
      const colorActualizado = prevState.color.includes(colorSeleccionado)
        ? prevState.color.filter(item => item !== colorSeleccionado)
        : [...prevState.color, colorSeleccionado];

      return { ...prevState, color: colorActualizado };
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
    <div className="h-dvh">

      <aside
        id="sidebar-multi-level-sidebar"
        className=" w-fit p-4 h-full transition-transform lg:translate-x-0 lg:relative fixed z-20 bg-default-50 shadow-xl"
        aria-label="Sidebar"
      >
        <button
          onClick={() => {
            const sidebar = document.getElementById('sidebar-multi-level-sidebar');
            sidebar.classList.toggle('-translate-x-full');
            const boton = document.getElementById('boton');
            const isSidebarOpen = sidebar.classList.contains('-translate-x-full');
            boton.style.left = isSidebarOpen ? '250px' : '175px';
          }}
          aria-label="Open sidebar"
          id="boton"
          className="absolute top-2 left-[175px] z-30 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden bg-default-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 shadow-xl transition-all duration-300 ease-in-out"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <ul className="space-y-2 pt-10 font-medium">

            <Parametro nombre="Marca" tipo="Select" opciones={opcionesMarcas.map(marca => marca.nombreMarca)} onChange={ManejoCambioMarca} />

            <Parametro nombre="Modelo" tipo="Select" opciones={opcionesModelos} onChange={ManejoCambioModelo} />

            <Parametro nombre="Precio" tipo="Slider" minValue={0} maxValue={100000} onChange={ManejoCambioPrecio} />

            <Parametro nombre="Kilometros" tipo="Slider" minValue={0} maxValue={800000} onChange={ManejoCambioKm} />

            <Parametro nombre="Año" tipo="Select" opciones={generarOpcionesAnio()} onChange={ManejoCambioAnio} />

            <Parametro nombre="Caja de cambios" tipo="Checkbox" opciones={opcionesCajaCambios} onChange={ManejoCambioCajaCambios} />

            <Parametro nombre="Combustible" tipo="Checkbox" opciones={opcionesCombustible} onChange={ManejoCambioCombustible} />

            <Parametro nombre="Distintivo medioambiental" tipo="Checkbox" opciones={opcionesDistAmbiental} onChange={ManejoCambioDistAmbiental} />

            <Parametro nombre="Cilindrada" tipo="Slider" minValue={0} maxValue={700} defaultValue={0} onChange={ManejoCambioCilindrada} />

            <Parametro nombre="Tipo de Carroceria" tipo="Select" opciones={opcionesTipoCarr} onChange={ManejoCambioCarroceria} />

            <Parametro nombre="Color" tipo="Checkbox" opciones={opcionesColor} onChange={ManejoCambioColor} />

            <Button className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg" onClick={resetearFiltros}>Restablecer filtros</Button>
          </ul>
        </div>
      </aside>
    </div>
  );
};