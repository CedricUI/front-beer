
import { useEffect, useState } from "react";
import "../styles/Show-product.css";
import PopUp from "./PopUp";
import ProductId from './ProductId';
import Header from './header';
import Footer from "./Footer";

function ShowProduct () {
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
        // Ne rien enregistrer dans localStorage
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
            <ProductId />
            <Footer />
        </>
    )
};

export default ShowProduct;