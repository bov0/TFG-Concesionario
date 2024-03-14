import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import AvatarIcon from "./AvatarIcon";
import Logo from "./Logo";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false); // Estado de inicio de sesión
  
  const handleLogout = () => {
    setIsLogged(false); // Función para cerrar sesión
  };

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
          <Logo />
          <NavLink color="foreground" to="/" className="text-lg">concesionario</NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {isLogged ? ( // Mostrar diferentes opciones de navegación según el estado de inicio de sesión
          <>
            <NavbarMenuItem>
              <NavLink color="foreground" to="/MisCompras">
                Mis compras
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink color="foreground" to="/Perfil">
                Mi perfil
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem onClick={handleLogout}>
              Cerrar sesión
            </NavbarMenuItem>
          </>
        ) : (
          <>
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
            <NavbarMenuItem>
              <NavLink color="foreground" to="/Login">
                Iniciar sesión
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink color="foreground" to="/Registro">
                Registro
              </NavLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarContent>

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
            <NavbarMenuItem>
              <NavLink color="foreground" to="/Login">
                Iniciar sesión
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink color="foreground" to="/Registro">
                Registro
              </NavLink>
            </NavbarMenuItem>
      </NavbarMenu>

      <AvatarIcon />
    </Navbar>
  );
};

export default Nav;

