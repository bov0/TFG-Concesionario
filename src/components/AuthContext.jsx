import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserAvatar = async (userId) => {
    try {
      const response = await axios.get(
        `https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/imagen/${userId}`,
        { responseType: 'arraybuffer' }
      );
      const blob = new Blob([response.data], { type: 'image/png' });
      const avatarURL = URL.createObjectURL(blob);
      return avatarURL;
    } catch (error) {
      console.error('Error al obtener la imagen del usuario:', error);
      return null;
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/${userData.id}`);
      if (response.status === 200) {
        const usuarioCompleto = response.data;
        const avatarURL = await fetchUserAvatar(userData.id);
        setUser({ ...usuarioCompleto, avatarURL }); 
        setIsAuthenticated(true);
        console.log('Inicio de sesión exitoso dentro de AuthContext, Prueba.');
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const logout = () => {
    console.log((user?.nombre || 'Usuario') + " cerrando sesión...");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, fetchUserAvatar, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
