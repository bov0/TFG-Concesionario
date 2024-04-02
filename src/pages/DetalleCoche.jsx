import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton, Button } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const DetalleCoche = () => {
  const [coche, setCoche] = useState(null);
  const { id: cocheId } = useParams();

  useEffect(() => {
    const fetchCocheData = async () => {
      try {
        // Hacer la petición para obtener los detalles básicos del coche
        const cocheResponse = await axios.get(`http://127.0.0.1:8000/coches/${cocheId}`);
        const cocheData = cocheResponse.data;

        // Hacer la petición para obtener el nombre de la marca
        const marcaResponse = await axios.get(`http://127.0.0.1:8000/marcas-coche/${cocheData.marca_id}`);
        const marcaNombre = marcaResponse.data.nombreMarca;

        // Hacer la petición para obtener el nombre del modelo
        const modeloResponse = await axios.get(`http://127.0.0.1:8000/modelos/${cocheData.modelo}`);
        const modeloNombre = modeloResponse.data.nombre;

        // Hacer la petición para obtener la imagen del coche
        const imagenResponse = await axios.get(`http://127.0.0.1:8000/imagenes-coche/imagen/${cocheId}`, { responseType: 'arraybuffer' });
        const imagenBlob = new Blob([imagenResponse.data], { type: 'image/png' });
        const imagenURL = URL.createObjectURL(imagenBlob);

        // Actualizar el estado del coche con la información obtenida
        setCoche({ ...cocheData, marcaNombre, modeloNombre, imagenURL });
      } catch (error) {
        console.error("Error fetching coche data:", error);
      }
    };

    fetchCocheData();
  }, [cocheId]);

  if (!coche) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex justify-center items-center space-y-3">
          <Skeleton className="rounded-lg aspect-video w-[50vw]">
            <div className="rounded-lg bg-default-300 h-full w-full"></div>
          </Skeleton>
          <div className="space-y-3 w-[50%]">
            <Skeleton className="w-3/5 rounded-lg" style={{ width: "60%" }}>
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg" style={{ width: "30%" }}>
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg" style={{ width: "40%" }}>
              <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg" style={{ width: "50%" }}>
              <div className="h-3 w-5/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    );
  }  

  return (
    <div className="flex justify-center items-center mx-auto h-screen gap-5">
      <img src={coche.imagenURL} className="rounded-xl aspect-video w-[50vw]" alt={`Imagen de ${coche.modeloNombre}`} />
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{coche.marcaNombre}-{coche.modeloNombre}</h1>
        <p>Año: {coche.anio}</p>
        <p className="text-lg font-bold">Precio: {coche.precio}€</p>
        <Button className="bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg">
          Prueba
        </Button>
      </section>
    </div>
  );
};

export default DetalleCoche;