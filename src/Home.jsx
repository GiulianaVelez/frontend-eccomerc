import { useEffect, useState } from 'react';

import axios from 'axios';
import Listado from './Listado.jsx';

import './Home.css'

// 'https://fakestoreapi.com/products'


function Home() {

  const [loading, setLoading] = useState(false);
  const [verDisponibles, setVerdisponibles] = useState(true);
  const [data, setData] = useState([]);


  useEffect(() => {

    console.log("cambio el estado", verDisponibles);

    axios.get('/api/producto').then((respuesta) => {
      //console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }

    }).catch((error) => {
      console.log("error", error)
    });
    
  },[verDisponibles])

  useEffect(() => {

    setLoading(true);
    //console.log("inicia busqueda")
    axios.get('/api/producto').then((respuesta) => {
      //console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }

    }).catch((error) => {
      console.log("error", error)
    });

  }, [])

  
 

  return (
    <>
      <div className="flex items-center justify-between bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 p-10 shadow-md">
        <div className="flex items-center">
          <img 
            src="https://th.bing.com/th/id/OIP.NSMFPFYHBFbN6r7futOCEwHaHa?rs=1&pid=ImgDetMain" 
            alt="Bella Chic Logo"
            className="h-20 w-auto rounded-full"
          />
          <span className="font-sans text-2xl font-bold text-pink-900 ml-4">Fashion Store </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg text-pink-800">Filtros</div>
          <button 
            onClick={() => setVerdisponibles(!verDisponibles)} 
            className="p-2 px-4 text-white bg-pink-500 rounded-full shadow hover:bg-pink-600 transition duration-300"
          >
            {verDisponibles ? "Mostrar disponibles" : "Mostrar no disponibles"}
          </button>
        </div>
      </div>

      {(loading) ? 
        <div className="text-center text-pink-700 font-semibold mt-6">Cargando...</div> 
        : 
        <div className="mt-6"><Listado items={data} /></div>
      }
    </>
  );
}

export default Home
