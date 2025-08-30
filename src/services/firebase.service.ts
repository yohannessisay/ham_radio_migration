import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import config from "../config/config.json"; // adjust path as needed

class FirebaseService {
  private static instance: FirebaseApp;

  private constructor() {
    // Prevent direct instantiation
  }

  public static getInstance(): FirebaseApp {
    if (!FirebaseService.instance) {
      if (getApps().length === 0) {
        FirebaseService.instance = initializeApp(config.firebaseConfig);
        console.log("🔥 Firebase initialized");
      } else {
        FirebaseService.instance = getApp();
        console.log("✅ Firebase already initialized");
      }
    }
    return FirebaseService.instance;
  }
}

export default FirebaseService;
