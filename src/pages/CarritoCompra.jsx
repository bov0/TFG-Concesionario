import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useCarrito } from '../components/carritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTrash } from '@fortawesome/free-solid-svg-icons';

export const CarritoCompra = () => {
  const { carrito,setCarrito } = useCarrito();

  const eliminarDelCarrito = (index) => {
    setCarrito(prevCarrito => prevCarrito.filter((item, i) => i !== index));
  };

  return (
    <div className='flex flex-col justify-center items-center mx-auto md:w-8/12 h-full'>
      <Table aria-label="Tabla de Carrito" className="w-8/12 text-center h-[95vh] flex flex-col justify-center">
        <TableHeader>
          <TableColumn className='text-center'>Nombre</TableColumn>
          <TableColumn className='text-center'>Precio</TableColumn>
          <TableColumn className='text-center'>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {carrito.map((producto, i) => (
            <TableRow key={i}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.precio}€</TableCell>
              <TableCell className='flex gap-2 justify-center'>
              <button
                className="text-white bg-primary-500 hover:bg-primary-700 px-3 py-2 rounded-xl"
                onClick={() => console.log("añadido al pedido")}
              >
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </button>
              <button
                className="text-white bg-danger-500 hover:bg-danger-700 px-3 py-2 rounded-xl"
                onClick={() => eliminarDelCarrito(i)}
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};