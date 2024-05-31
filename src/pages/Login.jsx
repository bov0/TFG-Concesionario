import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

export const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [hayError, setHayError] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/usuarios/nombre/${nombre}`);
            if (response.status === 200) {
                const usuario = response.data;
                if (usuario && usuario.contrasena === password) {
                    const id = response.data.id;
                    const userData = { id, nombre };
                    login(userData);
                    navigate('/'); // Redirige al usuario a la página de inicio
                } else {
                    setError("La contraseña ingresada es incorrecta");
                    setHayError(true);
                }
            } else {
                setError("Error al iniciar sesión");
                setHayError(true);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de inicio de sesión o usuario inexistente');
            setError("Usuario inexistente");
            setHayError(true);
        }
    };

    const handleEmailChange = (event) => {
        setNombre(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className='h-dvh flex flex-col justify-center items-center mx-auto md:w-8/12'>
            <div className='shadow-2xl rounded-2xl flex flex-col justify-center items-center md:flex-row gap-0 w-full md:w-fit min-h-min backdrop-blur-3xl bg-white/30'>
                <div className="hidden md:block min-h-full w-6/12 mx-auto p-72 bg-default-100 rounded-l-2xl m-0 relative">
                    <div className="h-52 w-[80%] bg-blue-950 rounded-full shadow-xl absolute left-0 top-16 z-10">
                        <div className="h-36 w-80 backdrop-blur-xl bg-white/30 shadow-xl absolute left-0 top-10 z-30"></div>
                    </div>
                    <div className="h-44 w-[60%] bg-lime-200 rounded-r-full shadow-xl absolute left-0 top-44 z-20 flex items-center justify-center">
                        <h1 className="text-9xl font-extrabold z-50">GMC</h1>
                        <div className="h-36 w-80 backdrop-blur-xl bg-white/30 shadow-xl absolute left-20 top-32 z-20"></div>
                    </div>
                    <div className="h-44 w-96 bg-purple-400 rounded-full shadow-xl absolute left-20 top-[22rem] z-10 flex items-center justify-center">
                        <p className="text-6xl font-extrabold absolute -bottom-7 z-50">MOTORS</p>
                    </div>
                    <p className="absolute top-56 right-28 z-40 font-extrabold text-6xl text-purple-400">*</p>
                    <p className="absolute top-20 left-36 z-40 font-extrabold text-6xl text-lime-200">*</p>
                    <p className="absolute top-96 left-16 z-40 font-extrabold text-6xl text-blue-950">*</p>
                </div>
                <div className='flex items-center justify-center flex-col w-6/12 md:px-40'>
                    <h1 className='w-full text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-800'>Iniciar Sesion</h1>
                    <form className="w-full h-full mx-auto flex flex-col items-center gap-4 p-9 m-0 rounded-xl md:rounded-l-none md:rounded-r-2xl" onSubmit={handleSubmit}>
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
                            className="bg-lime-200 font-bold shadow-xl"
                        >
                            Enviar
                        </Button>
                    </form>
                    {hayError && (
                        <p className='p-2 rounded-xl bg-danger-500 font-bold text-white text-center absolute bottom-16'>{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
