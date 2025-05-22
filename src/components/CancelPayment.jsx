import { useNavigate } from "react-router-dom";

function CancelPayment() {

    
  return (
    <div className="checkout">
      <h1>❌ Paiement annulé</h1>
      <p>Vous avez annulé le paiement. Votre commande n'a pas été finalisée.</p>
      <Link to="/mes-commandes" />
    </div>
  );
}

export default CancelPayment;