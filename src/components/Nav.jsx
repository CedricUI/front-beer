import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import Account from './Account';
import Cart from './Cart';

function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <Link to="/"><li>Accueil</li></Link>
        <Link to="/products"><li>Boutique</li></Link>
        <a href="#"><li>Contact</li></a>
        <a href="#"><li>À propos</li></a>
      </ul>
      <div className="account-cart">
        <Account />
        <Cart />
      </div>
    </nav>
  );
}

export default Nav;