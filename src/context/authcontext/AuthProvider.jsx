import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("user in on auth state change", currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authdata = {
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    user,
    updateUserProfile,
    logout,
  };
  return <AuthContext value={authdata}>{children}</AuthContext>;
}

export default AuthProvider;
