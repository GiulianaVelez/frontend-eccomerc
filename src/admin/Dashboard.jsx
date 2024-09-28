import { Link } from "react-router-dom"

function Dashboard() {


  return (


    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-6'>

     
        <div className='p-6 bg-sky-300 shadow-md rounded-lg border border-gray-200'>
           <h2 className="text-xl font-bold text-gray-700 mb-4">CREAR PRODUCTO</h2>
           <p className="text-gray-600 mb-6">Añadir nuevos productos</p>
           <Link
              to="/admin/producto/nuevo"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/producto/nuevo' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              CREAR PRODUCTO
            </Link>
        </div> 

        <div className='p-6 bg-sky-300 shadow-md rounded-lg border border-gray-200'>
           <h2 className="text-xl font-bold text-gray-700 mb-4">CREAR USUARIO</h2>
           <p className="text-gray-600 mb-6">Añadir nuevos usuarios</p>
           <Link
              to="/admin/usuario/nuevo"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/usuario/nuevo' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              CREAR USUARIO
            </Link>
        </div> 

        <div className='p-6 bg-sky-300 shadow-md rounded-lg border border-gray-200'>
           <h2 className="text-xl font-bold text-gray-700 mb-4">CREAR CATEGORIA</h2>
           <p className="text-gray-600 mb-6">Añadir nuevas categorias</p>
           <Link
              to="/admin/categoria/nuevo"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/categoria/nuevo' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              CREAR CATEGORIA
            </Link>
        </div> 
        <div className='p-6 bg-sky-300 shadow-md rounded-lg border border-gray-200'>
           <h2 className="text-xl font-bold text-gray-700 mb-4">CREAR ROL</h2>
           <p className="text-gray-600 mb-6">Añadir nuevos Roles</p>
           <Link
              to="/admin/rol/nuevo"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/rol/nuevo' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              CREAR ROL
            </Link>
        </div> 

      
      
    </div>
  )
}

export default Dashboard