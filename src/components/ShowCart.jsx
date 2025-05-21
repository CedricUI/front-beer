import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ← adapte le chemin selon ton projet
import '../styles/show-cart.css'; // Assurez-vous que le chemin d'importation est correct
import Header from './header';
import iconCart from "../assets/icon-cart.webp";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';


function ShowCart({ }) {  
  console.log("Composant ShowCart monté");

  const { authToken } = useAuth();
  console.log("Token depuis useAuth :", authToken);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [articleNumber, setArticleNumber] = useState(0);

  // Optionnel : console.log à chaque changement de token pour debug
  useEffect(() => {
    console.log("Le token dans ShowCart a changé :", authToken);
  }, [authToken]);

  useEffect(() => {
    if (!authToken) {
    console.warn("Token encore indisponible, on attend…");
    return;
    }

    console.log("Token utilisé pour le fetch :", authToken);

    fetch('http://localhost:8000/api/cart/show', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })
    .then(async res => {
      const text = await res.text(); // On lit le body une fois pour debugger

    if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}`);
    }

      return JSON.parse(text);
    })
    .then(data => {
      console.log("Données panier reçues :", data);
      const items = data.items || data.panier?.items || [];

      setCart(items);

      // → total calculé en JS
      const total = items.reduce((acc, item) => acc + item.price_with_tax, 0);
      setTotal((total / 100).toFixed(2)); // en euros

      const numberOfArticles = items.reduce((acc, item) => acc + item.quantity, 0);
      setArticleNumber(numberOfArticles);

      setLoading(false);
    });
  }, [authToken]);

  console.log('Ceci est mon panier en arrivant sur la page :', cart);

  /** Modifier quantité */
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    console.log('Debug :', newQuantity);
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:8000/api/order-items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQuantity,
        }),
      });
     

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du panier sur le serveur');
    }

    const data = await response.json(); // ← données à jour du back
    console.log("J'essaie de savoir d'où vient le problème :", data);
    console.log("Type de data récupérée :", typeof data); // La réponse est un objet
    console.log("Data récupérée :", data);
    
    setCart(prevCart => {
  const updatedCart = prevCart.map(item => {
    if (item.id === itemId) {
      return {
        ...item,
        ...data.item,
        product_variant: {
          ...item.product_variant,
          ...data.item.product_variant,
          product: {
            ...item.product_variant?.product,
            ...data.item.product_variant?.product
          }
        }
      };
    }
    return item;
  });

      // 🔁 Recalculer total et nombre d’articles
      const updatedTotal = updatedCart.reduce((acc, item) => acc + item.price_with_tax, 0);
      setTotal((updatedTotal / 100).toFixed(2));
      console.log('Voici le total calculé :', total);

      const updatedArticleNumber = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setArticleNumber(updatedArticleNumber);

      return updatedCart;
    }); 
    console.log("Quantité mise à jour et synchronisée avec le serveur");
    console.log("Ceci est ke panier après mise à jour de la quantité :", cart);
  
    } catch (error) {
      console.error("Erreur serveur :", error.message);
    }
  };

  useEffect(() => {
    console.log("Type de cart après mise à jour :", typeof cart);
    console.log("Contenu de cart après mise à jour :", cart);
  }, [cart]);

  // Supprimer un item
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/order-items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l’article');
      }

      // Mise à jour du panier local
      setCart(prevCart => {
        const updatedCart = prevCart.filter(item => item.id !== itemId);

        // 🔄 recalcul du total & nombre d’articles
        const total = updatedCart.reduce((acc, item) => acc + item.price_with_tax, 0);
        setTotal((total / 100).toFixed(2));
        console.log('Voici le total calculé :', total);
        const numberOfArticles = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
        setArticleNumber(numberOfArticles);

        return updatedCart;
      });
      console.log("Article supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
    } 
  };

  console.log("Contenu du cart pour affichage :", cart);

  const navigate = useNavigate();

  return (
    <>
        <Header />
        <div className="show-cart-container">
            <h1>Panier</h1>
            <div className="cart-container">
                {cart.length === 0 ? (
                  <p>Votre panier est vide.</p>
                ) : (
                  <ul>
                    {cart.map((item, index) => (
                      console.log("ITEM COMPLET ➜", item),
                      console.log("Item actuel:", item),
                      <li key={item.id || index} className="cart-item">
                        <div className='container-img'>
                          <img src={item.product_variant.product.image || "#"} alt={item.product_variant.product.name} className='image' />
                        </div>
                        <div className='cart-decscription'>
                            <h3>Nom du produit : {item.product_variant.product.name}</h3>
                          <div>
                            <span className="alcohol-degree">Degré d'alcool : {item.product_variant.product.alcohol_degree} %</span>
                            <span className="volume">Contenance : {item.product_variant.volume}</span>
                          </div>
                          
                          <span>Prix à l'unité : {console.log('Prix :', item.product_variant.price_with_tax )}{(Number(item.price_with_tax/item.quantity)/100).toFixed(2)} €</span>
                          <span>Il ne reste plus que {item.product_variant.stock_quantity} unités en stock</span>
                          <div className='btn-description'>
                            <div className='btn-quantity'>
                              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                              <input type="number" value={item.quantity} readOnly step="1" />
                              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.product_variant.stock_quantity}>+</button>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)}>🗑️</button>
                          </div>
                        </div>
                        <div className='display-price'>
                          <span>{(Number(item.price_with_tax)/100).toFixed(2)} €</span>
                          
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {cart.length > 0 && (
                  <div className='container-total'>
                    <div className='total-display'>
                    
                    
                    <span>Nombre d'articles : {articleNumber}</span>
                    <span>Total TTC : {total} €</span>
                    <button onClick={() => navigate('/commande')}>Commander</button>
                  </div>
                  <div className='btn-total'>
                    <button onClick={() => navigate('/products')}>Continuer mes achats</button>
                  </div>
                </div>
                )}
            </div>
          </div>
          <Footer />
        </>
      );
    }


export default ShowCart;