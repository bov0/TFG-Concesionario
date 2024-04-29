import React, { createContext, useContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    console.log("Carrito actualizado:", carrito);
    console.log(carrito.length);
  }, [carrito]);

  return (
    <CarritoContext.Provider value={{ carrito: carrito, setCarrito: setCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);