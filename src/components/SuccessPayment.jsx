import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // adapte le chemin
import '../styles/checkout.css';

function SuccessPayment() {
  const { authToken } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState('Chargement...');
  const [order, setOrder] = useState(null);

  // Récupère l'order_id depuis les query params
  const params = new URLSearchParams(location.search);
  const orderId = params.get('order_id');

  useEffect(() => {
    const confirmPayment = async () => {
      if (!authToken || !orderId) return;

      try {
        const res = await fetch(`http://localhost:8000/api/stripe-payment/success?order_id=${orderId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json'
          }
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Erreur inconnue'); /** Erreur lors de la confirmation du paiement */

        
        setOrder(data.order);
        setMessage(data.message);

      } catch (err) {
        setMessage(err.message || 'Une erreur est survenue lors de la validation du paiement.');
      }
    };

    confirmPayment();
  }, [authToken, orderId]);

  return (
    <>
      <div className="checkout">
        <h1>✅ Paiement réussi</h1>
        <p>{message}</p>
        {order && <p>Commande #{order.id} confirmée !</p>}
      </div>
      <Link to="/mes-commandes" className="btn">Voir mes commandes</Link>
    </>
  );
}

export default SuccessPayment;