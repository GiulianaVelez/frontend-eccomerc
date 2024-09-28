/* eslint-disable react/prop-types */

import React from 'react';

function Listado(props) {
  const { items } = props;

  return (
    <div className="p-5">
      <div className="text-center font-bold text-2xl text-pink-800 mb-6">
         Productos
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="relative group bg-white border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="w-full h-80 bg-gray-200 flex items-center  overflow-hidden">
              <img
                src={item.imagen}
                alt={item.nombre}
                className= "object-cover w-full h-full transition duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <a href={item.href} className="hover:underline text-pink-600">
                  {item.nombre}
                </a>
              </h3>
      
              <p className="mt-1 text-lg font-bold text-gray-700">${item.precio}</p>
              <p className="mt-1 text-sm text-gray-600">{item.descripcion_corta}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listado;
