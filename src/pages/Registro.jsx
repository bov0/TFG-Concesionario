import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
  const [error, setError] = useState('');
  const [hayError, setHayError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
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
    const url = "https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios";
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("apellidos", formData.apellidos);
    data.append("Email", formData.email);
    data.append("contrasena", formData.contrasena);
    if (formData.fotoPerfil) {
      data.append("fotoPerfil", formData.fotoPerfil);
    }
    let errorMessage = "";
    try {
      // Comprobar si ya existe un usuario con el mismo nombre
      const responseNombre = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/nombre/${formData.nombre}`);
      if (responseNombre.status === 200) {
        if (responseNombre.data.nombre) {
          errorMessage += "Ya hay un usuario con ese nombre. ";
        }
      }
    } catch (error) {
      // Si se produce un error diferente de 404, manejarlo y detener la ejecución
      if (error.response && error.response.status !== 404) {
        errorMessage +=  "Error al verificar el nombre de usuario. ";
        console.error("Error al verificar el nombre de usuario:", error.message);
      }
    }
    
    try {
      // Comprobar si ya existe un usuario con el mismo correo electrónico
      const responseEmail = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/email/${formData.email}`);
      if (responseEmail.status === 200) {
        if (responseEmail.data.Email) {
          errorMessage += "Ya hay un usuario con ese email. ";
          setHayError(true);
        }
      }
    } catch (error) {
      // Si se produce un error diferente de 404, manejarlo y detener la ejecución
      if (error.response && error.response.status !== 404) {
        errorMessage += "Error al verificar el email de usuario. ";
        console.error("Error al verificar el email de usuario:", error.message);
      }
    }
    
    // Comprobar la contraseña    
    const contrasenaMayuscRegex = /^(?=.*[A-Z])/;
    const contrasenaNumberRegex = /^(?=.*\d)/;
    const contrasenaSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const contrasenaMinLengthRegex = /^.{8,}$/;
    if (!contrasenaMayuscRegex.test(formData.contrasena)) {
      errorMessage += "La contraseña debe contener al menos una letra mayúscula. ";
    }
    if (!contrasenaNumberRegex.test(formData.contrasena)) {
      errorMessage += "La contraseña debe contener al menos un número. ";
    }

    if (!contrasenaSpecialCharRegex.test(formData.contrasena)) {
      errorMessage += "La contraseña debe contener al menos un carácter especial. ";
    }

    if (!contrasenaMinLengthRegex.test(formData.contrasena)) {
      errorMessage += "La contraseña debe contener al menos 8 carácteres. ";
    }

    if (errorMessage) {
      setError(errorMessage);
      setHayError(true);
      return; // Detener la ejecución si la contraseña no es válida
    }

    // Si no se encontraron usuarios con el mismo nombre ni correo electrónico, hacer el POST
    try {
      const responsePost = await axios.post(url, data);
      if (responsePost.status === 200) {
        // Obtener información del usuario recién creado
        const newUser = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/nombre/${formData.nombre}`);
        if (newUser.status === 200) {
          const id = newUser.data.id;
          const nombre = newUser.data.nombre;
          const userData = { id, nombre };
          login(userData);
          navigate('/');
          console.log("Usuario añadido con éxito", id, nombre);
        }
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      setError("Error al registrarse");
      setHayError(true);
      console.error("Error al añadir usuario:", error.message);
    }
     
  };

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="shadow-2xl rounded-2xl flex flex-col justify-center items-center md:flex-row gap-0 w-full md:w-fit min-h-min backdrop-blur-3xl bg-white/30">
        <div className="hidden lg:block min-h-full w-6/12 mx-auto p-72 bg-default-100 rounded-l-2xl m-0 relative">
          <div className="h-52 w-[80%] bg-blue-950 rounded-full shadow-xl absolute left-0 top-16 z-10">
            <div className="h-36 w-80 backdrop-blur-xl bg-white/30 shadow-xl absolute left-0 top-10 z-30"></div>
          </div>
          <div className="h-44 w-[60%] bg-lime-200 rounded-r-full shadow-xl absolute left-0 top-44 z-20 flex items-center justify-center">
            <h1 className="text-9xl font-extrabold z-50">GMC</h1>
            <div className="h-36 w-80 backdrop-blur-xl bg-white/30 shadow-xl absolute left-20 top-32 z-20"></div>
          </div>
          <div className="h-44 w-96 bg-purple-400 rounded-full shadow-xl absolute left-20 top-[22rem] z-10 flex items-center justify-center">
            <p className="text-6xl font-extrabold absolute -bottom-7 z-50">
              MOTORS
            </p>
          </div>
          <p className="absolute top-56 right-28 z-40 font-extrabold text-6xl text-purple-400">
            *
          </p>
          <p className="absolute top-20 left-36 z-40 font-extrabold text-6xl text-lime-200">
            *
          </p>
          <p className="absolute top-96 left-16 z-40 font-extrabold text-6xl text-blue-950">
            *
          </p>
        </div>
        <form
          className="lg:w-6/12 h-full mx-auto flex flex-col items-center gap-4 p-9 m-0 rounded-xl md:rounded-l-none md:rounded-r-2xl"
          onSubmit={handleSubmit}
        >          
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-800">
            Registrarse
          </h1>
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
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-fit justify-center">
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
            <div className="grid grid-cols-2 gap-3 md:gap-6 w-fit justify-center">
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
          </div>
          <Button
              type="submit"
              className=" bg-lime-200 font-bold shadow-xl w-fit mx-auto"
            >
              REGISTRARSE
            </Button>    
            {hayError && (
                        <p className='p-2 rounded-xl bg-danger-500 font-bold text-xs text-white text-center absolute bottom-4'>{error}</p>
                    )}        
        </form>        
      </div>
    </div>
  );
};
