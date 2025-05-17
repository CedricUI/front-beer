import React from 'react';
import "../styles/header.css"; // Import your CSS file here
import Logo from "./Logo";
import Nav from "./nav";

function Header() {
  const currentDate = new Date()
  const currentTime = currentDate.getHours();
  const itsTimeToDrinkBeer = currentTime >=18 || currentTime <= 4;
  const waitingTimeToDrink = 18 - currentTime;
  const catchphrase = itsTimeToDrinkBeer ? <span>"C'est l'heure de <strong>triiinnnquer</strong> !!!"</span> : <span>"On se retrouve dans <strong>{`${waitingTimeToDrink}`} heures</strong> pour trinquer !"</span>;
  return (
    <header className="header">
        <div className="identity-ecommerce">
          <div>
            <Logo className="logo-trink"/>
            <span className="brand">Trink !</span><br />
          </div>
          <span className="catchphrase">{ catchphrase } <br />... dites-le avec l'accent que vous voulez ;)</span>
        </div>
      <Nav/>
    </header>
  );
}

export default Header;