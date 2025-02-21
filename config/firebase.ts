import  AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgfnc1PJslzlRGs1iyKEuUDdxhyKxF39k",
  authDomain: "task-f8388.firebaseapp.com",
  projectId: "task-f8388",
  storageBucket: "task-f8388.firebasestorage.app",
  messagingSenderId: "888372930800",
  appId: "1:888372930800:web:d29a4126b8b85aa6b93a35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})
export const firestore = getFirestore(app);
