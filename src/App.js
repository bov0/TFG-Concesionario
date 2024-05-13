import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Inicio from './pages/Inicio';
import { NextUIProvider } from "@nextui-org/react";
import NuestrosCoches from './pages/NuestrosCoches';
import { CompraCoches } from './pages/CompraCoches';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';
import { Ajustes } from './pages/Ajustes';
import { AuthProvider } from './components/AuthContext';
import { FiltrosProvider } from './components/FiltrosContext';
import { CarritoProvider } from './components/carritoContext';
import DetalleCoche from './pages/DetalleCoche';
import { CarritoCompra } from './pages/CarritoCompra';
import { ComprasVentas } from './pages/ComprasVentas';

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <FiltrosProvider>
          <CarritoProvider>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path='/NuestrosCoches' element={<NuestrosCoches />} />
                <Route path='/CompraCoche' element={<CompraCoches />} />
                <Route path='/Registro' element={<Registro />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Ajustes' element={<Ajustes />} />
                <Route path="/Coche/:id" element={<DetalleCoche />} />
                <Route path='/Carrito' element={<CarritoCompra/>}></Route>
                <Route path='/ComprasVentas' element={<ComprasVentas/>}></Route>
              </Routes>
            </Router>
          </CarritoProvider>
        </FiltrosProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;