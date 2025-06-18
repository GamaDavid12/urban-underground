import React from 'react';
import Ground from './components/Ground/Ground';    // Importa el componente de formulario
import styles from '../src/components/AppGround/AppGround.module.css'; // <<-- IMPORTA App.module.css correctamente
import RecuCuenta from './components/RecuCuenta/RecuCuenta';

const App = () => {
  return (
    // <<-- USA LA CLASE CORRECTA DEFINIDA EN App.module.css (.app)
    <div className={styles.app}> 
      <Ground /> {/* Renderiza el componente de fondo */}
      <RecuCuenta /> {/* Renderiza el formulario de login */}
    </div>
  );
};

export default App;