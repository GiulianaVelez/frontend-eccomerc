import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioProducto= () =>{

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [producto, setProducto] = useState({

        id: '',
        precio: '',
        stock: '',
        descripcion_corta:'',
        descripcion_larga:'',
        CategoriaId:"",
        imagen:"",

    });
    
    const [categoria, setCategoria] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
    const [imagenes, setImagenes] = useState([]);


    const obtenerCategorias = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get("api/categoria/");
        setCategoria(respuesta.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };



    useEffect(() => {


        obtenerCategorias();



        if (id !== 'nuevo') {
          const fetchProducto = async () => {
            try {
              setLoading(true);
              const respuesta = await axios.get('api/producto/' + id);
              setProducto(respuesta.data.data);
              setCategoriaSeleccionada(respuesta.data.data.CategoriaId);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };
          fetchProducto();
        } else {
          setProducto({
            id: '',
            precio: '',
            stock: '',
            descripcion_corta:'',
            descripcion_larga:'',
            CategoriaId:"",
            imagen:"",

          });
        }
    }, [id]);

    const handleChange = (event) => {
          const { name, value } = event.target;
          setProducto({ ...producto, [name]: value });
        
    };

      const handleSubmit = async (event) => {
        event.preventDefault();
       
        producto.CategoriaId = categoriaSeleccionada;


        try {
          if (id === 'nuevo') {
            const respuesta = await axios.post('/api/producto/', producto);
            console.log(respuesta.data);
            navigate('/admin/producto');
          } else {
            const respuesta = await axios.put('/api/producto/' + id, producto);
            console.log(respuesta.data);
            navigate('/admin/producto');
          }
        } catch (error) {
          setError(error.message);
        }
      };

    const handleInput = (event) => {
      const value = event.target.value;
      
      event.target.value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    };



    return (
        <div>
          <div className= 'p-6 text-2xl font-bold text-center text-white bg-pink-600'>
          { producto.id ?  "Editar producto" : "Crear nuevo producto"} 
          </div>
          {loading ? (
            <p className='text-center text-pink-500 mt-4'>Cargando...</p>
          ) : (
            <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
                
              <form onSubmit={handleSubmit}>
                 
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="nombre">
                    Nombre:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    onInput={handleInput} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="precio">
                    Precio:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="precio"
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    min={1}
                  />
                </div>
                <div className=" mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="stock">
                       stock:
                  </label>
                  <input 
                    id="stock"
                    type="number"
                    name="stock"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    checked={producto.stock}
                    onChange={handleChange}
                    min={1}
                  />
                  
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="descripcion_corta">
                    descripcion corta:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="descripcion_corta"
                    type="text"
                    name="descripcion_corta"
                    value={producto.descripcion_corta}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="descripcion Larga">
                    descripcion Larga:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="descripcion_larga"
                    type="text"
                    name="descripcion_larga"
                    value={producto.descripcion_larga}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="imagen">
                    Imagen (URL):
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="imagen"
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="categoria">
                    categoria:
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    
                    value = {categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
                    
                  >
                    <option>
                      Seleccione una categoría
                    </option>
                    {categoria.map((categoria,index) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.descripcion}
                      </option>
                  ))}
                  </select>
                  
                </div>
                      



                <div className='flex justify-center'>
    
                  <button
                    className="px-4 py-2 mx-2 font-bold text-white bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="px-4 py-2 mx-2 font-bold text-white bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="button"
                    onClick={() => navigate('/admin/producto')}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
          {error && <p className='text-center text-red-500 mt-4' style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
    
export default FormularioProducto;














































    

    



