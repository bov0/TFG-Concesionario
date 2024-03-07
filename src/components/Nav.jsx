import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var [isLogged, setIsLogged] = useState(false);
  function logOut(){
    setIsLogged(isLogged = false);
  }
  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      open={isMenuOpen}
      shouldHideOnScroll
      className="uppercase"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <NavLink color="foreground" to="/" className="text-lg">
            concesionario
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarMenuItem>
          <NavLink color="foreground" to="/NuestrosCoches">
            Nuestros coches
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/TrabajaConNosotros">
            Trabaja con nosotros
          </NavLink>
        </NavbarMenuItem>
      </NavbarContent>

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
          {isLogged ? (
            <>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Iniciada sesión como</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="ajustes">Ajustes</DropdownItem>
              <DropdownItem key="ventas">Ventas</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logOut}>
                Cerrar Sesión
              </DropdownItem>
            </>
          ) : (            
            <>
              <DropdownItem key="login">Iniciar Sesión</DropdownItem>
              <p className="text-gray-500">
                Debes iniciar sesión para acceder a esta sección.
              </p>
            </>
          )}
        </DropdownMenu>
      </Dropdown>

      <NavbarMenu justify="center" className="backdrop-blur-sm">
        <NavbarMenuItem>
          <NavLink color="foreground" to="/NuestrosCoches">
            Nuestros coches
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/TrabajaConNosotros">
            Trabaja con nosotros
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
