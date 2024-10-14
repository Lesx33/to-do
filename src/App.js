import React, { useState, useEffect} from 'react';
import TodoList from './TodoList';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevenir el prompt automático
      e.preventDefault();
      // Guardar el evento para lanzarlo manualmente más tarde
      setDeferredPrompt(e);
      // Mostrar un botón o cualquier UI para instalar
      setShowInstallButton(true);
    };

    // Escuchar el evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Lanzar el prompt de instalación
      deferredPrompt.prompt();

      // Ver qué decide el usuario
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó la instalación');
        } else {
          console.log('El usuario rechazó la instalación');
        }
        setDeferredPrompt(null);  // Resetear el deferredPrompt
        setShowInstallButton(false);  // Ocultar el botón
      });
    }
  };

  return (
    <div>
      <TodoList/>
      {/* Mostrar botón solo si el evento `beforeinstallprompt` fue capturado */}
      {showInstallButton && (
        <button onClick={handleInstallClick}>
          Instalar Aplicación
        </button>
      )}
    </div>
  );
}

export default App;