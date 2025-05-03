import { useState } from 'react';
import '../../styles/auth/register.css';
import { useEffect } from 'react';

function Register () {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');


    const handleSubmitRegister = async (firstname, lastname, email, email_verified_at, password, birthdate) => {
        const role = "custumer";
        console.log("fromulaire register", firstname, 
            lastname, 
            email, 
            email_verified_at, 
            password, 
            role, 
            birthdate );

        try {
          const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstname, 
                lastname, 
                email, 
                email_verified_at, 
                password, 
                role, 
                birthdate }),
          });
      
          if (!response.ok) {
            // Affiche un message d'erreur plus clair si les identifiants sont invalides
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText || 'Réponse invalide ',firstname, lastname, email, email_verified_at, role, birthdate}`);
          }
          console.log('reponse :', response);
          
          } catch (error) {
          console.error('Erreur lors de l\'envoie de l\'inscription :', error.message);
        }
      } 

    return(
        <>
            <h1>Inscription <br /> <span>Encore un effort 😉. Après ça on peut Trinké ! 🍻</span></h1>
            <form onSubmit={handleSubmitRegister} method="POST" className="register-form">
                <input type="text" name="firstname" id="firstname" placeholder='Nom'onChange={(e) => setFirstname(e.target.value)}/>
                <input type="text" name="lastname" id="lastname" placeholder='Prénom'onChange={(e) => setLastname(e.target.value)}/>
                <input type="email" name="email" id="email" placeholder='Email'onChange={(e) => setEmail(e.target.value)}/>
                <input type="email" name="email_verified_at" id="email_verified_at" placeholder='Vérification email'onChange={(e) => setEmailVerified(e.target.value)}/>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="date" name="birthdate" id="birthdate" onChange={(e) => setBirthdate(e.target.value)}/>
                <button type="submit">S'incire</button>
            </form>
        </>
    )
}

export default Register;