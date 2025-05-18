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
    
     if (token) {
    // Appel à Laravel pour vérifier que le token est encore bon
    fetch('http://127.0.0.1:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) throw new Error("Token invalide ou expiré");
      return res.json();
    })
    .then(userData => {
      console.log("Utilisateur connecté :", userData);
      setAuthToken(token);
      // Tu peux aussi stocker les infos dans un `setUser(userData)` si tu veux
    })
    .catch(err => {
      console.error("Erreur lors de la vérification du token :", err);
      Cookies.remove('authToken');
      setAuthToken(null);
    });
  } else {
    setAuthToken(null);
  }
}, []);
    
  //   setAuthToken(token || null); // Si aucun token, définissez null
  //   console.log("Token récupéré depuis les cookies :", token);
  // }, []); // [] signifie que cet effet s'exécute uniquement au premier rendu

  
  // Méthode login
  const login = async (email, password) => {
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',  // IMPORTANT pour Sanctum
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

    } catch (error) {
      console.error('Erreur lors de la connexion :', error.message);
      alert("Tu n'es pas inscrit ! Inscris-toi. Après tu pourras prendre tes bières !");
      // Vérifiez si le token est présent
      // Si l'utilisateur n'est pas connecté, redirigez vers la page d'inscription
      window.location.href = '/inscription';
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

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
        

