
import { Outlet, Link,useLocation } from "react-router-dom"



function LayoutAdmin() {

  return (
    <div>
      <div className="p-4 font-bold text-center text-white bg-pink-600 shadow-md">
        Panel de control
      </div>
      <nav className="py-2 bg-gray-200">
        <ul className="flex justify-center space-x-4 py-2 border-b border-gray-200">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/admin/producto"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/producto' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/admin/usuario"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/usuario' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Usuarios
            </Link>
          </li>
           
          <li>
            <Link
              to="/admin/categoria"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/categoria' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Categorias
            </Link>
          </li>

          <li>
            <Link
              to="/admin/rol"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/rol' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Roles
            </Link>
          </li>

          <li>
            <Link
              to="/admin/imagen"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/imagen' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              imagenes
            </Link>
          </li>






          
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;


