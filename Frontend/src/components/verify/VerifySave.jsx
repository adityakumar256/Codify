import { useState } from "react";
import Popup from "@/components/ui/Popup";

export default function VerifySave() {
  const [popup, setPopup] = useState(null);

  // VERIFY BUTTON
  const handleVerify = () => {
    const success = Math.random() > 0.5; // demo logic

    if (success) {
      setPopup({
        type: "success",
        message: "ID verified successfully 🎯",
      });
    } else {
      setPopup({
        type: "fail",
        message: "ID verification failed ❌",
      });
    }
  };

  // SAVE BUTTON
  const handleSave = () => {
    const success = Math.random() > 0.5; // demo logic

    if (success) {
      setPopup({
        type: "success",
        message: "ID saved successfully 💾",
      });
    } else {
      setPopup({
        type: "fail",
        message: "Failed to save ID ❌",
      });
    }
  };

  return (
    <div className="flex gap-4 p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen relative overflow-hidden animate-fade-in">
      {/* Wonderful Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* 3D Effect Container */}
      <div className="relative z-10 flex gap-4 transform-gpu perspective-1000">
        <button
          onClick={handleVerify}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-bold text-lg shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out border-2 border-green-300 hover:border-green-400 active:scale-95 active:translate-y-0"
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
          Verify ID
        </button>

        <button
          onClick={handleSave}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out border-2 border-blue-300 hover:border-blue-400 active:scale-95 active:translate-y-0"
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
            transformStyle: 'preserve-3d',
          }}
        >
          Save ID
        </button>
      </div>

      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
