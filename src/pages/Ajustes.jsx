import React, { useState, useEffect } from "react";
import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

export const Ajustes = () => {
  const { user, isAuthenticated, fetchUserAvatar, setUser } = useAuth();
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(true);
  const [email, setEmail] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleToggleForm = (form) => {
    setShowChangePasswordForm(form === 'changePassword');
    setShowEditUserForm(form === 'editUser');
    setShowUploadPhotoForm(form === 'uploadPhoto');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file.name);
    setFotoPerfil(file); 
  };

  const handleCancelForm = () => {
    setShowChangePasswordForm(false);
    setShowEditUserForm(false);
    setShowUploadPhotoForm(false);
  };

  const updateUserData = async (usuario, data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre || usuario.nombre);
    formData.append("apellidos", data.apellidos || usuario.apellidos);
    formData.append("Email", data.email);
    formData.append("contrasena", data.passwordNew || usuario.contrasena);
    if (data.fotoPerfil) {
      formData.append("fotoPerfil", data.fotoPerfil);
    }

    try {
      await axios.put(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/${usuario.id}`, formData);
      setMensaje("Se han actualizado los cambios");
      console.log(data.isPasswordChange ? "Contraseña actualizada exitosamente" : "Usuario actualizado exitosamente");

      if (data.fotoPerfil) {
        const avatarURL = await fetchUserAvatar(usuario.id);
        setUser((prevUser) => ({ ...prevUser, avatarURL })); 
      }
    } catch (error) {
      console.error(`Error al insertar ${data.isPasswordChange ? "la nueva contraseña" : "nuevos datos"}`);
    }
  };

  const handleSubmit = async (event, isPasswordChange) => {
    event.preventDefault();
    try {
      const { data: usuario } = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/email/${user.Email}`);
      if (usuario && (!isPasswordChange || usuario.contrasena === passwordOld)) {
        setEmail(user.Email);
        await updateUserData(usuario, { email, nombre, apellidos, passwordNew, fotoPerfil, isPasswordChange });
      } else if (isPasswordChange) {
        console.error("Contraseña anterior incorrecta");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de cambio", error);
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div>
      <Navbar className="shadow-xl">
        <NavbarContent>
          <NavbarItem>
            <Link href="#" className="text-purple-800" onClick={() => handleToggleForm('uploadPhoto')}>
              Establecer/Cambiar Foto de Perfil
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-purple-800" onClick={() => handleToggleForm('editUser')}>
              Editar mi Usuario
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-purple-800" onClick={() => handleToggleForm('changePassword')}>
              Cambiar Contraseña
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-xl" onClick={() => navigate("/")}>
              Volver
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {showChangePasswordForm && (
        <form className="max-w-md mx-auto mt-3 h-[85vh] flex flex-col justify-center items-center md:w-8/12" onSubmit={(e) => handleSubmit(e, true)}>
          <InputField label="Contraseña Anterior" type="password" value={passwordOld} onChange={handleInputChange(setPasswordOld)} required />
          <InputField label="Nueva Contraseña" type="password" value={passwordNew} onChange={handleInputChange(setPasswordNew)} required />
          <FormButtons onCancel={handleCancelForm} />
        </form>
      )}

      {showEditUserForm && (
        <form className="max-w-md mx-auto mt-3 h-[85vh] flex flex-col justify-center items-center md:w-8/12" onSubmit={(e) => handleSubmit(e, false)}>
          <InputField label="Escribir para Cambiar el Nombre" type="text" value={nombre} onChange={handleInputChange(setNombre)} />
          <InputField label="Escribir para Cambiar el Apellidos" type="text" value={apellidos} onChange={handleInputChange(setApellidos)} />
          <FormButtons onCancel={handleCancelForm} />
        </form>
      )}

      {showUploadPhotoForm && (
        <form className="relative max-w-md mx-auto mt-3 h-[85vh] flex flex-col justify-center items-center md:w-8/12" onSubmit={(e) => handleSubmit(e, false)}>
          <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="imagenCoche"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Subir Imagen
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
          <FormButtons onCancel={handleCancelForm} />
        </form>
      )}
      {mensaje && (
        <p className="bg-lime-200 font-semibold p-4 rounded-xl absolute bottom-20 right-0 left-0 mx-auto w-fit">
          {mensaje}
        </p>
      )}
    </div>
  );
};

const InputField = ({ label, type, value, onChange, required }) => (
  <div className="relative z-0 w-full mb-5 group">
    <input
      type={type}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      value={value}
      onChange={onChange}
      required={required}
    />
    <label
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const FormButtons = ({ onCancel }) => (
  <>
    <Button className="bg-gradient-to-tr from-purple-800 to-pink-500 text-white font-bold shadow-lg mt-2" type="submit">
      Actualizar
    </Button>
    <Button className="bg-gradient-to-tr from-yellow-600 to-red-700 text-white font-bold shadow-lg mt-2" onClick={onCancel}>
      Cancelar
    </Button>
  </>
);
