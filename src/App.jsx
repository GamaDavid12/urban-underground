import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './AppCustom.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
<div className="app-container">
  <Navbar />
  <main className="main-content">
    <h1>Contenido principal</h1>
  </main>
  <Footer />
</div>
  );
}

export default App;