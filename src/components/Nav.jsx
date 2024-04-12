import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import AvatarIcon from "./AvatarIcon";
import imagenes from "../assets/imagenes";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      open={isMenuOpen}
      shouldHideOnScroll
      className="uppercase bg-default-50 shadow-lg"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <NavLink color="foreground" to="/">
            <img src={imagenes.img1} className="w-12 rounded-3xl" alt="" />
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink color="foreground" to="/NuestrosCoches">
            Nuestros Coches
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" to="/TrabajaConNosotros">
            Coches de Ocasion
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
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
      </NavbarMenu>
      <NavbarContent className="ml-36 md:ml-10">
        <AvatarIcon />
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;