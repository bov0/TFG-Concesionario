import React, { createContext, useContext, useState, useEffect } from 'react';

export const FiltrosContext = createContext();

export const FiltrosProvider = ({ children }) => {
  const [filtros, setFiltros] = useState({
    Marca: "",
    Modelo: "",
    Precio: "",
    Kilometros: "",
    Anio: "",
    cajaCambio: [],
    combustible: [],
    distAmbiental: [],
    Cilindrada: [],
    Carroceria: "",
    color: []
  });

  useEffect(() => {
    console.log("Filtros actualizados:", filtros);
  }, [filtros]);

  return (
    <FiltrosContext.Provider value={{ filtros, setFiltros }}>
      {children}
    </FiltrosContext.Provider>
  );
};

export const useFiltros = () => useContext(FiltrosContext);