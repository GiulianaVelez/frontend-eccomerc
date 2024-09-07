import { useEffect, useState } from 'react';
import {  useNavigate} from 'react-router-dom';
import axios from 'axios';

function ProductosIndex() {

    const navigate = useNavigate()

    const elementosPorPagina = 12

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtro, setFiltro] = useState('');


    useEffect(() => {
        setLoading(true);
        axios.get('/api/producto/').then((respuesta) => {
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
        navigate(`/admin/producto/${id}`);
    };


    const eliminarProducto = (id) => {
        axios.delete(`/api/producto/${id}`)
          .then((respuesta) => {
            if (respuesta.status === 200) {
              console.log('producto eliminado con éxito');
              // Actualiza la lista de productos
              axios.get('/api/producto/')
                .then((respuesta) => {
                  setData(respuesta.data.data);
                })
                .catch((error) => {
                  console.log('Error al actualizar la lista de productos', error);
                });
            } else {
              console.log('Error al eliminar el producto', respuesta.status);
            }
          })
          .catch((error) => {
            console.log('Error al eliminar el producto', error);
          });
      };

      const handleDelete = (id) => {
          console.log(`Eliminar producto con id ${id}`);
          if (window.confirm(`¿Está seguro de eliminar el producto con id ${id}?`)) {
            eliminarProducto(id);
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
        <>
          <div className='p-6 text-2xl font-bold text-center text-white bg-pink-600'>
            Gestión de productos
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
              <div className='ml-5'>
                <button
                  className='px-4 py-2 ml-4 font-bold text-white bg-pink-500 rounded-lg shadow hover:bg-pink-600 transition duration-300'
                  onClick={() => navigate('/admin/producto/nuevo')}>
                  Crear producto
                </button>
              </div>
          </div>
          <div className='m-5'>
            <table className='w-full border border-collapse border-gray-300'>
              <thead className='bg-gray-200'>
                <tr>
                    <th className='px-4 py-2 border-2 border-gray-400' >ID</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>nombre</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>precio</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>stock</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>descripcion corta</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>descripcion larga</th>
                    <th className='px-4 py-2 border-2 border-gray-400'>Acciones</th>
                     
                </tr>
              </thead>
              <tbody>
                {filtrarElementosSegunPagina().filter((Producto) =>
                  Producto.nombre.toLowerCase().includes(filtro.toLowerCase())
                ).map((Producto) => (
                  <tr key={Producto.id} className='border border-gray-400'>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.id}</td>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.nombre}</td>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.precio}</td>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.stock}</td>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.descripcion_corta}</td>
                      <td className='px-4 py-2 border border-gray-300'>{Producto.descripcion_larga}</td>
                      <td className='px-4 py-2 text-center border border-gray-300'>
                      <button
                        className='px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600'
                        onClick={() => handleEdit(Producto.id)}
                      >
                        Editar
                      </button>
                      <button
                        className='px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded-lg shadow hover:bg-red-600'
                        onClick={() => handleDelete(Producto.id)}
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
              {filtrarElementosSegunPagina().filter((Producto) =>
                Producto.nombre.toLowerCase().includes(filtro.toLowerCase())
              ).length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-4 py-2 text-center border border-gray-300'>
                    No se encontraron productos que coincidan con su búsqueda.
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
        </>
    );
}
    
export default ProductosIndex
    














     

    

   