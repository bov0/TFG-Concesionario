import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../components/AuthContext"; 
import axios from "axios";

export const CompraCoches = () => {
  const { user } = useAuth();
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
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imagenCoche: file,
    });
  };
  const handleSubmit = async (event) => {
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
    data.append("marca_id",marcaId); 
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
      try{
        await axios.post(urlImg, dataImg);
      } catch (error) {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error("Error al añadir imagen:", error.message);
      }
      console.log("Usuario añadido con éxito");
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al añadir usuario:", error.message);
    }
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6 mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="marca"
            id="marca"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.marca}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="marca"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Marca
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="modelo"
            id="modelo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.modelo}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="modelo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Modelo
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="precio"
            id="precio"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.precio}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="precio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Precio
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="km"
            id="km"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.km}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="km"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Kilómetros
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="anio"
            id="anio"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.anio}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="anio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Año del Vehículo
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="cajaCambio"
            id="cajaCambio"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.cajaCambio}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="cajaCambio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Caja de Cambio
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="combust"
            id="combust"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.combust}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="combust"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Combustible
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="distAmbiental"
            id="distAmbiental"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.distAmbiental}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="distAmbiental"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Distintivo Ambiental
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="cilindrada"
            id="cilindrada"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.cilindrada}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="cilindrada"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cilindrada
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="tipCarr"
            id="tipCarr"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.tipCarr}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="tipCarr"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Carro
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="color"
            id="color"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.color}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="color"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Color
          </label>
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
            className="flex items-center justify-center w-full h-32 px-4 py-6 bg-white text-blue-700 rounded-lg shadow-lg tracking-wide uppercase border border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            <svg
              className="w-8 h-8 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12 8a2 2 0 100-4 2 2 0 000 4zM5 9a1 1 0 100-2 1 1 0 000 2zm15-5a5 5 0 00-5-5H5a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V4zm-7 11a1 1 0 100 2 1 1 0 000-2zm5-6a2 2 0 11-4 0 2 2 0 014 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="ml-2 text-base leading-normal">
              Seleccionar Imagen
            </span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Enviar
      </button>
    </form>
  );
};
