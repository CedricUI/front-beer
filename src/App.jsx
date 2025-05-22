import { useEffect, useState } from 'react';
import Header from './components/header';
import Home from './components/home';
import PopUp from './components/PopUp';
import Footer from './components/Footer';
// import { CartProvider } from './context/CartContext';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date();
    if (!lastShown || now - new Date(lastShown) > 24 * 60 * 60 * 1000) {
      setShowPopup(true);
    }
  }, []);

  const handlePopupConfirm = () => {
    localStorage.setItem('popupLastShown', new Date().toISOString());
    setShowPopup(false);
  };

  const handlePopupDecline = () => {
    window.location.href = 'https://youtu.be/RqIDV7NAm0Y?si=9d3j85x4cSdxpazl';
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <PopUp
          onConfirm={handlePopupConfirm}
          onDecline={handlePopupDecline}
        />
      )}
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;