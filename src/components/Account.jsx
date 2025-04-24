import "../styles/account.css";
import iconAccount from "../assets/icon-account.webp";

function Account () {
    return(
        <>
            <figure className="account">
                <img className="icon-account" src={ iconAccount } alt="Icône du compte"/>
                {/* <figcaption>Compte</figcaption> */}
            </figure>
        </>
        
    )
}

export default Account;