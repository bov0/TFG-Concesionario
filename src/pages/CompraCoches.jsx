import React, { useState } from "react";
<<<<<<< HEAD
=======
import { useAuth } from "../components/AuthContext";
import { Button } from "@nextui-org/react";
>>>>>>> 0923e0e5fa8cfe19fa94415b105a9880c3465239
import axios from "axios";

export const CompraCoches = () => {
  const [formData, setFormData] = useState({
    marca_id: 0,
    modelo: "",
    precio: 0.0,
    km: 0,
    anio: 0,
    cajaCambios: "",
    combustible: "",
    distAmbiental: "",
    cilindrada: 0,
    tipCarr: "",
    color: "",
    vendedor_id: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "marca_id" || name === "km" || name === "anio" || name === "cilindrada" || name === "vendedor_id" ? parseInt(value) : name === "precio" ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/coches"; // Tu URL de la API aquí

    try {
      await axios.post(url, formData);
      // Manejar el éxito, por ejemplo, limpiar el formulario o mostrar un mensaje de éxito
      console.log("Coche añadido con éxito");
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al añadir coche:", error.message);
    }
  };
<<<<<<< HEAD

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
=======
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-800">Compramos tu coche</h1>
    <form className="max-w-md mx-auto rounded-xl py-24 px-12 border-solid border-2 border-purple-600" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 md:gap-6 mt-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="marca"
            id="marca"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.marca}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="marca"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Marca
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="modelo"
            id="modelo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.modelo}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="modelo"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.precio}
            onChange={handleChange}
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
            onChange={handleChange}
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
          <input
            type="number"
            name="anio"
            id="anio"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.anio}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="anio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Año del Vehículo
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="cajaCambio"
            id="cajaCambio"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.cajaCambio}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="cajaCambio"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.combust}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="combust"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Combustible
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="distAmbiental"
            id="distAmbiental"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.distAmbiental}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="distAmbiental"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Distintivo Ambiental
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="cilindrada"
            id="cilindrada"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.cilindrada}
            onChange={handleChange}
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
          <input
            type="text"
            name="tipCarr"
            id="tipCarr"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.tipCarr}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="tipCarr"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Carro
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="color"
            id="color"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            value={formData.color}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="color"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-800 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
>>>>>>> 0923e0e5fa8cfe19fa94415b105a9880c3465239
        <input
          type="number"
          name="marca_id"
          value={formData.marca_id}
          onChange={handleChange}
          placeholder="ID de la Marca"
          required
        />
        <input
          type="text"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          type="number"
          name="km"
          value={formData.km}
          onChange={handleChange}
          placeholder="Kilómetros"
          required
        />
        <input
          type="number"
          name="anio"
          value={formData.anio}
          onChange={handleChange}
          placeholder="Año"
          required
        />
        <input
          type="text"
          name="cajaCambios"
          value={formData.cajaCambios}
          onChange={handleChange}
          placeholder="Caja de Cambios"
          required
        />
        <input
          type="text"
          name="combustible"
          value={formData.combustible}
          onChange={handleChange}
          placeholder="Combustible"
          required
        />
        <input
          type="text"
          name="distAmbiental"
          value={formData.distAmbiental}
          onChange={handleChange}
          placeholder="Distancia Ambiental"
          required
        />
        <input
          type="number"
          name="cilindrada"
          value={formData.cilindrada}
          onChange={handleChange}
          placeholder="Cilindrada"
          required
        />
        <input
          type="text"
          name="tipCarr"
          value={formData.tipCarr}
          onChange={handleChange}
          placeholder="Tipo de Carrocería"
          required
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          required
        />
        <input
          type="number"
          name="vendedor_id"
          value={formData.vendedor_id}
          onChange={handleChange}
          placeholder="ID del Vendedor"
          required
        />
<<<<<<< HEAD
=======
        <div className="flex items-center justify-center w-full shadow-xl">
          <label
            htmlFor="imagenCoche"
            className="flex items-center justify-center w-full h-32 px-4 py-6 bg-white text-purple-700 rounded-lg shadow-lg tracking-wide uppercase border border-purple-800 cursor-pointer hover:bg-purple-800 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 transition-all duration-1000 ease-in-out"
          >
            <span className="ml-2 text-base leading-normal">
              Seleccionar Imagen
            </span>
          </label>
        </div>
>>>>>>> 0923e0e5fa8cfe19fa94415b105a9880c3465239
      </div>
      <Button
        type="submit"
<<<<<<< HEAD
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
=======
        className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-xl"
>>>>>>> 0923e0e5fa8cfe19fa94415b105a9880c3465239
      >
        Enviar
      </Button>
    </form>
    </div>
  );
};
