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
        const cocheResponse = await axios.get(`http://127.0.0.1:8000/coches/${cocheId}`);
        const cocheData = cocheResponse.data;

        const marcaResponse = await axios.get(`http://127.0.0.1:8000/marcas-coche/${cocheData.marca_id}`);
        const marcaNombre = marcaResponse.data.nombreMarca;

        const modeloResponse = await axios.get(`http://127.0.0.1:8000/modelos/${cocheData.modelo}`);
        const modeloNombre = modeloResponse.data.nombre;

        const imagenResponse = await axios.get(`http://127.0.0.1:8000/imagenes-coche/imagen/${cocheId}`, { responseType: 'arraybuffer' });
        const imagenBlob = new Blob([imagenResponse.data], { type: 'image/png' });
        const imagenURL = URL.createObjectURL(imagenBlob);

        const vendedorResponse = await axios.get(`http://127.0.0.1:8000/usuarios/${cocheData.vendedor_id}`);
        const vendedorNombre = vendedorResponse.data.nombre

        const vendedorAvatarResponse = await axios.get(`http://127.0.0.1:8000/usuarios/imagen/${cocheData.vendedor_id}`, { responseType: 'arraybuffer' });
        const vendedorAvatarBlob = new Blob([vendedorAvatarResponse.data], { type: 'image/png' });
        const vendedorAvatarURL = URL.createObjectURL(vendedorAvatarBlob);

        // Actualizar el estado del coche con la información obtenida
        setCoche({ ...cocheData, marcaNombre, modeloNombre, imagenURL, vendedorNombre, vendedorAvatarURL });
      } catch (error) {
        console.error("Error fetching coche data:", error);
      }
    };

    fetchCocheData();
  }, [cocheId]);

  if (!coche) {
    return (
      <div className="flex justify-center items-center h-screen w-screen flex-col md:flex-row">
        <div className="flex justify-center flex-col items-center space-y-3">
          <Skeleton className="rounded-xl aspect-video w-96 md:w-[50vw] shadow-xl">
            <div className="rounded-xl bg-default-300 h-full w-full"></div>
          </Skeleton>
          <section className="flex md:justify-around align-middle flex-wrap flex-col md:flex-row mt-2 text-default-500 md:w-[50vw] bg-default-50 p-5 rounded-xl shadow-xl">
            <Skeleton className="w-1/2 md:w-3/5 h-4 rounded-lg mb-3 md:mb-0" />
            <Skeleton className="w-1/4 md:w-2/5 h-4 rounded-lg mb-3 md:mb-0" />
            <Skeleton className="w-1/4 md:w-2/5 h-4 rounded-lg mb-3 md:mb-0" />
            <Skeleton className="w-1/2 md:w-3/5 h-4 rounded-lg mb-3 md:mb-0" />
          </section>
        </div>
        <aside className="flex flex-col gap-3 md:gap-5 w-96">
          <div className="bg-default-50 py-16 px-5 rounded-xl shadow-xl">
            <Skeleton className="text-2xl font-semibold h-8 rounded-lg mb-3 w-1/2 md:w-3/5" />
            <Skeleton className="h-6 w-1/4 md:w-2/5 rounded-lg mb-3" />
            <Skeleton className="h-6 w-1/4 md:w-2/5 rounded-lg mb-3" />
            <Skeleton className="h-6 w-1/2 md:w-3/5 rounded-lg mb-3" />
          </div>
          <div className="flex items-center bg-default-50 gap-2 p-5 rounded-xl shadow-xl">
            <Skeleton className="w-10 h-10 rounded-3xl" />
            <Skeleton className="h-6 w-1/4 md:w-2/5 rounded-lg mb-3" />
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mx-auto h-screen gap-3 md:gap-5 flex-col md:flex-row">
      <div>
        <img src={coche.imagenURL} className="rounded-xl aspect-video w-96 md:w-[50vw] shadow-xl" alt={`Imagen de ${coche.modeloNombre}`} />
        <section className="flex md:justify-around align-middle flex-wrap flex-col md:flex-row mt-2 text-default-500 md:w-[50vw] bg-default-50 p-5 rounded-xl shadow-xl">
          <p>Caja de cambios: <span className="font-semibold">{coche.cajaCambios}</span></p>
          <p>Combustible: <span className="font-semibold">{coche.combustible}</span></p>
          <p>Kilometraje: <span className="font-semibold">{coche.km} km</span></p>
          <p>Distintivo medioambiental: <span className="font-semibold">{coche.distAmbiental}</span></p>
        </section>
      </div>
      <aside className="flex flex-col gap-3 md:gap-5 w-96">
        <div className="bg-default-50 py-16 px-5 rounded-xl shadow-xl relative">
          <h1 className="text-2xl font-semibold">{coche.marcaNombre}-{coche.modeloNombre}</h1>
          <p>Año: {coche.anio}</p>
          <p className="text-lg">Precio: <span className="font-semibold">{coche.precio}€</span></p>
          <Button className="absolute bottom-5 right-5 bg-gradient-to-tr from-pink-500 to-purple-800 text-white font-bold shadow-lg">
            Añadir al carrito
          </Button>
        </div>
        <div className="flex items-center bg-default-50 gap-2 p-5 rounded-xl shadow-xl">
          <img src={coche.vendedorAvatarURL} className="w-10 h-10 rounded-3xl" alt={`Imagen de ${coche.vendedorNombre}`}></img>
          <h1 className="text-xl font-semibold">{coche.vendedorNombre}</h1>
        </div>
      </aside>
    </div>
  );
};

export default DetalleCoche;