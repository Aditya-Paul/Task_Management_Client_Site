import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
 import { GoogleAuthProvider } from "firebase/auth";
import app from "../../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();
const gitprovider = new GithubAuthProvider();

const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    //Sign in
    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googlesignIN = () => {
        setLoading(true)
        return signInWithPopup(auth, gitprovider)
    }
    const gitesignIN = () => {
        setLoading(true)
        return signInWithPopup(auth, googleprovider)
    }

    //Sign up
    const signup = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // State  Change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            if(currentUser){
                setLoading(false);
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // User Update
    const update = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    //logout
    const userlogout = () => {
        return signOut(auth)
    }

    const information = {
        user,
        googlesignIN,
        gitesignIN,
        signup,
        signin,
        update,
        userlogout,
        loading,
    }
    return (
        <AuthContext.Provider value={information}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;