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
  const [page, setPage] = useState(1); // Page actuelle
  const [pagination, setPagination] = useState({}); // Informations de pagination

  // Récupérer les produits (beers) au chargement
  useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/products?page=${page}`)
    .then(res => res.json())
    .then(data => {
      setBeers(data.products.data); // stocke la liste complète
      setFilteredBeers(data.products.data); // stocke la liste filtrée
      setPagination(data.products); // stocke tout l'objet de pagination
    });
}, [page]);

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
          <h1 className="products-text-center">Products</h1>
          <p className="products-text-center">Voici quelques uns de nos produits.</p>
          <Filter beers={beers} setFilteredBeers={setFilteredBeers} />
          <ProductCard beers={filteredBeers} />
        </div>
        <div className="pagination">
          <button
            disabled={!pagination.prev_page_url}
            onClick={() => setPage(page - 1)}
          >
            Précédent
          </button>
          <span>Page {pagination.current_page} / {pagination.last_page}</span>
          <button
            disabled={!pagination.next_page_url}
            onClick={() => setPage(page + 1)}
          >
            Suivant
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Products;