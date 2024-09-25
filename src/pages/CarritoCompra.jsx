import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useCarrito } from '../components/carritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../components/AuthContext";
import axios from "axios";

export const CarritoCompra = () => {
  const { carrito, setCarrito } = useCarrito();
  const { user } = useAuth();

  const confirmarCompra = async (coche, index) => {
    //dataVentas tiene los datos que queremos introducir a la tabla ventas
    const dataVentas = new FormData();
    var id_coche = coche.id;
    var id_usuario = user.id;
    id_coche = parseInt(id_coche);
    id_usuario = parseInt(id_usuario);
    dataVentas.append("coche_id", id_coche);
    dataVentas.append("comprador_id", id_usuario);
    const cocheDetailsResponse = await axios.get(`https://tfg-backendconcesionario.onrender.com/coches/${coche.id}`);
    const cocheDetails = cocheDetailsResponse.data;
    const responseMarca = await axios.get(`https://tfg-backendconcesionario.onrender.com/marcas-coche/nombre/${coche.marcaNombre}`);
    const marcaId = responseMarca.data;
    const responseModelo = await axios.get(`https://tfg-backend-4nkyb73jha-nw.a.run.app/modelos/nombre/${coche.modeloNombre}`);
    const modeloId = responseModelo.data;

    const dataCocheVendido = new FormData();
    dataCocheVendido.append("id", cocheDetails.id)
    dataCocheVendido.append("marca_id", marcaId);
    dataCocheVendido.append("modelo", modeloId);
    dataCocheVendido.append("precio", cocheDetails.precio);
    dataCocheVendido.append("km", cocheDetails.km);
    dataCocheVendido.append("anio", cocheDetails.anio);
    dataCocheVendido.append("cajaCambios", cocheDetails.cajaCambios);
    dataCocheVendido.append("combustible", cocheDetails.combustible);
    dataCocheVendido.append("distAmbiental", cocheDetails.distAmbiental);
    dataCocheVendido.append("cilindrada", cocheDetails.cilindrada);
    dataCocheVendido.append("tipCarr", cocheDetails.tipCarr);
    dataCocheVendido.append("color", cocheDetails.color);
    dataCocheVendido.append("vendedor_id", user.id);
    try {
      await axios.post(`https://tfg-backendconcesionario.onrender.com/cochesVendidos`, dataCocheVendido);
      eliminarDelCarrito(index);
    } catch (error) {
      console.error("Error al confirmar la compra del coche con id: " + cocheDetails.id);
    }
    try {
      await axios.post(`https://tfg-backendconcesionario.onrender.com/ventas`, dataVentas);
    } catch (error) {
      console.error("Error al confirmar la compra del coche con id: " + coche.id + " y comprador con id: " + user.id, error);
    }
    try {
      await axios.delete(`https://tfg-backendconcesionario.onrender.com/imagenes-coche/byCar/${cocheDetails.id}`);
    } catch (error) {
      console.error("Error al elimnar imagenes del coche con id: " + cocheDetails.id);
    }
    try {
      await axios.delete(`https://tfg-backendconcesionario.onrender.com/coches/${cocheDetails.id}`);
    } catch (error) {
      console.error("Error al eliminar el coche con id: " + coche.id);
    }
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(prevCarrito => prevCarrito.filter((item, i) => i !== index));
  };

  return (
    <div className='flex flex-col justify-center items-center mx-auto w-full lg:w-8/12 h-dvh'>
      {carrito.length === 0 ? (
        <p className="w-8/12 text-center h-[95vh] flex flex-col justify-center font-semibold text-3xl text-default-500">Todavia no has añadido nada al carrito.</p>
      ) : (
        <div className='w-10/12  xl:w-8/12 h-dvh flex flex-col justify-center gap-4'>
          <div className='flex items-center justify-center gap-1'>
          <h1 className='text-2xl font-semibold'>Mi carrito</h1>
          <FontAwesomeIcon icon={faShoppingBag} className="h-8 font-semibold" />
          </div>
          <Table hideHeader aria-label="Tabla de Carrito" className="text-center">
            <TableHeader>
              <TableColumn className='text-center'>Nombre</TableColumn>
              <TableColumn className='text-center'>Precio</TableColumn>
              <TableColumn className='text-center'>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {carrito.map((coche, i) => (
                <TableRow className='border-b-1' key={i}>
                  <TableCell>
                    <p className='font-semibold'>{`${coche.marcaNombre}-${coche.modeloNombre}`}</p>
                    <p>{coche.anio}</p>
                    <p>{coche.combustible},{coche.distAmbiental}</p>
                    <p>{coche.km}km,{coche.cajaCambios}</p>
                    </TableCell>
                  <TableCell className='flex flex-col'><p className='font-semibold'>Precio Total:</p> <p>{coche.precio}€</p></TableCell>
                  <TableCell className='flex gap-2 justify-center'>
                    <button
                      className="text-white bg-primary-500 hover:bg-primary-700 px-3 py-2 rounded-xl"
                      onClick={() => confirmarCompra(coche, i)}
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
      )}
    </div>
  );
};