import Header from "./header";
import ProductCard from "./ProductCard";
import '../styles/products.css';
import PopUp from './PopUp';
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Filter from "./Filter";

function Products() {
  const [showPopup, setShowPopup] = useState(false);
  const [beers, setBeers] = useState([]); // Liste complète
  const [filteredBeers, setFilteredBeers] = useState([]); // Liste filtrée

  // Récupérer les produits (beers) au chargement
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then(res => res.json())
      .then(data => {
        setBeers(data.products.data);
        setFilteredBeers(data.products.data);
      });
  }, []);

  // Vérifie si le popup doit être affiché
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
          <Filter beers={beers} setFilteredBeers={setFilteredBeers} />
          <ProductCard beers={filteredBeers} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Products;