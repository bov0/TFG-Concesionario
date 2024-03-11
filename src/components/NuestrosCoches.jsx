import React, { useState, useEffect } from "react";
import Tarjeta from './Tarjeta';
import { Sidebar } from "./Sidebar";
import axios from "axios";

const NuestrosCoches = () => {
  const [coches, setCoches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cochesResult = await axios.get('http://127.0.0.1:8000/coches');
      const cochesConImagenes = await Promise.all(cochesResult.data.map(async (coche) => {
        try {
          const [marcaResult, modeloResult, imagenResult] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/marcas-coche/${coche.marca_id}`),
            axios.get(`http://127.0.0.1:8000/modelos/${coche.modelo}`),
            axios.get(`http://127.0.0.1:8000/imagenes-coche/imagen/${coche.id}`, { responseType: 'arraybuffer' })
          ]);
  
          const marcaNombre = marcaResult.data.nombreMarca || '';
          const modeloNombre = modeloResult.data.nombre || '';
          const imagenBlob = new Blob([imagenResult.data], { type: 'image/png' });
          const imagenURL = URL.createObjectURL(imagenBlob);
  
          return { ...coche, marcaNombre, modeloNombre, imagen: imagenURL };
        } catch (error) {
          return { ...coche, marcaNombre: '', modeloNombre: '', imagen: '../images/logo.jpg' };
        }
      }));
  
      setCoches(cochesConImagenes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-wrap justify-center gap-4 py-4">
        {coches.map((coche) => (
          <Tarjeta key={coche.id} {...coche} />
        ))}
      </div>
    </div>
  );
};

export default NuestrosCoches;
