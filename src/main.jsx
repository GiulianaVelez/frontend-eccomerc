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
    
    ],
  },
    
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
