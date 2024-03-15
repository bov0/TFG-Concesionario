import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const AvatarIcon = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {isAuthenticated ? (
          <DropdownItem onClick={() => console.log("Mis compras")}>Mis compras</DropdownItem>
        ) : (
          <DropdownItem onClick={() => console.log("Iniciar Sesión")}><Link to="/login">Iniciar Sesión</Link></DropdownItem>
        )}
        {isAuthenticated ? (
          <DropdownItem onClick={() => console.log("Ajustes de perfil")}>Ajustes de perfil</DropdownItem>
        ) : (
          <DropdownItem onClick={() => console.log("Registrarse")}><Link to="/registro">Registrarse</Link></DropdownItem>
        )}
        {isAuthenticated && (
          <DropdownItem className="text-danger" onClick={logout} color="danger">Cerrar Sesión</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarIcon;
