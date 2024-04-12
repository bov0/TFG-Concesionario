import React, { useState } from "react";
import axios from "axios";

export const CompraCoches = () => {
  const [formData, setFormData] = useState({
    marca_id: 0,
    modelo: "",
    precio: 0.0,
    km: 0,
    anio: 0,
    cajaCambios: "",
    combustible: "",
    distAmbiental: "",
    cilindrada: 0,
    tipCarr: "",
    color: "",
    vendedor_id: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "marca_id" || name === "km" || name === "anio" || name === "cilindrada" || name === "vendedor_id" ? parseInt(value) : name === "precio" ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/coches"; // Tu URL de la API aquí

    try {
      await axios.post(url, formData);
      // Manejar el éxito, por ejemplo, limpiar el formulario o mostrar un mensaje de éxito
      console.log("Coche añadido con éxito");
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error("Error al añadir coche:", error.message);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6">
        <input
          type="number"
          name="marca_id"
          value={formData.marca_id}
          onChange={handleChange}
          placeholder="ID de la Marca"
          required
        />
        <input
          type="text"
          name="modelo"
          value={formData.modelo}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          type="number"
          name="km"
          value={formData.km}
          onChange={handleChange}
          placeholder="Kilómetros"
          required
        />
        <input
          type="number"
          name="anio"
          value={formData.anio}
          onChange={handleChange}
          placeholder="Año"
          required
        />
        <input
          type="text"
          name="cajaCambios"
          value={formData.cajaCambios}
          onChange={handleChange}
          placeholder="Caja de Cambios"
          required
        />
        <input
          type="text"
          name="combustible"
          value={formData.combustible}
          onChange={handleChange}
          placeholder="Combustible"
          required
        />
        <input
          type="text"
          name="distAmbiental"
          value={formData.distAmbiental}
          onChange={handleChange}
          placeholder="Distancia Ambiental"
          required
        />
        <input
          type="number"
          name="cilindrada"
          value={formData.cilindrada}
          onChange={handleChange}
          placeholder="Cilindrada"
          required
        />
        <input
          type="text"
          name="tipCarr"
          value={formData.tipCarr}
          onChange={handleChange}
          placeholder="Tipo de Carrocería"
          required
        />
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Color"
          required
        />
        <input
          type="number"
          name="vendedor_id"
          value={formData.vendedor_id}
          onChange={handleChange}
          placeholder="ID del Vendedor"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
      >
        Enviar
      </button>
    </form>
  );
};
