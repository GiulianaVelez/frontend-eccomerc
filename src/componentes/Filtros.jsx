import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
    <Accordion className="w-full lg:w-64" sx={{ backgroundColor: '#fce4ec', borderColor: '#f48fb1', borderRadius: '8px', borderWidth: '1px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#f48fb1' }} />}>
        <Typography variant="h6" sx={{ color: '#ad1457', fontWeight: 'bold' }}>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col p-4">
        
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
      </AccordionDetails>
    </Accordion>
  );
};

export default Filtros;