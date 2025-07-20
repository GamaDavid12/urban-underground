import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx'; 
import Footer from './components/Footer/Footer.jsx'; 
import './style.css';

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