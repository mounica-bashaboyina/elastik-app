import { fetchAuthSession } from "aws-amplify/auth";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const session = await fetchAuthSession();
        console.log("sessio token", session.tokens.accessToken.toString())
        setAuthToken(session.tokens.accessToken.toString());
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };

    fetchAuthToken();
  }, []);
  
  if (!authToken) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ authToken }}>
      {children}
    </AuthContext.Provider>
  );
};
