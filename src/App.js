import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Inicio from './pages/Inicio';
import { NextUIProvider } from "@nextui-org/react";
import NuestrosCoches from './pages/NuestrosCoches';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';
import { Ajustes } from './pages/Ajustes';
import { AuthProvider } from './components/AuthContext';
import { FiltrosProvider } from './components/FiltrosContext';
import DetalleCoche from './pages/DetalleCoche';

function App() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <FiltrosProvider>
          <Router>
            <Nav />
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path='/NuestrosCoches' element={<NuestrosCoches />} />
              <Route path='/Registro' element={<Registro />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Ajustes' element={<Ajustes />} />
              <Route path="/coche/:id" element={<DetalleCoche />} />
            </Routes>
          </Router>
        </FiltrosProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;