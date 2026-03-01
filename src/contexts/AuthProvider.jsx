import { useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../config/firebase.config"; 
import { AuthContext } from "./AuthContext";
import { axiosPublic } from "../config/axios.config"; // Import your public axios instance

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // ... (Keep your existing createUser, loginUser, googleLogin, logOut, updateUserProfile functions here) ...
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // UPDATED: Observer to track user state and handle JWT
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log("Current User -->", currentUser?.email);
      
      if (currentUser) {
        // User logged in: get token and store it
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post('/jwt', userInfo); // Ensure your backend has this route!
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } catch (error) {
          console.error("JWT fetch error:", error);
        }
      } else {
        // User logged out: remove token
        localStorage.removeItem('access-token');
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;