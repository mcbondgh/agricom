import PropTypes from "prop-types";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { useState,useEffect } from "react";
import UserImg from "/user.jpg"
import AuthService from "@/services/authService";

export function AuthUserContextProvider({children}) {
    const dummyUser ={ 
        name: "David Benson",
        email: "user@gmail.com",
        image: UserImg,
        role: "admin",
        password: "12345"
    };//has to be null. Just setting default user for test ing purpose
   
    const [user, setUser] = useState(()=> sessionStorage.getItem("user") || null);
    const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("authenticated") === "true");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const initializeAuth = async () => {
          setLoading(true);
          const result = await AuthService.fetchUser();
          if (result.success) {
              setUser(result.user);
              sessionStorage.setItem("user", user);
              setAuthenticated(true);
              sessionStorage.setItem("authenticated", "true"); // Persist state
          }
          setLoading(false);
      };
      initializeAuth();
  }, [user]);

  const login = async (userData) => {
      setLoading(true);
      const result = await AuthService.login(userData);
      if (result.success) {
          setUser(result.user);
          setAuthenticated(true);
          sessionStorage.setItem("user", user); // Persist user state
          sessionStorage.setItem("authenticated", "true"); // Persist state
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
          sessionStorage.removeItem("authenticated"); // Remove persisted state
          sessionStorage.removeItem("user");
      }
      setLoading(false);
  };

  //Dummy login  and logout test
  const loginDummy = async (userData) => {
    setLoading(true);
    const { email, password } = userData;

    if (email === dummyUser.email && password === dummyUser.password ) {
      setUser(dummyUser);
      setAuthenticated(true);
      sessionStorage.setItem("user", dummyUser);
      sessionStorage.setItem("authenticated", "true"); // Persist login state
      setLoading(false);
      return { success: true, user: dummyUser };
    }
  
    setLoading(false);
    return { success: false, message: "Invalid credentials" };
  };

  const logoutDummy = async () => {
    setLoading(true);
    setUser(null);
    setAuthenticated(false);
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("user");
    setLoading(false);
    console.log("logout successful")
};
  
  //Dummy login and logout  test

  return (
    <AuthUserContext.Provider value={{user, authenticated, loading, login, logout, loginDummy, logoutDummy}}>
        {children}
    </AuthUserContext.Provider>
  )
}

AuthUserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}