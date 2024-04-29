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
import CarritoIcon from "./CarritoIcon";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      open={isMenuOpen}
      shouldHideOnScroll
      className="uppercase bg-default-50 shadow-lg"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand className="flex justify-center">
          <NavLink color="foreground" to="/">
            <p className="text-transparent bg-clip-text bg-indigo-400 font-extrabold text-3xl">GMC</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/NuestrosCoches">
            Nuestros Coches
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/TrabajaConNosotros">
            Coches de Ocasion
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/NuestrosCoches">
            Nuestros Coches
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/CompraCoche">
            Compramos tu coche
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" className="hover:text-purple-600 font-semibold duration-300" to="/TrabajaConNosotros">
            Coches de Ocasion
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent justify="end">
        <AvatarIcon />
        <CarritoIcon />
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;