import LoginForm from './pages/LoginForm/LoginForm';
import Registro from './pages/Registro/Registro';
import PasswordRecoveryForm from './pages/PasswordRecovery/PasswordRecoveryForm';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CategoryPage from './pages/Category/CategoryPage.jsx';
import DashboardLayout from './pages/Admin/DashboardLayout.jsx';
import AdminHomePage from './pages/Admin/AdminHomePage.jsx'; 
import CategoryManagementPage from './pages/Admin/CategoryManagement/CategoryManagementPage.jsx';
import ProductManagementPage from "./pages/Admin/ProductManagement/ProductManagementPage.jsx";
import Checkout from './pages/Checkout/Checkout.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation.jsx';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/contacto',
    element: <ContactPage />,
  },
  {
    path: '/iniciar-sesion',
    element: <LoginForm />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
  {
    path: '/recuperar',
    element: <PasswordRecoveryForm />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
    {
    path: "/categorias/:categoryId",
    element: <CategoryPage />,
  },
  // Rutas Admin
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {
        index: true, 
        element: <AdminHomePage />, 
      },
      {
        path: 'gestionar-categorias',
        element: <CategoryManagementPage />,
      },
      {
        path: 'products',
        element: <ProductManagementPage />,
      }
    ],
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/confirmacion',
    element: <OrderConfirmation />,
  },
  // Ruta de Fallback (404)
  {
    path: '*',
    element: <div>404 - Página no encontrada</div>,
  },
];

export default routes;
