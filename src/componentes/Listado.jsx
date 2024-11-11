import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Busqueda from './Busqueda';
import Filtros from './Filtros';

function Listado({ items }) {
  const [filtro, setFiltro] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [rangoPrecio, setRangoPrecio] = useState({ min: '', max: '' });

  const filtrarProductos = () => {
    return items.filter(item => {
      const coincideNombre = filtro === '' || item.nombre.toLowerCase().includes(filtro.toLowerCase());
      const coincideCategoria = categoriaSeleccionada === '' || item.CategoriumId === parseInt(categoriaSeleccionada);
      const coincidePrecio = (
        (rangoPrecio.min === '' || item.precio >= parseFloat(rangoPrecio.min)) &&
        (rangoPrecio.max === '' || item.precio <= parseFloat(rangoPrecio.max))
      );
      return coincideNombre && coincideCategoria && coincidePrecio;
    });
  };

  return (
    <div className="relative flex">
      <div className="absolute left-0 top-0 w-64 p-5 bg-pink-100 h-full">
       
        <div className="mb-4"> 
          <Busqueda filtro={filtro} setFiltro={setFiltro} />
        </div>

        <div>
          <Filtros
            setCategoriaSeleccionada={setCategoriaSeleccionada}
            setRangoPrecio={setRangoPrecio}
          />
        </div>
      </div>
  
      <div className="ml-64 p-5 flex-grow"> 
        <div className="text-center font-bold text-2xl text-pink-800 mb-6">
          PRODUCTOS
        </div>
  
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-4">
          {filtrarProductos().map((item) => (
            <div
              key={item.id}
              className="relative group bg-white border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="w-full h-80 bg-gray-200 flex items-center overflow-hidden">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="object-cover w-full h-full transition duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link to={`/detalle/${item.id}`} className="hover:underline text-pink-600">
                    {item.nombre}
                  </Link>
                </h3>
                <p className="mt-1 text-lg font-bold text-gray-700">
                  ${item.precio}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {item.descripcion_corta}
                </p>
                
                <Link to={`/detalle/${item.id}`}>
                  <button
                    className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-300 hover:bg-pink-700 hover:shadow-lg"
                  >
                    Agregar al Carrito
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
  
        {filtrarProductos().length === 0 && (
          <div className="text-center mt-6 text-gray-600">
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}

export default Listado;