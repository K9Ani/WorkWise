/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const AuthUserContext = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserDetails = () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");

    if (email && password) {
      setAuthUser({ email, password });
      setIsLoggedIn(true);
    } else {
      setAuthUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setAuthUser(null);
    setIsLoggedIn(false);
    window.location.assign("/login");
  };

  return (
    <UserContext.Provider value={{ authUser, isLoggedIn, setIsLoggedIn, setAuthUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthUserContext;
