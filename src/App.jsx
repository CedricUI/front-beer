import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import PopUp from './components/PopUp';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date();

    if (!lastShown || now - new Date(lastShown) > 24 * 60 * 60 * 1000) {
      setShowPopup(true);
      localStorage.setItem('popupLastShown', now.toISOString());
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && <PopUp onClose={handleClosePopup} />}
      <Header />
      <Home />
    </>
  )
}

export default App;
