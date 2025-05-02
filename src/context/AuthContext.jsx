import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NTQ4MjU2NywiZXhwIjoxNzQ1NTY4OTY3fQ.olrgxWCxwEUY3YDmEKA8r-MTfC-qO6pTkz_G5yohmj0";
  const login = (token) => {
    setAuthToken(token); 
    console.log("Token:", token); 
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
