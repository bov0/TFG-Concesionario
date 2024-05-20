import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

export const ComprasVentas = () => {
    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCochesCompradosData = async (userId) => {
            try {
                // Obtener los coches comprados
                const comprasResponse = await axios.get(`http://localhost:8000/compras/${userId}`);
                const cochesComprados = comprasResponse.data;

                // Obtener detalles de cada coche
                const cocheDetailsPromises = cochesComprados.map(async (compra) => {
                    try {
                        const cocheResponse = await axios.get(`http://localhost:8000/cochesVendidos/${compra.coche_id}`);
                        const coche = cocheResponse.data;

                        const [marcaResult, modeloResult] = await Promise.all([
                            axios.get(`http://127.0.0.1:8000/marcas-coche/${coche.marca_id}`),
                            axios.get(`http://127.0.0.1:8000/modelos/${coche.modelo}`)
                        ]);

                        const marcaNombre = marcaResult.data.nombreMarca || 'Error marca';
                        const modeloNombre = modeloResult.data.nombre || 'Error modelo';

                        return {
                            ...compra,
                            cocheDetails: { ...coche, marcaNombre, modeloNombre }
                        };
                    } catch (error) {
                        console.error(`Error fetching coche data for coche_id ${compra.coche_id}`, error);
                        return {
                            ...compra,
                            cocheDetails: null
                        };
                    }
                });

                const cochesCompradosConDetalles = await Promise.all(cocheDetailsPromises);
                setCompras(cochesCompradosConDetalles);
            } catch (error) {
                console.error("Error fetching compras data", error);
            }
        };

        const fetchCochesVendidosData = async () => {
            try {
                const cochesVendidos = await axios.get(`http://localhost:8000/coches-vendidos/${user.id}`);
                const ventasConDetalles = await Promise.all(cochesVendidos.data.map(async (coche) => {
                    try {
                        const [marcaResult, modeloResult] = await Promise.all([
                            axios.get(`http://127.0.0.1:8000/marcas-coche/${coche.marca_id}`),
                            axios.get(`http://127.0.0.1:8000/modelos/${coche.modelo}`)
                        ]);

                        const marcaNombre = marcaResult.data.nombreMarca || 'Error marca';
                        const modeloNombre = modeloResult.data.nombre || 'Error modelo';

                        return { ...coche, marcaNombre, modeloNombre };
                    } catch (error) {
                        console.error("Error fetching marca or modelo data", error);
                        return { ...coche, marcaNombre: 'Error marca', modeloNombre: 'Error modelo' };
                    }
                }));

                setVentas(ventasConDetalles);
            } catch (error) {
                console.error("Error fetching ventas data", error);
            }
        };

        fetchCochesCompradosData(user.id);
        fetchCochesVendidosData();
    }, [user.id]);

    return (
        <div className='h-dvh flex flex-col justify-center items-center mx-auto md:w-8/12 gap-5'>
            <div className='p-5 backdrop-blur-3xl bg-white/50 rounded-xl w-full'>
                <h2 className='text-center text-3xl font-semibold mb-5'>Compras</h2>
                {compras.length > 0 ? (
                    <div>
                        <Table className='text-center'>
                            <TableHeader>
                                <TableColumn className='text-center'>Marca</TableColumn>
                                <TableColumn className='text-center'>Modelo</TableColumn>
                                <TableColumn className='text-center'>Precio</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {compras.map((compra) => (
                                    <TableRow key={compra.id}>
                                        <TableCell>{compra.cocheDetails.marcaNombre}</TableCell>
                                        <TableCell>{compra.cocheDetails.modeloNombre}</TableCell>
                                        <TableCell>{compra.cocheDetails.precio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p>No hay compras aún.</p>
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
                        <Table className='text-center'>
                            <TableHeader>
                                <TableColumn className='text-center'>Marca</TableColumn>
                                <TableColumn className='text-center'>Modelo</TableColumn>
                                <TableColumn className='text-center'>Precio</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {ventas.map((venta) => (
                                    <TableRow key={venta.id}>
                                        <TableCell>{venta.marcaNombre}</TableCell>
                                        <TableCell>{venta.modeloNombre}</TableCell>
                                        <TableCell>{venta.precio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <p>No hay ventas aún.</p>
                        <Button className='bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg'>
                            <NavLink to="/CompraCoche">
                                Publica tu primer vehículo
                            </NavLink>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};