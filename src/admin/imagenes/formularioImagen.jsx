import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TablaImagenes from './tablaImagenes'; 


const FormularioImagen= () => {

    const navigate = useNavigate();
    const { id } = useParams();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     const [imagenes, setImagenes] = useState([]);    
     const [imagen, setImagen] = useState({
      id: '',
      ubicacion: '',
      nroOrden: '',
    });

    const fetchImagenes = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get('/api/imagen/producto/' + id);
        console.log(respuesta);
        setImagenes(respuesta.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

  useEffect(() => {     
    fetchImagenes();  
}, [id]);

const handleChange = (event) => {
  console.log(event.target.name, event.target.value);
  if (event.target.name === 'disponible') {
    setImagen({ ...imagen, [event.target.name]: event.target.checked });
  } else {

    const { name, value } = event.target;
    setImagen({ ...imagen, [name]: value });
  }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {        
     imagen.ProductoId = id;
      const respuesta = await axios.post('/api/imagen/', imagen);
      
      console.log('******', imagen)
      console.log(respuesta.data);
    
      fetchImagenes();    
  } catch (error) {
    setError(error.message);
  }
};
 
    return (
      <>
      <div className='bg-pink-50'>
      <div>
      <div className='p-6 text-2xl font-bold text-center text-white bg-pink-600' >
      { imagen.id ?  "Editar imagen" : "Crear nueva imagen"} 
      </div>
      {loading ? (
        <p className="text-center text-gray-700">Cargando...</p>
      ) : (
        <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md">
            
          <form onSubmit={handleSubmit}>
             
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="precio">
              Ubicacion:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border border-pink-300 rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                id="ubicacion"
                type="text"
                name="ubicacion"
                value={imagen.ubicacion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nroOrden">
                Nro Orden:
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border border-pink-300 rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                id="nroOrden"
                type="number"
                name="nroOrden"
                value={imagen.nroOrden}
                onChange={handleChange}
              />
            </div>
           
            
            <div className='flex justify-center'>

              <button
                className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Guardar
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => navigate('/admin/producto')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
       
        <TablaImagenes imagenes={imagenes} refImagenes ={fetchImagenes} />

    </div>
    </>
  );
}

export default FormularioImagen;


