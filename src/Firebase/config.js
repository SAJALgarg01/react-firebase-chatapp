import { initializeApp } from "firebase/app";
import { setPersistence, getAuth , browserSessionPersistence} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// console.log(api);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_api_key,
  authDomain: "reactchat-1139c.firebaseapp.com",
  projectId: "reactchat-1139c",
  storageBucket: "reactchat-1139c.appspot.com",
  messagingSenderId: "211091118854",
  appId: "1:211091118854:web:9a0f4ac89c59d985f95c87"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// async function Persistence() {
//   try {
//     await setPersistence(auth,browserSessionPersistence);
//     console.log("Session persistence set to SESSION");
//   } catch (error) {
//     console.error("Error setting persistence:", error);
//   }
// }

// // Call the function to set persistence
// Persistence();

export {auth};