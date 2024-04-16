import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const AvatarIcon = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Dropdown className='w-fit flex justify-center'>
      <DropdownTrigger className='w-fit flex justify-center'>
          <FontAwesomeIcon icon={faUser} />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {isAuthenticated ? (
          <DropdownItem textValue='Mis compras' onClick={() => console.log("Mis compras")}>Mis compras</DropdownItem>
        ) : (
          <DropdownItem textValue='Iniciar sesion' onClick={() => console.log("Iniciar Sesión")}><Link to="/login">Iniciar Sesión</Link></DropdownItem>
        )}
        {isAuthenticated ? (
          <DropdownItem textValue='Ajustes perfil' onClick={() => console.log("Ajustes de perfil")}><Link to="/ajustes">Ajustes de perfil</Link></DropdownItem>
        ) : (
          <DropdownItem textValue='Registrarse' onClick={() => console.log("Registrarse")}><Link to="/registro">Registrarse</Link></DropdownItem>
        )}
        {isAuthenticated && (
          <DropdownItem textValue='Cerrar sesion' className="text-danger" onClick={logout} color="danger">Cerrar Sesión</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarIcon;
