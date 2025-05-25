

// Your existing Firebase Core, Firestore, and Auth imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  initializeFirestore,
  persistentLocalCache
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// *** ADD THIS NEW IMPORT FOR FIREBASE AI LOGIC ***
// Note: The version (11.6.1) needs to match your other imports
// and you might need a newer version if AI wasn't in 11.6.1.
// Let's assume a recent version supports AI. You might need to check the latest version URL.
import { getAI, getGenerativeModel, GoogleAIBackend } from "https://www.gstatic.com/firebasejs/VERSION_NUMBER/firebase-ai.js";
// IMPORTANT: Replace VERSION_NUMBER with the actual latest version supporting firebase-ai

const firebaseConfig = {
  apiKey: "AIzaSyDBZ7tcCJJdGCo7C8FXRiUPQ8OfOzexllc",
  authDomain: "time2study-4f2f3.firebaseapp.com",
  projectId: "time2study-4f2f3",
  storageBucket: "time2study-4f2f3.appspot.com",
  messagingSenderId: "856561565211",
  appId: "1:856561565211:web:e59307f6c4dcb7a52582be",
  measurementId: "G-9S9C5D6TXF" // Only if you use Analytics
};

const app = initializeApp(firebaseConfig);
console.log("Firebase App initialized!"); // Optional: log to check

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: 10 * 1024 * 1024 // 10MB cache
  })
});
console.log("Firestore initialized!"); // Optional: log to check

export const auth = getAuth(app);
console.log("Auth initialized!"); // Optional: log to check

// *** ADD THIS PART TO INITIALIZE FIREBASE AI LOGIC ***
// Initialize Firebase AI Logic with the Google AI backend
const ai = getAI(app, { backend: new GoogleAIBackend() });
console.log("Firebase AI Logic initialized!"); // Optional: log to check

// Get a specific generative model instance
// Choose a model suitable for your needs, e.g., 'gemini-1.5-flash-latest'
const model = getGenerativeModel(ai, { model: "gemini-1.5-flash-latest" });
console.log("Generative model loaded!"); // Optional: log to check

// *** EXPORT THE 'model' SO script.js CAN USE IT ***
export { model };
