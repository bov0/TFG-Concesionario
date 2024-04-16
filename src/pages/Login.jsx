import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

export const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate(); // Utilizamos useNavigate para la navegación

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://127.0.0.1:8000/usuarios/nombre/${nombre}`);
            if (response.status === 200) {
                const usuario = response.data;
                if (usuario && usuario.contrasena === password) {
                    // La contraseña es correcta, puedes redirigir al usuario a otra página
                    console.log('Inicio de sesión exitoso');
                    const id = response.data.id;
                    const userData = { id, nombre };
                    login(userData);
                    navigate('/'); // Redirige al usuario a la página de inicio
                } else {
                    // La contraseña es incorrecta, muestra un mensaje de error al usuario
                    console.error('Contraseña incorrecta');
                }
            } else {
                // El inicio de sesión falló, puedes mostrar un mensaje de error al usuario aquí
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de inicio de sesión o usuario inexistente');
        }
    };

    const handleEmailChange = (event) => {
        setNombre(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className='h-[90vh] flex flex-col justify-center items-center mx-auto md:w-8/12'>
            <h1 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-800'>Iniciar Sesion</h1>
            <form className="max-w-md mx-auto rounded-xl py-24 px-12 border-solid border-2 border-pink-400" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={nombre}
                        onChange={handleEmailChange}
                        required
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Nombre
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Contraseña
                    </label>
                </div>
                <Button
                    type="submit"
                    className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-xl"
                >
                    Enviar
                </Button>
            </form>
        </div>
    );
};
