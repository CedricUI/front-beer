import "../styles/cart.css";
import iconCart from "../assets/icon-cart.webp";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";


function Cart () {
    // Supposons que le panier est stocké en base de données et doit être récupéré via une API

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/chipcart"); // Modifiez l'URL selon votre API
                const cart = await response.json();
                console.log("cart : ", cart);
                const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                setCartCount(count);
            } catch (error) {
                setCartCount(0);
            }
        }
        fetchCart();
    }, []);

    return(
        <>
            <Link to="/panier">
            <div className="cart-container">
                <span className="chip-cart">{cartCount}</span>
                <figure className="cart">
                    <img className="icon-cart" src={ iconCart } alt="Icône du panier"/>
                </figure>
            </div>
            </Link>
        </>
    )
}

export default Cart;