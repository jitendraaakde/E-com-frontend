import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './components/majorCompo/Home';
import Layout from './Layout';
import Signup from './components/majorCompo/Signup';
import Login from './components/majorCompo/Login';
import SingleProduct from './components/majorCompo/SingleProduct';
import Cart from './components/majorCompo/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      }, {
        path: '/register', element: <Signup />
      },
      {
        path: '/login', element: <Login />
      }, {
        path: '/product/:productId', element: <SingleProduct />
      }, {
        path: '/cart', element: <Cart />
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
