import "../styles/account.css";
import iconAccount from "../assets/icon-account.webp";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

function Account () {
    const [authToken, setAuthToken] = useState('null');
    // Utilisez useEffect pour récupérer le token des cookies au premier rendu
    useEffect(() => {
        const token = Cookies.get('authToken');
        setAuthToken(token || null); // Si aucun token, définissez null
        console.log("auth dans Account : ", token);
    }, []); // [] signifie que cet effet s'exécute uniquement au premier rendu

        // authToken, login()…
        const logout = async () => {
          try {
            if (authToken) {
              await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authToken}`,
                },
              });
            }
          } catch (err) {
            console.error('Erreur logout API:', err);
          } finally {
            // Nettoyage côté client
            Cookies.remove('authToken');
            setAuthToken(null);      // ou votre état React
          }
        return { authToken, login, logout };
        };
    



    return(
        <>
        {authToken? (
            <div>
                {/* <span>Coucou {user.name}</span> */}
                <button onClick={logout}>Déconnexion</button>
            </div>
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