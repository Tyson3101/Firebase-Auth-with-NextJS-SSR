import React, { useContext, useState } from "react";
import { auth } from "./firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null! as U);
  const value = {
    currentUser,
  };
  function signup(email: string, password: string) {
    return (auth as any).createUserWithEmailAndPassword(email, password);
  }
  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
