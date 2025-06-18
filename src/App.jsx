import React from 'react';
import Background from './components/Background/Background'; // Importa el componente de fondo
import LoginForm from './components/LoginForm/LoginForm';    // Importa el componente de formulario
import styles from '../src/components/App/App.module.css'; // <<-- IMPORTA App.module.css correctamente

const App = () => {
  return (
    // <<-- USA LA CLASE CORRECTA DEFINIDA EN App.module.css (.app)
    <div className={styles.app}> 
      <Background /> {/* Renderiza el componente de fondo */}
      <LoginForm /> {/* Renderiza el formulario de login */}
    </div>
  );
};

export default App;