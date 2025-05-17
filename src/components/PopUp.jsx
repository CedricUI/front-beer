import "../styles/PopUp.css";

function PopUp ({ onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2 className="popup-title">Bienvenue sur le meilleur site de bière où on aime Trinker! 🍻</h2>
        <p className="popup-message">Nous espérons que vous trouverez votre bière préférée ici !👋<br />
        <span className="popup-message-span">Profitez de votre visite !</span></p>
        <p className="popup-message-ban">🔞 Attention ce site est interdit aux mineurs âgés de -18 ans et à toutes personnes en état d'ivresse ! <br />
        En fermant cette fenêtre, vous confirmez avoir l'âge légal pour consommer de l'alcool. Et par la même occasion de nous décharger de toute responsabilité ! 😎 <br />
        <span className="popup-message-warning">Attention l'alcool peut être dangereux pour la santé.</span>
        </p>
        <button
          onClick={onClose}
          className="popup-button"
        >
          Je ferme car je suis majeur ! 🍻
        </button>
      </div>
    </div>
  );
}
export default PopUp;