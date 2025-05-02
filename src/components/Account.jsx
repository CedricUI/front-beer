import "../styles/account.css";
import iconAccount from "../assets/icon-account.webp";
import { Link } from 'react-router-dom';

function Account () {
    return(
        <>
            <Link to="/connexion">
                <figure className="account">
                    <img className="icon-account" src={ iconAccount } alt="Icône du compte"/>
                </figure>
            </Link>
            {/* <button onClick={logout}>Déconnexion</button> */}
        </>
    )
}

export default Account;