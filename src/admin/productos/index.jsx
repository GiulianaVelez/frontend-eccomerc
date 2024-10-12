import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt'; 

function ProductosIndex() {

    const navigate = useNavigate();
    const elementosPorPagina = 12;
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

    const handleInsImg = (id) => {
        navigate(`/admin/imagen/producto/${id}`);
    };

    const eliminarProducto = (id) => {
        axios.delete(`/api/producto/${id}`)
            .then((respuesta) => {
                if (respuesta.status === 200) {
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
                    />
                </div>
            </div>
            <div className='m-5'>
                <table className='w-full border border-collapse border-gray-300'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='px-4 py-2 border-2 border-gray-400'>ID</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>nombre</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>precio</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>stock</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>descripcion corta</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>descripcion larga</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>categoria</th>
                            <th className='px-4 py-2 border-2 border-gray-400'>imagen</th>
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
                                <td className='px-4 py-2 border border-gray-300'>{Producto.Categorium?.descripcion}</td>
                                <td className='px-4 py-2 border border-gray-300'>
                                    <img
                                        src={Producto.imagen}
                                        alt={Producto.nombre || "Imagen del producto"}
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                </td>
                                <td className='flex justify-center items-center px-4 py-2 border border-gray-300 space-x-2'>
                                    <button
                                        className="p-2 bg-green-600 text-sm rounded hover:bg-green-700 text-white"
                                        onClick={() => handleInsImg(Producto.id)}
                                        title="Agregar Imagen"
                                    >
                                        <CameraAltIcon /> 
                                    </button>
                                    <button
                                        className='p-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white'
                                        onClick={() => handleEdit(Producto.id)}
                                        title="Editar"
                                    >
                                        <CreateIcon />
                                    </button>
                                    <button
                                        className='p-2 bg-red-500 rounded-lg hover:bg-red-600 text-white'
                                        onClick={() => handleDelete(Producto.id)}
                                        title="Eliminar"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center mt-5'>
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
        </>
    );
}

export default ProductosIndex;











     

    

   