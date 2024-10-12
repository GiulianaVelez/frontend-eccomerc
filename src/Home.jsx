import { useEffect, useState } from 'react';

import axios from 'axios';
import Header from './componentes/Header.jsx';
import { Pagination } from "flowbite-react";
import Filtros from './componentes/Filtros.jsx';
import Listado from './componentes/Listado.jsx';
import Footer from './componentes/Footers.jsx';
import WhatsappIcono from './componentes/WhatsappIcono.jsx';


import './Home.css'
import { Banner } from './componentes/Banner.jsx';


// 'https://fakestoreapi.com/products'


function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [pagina, setPagina] = useState(1);

  
  const buscarItems = () => {

    axios.get('api/producto/lista?pagina=' + pagina + '&cantidad=6').then((respuesta) => {
      console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta", respuesta.data.data)
        setData(respuesta.data.data.rows)
        setCantidadItems(respuesta.data.data.count)
      } else {
        console.log("error")
      }

    }).catch((error) => {
      console.log("error", error)
    });

  }

  useEffect(() => {

   buscarItems();
    

  }, [pagina]);


  useEffect(() => {

    setLoading(true);
    //console.log("inicia busqueda")
    buscarItems()

  }, [])

  
  const onPageChange = (page) => setPagina(page);


  return (
    <>
      <Header />
      <Banner/>
      <div className='mx-auto max-w-6xl'>
        
        
       {(loading == true ) ? 
         <div className="text-center text-pink-700 font-semibold mt-6">Cargando...</div> 
         : 
         <div className="mt-6"><Listado items={data} /></div>
        }
        <div className='flex justify-center w-full'>
         
         
         <div className="flex my-10 overflow-x-auto sm:justify-center">
          <Pagination currentPage={pagina} totalPages={cantidadItems / 3} onPageChange={onPageChange} />
         </div>

        </div>

        







      </div>

      <Footer/>
      <WhatsappIcono/>
    


    </>
  );
}

export default Home