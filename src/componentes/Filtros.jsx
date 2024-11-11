import React, { useEffect, useState } from "react";
import axios from "axios";

const Filtros = ({ setCategoriaSeleccionada, setRangoPrecio }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionadaLocal, setCategoriaSeleccionadaLocal] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");

  
  const obtenerCategorias = async () => {
    try {
      const respuesta = await axios.get("/api/categoria/");
      setCategorias(respuesta.data.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  
  const manejarCambioCategoria = (e) => {
    const valor = e.target.value;
    setCategoriaSeleccionadaLocal(valor);
    setCategoriaSeleccionada(valor); 
  };

  
  const manejarCambioPrecio = () => {
    setRangoPrecio({ min: minPrecio, max: maxPrecio });
  };

  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg text-pink-700 mb-4">Filtros</h2>
      
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-pink-700" htmlFor="categoria">
          Categoría:
        </label>
        <select
          className="w-full px-3 py-2 border border-pink-300 rounded-lg text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={categoriaSeleccionadaLocal}
          onChange={manejarCambioCategoria}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.descripcion}
            </option>
          ))}
        </select>
      </div>

      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-pink-700" htmlFor="precio_min">
          Precio Mínimo:
        </label>
        <input
          id="precio_min"
          type="number"
          className="w-full px-3 py-2 border border-pink-300 rounded-lg text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={minPrecio}
          onChange={(e) => setMinPrecio(e.target.value)}
          onBlur={manejarCambioPrecio}
        />
      </div>

      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-pink-700" htmlFor="precio_max">
          Precio Máximo:
        </label>
        <input
          id="precio_max"
          type="number"
          className="w-full px-3 py-2 border border-pink-300 rounded-lg text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={maxPrecio}
          onChange={(e) => setMaxPrecio(e.target.value)}
          onBlur={manejarCambioPrecio}
        />
      </div>
    </div>
  );
};

export default Filtros;