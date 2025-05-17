import React from 'react';
import '../styles/show-cart.css'; // Assurez-vous que le chemin d'importation est correct
import Header from './header';
import iconCart from "../assets/icon-cart.webp";
import Footer from './Footer';

function ShowCart({ cart }) {    
    const quantity = 1; // Remplacez ceci par la quantité réelle de l'article dans le panier
    const stock = 5; // Remplacez ceci par le stock réel de l'article
    const articleNumber = "2 articles"; // Remplacez ceci par le nombre réel d'articles dans le panier
    const price1 = 10;
    const price2 = 15;


    // const handleRemove = (itemId) => {
    //     // Logique pour supprimer l'élément du panier
    // };
    // const handleUpdateQuantity = (itemId, newQuantity) => {
    //     // Logique pour mettre à jour la quantité de l'élément dans le panier
    // };
    // const handleUpdate = (itemId, newQuantity) => {
    //     // Logique pour mettre à jour la quantité de l'élément dans le panier
    // };
    // const handleClearCart = () => {
    //     // Logique pour vider le panier
    // };
    // const handleCheckout = () => {
    //     // Logique pour passer à la caisse
    // };
    // const handleContinueShopping = () => {
    //     // Logique pour continuer les achats 
    // };
    // const handleBack = () => {
    //     // Logique pour revenir à la page précédente
    // };
    // const handleEmptyCart = () => {
    //     // Logique pour vider le panier
    // };
    // const handleContinue = () => {
    //     // Logique pour continuer les achats
    // };

  return (
    <>
        <Header />
        <div className="show-cart-container">
            <h1>Panier</h1>
            <div className="cart-container">
              <ul>

                <li key={1} className="cart-item">
                    <div className='container-img'>
                        <img src="#" alt="image produit" className='image' />
                    </div>
                    <div className='cart-decscription'>
                        <h3>Nom du produit <span>Alc 1%</span> <span>Volume 25 Cl</span> <span>description</span></h3>
                        <span>Il ne reste plus que {stock} en stock</span>
                        <div className='btn-description'>
                            <div className='btn-quantity'>
                                <button>-</button>
                                <input type="number" value={quantity} min="1" max="10" />
                                <button>+</button>
                            </div>
                            <button>🗑️</button>
                        </div>
                    </div>
                    <div className='display-price'>
                        <span>Prix :</span>
                        <span>{price1} €</span>
                    </div>
                </li>

                <li key={1} className="cart-item">
                    <div className='container-img'>
                        <img src="#" alt="image produit" className='image' />
                    </div>
                    <div className='cart-decscription'>
                        <h3>Nom du produit <span>Alc 1%</span> <span>Volume 25 Cl</span> <span>description</span></h3>
                        <span>Il ne reste plus que {stock} en stock</span>
                        <div className='btn-description'>
                            <div className='btn-quantity'>
                                <button>-</button>
                                <input type="number" value={quantity} min="1" max="10" />
                                <button>+</button>
                            </div>
                            <button>🗑️</button>
                        </div>
                    </div>
                    <div className='display-price'>
                        <span>Prix :</span>
                        <span>{price2} €</span>
                    </div>
                </li>

                
              </ul>

                <div className='container-total'>
                    <div className='total-display'>
                      <h3>Total :</h3>
                      <span>( {articleNumber} )</span>
                      <span>{price1 + price2} €</span>
                      <button>Commander</button>
                    </div>
                    <div className='btn-total'>
                      <button>Continuer les achats</button>
                      <button>Vider le panier</button>
                      <button>Retour</button>  
                    </div>
                </div>
            </div>

            
            
        </div>
      
            

      {/* {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
           C'est ici que vous mapperez les éléments du panier et les afficherez

          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )} */}

        <Footer />

                
    </>
  );
}

export default ShowCart;