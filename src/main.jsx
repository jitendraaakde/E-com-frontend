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
import Profile from './components/majorCompo/Profile';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index'; // Import both store and persistor
import { PersistGate } from 'redux-persist/integration/react';

import EnhancedProductPage from './components/Example/OneProduct';
import OrderHistory from './components/profileCompo/OrderHistory';
import ProfilePage from './components/Example/Example2';
import AdminDashboard from './components/AdminPortal/AdminDashboard';

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
      }, {
        path: '/profile', element: <Profile />  
      }
      , {
        path: '/order-history', element: <OrderHistory />
      }
      , {
        path: '/profile-page', element: <ProfilePage />
      },{
         path: '/EnhancedProductPage', element: <EnhancedProductPage />
      },
      ,{
         path: '/admin-portal', element: <AdminDashboard />
      },
      ,{
         path: '/test', element: <DoneExample />
      },
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
