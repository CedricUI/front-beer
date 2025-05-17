import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // Initialisation correcte du token

  // Récupérer le token depuis les cookies au premier rendu
  useEffect(() => {
    const token = Cookies.get('authToken');
    setAuthToken(token || null); // Si aucun token, définissez null
    console.log("Token récupéré depuis les cookies :", token);
  }, []); // [] signifie que cet effet s'exécute uniquement au premier rendu

  // Méthode login
  const login = async (email, password) => {
    
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
      console.log('data.user.email_verified_at :', data.user.email_verified_at);

       // Stocker le token dans les cookies et mettre à jour l'état
      Cookies.set('authToken', data.token, { expires: 7 }); // Expire dans 7 jours
      setAuthToken(data.token);
      console.log('Token stocké dans les cookies :', data.token);
      window.location.href = '/';
      
      } catch (error) {
        alert("Tu n'es pas inscrit ! Retourne vite voir tes mails. Après tu prendras tes bières !");
        console.error('Erreur lors de la connexion :', error.message);
        window.location.href = '/register';
    }
  } 

  // Méthode logout
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
      setAuthToken(null);
      console.log('Déconnexion réussie, token supprimé.');
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
        

