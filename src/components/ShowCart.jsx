import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ← adapte le chemin selon ton projet
import '../styles/show-cart.css'; // Assurez-vous que le chemin d'importation est correct
import Header from './header';
import iconCart from "../assets/icon-cart.webp";
import Footer from './Footer';


function ShowCart({ }) {  
  console.log("Composant ShowCart monté");

  const { authToken } = useAuth();
  console.log("Token depuis useAuth :", authToken);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("Statut de la réponse :", res.status);
        console.log("Contenu brut :", text);

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }

        // Parse manuellement le JSON (on ne relit pas le body, déjà consommé)
        return JSON.parse(text);
      })
      .then(data => {
        console.log("Données panier reçues :", data);
        // On sécurise l'accès au tableau d'items dans la réponse
        setCart(data.items || data.panier?.items || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur attrapée dans catch :", error.message);
        setCart([]);
        setLoading(false);
      });
  }, [authToken]);

  console.log(cart);


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
                      <li key={item.id || index} className="cart-item">
                        <div className='container-img'>
                          <img src={item.product_variant.product.image_url || "#"} alt={item.product_variant.product.name} className='image' />
                        </div>
                        <div className='cart-decscription'>
                            <h3>Nom du produit : {item.product_variant.product.name}</h3>
                          <div>
                            <span className="alcohol-degree">Degré d'alcool : {item.product_variant.product.alcohol_degree}%</span>
                            <span className="volume"> - Contenance : {item.product_variant.product.volume}cl</span>
                          </div>
                          <span>Il ne reste plus que {item.product_variant.stock_quantity} en stock</span>
                          <div className='btn-description'>
                            <div className='btn-quantity'>
                              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                              <input type="number" value={item.quantity} readOnly />
                              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} disabled={item.product_variant.stock_quantity >= item.quantity}>+</button>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)}>🗑️</button>
                          </div>
                        </div>
                        <div className='display-price'>
                          <span>{item.product_variant.price_with_tax * item.quantity} €</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {cart.length > 0 && (
                  <div className='container-total'>
                    <div className='total-display'>
                    <h3>Total :</h3>
                    {/* <span>({articleNumber})</span> */}
                    {/* <span>{total} €</span> */}
                    <button>Commander</button>
                  </div>
                  <div className='btn-total'>
                    <button>Continuer les achats</button>
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