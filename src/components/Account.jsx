import "../styles/account.css";
import iconAccount from "../assets/icon-account.webp";
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function Account () {

  const { authToken, logout } = useAuth(); // Récupération de authToken et logout depuis le contexte
  console.log("authToken dans Account : ", authToken)
  console.log("authAuth dans Account : ", useAuth())

  return(
      <>
        { authToken? (
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
      </>
    )
}

export default Account;