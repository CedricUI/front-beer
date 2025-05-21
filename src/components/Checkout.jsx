import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import '../styles/checkout.css'; // À créer pour le style

function Checkout() {
  const { authToken, user } = useAuth(); // assure-toi que `user` est bien exposé dans ton AuthContext
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [identity, setIdentity] = useState([]);
  const [totals, setTotals] = useState({ ht: 0, tax: 0, ttc: 0 });
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    zipcode: '',
    city: '',
    'privacy-policy': true,
    'terms-of-sale': true
  });

  useEffect(() => {
    if (!authToken) return;

    fetch('http://localhost:8000/api/cart/checkout', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        const items = data.order.items || [];
        const infosUser = data.user || [];
        setCart(items);
        setIdentity(infosUser);
        console.log('Ceci est mon panier récupéré :', cart)

        // const ht = items.reduce((acc, item) => acc + item.price_without_tax * item.quantity, 0);
        // const tax = items.reduce((acc, item) => acc + item.tax_amount * item.quantity, 0);
        // const ttc = items.reduce((acc, item) => acc + item.price_with_tax * item.quantity, 0);

        // setTotals({
        //   ht: (ht / 100).toFixed(2),
        //   tax: (tax / 100).toFixed(2),
        //   ttc: (ttc / 100).toFixed(2),
        // });
      });
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData['terms-of-sale']) {
      alert('Veuillez accepter les conditions générales.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          address: formData.address,
          zipcode: formData.zipcode,
          city: formData.city,
          'terms-of-sale': true,
        }),
      });

      console.log(formData);

      if (!res.ok) throw new Error('Erreur lors de la création de la commande');

      const data = await res.json();
      alert('Commande créée avec succès !');
      navigate('/redirect-stripe', { state: { orderId: order.id } });
    } catch (err) {
      console.error('Erreur commande :', err.message);
      alert('Une erreur est survenue lors de la commande.');
    }
  };

  return (
    <>
      <Header />
      <main className="checkout">
        <h1>Validation de commande</h1>

        <section className="cart-summary">
          <h2>Résumé de votre panier</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                Bière {item.product_variant.product.name}, contenance de {item.product_variant.volume} cl. Quantité : {item.quantity} / Prix TTC : {(item.price_with_tax / 100).toFixed(2)} €
              </li>
            ))}
          </ul>
          <p>Total HT : {totals.ht} €</p>
          <p>Total taxe : {totals.tax} €</p>
          <p><strong>Total TTC : {totals.ttc} €</strong></p>
        </section>

        <form onSubmit={handleSubmit} className="checkout-form">
          <fieldset>
            <legend>Identité</legend>
            <p>Prénom : {identity.firstname}</p>
            <p>Nom : {identity.lastname}</p>
            <p>Email : {identity.email}</p>
          </fieldset>

          <fieldset>
            <legend>Coordonnées</legend>
            <label>
              Téléphone :
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Adresse :
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
              Code Postal :
              <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
            </label>
            <label>
              Ville :
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
          </fieldset>

          <label>
            <input type="checkbox" name="terms-of-sale" checked={formData.accepted} onChange={handleChange} />
            J’accepte les <a href="/conditions">conditions générales de vente.</a>
          </label>

          <button>Valider la commande</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;