import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function PublicPage() {
  const [data, setData] = useState<{ serving?: string; wait_time?: string; updated?: string }>({});

  useEffect(() => {
    const statusRef = ref(db, "status/");
    onValue(statusRef, (snapshot) => {
      const val = snapshot.val();
      setData(val);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#A7E9AF] to-[#6EC1E4] text-gray-800 font-poppins relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute w-64 h-64 bg-white/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-white/20 rounded-full blur-2xl bottom-10 right-10 animate-ping"></div>

      {/* Main glass card */}
      <div className="z-10 backdrop-blur-2xl bg-white/25 border border-white/30 rounded-3xl shadow-2xl p-10 text-center w-[90%] max-w-lg transition-all duration-300 hover:scale-[1.02]">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 drop-shadow">Transparent Waiting Room 🏥</h1>

        <div className="text-7xl font-extrabold text-gray-900 mb-2 animate-pulse">
          {data?.serving || "--"}
        </div>
        <p className="text-lg mb-2 font-medium">
          Estimated Wait: <span className="font-semibold">{data?.wait_time || "--"}</span>
        </p>
        <p className="text-sm text-gray-700">Last Updated: {data?.updated || "--"}</p>
      </div>

      {/* Footer message */}
      <p className="z-10 mt-10 text-white/80 text-sm tracking-wide">
        Stay calm 💙 You’ll be served soon.
      </p>
    </div>
  );
}
