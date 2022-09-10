import React, { useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import nookies from "nookies";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null!);
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout(email: string, password: string) {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setCurrentUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
