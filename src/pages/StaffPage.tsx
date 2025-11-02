import { useState } from "react";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";

export default function StaffPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [serving, setServing] = useState("");
  const [wait, setWait] = useState("");
  const [progress, setProgress] = useState("");
  const [message, setMessage] = useState("");

  const SECRET_KEY = "medhack2025"; // 🔒 change this anytime

  const handleAccess = () => {
    if (inputKey === SECRET_KEY) {
      setIsAuthorized(true);
      setInputKey("");
    } else {
      alert("❌ Invalid Access Key");
    }
  };

  const handleUpdate = async () => {
    if (!serving || !wait || !progress) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      await set(ref(db, "status/"), {
        serving,
        wait_time: `${wait} mins`,
        progress: Number(progress),
        updated: now,
      });
      setMessage("✅ Data updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to update Firebase.");
    }
  };

  // 🧠 If not authorized, show access screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#89f7fe] to-[#66a6ff] font-poppins text-gray-800">
        <h1 className="text-3xl font-bold mb-6">🔐 Staff Access Only</h1>
        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          className="w-64 mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
          placeholder="Enter access key"
        />
        <button
          onClick={handleAccess}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200"
        >
          Unlock
        </button>
      </div>
    );
  }

  // ✅ Authorized view (your existing panel)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6EC1E4] to-[#A7E9AF] font-poppins text-gray-800 relative overflow-hidden">
      <div className="absolute w-64 h-64 bg-white/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-2xl bottom-10 right-10 animate-ping"></div>

      <div className="z-10 backdrop-blur-2xl bg-white/25 border border-white/30 rounded-3xl shadow-2xl p-10 w-[90%] max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Staff Update Panel 🩺</h1>

        <label className="block text-left text-sm mb-1 font-semibold">Now Serving</label>
        <input
          type="number"
          value={serving}
          onChange={(e) => setServing(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter serving number"
        />

        <label className="block text-left text-sm mb-1 font-semibold">Estimated Wait (mins)</label>
        <input
          type="number"
          value={wait}
          onChange={(e) => setWait(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter wait time"
        />

        <label className="block text-left text-sm mb-1 font-semibold">Queue Progress (%)</label>
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter progress (0–100)"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition-all duration-200"
        >
          Update Firebase
        </button>

        {message && <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
