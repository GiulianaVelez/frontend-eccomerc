import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioCategoria= () =>{

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [categoria, setCategoria] = useState({

    
        descripcion:'',
        descripcion_Header:'',
        imagen :'',

    });


    useEffect(() => {
        if (id !== 'nuevo') {
          const fetchCategoria = async () => {
            try {
              setLoading(true);
              const respuesta = await axios.get('api/categoria/' + id);
              setCategoria(respuesta.data.data);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };
          fetchCategoria();
        } else {
          setCategoria({
        
            descripcion:'',

          });
        }
    }, [id]);

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
         if (event.target.name === 'disponible') {
         setCategoria({ ...categoria, [event.target.name]: event.target.checked });
        } else {
      
          const { name, value } = event.target;
          setCategoria({ ...categoria, [name]: value });
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (id === 'nuevo') {
            const respuesta = await axios.post('api/categoria', categoria);
            console.log(respuesta.data);
            navigate('/admin/categoria');
          } else {
            const respuesta = await axios.put('api/categoria/' + id, categoria);
            console.log(respuesta.data.data);
            navigate('/admin/categoria');
          }
        } catch (error) {
          setError(error.message);
        }
    };




    return (
        <div>
          <div className= 'p-6 text-2xl font-bold text-center text-white bg-pink-600'>
          { categoria.descripcion ?  "Editar categoria" : "Crear nuevo categoria"} 
          </div>
          {loading ? (
            <p className='text-center text-pink-500 mt-4'>Cargando...</p>
          ) : (
            <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
                
              <form onSubmit={handleSubmit}>
                 
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="nombre">
                   descripcion:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="descripcion"
                    type="text"
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                     
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="nombre">
                   descripcion larga :
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="descripcion_Header"
                    type="text"
                    name="descripcion_Header"
                    value={categoria.descripcion_Header}
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
                    value={categoria.imagen}
                    onChange={handleChange}
                  />
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
                    onClick={() => navigate('/admin/categoria')}
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
    
export default FormularioCategoria;






