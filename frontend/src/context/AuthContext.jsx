import { createContext, useContext, useState } from "react";

// Create the Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // Logged-in user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  // JWT Token
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    // Persist data
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
