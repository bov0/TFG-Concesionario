import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import { Button } from "@nextui-org/react";
import Parametro from "../components/Parametro";

export const CompraCoches = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marca: "",
    marcaId: "",
    modelo: "",
    precio: "",
    km: "",
    anio: "",
    cajaCambio: "",
    combust: "",
    distAmbiental: "",
    cilindrada: "",
    tipCarr: "",
    color: "",
    imagenCoche: null,
    userId: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (name, value) => {
    // Si el valor es un objeto de evento, significa que se está manejando un cambio de un campo select
    if (typeof value === 'object' && value.target) {
      // Extraer el valor seleccionado del campo select
      value = value.target.value;
    }

    // Actualizar el estado del formulario con el nuevo valor
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file.name);
    setFormData({
      ...formData,
      imagenCoche: file,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    event.preventDefault();
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }
    const url = "http://127.0.0.1:8000/coches";
    const data = new FormData();
    //Sacamos el id de la marca y modelo con lo que se escribe en el formulario
    const responseMarca = await axios.get(`http://127.0.0.1:8000/marcas-coche/nombre/${formData.marca}`);
    const marcaId = responseMarca.data;
    const responseModelo = await axios.get(`http://127.0.0.1:8000/modelos/nombre/${formData.modelo}`);
    const modeloId = responseModelo.data;
    data.append("marca_id", marcaId);
    data.append("modelo", modeloId);
    data.append("precio", parseFloat(formData.precio));
    data.append("km", parseInt(formData.km));
    data.append("anio", parseInt(formData.anio));
    data.append("cajaCambios", formData.cajaCambio);
    data.append("combustible", formData.combust);
    data.append("distAmbiental", formData.distAmbiental);
    data.append("cilindrada", parseInt(formData.cilindrada));
    data.append("tipCarr", formData.tipCarr);
    data.append("color", formData.color);
    data.append("vendedor_id", user.id);
    try {
      await axios.post(url, data);
      // Despues de añadir el coche utilizamos su id nuevo para cargar la imagen en la bbdd
      const response = await axios.get("http://127.0.0.1:8000/lastCoche");
      const urlImg = "http://127.0.0.1:8000/imagenes-coche";
      const dataImg = new FormData();
      console.log(response.data.id);
      dataImg.append("coche_id", response.data.id);
      dataImg.append("imagen", formData.imagenCoche);
      console.log(formData.imagenCoche);
      try {
        await axios.post(urlImg, dataImg);
      } catch (error) {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error("Error al añadir imagen:", error.message);
      }
      console.log("Coche añadido con éxito");
      navigate(`/coche/${response.data.id}`);
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al añadir usuario:", error.message);
    }
  }

  const [opcionesMarcas, setOpcionesMarcas] = useState([]);
  const [opcionesModelos, setOpcionesModelos] = useState([]);
  const [opcionesCajaCambios, setOpcionesCajaCambios] = useState([]);
  const [opcionesCombustible, setOpcionesCombustible] = useState([]);
  const [opcionesDistAmbiental, setOpcionesDistAmbiental] = useState([]);
  const [opcionesTipoCarr, setOpcionesTipoCarr] = useState([]);
  const [opcionesColor, setOpcionesColor] = useState([]);

  const ManejoCambioMarca = async (event) => {
    try {
      const NombreMarcaSeleccionada = event.target.value;
      console.log(NombreMarcaSeleccionada);

      if (NombreMarcaSeleccionada === "") {
        // Si la marca seleccionada es una cadena vacía, establecer los modelos como un array vacío
        setOpcionesModelos([]);
        console.log("Marca seleccionada es una cadena vacía");
        return;
      }

      const marcaSeleccionada = opcionesMarcas.find(marca => marca.nombreMarca === NombreMarcaSeleccionada);
      if (!marcaSeleccionada) {
        console.error("No se encontró la marca seleccionada:", NombreMarcaSeleccionada);
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/modelosMarca/${marcaSeleccionada.id}`);
      handleChange("marca", NombreMarcaSeleccionada);
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

  const generarOpcionesAnio = () => {
    const opciones = [];
    const anioActual = new Date().getFullYear();
    for (let anio = anioActual; anio >= 2000; anio--) {
      opciones.push(anio.toString());
    }
    return opciones;
  };
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-800">
        Vende tu coche
      </h1>
      <form className="max-w-md mx-auto p-5 rounded-xl border-solid border-2 border-purple-600" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6 mt-5">
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Marca" tipo="Select" opciones={opcionesMarcas.map(marca => marca.nombreMarca)} onChange={ManejoCambioMarca} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Modelo" tipo="Select" opciones={opcionesModelos} onChange={(value) => handleChange("modelo", value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="precio"
              id="precio"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.precio}
              onChange={(event) => handleChange("precio", event.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="precio"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Precio
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="km"
              id="km"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.km}
              onChange={(event) => handleChange("km", event.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="km"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Kilómetros
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Año" tipo="Select" opciones={generarOpcionesAnio()} onChange={(value) => handleChange("anio", value)} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Caja de cambios" tipo="Select" opciones={opcionesCajaCambios} onChange={(value) => handleChange("cajaCambio", value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Combustible" tipo="Select" opciones={opcionesCombustible} onChange={(value) => handleChange("combust", value)} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Distintivo Ambiental" tipo="Select" opciones={opcionesDistAmbiental} onChange={(value) => handleChange("distAmbiental", value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="cilindrada"
              id="cilindrada"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.cilindrada}
              onChange={(event) => handleChange("cilindrada", event.target.value)}
              placeholder=" "
              required
            />
            <label
              htmlFor="cilindrada"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Cilindrada
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Tipo de Carroceria" tipo="Select" opciones={opcionesTipoCarr} onChange={(value) => handleChange("tipCarr", value)} />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <Parametro nombre="Color" tipo="Select" opciones={opcionesColor} onChange={(value) => handleChange("color", value)} />
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="imagenCoche"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Imagen del Coche
          </label>
          <input
            type="file"
            id="imagenCoche"
            name="imagenCoche"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="imagenCoche"
              className="flex items-center justify-center w-full h-32 px-4 py-6 bg-white text-purple-700 rounded-lg shadow-lg tracking-wide uppercase border border-purple-700 cursor-pointer hover:bg-purple-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            >
              <span className="ml-2 text-base leading-normal">
                {selectedImage ? selectedImage : 'Seleccionar Imagen'}
              </span>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-xl"
        >
          Enviar
        </Button>
      </form>

    </div>
  );
};