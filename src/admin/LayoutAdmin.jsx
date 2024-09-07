
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
              to="/admin/producto/nuevo"
              className={`px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md ${location.pathname === '/admin/producto/nuevo' ? 'text-pink-700 bg-pink-100' : 'text-gray-800 hover:text-pink-600 hover:bg-pink-50'}`}
            >
              Crear Producto
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default LayoutAdmin;


