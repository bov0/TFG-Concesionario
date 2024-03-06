import React from 'react'
import {
    Avatar,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";

export default function AvatarIcon() {
  return (
    <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Iniciada sesión como</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="ajustes">Ajustes</DropdownItem>
          <DropdownItem key="ventas">Ventas</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}
