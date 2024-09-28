

import axios from 'axios';


function TablaImagenes(props) {
    

    const imagenes = props.imagenes;

    const eliminarImagen = (id) => {
      axios.delete(`/api/imagen/${id}`)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            console.log('Imagen eliminada con éxito');
            props.refImagenes();
            
          } else {
            console.log('Error al eliminar la imagen', respuesta.status);
          }
        })
        .catch((error) => {
          console.log('Error al eliminar la imagen', error);
        });
      };






   
   
      return (
        <>
          <div className='p-6 text-2xl font-bold text-center text-white bg-pink-600'>
            Gestión de Imagenes
          </div>          
          <div className='flex justify-center w-full mt-10'>            
          </div>
          <div className='m-5'>
            <table className='w-full border border-collapse border-gray-400 table-auto'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-4 py-2 border-2 border-gray-400'>imagen</th>
                  <th className='px-4 py-2 border-2 border-gray-400'>ubicacion</th>
                  <th className='px-4 py-2 border-2 border-gray-400'>Nro Orden</th>
                  <th className="px-4 py-2 border-2 border-gray-400 text-center">
                Acciones
              </th>
                </tr>
              </thead>
              <tbody>
                {imagenes.map((img, index) => (
                  <tr key={index} className='border border-gray-400'>

                    <td className='px-4 py-2 border border-gray-400'>
                        <img
                        src={img.ubicacion}
                        alt={`Imagen ${img.nroOrden}`} 
                         className="h-20 w-20 object-cover" 
                       />
                    </td>
                    <td className='px-4 py-2 border border-gray-400'>{img.ubicacion}</td>
                    <td className='px-4 py-2 border border-gray-400'>{img.nroOrden}</td>
                    <td className="px-4 py-2 text-center border border-gray-400">
                    <button
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white flex items-center justify-center"
                        onClick={() => eliminarImagen(img.id)}
                      >
                        <span >ELIMINAR</span>{" "}
                        
                      </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>                  
        </>
  );
}

export default TablaImagenes;