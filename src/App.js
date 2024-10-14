import React, { useEffect} from 'react';
import TodoList from './TodoList';

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Previene que el navegador muestre el prompt por defecto
      e.preventDefault();
      
      // Muestra una alerta preguntando si el usuario quiere instalar la app
      const userWantsToInstall = window.confirm("¿Deseas instalar esta aplicación?");

      if (userWantsToInstall) {
        // Si el usuario quiere instalar, mostramos el prompt de instalación
        e.prompt();

        // Manejar la elección del usuario
        e.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario aceptó la instalación');
          } else {
            console.log('El usuario rechazó la instalación');
          }
        });
      }
    };

    // Escuchar el evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <div>
      <TodoList/>
      
    </div>
  );
}

export default App;