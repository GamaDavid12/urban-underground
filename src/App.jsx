import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import AppRoutes from './routes/appRoute';

const App = () => (
  <Router>
    <Navbar />
    <AppRoutes />
  </Router>
);

export default App;