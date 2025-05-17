import Header from "./header";
import ProductCard from "./ProductCard";
import '../styles/products.css';
import PopUp from './PopUp';
import { useEffect, useState } from "react";

function Products() {
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
      <div className="products-container">
        <Header />
        <div className="products">
          <h1>Products</h1>
          <p>Voici quelques uns de nos produits.</p>
          <ProductCard /> 
        </div>
    </div>
    </>
  );
}

export default Products;