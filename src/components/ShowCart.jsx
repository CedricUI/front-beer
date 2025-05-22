import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/show-cart.css';
import Header from './header';
import iconCart from "../assets/icon-cart.webp";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


function ShowCart() {
  const { authToken } = useAuth();
  const { articleNumber, setArticleNumber } = useCart();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  // Récupération du panier à l'affichage
  useEffect(() => {
    if (!authToken) {
      setLoading(false);
      return;
    }

    fetch('http://localhost:8000/api/cart/show', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.items || data.panier?.items || [];
        setCart(items);

        // Calcul du total et du nombre d'articles
        const total = items.reduce((acc, item) => acc + item.price_with_tax, 0);
        setTotal((total / 100).toFixed(2));

        const numberOfArticles = items.reduce((acc, item) => acc + item.quantity, 0);
        setArticleNumber(numberOfArticles);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authToken, setArticleNumber]);

  // Met à jour le nombre d'articles à chaque changement du panier
  useEffect(() => {
    const numberOfArticles = cart.reduce((acc, item) => acc + item.quantity, 0);
    setArticleNumber(numberOfArticles);
  }, [cart, setArticleNumber]);

  // Modifier la quantité d'un article
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:8000/api/order-items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du panier sur le serveur');

      const data = await response.json();
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId
            ? {
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
              }
            : item
        )
      );
    } catch (error) {
      console.error("Erreur serveur :", error.message);
    }
  };

  // Supprimer un article du panier
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/order-items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression de l’article');

      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.message);
    }
  };

  return (
    <div className="show-cart">
      <Header />
      <div className="show-cart-container">
        <h1>Panier</h1>
        <div className="cart-container">
          {loading ? (
            <p>Chargement...</p>
          ) : cart.length === 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
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
                    <span>
                      Prix à l'unité : {(Number(item.price_with_tax / item.quantity) / 100).toFixed(2)} €
                    </span>
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
                    <span>{(Number(item.price_with_tax) / 100).toFixed(2)} €</span>
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
    </div>
  );
}

export default ShowCart;