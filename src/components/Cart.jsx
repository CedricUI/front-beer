import "../styles/cart.css";
import iconCart from "../assets/icon-cart.webp";
import { Link } from 'react-router-dom';


function Cart () {
    return(
        <>
            <Link to="/panier">
                <figure className="cart">
                    <img className="icon-cart" src={ iconCart } alt="Icône du panier"/>
                </figure>
            </Link>
        </>
    )
}

export default Cart;