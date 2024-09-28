import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioUsuario= () =>{

    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [usuario, setUsuario] = useState({
        
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contraseña: '',
        rolId: '',

    });


    const [roles, setRoles] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(0); 


    const obtenerRoles = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get("api/rol/");
        setRoles(respuesta.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };






    useEffect(() => {
        obtenerRoles();

        if (id !== 'nuevo') {
          const fetchUsuario = async () => {
            try {
              setLoading(true);
              const respuesta = await axios.get('api/usuario/' + id);
              setUsuario(respuesta.data.data);
              setRolSeleccionado(respuesta.data.data)
              setLoading(false);
            } catch (error) {
              setError(error.message);
              setLoading(false);
            }
          };
          fetchUsuario();
        } else {
          setUsuario({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            contraseña: '',
            rolId: '',

          });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (event) => {
     event.preventDefault();

       usuario.rolId = rolSeleccionado ;
       
        try {
          if (id === 'nuevo') {
            const respuesta = await axios.post('/api/usuario/', usuario);
            console.log(respuesta.data);
            navigate('/admin/usuario');
          } else {
            const respuesta = await axios.put('/api/usuario/' + id, usuario);
            console.log(respuesta.data);
            navigate('/admin/usuario');
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
          { usuario.id ?  "Editar usuario" : "Crear nuevo usuario"} 
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
                    value={usuario.nombre}
                    onChange={handleChange}
                     
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="apellido">
                    apellido:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="apellido"
                    type="text"
                    name="apellido"
                    value={usuario.apellido}
                    onChange={handleChange}
                    onInput={handleInput} 
                  />
                </div>
                <div className="flex mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="email">
                       email:
                  </label>
                  <input 
                    id="email"
                    type="email"
                    name="email"
                    checked={usuario.email}
                    onChange={handleChange}
                  />
                  
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="telefono">
                    telefono:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="telefono"
                    type="number"
                    name="telefono"
                    value={usuario.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="descripcion Larga">
                    contraseña:
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    id="contraseña"
                    type="password"
                    name="contraseña"
                    value={usuario.contraseña}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="rolid">
                    rol:
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={rolSeleccionado}
                    onChange={(e) => setRolSeleccionado(Number(e.target.value))}
                  >
                  <option >Seleccione un rol</option>
                    {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.descripcion} 
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
                    onClick={() => navigate('/admin/usuario')}
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
    
export default FormularioUsuario

