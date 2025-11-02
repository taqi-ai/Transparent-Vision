import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { db } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

// 🔍 quick live test
const testRef = ref(db, "status/");
onValue(testRef, (snapshot) => {
  console.log("🔥 Firebase data:", snapshot.val());
});


createRoot(document.getElementById("root")!).render(<App />);
