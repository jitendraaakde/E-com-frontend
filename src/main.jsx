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
import HomePage from './components/Homepage/HomePage';
import Checkout from './components/majorCompo/Checkout';
import PaymentPage from './components/majorCompo/PaymentPage';
import OrderConfirmation from './components/majorCompo/OrderConfirmed';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListingPage from './components/majorCompo/ListingPage';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/majorCompo/About';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/register', element: <Signup /> },
      { path: '/listings', element: <ListingPage /> },
      { path: '/login', element: <Login /> },
      { path: '/product/:id', element: <SingleProduct /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/payment', element: <PaymentPage /> },
      { path: '/order-confirmed', element: <OrderConfirmation /> },
      { path: '/about', element: <About /> },

      { path: '/checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: '/order-history', element: <ProtectedRoute><OrderHistory /></ProtectedRoute> },
      { path: '/admin-portal', element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> },
      { path: '/profile', element: <ProtectedRoute><UserProfilePortal /></ProtectedRoute> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={1500} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
