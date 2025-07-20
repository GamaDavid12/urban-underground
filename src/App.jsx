import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import './index.css';

function App() {
  return (
    <Router>

      <Navbar />


      <Routes>
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/" element={<ContactPage />} /> 

      </Routes>

   
      <Footer />
    </Router>
  );
}

export default App;