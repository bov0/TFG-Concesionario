import React, { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Ajustes = () => {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const navigate = useNavigate();

  const handleChangePasswordClick = () => {
    setShowChangePasswordForm(true);
    setShowEditUserForm(false);
  };

  const handleCancelChangePassword = () => {
    setShowChangePasswordForm(false);
  };

  const handleEditUserClick = () => {
    setShowEditUserForm(true);
    setShowChangePasswordForm(false);
  };

  const handleCancelEditUser = () => {
    setShowEditUserForm(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setPasswordOld(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setPasswordNew(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidosChange = (event) => {
    setApellidos(event.target.value);
  };

  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/usuarios/email/${email}`
      );
      if (response.status === 200) {
        const usuario = response.data;
        if (usuario && usuario.contrasena === passwordOld) {
          const formData = new FormData();
          if (nombre) {
            formData.append("nombre", nombre);
          } else {
            formData.append("nombre", usuario.nombre);
          }
          if (apellidos) {
            formData.append("apellidos", apellidos);
          } else {
            formData.append("apellidos", usuario.apellidos);
          }

          formData.append("Email", email);
          if (passwordNew){
            formData.append("contrasena", passwordNew);
          } else{
            formData.append("contrasena", usuario.contrasena);
          }
          
          if (formData.fotoPerfil) {
            formData.append("fotoPerfil", formData.fotoPerfil);
          }
          try {
            await axios.put(
              `http://127.0.0.1:8000/usuarios/${usuario.id}`,
              formData
            );
            console.log("Contraseña actualizada exitosamente");
          } catch (error) {
            console.error("Error al insertar la nueva contraseña");
          }
        } else {
          console.error("Contraseña anterior incorrecta");
        }
      }
    } catch (error) {
      console.error(
        "Error al enviar la solicitud de cambio de contraseña",
        error
      );
    }
  };

  const handleSubmitEditUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/usuarios/email/${email}`
      );
      if (response.status === 200) {
        const usuario = response.data;
          const formData = new FormData();
          if (nombre) {
            formData.append("nombre", nombre);
          } else {
            formData.append("nombre", usuario.nombre);
          }
          if (apellidos) {
            formData.append("apellidos", apellidos);
          } else {
            formData.append("apellidos", usuario.apellidos);
          }

          formData.append("Email", email);
          if (passwordNew){
            formData.append("contrasena", passwordNew);
          } else{
            formData.append("contrasena", usuario.contrasena);
          }
          
          if (formData.fotoPerfil) {
            formData.append("fotoPerfil", formData.fotoPerfil);
          }
          try {
            await axios.put(
              `http://127.0.0.1:8000/usuarios/${usuario.id}`,
              formData
            );
            console.log("Usuario actualizado exitosamente");
          } catch (error) {
            console.error("Error al insertar nuevos datos");
          }
      }
    } catch (error) {
      console.error(
        "Error al enviar la solicitud de cambio de contraseña",
        error
      );
    }
  };

  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <Link href="#">Establecer/Cambiar Foto de Perfil</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" onClick={handleEditUserClick}>
              Editar mi Usuario
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" onClick={handleChangePasswordClick}>
              Cambiar Contraseña
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary" onClick={() => navigate("/")}>
              Volver
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {showChangePasswordForm && (
        <form className="max-w-md mx-auto mt-3" onSubmit={handleSubmitNewPassword}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="email"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Escriba su Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password_old"
              id="floating_password_old"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={passwordOld}
              onChange={handleOldPasswordChange}
              required
            />
            <label
              htmlFor="floating_password_old"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña Anterior
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password_new"
              id="floating_password_new"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={passwordNew}
              onChange={handleNewPasswordChange}
              required
            />
            <label
              htmlFor="floating_password_new"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nueva Contraseña
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
          <button
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none font-medium text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center"
            onClick={handleCancelChangePassword}
          >
            Cancelar
          </button>
        </form>
      )}

      {showEditUserForm && (
        <form className="max-w-md mx-auto mt-3" onSubmit={handleSubmitEditUser}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="email"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Escriba su Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="nombre"
              id="floating_nombre"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={nombre}
              onChange={handleNombreChange}              
            />
            <label
              htmlFor="floating_nombre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Escribir para Cambiar el Nombre
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="apellidos"
              id="floating_apellidos"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={apellidos}
              onChange={handleApellidosChange}              
            />
            <label
              htmlFor="floating_apellidos"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Escribir para Cambiar el Apellidos
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
          <button
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none font-medium text-sm w-full sm:w-auto mt-3 px-5 py-2.5 text-center"
            onClick={handleCancelEditUser}
          >
            Cancelar
          </button>
        </form>
      )}
    </>
  );
};



