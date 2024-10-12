import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

function ImagenesIndex() {
  const navigate = useNavigate();

  const elementosPorPagina = 10;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState([]);
 

  const MostrarImagenesId = (id) => {
    axios.get(`/api/imagen/producto/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Respuesta Correcta');
          
          axios.get(`/api/producto/${id}`)
            .then((respuesta) => {
              setDataImg(respuesta.data.data);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de productos', error);
            });
        } else {
          console.log('Error al obtener el producto', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al obtener el producto', error);
      });
  };


  useEffect(() => {
    setLoading(true);
    axios.get('/api/imagen').then((respuesta) => {
      setLoading(false);
      if (respuesta.status === 200) {
        setData(respuesta.data.data);
      } else {
        console.log('error');
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }, []);

  const handleEdit = (id) => {

    navigate(`/admin/imagen/${id}`);
  };

  const eliminarImagen = (id) => {
    axios.delete(`/api/imagen/${id}`)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log('Imagen eliminada con éxito');
          
          axios.get('/api/imagen')
            .then((respuesta) => {
              console.log(respuesta.data.data); 
              setData(respuesta.data.data);
            })
            .catch((error) => {
              console.log('Error al actualizar la lista de imagen', error);
            });
        } else {
          console.log('Error al eliminar la imagen', respuesta.status);
        }
      })
      .catch((error) => {
        console.log('Error al eliminar la imagen', error);
      });
  };

  const handleDelete = (id) => {
    
    console.log(`Eliminar imagen con id ${id}`);
    if (window.confirm(`¿Está seguro de eliminar la imagen con id ${id}?`)) {
      eliminarImagen(id);
    }
  };

 

  return (
    <>
      <div className='p-6 text-2xl font-bold text-center text-white bg-pink-600'>
        Gestión de Imágenes
      </div>
      {loading && <p className="text-center text-gray-700">Cargando...</p>}
      <div className='m-5'>
        <table className='w-full border border-collapse border-gray-400 table-auto'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 border-2 border-gray-400'>ID</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Ubicación</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Imagen</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Nro Orden</th>
              <th className='px-4 py-2 border-2 border-gray-400'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((imagen) => (
              <tr key={imagen.id} className='border border-gray-400'>
                <td className='px-4 py-2 border border-gray-400'>{imagen.id}</td>
                <td className='px-4 py-2 border border-gray-400'>{imagen.ubicacion}</td>
                <td className="px-4 py-2 border border-gray-400 text-center">
                  <img
                    src={imagen.ubicacion}
                    alt={imagen.ubicacion || "Imagen del producto"}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className='px-4 py-2 border border-gray-400'>{imagen.nroOrden}</td>
                <td className='px-4 py-2 text-center border border-gray-400'>
                  <button
                    className='px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'
                    onClick={() => handleDelete(imagen.id)}
                    title='Eliminar'
                  >
                    <DeleteIcon/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ImagenesIndex;
