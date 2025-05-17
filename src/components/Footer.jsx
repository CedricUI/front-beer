import { Link } from "react-router-dom";
import '../styles/Footer.css';

function Footer() {
  return (
      <footer>
        <p>Fabriqué avec ❤️ par <Link to="/a">Trink</Link></p>
        <p>Nous sommes une entreprise engagée dans la durabilité et l'éthique. L'alcool est à consommer avec modération.</p>
        <div className="footer-content">
            <ul className="footer-nav-links">
              <Link to="/"><li>Accueil</li></Link>
              <Link to="/products"><li>Boutique</li></Link>
              <Link to="/panier"><li>Panier</li></Link>
              <Link to="/contact"><li>Contact</li></Link>
              <Link to="/about"><li>À propos</li></Link>
            </ul>
    
            <address className="footer-address">
                <ul className="footer-address-list-contact">
                    <li>Trink</li>
                    <li>123 Rue de la Paix</li>
                    <li>75001 Paris, France</li>
                    <li>Tél: +33 1 23 45 67 89</li>
                    <li><a href="mailto:contact@trink.com">contact@trink.com</a></li>
                </ul>
            </address>
            <ul className="footer-address-list-links">
                <li><a href="https://www.trink.com">www.trink.com</a></li>
                <li><a href="https://www.facebook.com/trink">Facebook</a></li>
                <li><a href="https://www.instagram.com/trink">Instagram</a></li>
                <li><a href="https://www.twitter.com/trink">Twitter</a></li>
                <li><a href="https://www.linkedin.com/company/trink">LinkedIn</a></li>
                <li><a href="https://www.pinterest.com/trink">Pinterest</a></li>
                <li><a href="https://www.tiktok.com/@trink">TikTok</a></li>
            </ul>

        </div>
        <p>Trink est une marque déposée. Tous droits réservés © 2025 Trink.</p>
        <p>Mentions légales | Politique de confidentialité | Conditions générales de vente</p>
        <p>Site réalisé par <a href="https://www.trink.com">Trink</a></p>

    </footer>
  );
}

export default Footer;