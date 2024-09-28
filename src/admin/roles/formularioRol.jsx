import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioRol= () =>{

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [rol, setRol] = useState({

    
        descripcion:'',

    });


    useEffect(() => {
        if (id !== 'nuevo') {
          const fetchRol = async () => {
            try {
              setLoading(true);
              const respuesta = await axios.get('api/rol/' + id);
              setRol(respuesta.data.data);
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };
          fetchRol();
        } else {
          setRol({
        
            descripcion:'',

          });
        }
    }, [id]);

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
         if (event.target.name === 'disponible') {
         setRol({ ...rol, [event.target.name]: event.target.checked });
        } else {
      
          const { name, value } = event.target;
          setRol({ ...rol, [name]: value });
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (id === 'nuevo') {
            const respuesta = await axios.post('api/rol', rol);
            console.log(respuesta.data);
            navigate('/admin/rol');
          } 
          
        } catch (error) {
          setError(error.message);
        }
    };




    return (
        <div>
          <div className= 'p-6 text-2xl font-bold text-center text-white bg-pink-600'>
         
          </div>
          {loading ? (
            <p className='text-center text-pink-500 mt-4'>Cargando...</p>
          ) : (
            <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg border border-gray-200">
                
              <form onSubmit={handleSubmit}>
                 
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="descripcion">
                   descripcion:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="descripcion"
                    type="text"
                    name="descripcion"
                    value={rol.descripcion}
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
    
export default FormularioRol;







