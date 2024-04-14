import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contrasena: "",
    fotoPerfil: null,
  });

  const handleChange = (e) => {
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
      fotoPerfil: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/usuarios"; // Tu URL de la API aquí
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("apellidos", formData.apellidos);
    data.append("Email", formData.email);
    data.append("contrasena", formData.contrasena);
    if (formData.fotoPerfil) {
      data.append("fotoPerfil", formData.fotoPerfil);
    }

    try {
      await axios.post(url, data);
      // Manejar el éxito, por ejemplo, limpiar el formulario o mostrar un mensaje de éxito
      console.log("Usuario añadido con éxito");
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al añadir usuario:", error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-800">
        Registrarse
      </h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Correo Electrónico
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="contrasena"
            id="contrasena"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="contrasena"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Contraseña
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repetir_contrasena"
            id="repetir_contrasena"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={formData.repetir_contrasena}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label
            htmlFor="repetir_contrasena"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Repetir Contraseña
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Correo Electrónico
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="contrasena"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repetir_contrasena"
              id="repetir_contrasena"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              value={formData.repetir_contrasena}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label
              htmlFor="repetir_contrasena"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Repetir Contraseña
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                value={formData.nombre}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="apellidos"
                id="apellidos"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label
                htmlFor="apellidos"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Apellidos
              </label>
            </div>
            <div className="hidden">
              <label htmlFor="fotoPerfil">Foto de Perfil:</label>
              <input
                type="file"
                id="fotoPerfil"
                name="fotoPerfil"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-xl"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
