import LoginForm from './pages/LoginForm/LoginForm';
import Registro from './pages/Registro/Registro';
import PasswordRecoveryForm from './pages/PasswordRecovery/PasswordRecoveryForm';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CategoryPage from './pages/Category/CategoryPage.jsx';
import CreateCategoryPage from './pages/Admin/CategoryManagement/CategoryManagementPage.jsx';

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
    path: "/categorias/:categoryId",
    element: <CategoryPage />,
  },
    {
    path: '/admin/crear-categoria', 
    element: <CreateCategoryPage />,
  },
 // {
  //path: '*',
   //element: <div>404 - Página no encontrada</div>,
 //},
];

export default routes;