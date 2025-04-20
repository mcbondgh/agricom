import PropTypes from "prop-types";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { useState, useEffect } from "react";
import AuthService from "@/services/authService";

export function AuthUserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("authenticated") === "true");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const result = await AuthService.fetchUser();
      if (result.success) {
        setUser(result.user);
        setAuthenticated(true);
        sessionStorage.setItem("authenticated", "true");
      }else{
        setUser(null);
        setAuthenticated(false);
        sessionStorage.removeItem("authenticated");
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const login = async (userData) => {
    setLoading(true);
    const result = await AuthService.login(userData);
    if (result.success) {
      setUser(result.user);
      setAuthenticated(true);
      sessionStorage.setItem("authenticated", "true");
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await AuthService.logout();
    if (result.success) {
      setUser(null);
      setAuthenticated(false);
      sessionStorage.removeItem("authenticated");
      sessionStorage.removeItem("user");
    }
    setLoading(false);
  };

  return (
    <AuthUserContext.Provider value={{ user, authenticated, loading, login, logout }}>
      {children}
    </AuthUserContext.Provider>
  );
}

AuthUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
