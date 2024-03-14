import React from 'react';
import { Avatar, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuth } from './AuthContext';

export default function AvatarIcon() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Usuario Invitado"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {isAuthenticated ? (
          <>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Iniciada sesión como</p>
              <p className="font-semibold">{user && user.email}</p>
            </DropdownItem>
            <DropdownItem key="ajustes">Ajustes</DropdownItem>
            <DropdownItem key="ventas">Ventas</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Cerrar Sesión
            </DropdownItem>
          </>
        ) : (
          <>
            <DropdownItem key="login">Iniciar Sesión</DropdownItem>
            <DropdownItem key="registro">Registrarse</DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}