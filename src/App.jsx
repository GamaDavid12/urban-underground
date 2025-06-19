import Contacto from './routes/Contacto';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import AppRoutes from './routes/appRoute';
import { Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Navbar />
    <AppRoutes />
    <Route path="/" element={<Home />} />
    <Route path="/contacto" element={<Contacto />} />
  </Router>
  

);



export default App;