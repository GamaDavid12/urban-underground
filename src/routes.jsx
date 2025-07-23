import LoginForm from './pages/LoginForm/LoginForm';
import Registro from './pages/Registro/Registro';
import PasswordRecoveryForm from './pages/PasswordRecovery/PasswordRecoveryForm';
import ContactPage from './pages/ContactPage/ContactPage.jsx';

const routes = [
  {
    path: '/',
    element: <LoginForm />,
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
];

export default routes;