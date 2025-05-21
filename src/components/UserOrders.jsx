import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import Header from './header';
import Footer from './Footer';
import '../styles/cart.css';

function UserOrders() {
    const { authToken } = useAuth();
    console.log("Token depuis useAuth :", authToken);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Optionnel : console.log à chaque changement de token pour debug
    useEffect(() => {
      console.log("Le token dans UserOrders a changé :", authToken);
    }, [authToken]);

    useEffect(() => {
        if (!authToken) {
        console.warn("Token encore indisponible, on attend…");
        return; // Ne lance pas le fetch si le authToken n'est pas disponible
    }});

    useEffect(() => {
  if (!authToken) {
    console.warn("Token encore indisponible, on attend…");
    return; // Ne pas lancer le fetch si token non dispo
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/orders', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Erreur de chargement');

      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [authToken]);

  if (loading) return <div className="show-cart-container">Chargement des commandes...</div>;

  if (!orders.length) return <div className="show-cart-container">Aucune commande trouvée.</div>;

  const statusFr = {
    pending: 'Validée, en attente de paiement',
    paid: 'Payée',
    delivered: 'Expédiée',
    canceled: 'Annulée',    
  };

  console.log('Liste des commandes communiquées :', orders);

  return (
    <>
    <Header />
    <div className="show-cart-container">
      <h1>Mes commandes</h1>
      {orders.map(order => (
        <div key={order.id} className="cart-container">
          <ul>
            <li><strong>Commande n° {new Date(order.created_at).toISOString().slice(0, 10).replace(/-/g, '')}-{order.id}</strong> - Statut : {statusFr[order.status] || order.status}</li>
            {order.items.map(item => (
              <li key={item.id} className="cart-item">
                {item.product_variant?.product?.name || 'Produit inconnu'} - Quantité : {item.quantity} - 
                Montant : {(item.price_with_tax / 100).toFixed(2)} €
              </li>
            ))}
            <li><strong>Total HT : {(order.total_price_without_tax / 100).toFixed(2)} €</strong></li>
            <li><strong>Taxes : {(order.tax_amount / 100).toFixed(2)} €</strong></li>
            <li><strong>Total TTC : {(order.total_price_with_tax / 100).toFixed(2)} €</strong></li>
          </ul>

          <ul>
            <li><strong>Adresse :</strong> {order.address?.address}</li>
            <li><strong>Code postal :</strong> {order.address?.zipcode}</li>
            <li><strong>Ville :</strong> {order.address?.city}</li>
            <li><strong>Téléphone :</strong> {order.address?.phone || 'Non communiqué'}</li>
          </ul>

          {order.status === 'pending' && (
            <div className="btn-total">
              <button onClick={() => navigate(`/consultation-de-la-commande`, { state: { orderId: order.id } })}>
                Voir la commande
              </button>
              <button onClick={() => navigate(`/redirection-vers-le-paiement`, { state: { orderId: order.id } })}>
                Reprendre le paiement
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
}

export default UserOrders;