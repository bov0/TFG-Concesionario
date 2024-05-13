import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { Button } from '@nextui-org/react';

export const ComprasVentas = () => {

    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);

    return (
        <div className='h-dvh flex flex-col justify-center items-center mx-auto md:w-8/12 gap-5'>
            <div className='p-5 backdrop-blur-3xl bg-white/50 rounded-xl w-full'>
                <h2 className='text-center text-3xl font-semibold mb-5'>Compras</h2>
                {compras.length === null ? (
                    <p>Hay compras</p>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p>No hay compras aun.</p>
                        <Button className='bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg'>
                            <NavLink to="/NuestrosCoches">
                                Empieza a comprar
                            </NavLink>
                        </Button>
                    </div>
                )}
            </div>
            <div className='p-5 backdrop-blur-3xl bg-white/30 rounded-xl w-full'>
                <h2 className='text-center text-3xl font-semibold mb-5'>Ventas</h2>
                {ventas.length === null ? (
                    <p>Hay ventas</p>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p>No hay ventas aun.</p>
                        <Button className='bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg'>
                            <NavLink to="/CompraCoche">
                                Publica tu primer vehiculo
                            </NavLink>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
