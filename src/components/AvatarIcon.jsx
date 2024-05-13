import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const AvatarIcon = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Dropdown className='w-fit flex justify-center'>
      <DropdownTrigger className='w-fit flex justify-center'>
        {isAuthenticated ? (
          <img src={user.avatarURL} className='w-8 h-8 rounded-3xl shadow-3xl' alt={user.nombre} />
        ) : (
          <FontAwesomeIcon icon={faUser} className="h-5 hover:text-purple-600 font-semibold duration-300" />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {isAuthenticated ? (
          <DropdownItem textValue='Mis compras'><Link to="/ComprasVentas">Mis compras/Ventas</Link></DropdownItem>
        ) : (
          <DropdownItem textValue='Iniciar sesion'><Link to="/login">Iniciar Sesión</Link></DropdownItem>
        )}
        {isAuthenticated ? (
          <DropdownItem textValue='Ajustes perfil' onClick={() => console.log("Ajustes de perfil")}><Link to="/ajustes">Ajustes de perfil</Link></DropdownItem>
        ) : (
          <DropdownItem textValue='Registrarse'><Link to="/registro">Registrarse</Link></DropdownItem>
        )}
        {isAuthenticated && (
          <DropdownItem textValue='Cerrar sesion' className="text-danger" onClick={logout} color="danger">Cerrar Sesión</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarIcon;
