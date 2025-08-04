import LoginForm from './pages/LoginForm/LoginForm';
import Registro from './pages/Registro/Registro';
import PasswordRecoveryForm from './pages/PasswordRecovery/PasswordRecoveryForm';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import ClothingCategoryPage from './pages/ClothingCategory/ClothingCategoryPage.jsx';
import HoodiesCategoryPage from './pages/HoodiesCategory/HoodiesCategoryPage.jsx';

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
    path: '/categorias/remeras',
    element: <ClothingCategoryPage />,
  },
  {
    path: '/categorias/buzos-camperas',
    element: <HoodiesCategoryPage />,
  },
 // {
  //path: '*',
   //element: <div>404 - Página no encontrada</div>,
 //},
];

export default routes;