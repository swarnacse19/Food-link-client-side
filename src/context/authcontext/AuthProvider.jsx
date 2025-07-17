import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { useQueryClient } from "@tanstack/react-query";

const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async(email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(auth.currentUser, true);
    localStorage.setItem("accessToken", token);
    return result;
  };

  const signInWithGoogle = async() => {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    const token = await getIdToken(auth.currentUser, true);
    localStorage.setItem("accessToken", token);
    return result;
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("accessToken");
    queryClient.clear();
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
