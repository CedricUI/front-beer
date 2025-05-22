import { useCart } from '../context/CartContext'; // Ajoute cette ligne
import "../styles/cart.css";
import iconCart from "../assets/icon-cart.webp";
import { Link } from 'react-router-dom';

function Cart () {
  const { articleNumber } = useCart();

return(
    <>
        <Link to="/panier">
            <div className="cart-container">
                <span className={`chip-cart${articleNumber === null ? ' empty' : ''}`}>{articleNumber}</span>
                <figure className="cart">
                    <img className="icon-cart" src={ iconCart } alt="Icône du panier"/>
                </figure>
            </div>
        </Link>
    </>
)
}

export default Cart;