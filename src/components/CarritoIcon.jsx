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
    <Dropdown className='flex justify-center'>
      <DropdownTrigger className='flex justify-center'>
        <FontAwesomeIcon icon={faCartShopping} />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        {isAuthenticated ? (
          carrito.map((coche, i) => (
            <DropdownItem key={i} textValue={`${coche.nombre} - ${coche.precio}€`}>
              {`${coche.nombre} ${coche.precio}€`}
              <button
                className="ml-3 hover:bg-danger-500 px-3 py-2 rounded-xl"
                onClick={() => eliminarDelCarrito(i)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem className='text-center' onClick={() => navigate('/Login')}>
            Debes Iniciar Sesión
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CarritoIcon;