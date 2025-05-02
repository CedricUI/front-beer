import auth from 'maildev/lib/auth';
import '../../styles/auth/log-in.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';


function LogIn (){
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const { authToken, login } = useAuth();
    const navigate = useNavigate();

    console.log('avant fetch');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:8000/api/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
      
          if (!response.ok) {
            // Affiche un message d'erreur plus clair si les identifiants sont invalides
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText || 'Réponse invalide'}`);
          }

          console.log('reponse :', response);
      
          const data = await response.json();
          if (!data.token) {
            throw new Error("Pas de token reçu !");
          }          
          console.log('data :', data);

          login(data.token);

        } catch (error) {
          console.error('Erreur lors de la connexion :', error.message);
        }
      };
      

    // Effect pour écouter les changements sur authToken
    useEffect(() => {
      if (authToken) {
        navigate('/');
      }
    }, [authToken, navigate]);

    return(
        <>
          {/* From Uiverse.io by Yaya12085 */}
          <form onSubmit={handleSubmit} method='POST' className="form">
            <h1 className="form-title">Connectez vous à votre compte password</h1>
            <div className="input-container">
              <input placeholder="Entrer votre email" type="text" name='email' value={email} onChange={(e) => setemail(e.target.value)}/>
              <span>
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            <div className="input-container">
              <input placeholder="Entrer votre mot de passe" type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <span>
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            <button className="submit" type="submit">
              Se connecter
            </button>
            <span className="signup-link">
              Pas encore de compte ? 😲 <a href="">S'inscrire</a>
            </span>
          </form>
        </>

        )
}

export default LogIn;