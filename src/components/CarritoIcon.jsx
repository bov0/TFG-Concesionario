import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuth } from './AuthContext';
import { useCarrito } from './carritoContext';
import { useNavigate } from 'react-router-dom';

const CarritoIcon = () => {
  const { isAuthenticated } = useAuth();
  const { carrito, setCarrito } = useCarrito();
  const navigate = useNavigate();

  const eliminarDelCarrito = (index) => {
    setCarrito(prevCarrito => prevCarrito.filter((item, i) => i !== index));
  };

  return (
    <div className='flex justify-center items-center relative'>
      <Dropdown className='flex justify-center items-center'>
        <DropdownTrigger className='flex justify-center'>
          <FontAwesomeIcon icon={faCartShopping} className="h-5 hover:text-purple-600 font-semibold duration-300" />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Menu">
          {isAuthenticated ? (
            carrito.map((coche, i) => (
              <DropdownItem key={i} textValue={`${coche.marcaNombre}-${coche.modeloNombre} - ${coche.precio}€`} onClick={() => navigate(`/Coche/${coche.id}`)}>
                <div className='flex items-center justify-between'>
                  {`${coche.marcaNombre}-${coche.modeloNombre} ${coche.precio}€`}
                  <button
                    className="hover:bg-danger-500 px-3 py-2 rounded-xl"
                    onClick={() => eliminarDelCarrito(i)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem className='text-center' onClick={() => navigate('/Login')}>
              Debes Iniciar Sesión
            </DropdownItem>
          )}
          {isAuthenticated && (
            <DropdownItem textValue='Ir al carrito' className='text-center' color="secondary" onClick={() => navigate('/Carrito')}>
              Ir al carrito
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      {carrito.length > 0 && (
        <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 -top-3 right-1"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 -top-3 right-1 z-30"></span>
      </span>
      )}
    </div>
  );
};

export default CarritoIcon;