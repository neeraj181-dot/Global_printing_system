// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6tOnfk4bNjZyOjYvS0mEMwp_b00a17H4",
    authDomain: "global-printing-system.firebaseapp.com",
    projectId: "global-printing-system",
    storageBucket: "global-printing-system.firebasestorage.app",
    messagingSenderId: "368988724613",
    appId: "1:368988724613:web:746d8c4b629517179f38ec",
    measurementId: "G-Q9EFEB693B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
export default app;
