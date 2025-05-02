import "../styles/account.css";
import iconAccount from "../assets/icon-account.webp";
import { Link } from 'react-router-dom';
import LogIn from "./auth/LogIn";

function Account () {
    const condition = localStorage.getItem('authToken');
    console.log("localStorage.getItem(authToken) :", condition)
    return(
        <>
        {condition? (
            console.log("authToken : ",LogIn),
            
            // {/* Add your JSX here if the condition is true */}
            // {/* <button onClick={logout}>Déconnexion</button> */}
            <button>Déconnection</button>

        ) : 
            <Link to="/connexion">
                <figure className="account">
                    <img className="icon-account" src={ iconAccount } alt="Icône du compte"/>
                </figure>
            </Link>
        }
            {/* <Link to="/connexion">
                <figure className="account">
                    <img className="icon-account" src={ iconAccount } alt="Icône du compte"/>
                </figure>
            </Link> */}
            {/* <button onClick={logout}>Déconnexion</button> */}
        </>
    )
}

export default Account;