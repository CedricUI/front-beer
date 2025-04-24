import logoEcommerce from '../assets/logo-trink.svg'; // On déclare une variable logoEcommerce à laquelle on assigne le contenu de notre image.
import "../styles/logo.css"; // On importe le fichier CSS pour styliser notre logo.

function Logo () {
    return (
        <img className="logo-ecommerce" src={ logoEcommerce } alt="Logo du e-commerce Trink"/>
    )
}

export default Logo;