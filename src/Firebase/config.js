import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8-XTS4UbfHWc0A8zz3UjVgFmD0E_frAw",
  authDomain: "reactchat-1139c.firebaseapp.com",
  projectId: "reactchat-1139c",
  storageBucket: "reactchat-1139c.appspot.com",
  messagingSenderId: "211091118854",
  appId: "1:211091118854:web:9a0f4ac89c59d985f95c87"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
