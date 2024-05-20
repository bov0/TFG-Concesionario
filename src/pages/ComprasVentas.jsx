import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Button,Table,TableHeader,TableColumn,TableBody,TableRow,TableCell } from '@nextui-org/react';
import axios from 'axios';

export const ComprasVentas = () => {
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const fetchCocheData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/coches-vendidos/15');
                setVentas(response.data);
            } catch (error) {
                console.error("Error fetching ventas data", error);
            }
        };

        fetchCocheData();
    }, []);

    return (
        <div className='h-dvh flex flex-col justify-center items-center mx-auto md:w-8/12 gap-5'>
            <div className='p-5 backdrop-blur-3xl bg-white/50 rounded-xl w-full'>
                <h2 className='text-center text-3xl font-semibold mb-5'>Compras</h2>
                {compras.length > 0 ? (
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
                {ventas.length > 0 ? (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableColumn>Marca</TableColumn>
                                <TableColumn>Modelo</TableColumn>
                                <TableColumn>Precio</TableColumn>
                            </TableHeader>
                            <TableBody>
                            {ventas.map((venta) => (
                                <TableRow key={venta.id}>
                                    <TableCell>{venta.marca_id}</TableCell>
                                    <TableCell>{venta.modelo}</TableCell>
                                    <TableCell>{venta.precio}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
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
    );
}