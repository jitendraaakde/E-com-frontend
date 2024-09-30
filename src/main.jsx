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
import { Provider } from 'react-redux';
import { store, persistor } from './store/index'; // Import both store and persistor
import { PersistGate } from 'redux-persist/integration/react';
import AdminDashboard from './components/AdminPortal/AdminDashboard';
import OrderHistory from './components/UserProfile/OrderHistory';
import UserProfilePortal from './components/UserProfile/UserProfilePortal';

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
        //confirm
        path: '/product/:productId', element: <SingleProduct />
      }, {
        path: '/cart', element: <Cart />
      }
      , {
        path: '/order-history', element: <OrderHistory />
      }
      , {
        //confirm
        path: '/admin-portal', element: <AdminDashboard />
      }
      , {
        //confirm
        path: '/profile', element: <UserProfilePortal />
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
