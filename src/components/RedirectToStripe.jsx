import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ← adapte le chemin selon ton projet
import '../styles/checkout.css';

function RedirectToStripe() {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // On suppose que l'order_id est passé via le state (navigate('/redirect-stripe', { state: { orderId: 123 } }))
  const orderId = location.state?.orderId;


    // useEffect(() => {
    //     console.log("authToken :", authToken);
    //     console.log("orderId :", orderId);
    //   }, [authToken, orderId]);

    useEffect(() => {
    const redirectToStripe = async () => {
      if (!authToken || !orderId) return;

      try {
        const res = await fetch('http://localhost:8000/api/stripe-payment/checkout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ order_id: orderId }),
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la création de la session Stripe');
        }

        const data = await res.json();

        if (data.checkout_url) {
          window.location.href = data.checkout_url; // redirection vers Stripe
        } else {
          throw new Error('URL Stripe manquante dans la réponse');
        }

      } catch (err) {
        console.error(err);
        navigate('/mes-commandes', { state: { error: 'Impossible de rediriger vers Stripe.' } });
      } finally {
        setLoading(false);
      }
    };

    redirectToStripe();
  }, [authToken, orderId]);

  return (
    <div className="checkout">
      <p>Redirection vers le paiement sécurisé...</p>
    </div>
  );
}

export default RedirectToStripe;