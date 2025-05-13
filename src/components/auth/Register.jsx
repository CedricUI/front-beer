import { useState, useEffect } from 'react';
import '../../styles/auth/register.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header';

function Register () {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [emailVerified, setEmailVerified] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const navigate = useNavigate();



    const handleSubmitRegister = async (firstname, lastname, email, password, birthdate) => {
        const role = "customer";
        const date = new Date(); //Date du jour
        const equalAge = 567993600000; //18 ans en millisecondes
        const fusaux = 86400000; // 24 h en millisecondes pour le fusiaux horaires
        const autorization = date.getTime()-equalAge-fusaux;
        const birthdateInMilliseconds = new Date(birthdate).getTime();

        if (email !== emailVerified) {
          alert("Les emails ne correspondent pas.");
          return;
        }

        if(birthdateInMilliseconds > autorization){
          alert("Tu es trop jeune petit. 🖐️😒 Accès refusé !");
          return;
        }

        console.log("fromulaire register :", 
            firstname, 
            lastname, 
            email,
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
                password, 
                role, 
                birthdate }),
          });
      
          if (!response.ok) {
            // Affiche un message d'erreur plus clair si les identifiants sont invalides
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText}`);
          }
          console.log('reponse :', response);

          const data = await response.json();
          console.log('Inscription réussie:', data);
          navigate('/connexion');
          
          } catch (error) {
          console.error('Erreur lors de l\'envoie de l\'inscription :', error.message);
        }
      };

      // const sendConfirmationEmail = async () => {
      //   try {
      //     await fetch('http://127.0.0.1:8000/api/send-confirmation-email', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ email }),
      //     });
      //     console.log('Email de confirmation envoyé avec succès.');
      //   } catch (error) {
      //     console.error('Erreur lors de l\'envoi de l\'email de confirmation :', error.message);
      //   }
      // };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmitRegister(firstname, lastname, email, password, birthdate);
        // sendConfirmationEmail(); 
      };

    return(
        <>
          <Header/>
          <h1>Inscription <br /> <span>Encore un effort 😉. Après ça on peut Trinké ! 🍻</span></h1>
          <form onSubmit={handleFormSubmit} method="POST" className="register-form">
              <input type="text" name="firstname" id="firstname" placeholder='Nom'onChange={(e) => setFirstname(e.target.value)}/>
              <input type="text" name="lastname" id="lastname" placeholder='Prénom'onChange={(e) => setLastname(e.target.value)}/>
              <input type="email" name="email" id="email" placeholder='Email'onChange={(e) => setEmail(e.target.value)}/>
              <input type="email" name="email_verified_at" id="email_verified_at" placeholder='Vérification email'onChange={(e) => setEmailVerified(e.target.value)}/>
              <input type="password" name="password" id="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)}/>
              <label htmlFor="birthdate">Date de naissance</label>
              <input type="date" name="birthdate" id="birthdate" onChange={(e) => setBirthdate(e.target.value)}/>
              <button type="submit">S'incire</button>
          </form>
        </>
    )
}

export default Register;