import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('isAuthenticated cambió:', isAuthenticated);
  }, [isAuthenticated]); // Ejecuta este efecto cada vez que isAuthenticated cambie

  const login = async (userData) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/usuarios/${userData.id}`);
      
      if (response.status === 200) {
        const usuarioCompleto = response.data;

        console.log(usuarioCompleto);
        
        setUser(usuarioCompleto);
        setIsAuthenticated(true);
        console.log('Inicio de sesión exitoso dentro de AuthContext');
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const logout = () => {
    console.log(user.nombre + " cerrando sesion...")
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};