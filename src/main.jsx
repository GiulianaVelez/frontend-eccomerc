import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import axios from 'axios';

import Home from './Home.jsx';
import LayoutAdmin from './admin/LayoutAdmin.jsx';
import ProductosIndex from './admin/productos/index.jsx';
import FormularioProducto from './admin/productos/formulario.jsx';
import './index.css'
import Dashboard from './admin/Dashboard.jsx';
import UsuariosIndex from './admin/usuarios/index.jsx';
import FormularioUsuario from './admin/usuarios/UsuarioForm.jsx';
import FormularioCategoria from './admin/categorias/formularioCategoria.jsx';
import CategoriaIndex from './admin/categorias/index.jsx';
import FormularioRol from './admin/roles/formularioRol.jsx';
import RolIndex from './admin/roles/index.jsx';
import ImagenesIndex from './admin/imagenes/index.jsx';
import FormularioImagen from './admin/imagenes/formularioImagen.jsx';


axios.defaults.baseURL = 'http://localhost:3000';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin", 
    exact: true,   
    element: <LayoutAdmin />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "producto",
        element: <ProductosIndex />,
      },
      {
        path: "producto/:id",
        element: <FormularioProducto/>,
      },
      {
        path: "usuario",
        element: <UsuariosIndex/>,
      },
      {
        path: "usuario/:id",
        element: <FormularioUsuario/>,
      },
      {
        path: "categoria",
        element: <CategoriaIndex/>,
      },
      {
        path: "categoria/:id",
        element: <FormularioCategoria/>,
      },
      {
        path: "rol",
        element: <RolIndex/>,
      },
      {
        path: "rol/:id",
        element: <FormularioRol/>,
      },
      {
        path: "imagen",
        element: <ImagenesIndex/>,
      },
      {
        path: "imagen/producto/:id",
        element: <FormularioImagen/>,
      },
      




    ],
  },
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
