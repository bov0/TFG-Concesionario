import React from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const Nav = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <h1>concesionario</h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink color="foreground" to="/Inicio">
            Inicio
          </NavLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
