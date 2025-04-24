import React from 'react';
import '../styles/nav.css'; // Import your CSS file here
import Logo from './Logo';
function Nav() {
  return (
    <nav className="navbar">
        <div className="identity-ecommerce">
            <Logo className="logo-trink"/>
            {/* <span className="catchphrase">{ catchphrase } ... dites-le avec l'accent que vous voulez ;)</span> */}
            <span className="brand">Trink !</span>
        </div>
        <span>Je suis la nav bar</span>
      
    </nav>
  );
}

export default Nav;