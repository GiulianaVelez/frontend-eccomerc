import { useEffect, useState } from 'react';
import {  useNavigate} from 'react-router-dom';
import axios from 'axios';

function RolIndex() {

    const navigate = useNavigate()

    const elementosPorPagina = 12

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');


    useEffect(() => {
        setLoading(true);
        axios.get('/api/rol/').then((respuesta) => {
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
    

    const eliminarRol = (id) => {
        axios.delete(`/api/rol/${id}`)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            console.log('Rol eliminado con éxito');
            axios.get('/api/rol')
              .then((respuesta) => {
                setData(respuesta.data.data);
              })
              .catch((error) => {
                console.log('Error al actualizar la lista de roles', error);
              });
          } else {
            console.log('Error al eliminar roles', respuesta.status);
          }
        })
        .catch((error) => {
          console.log('Error al eliminar los roles', error);
        });
      };

      const handleDelete = (id) => {
          console.log(`Eliminar usuario con id ${id}`);
          if (window.confirm(`¿Está seguro de eliminar el usuario con id ${id}?`)) {
            eliminarRol(id);
           }
      };
       
      const cambiarPagina = (pagina) => {
        setPaginaActual(pagina);
      };

      const calcularCantidadPaginas = () => {
        return Math.ceil(data.length / elementosPorPagina);
      };
    
      const filtrarElementosSegunPagina = () => {
        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        return data.slice(inicio, fin);
      };

      return (
        <div>
          <div className='p-6 text-2xl font-bold text-center text-white bg-pink-600'>
            Gestión de roles
          </div>
          {loading ? 'Cargando...' : ''}
          <div className='flex justify-between items-center p-4'>
            <div className='w-1/4'>
    
              <input
                type='text'
                className='w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500'
                placeholder='Buscar por Nombre'
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              /></div>
              
          </div>
          <div className='m-5'>
            <table className='w-full border border-collapse border-gray-300'>
              <thead className='bg-gray-200'>
                <tr>
                    <th className='px-4 py-2 border-2 border-gray-400' >ID</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>descripcion</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>Acciones</th>

                  
                     
                </tr>
              </thead>
              <tbody>
                {filtrarElementosSegunPagina().filter((rol) =>
                  rol.descripcion.toLowerCase().includes(filtro.toLowerCase()) 
                ).map((rol) => (
                  <tr key={rol.id} className='border border-gray-400'>
                      <td className='px-4 py-2 border border-gray-300'>{rol.id}</td>
                      <td className='px-4 py-2 border border-gray-300'>{rol.descripcion}</td>
                      <td className='px-4 py-2 text-center border border-gray-300'>
                    
                      <button
                        className='px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded-lg shadow hover:bg-red-600'
                        onClick={() => handleDelete(rol.id)}
                      >
                        Eliminar
                      </button>
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
    
          </div>
          <div>
            <div className='flex justify-center mt-5'>
              {filtrarElementosSegunPagina().filter((rol) =>
                rol.descripcion.toLowerCase().includes(filtro.toLowerCase())
              ).length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-4 py-2 text-center border border-gray-300'>
                    No se encontraron usuarios que coincidan con su búsqueda.
                  </td>
                </tr>
              ) :
                <div  >
                  {Array.from({ length: calcularCantidadPaginas() }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`mx-2 py-2 px-4 rounded-lg ${paginaActual === i + 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      onClick={() => cambiarPagina(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
    );
}
    
export default RolIndex