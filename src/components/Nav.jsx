import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import AvatarIcon from "./AvatarIcon";
import Logo from "./Logo";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <NavbarMenuItem>
          <NavLink color="foreground" to="/NuestrosCoches">
            Nuestros Coches
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to="/TrabajaConNosotros">
            Coches de Ocasion
          </NavLink>
        </NavbarMenuItem>
      </NavbarContent>
      <NavbarContent className="ml-10">
        <AvatarIcon />
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;

