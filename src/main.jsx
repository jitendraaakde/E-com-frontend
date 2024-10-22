import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './Layout';
import Signup from './components/majorCompo/Signup';
import Login from './components/majorCompo/Login';
import SingleProduct from './components/majorCompo/SingleProduct';
import Cart from './components/majorCompo/Cart';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import AdminDashboard from './components/AdminPortal/AdminDashboard';
import OrderHistory from './components/UserProfile/OrderHistory';
import UserProfilePortal from './components/UserProfile/UserProfilePortal';
import ContactUs from './components/majorCompo/ContactUs';
import Home from './components/majorCompo/Home';
import HomePage from './components/Homepage/HomePage';
import Example from './components/example';
import Checkout from './components/majorCompo/Checkout';
import PaymentPage from './components/majorCompo/PaymentPage';
import OrderConfirmation from './components/majorCompo/OrderConfirmed';
// import { Toaster } from 'sonner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        path: '/home', element: <HomePage />
      },
      {
        path: '/checkout', element: <Checkout />
      },
      {
        path: '/login', element: <Login />
      }, {
        //confirm
        path: '/product/:id', element: <SingleProduct />
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
      , {
        //confirm
        path: '/contact', element: <ContactUs />
      }, {
        path: '/example', element: <Example />

      },
      {
        path: '/payment', element: <PaymentPage />
      },
      {
        path: '/order-confirmed', element: <OrderConfirmation />
      },

    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {/* <Toaster position="top-right" richColors /> */}
        <ToastContainer />
      </PersistGate>
    </Provider>
  </StrictMode>
);
