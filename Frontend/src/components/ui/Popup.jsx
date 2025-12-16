"use client";

import { X } from "lucide-react";

export default function Popup({ type, message, onClose }) {
  const success = type === "success";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
      {/* Wonderful Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-10 pointer-events-none"></div>
      
      <div
        className={`animate-popup relative w-[340px] p-6 rounded-2xl text-white transform-gpu perspective-1000
        ${
          success
            ? "bg-gradient-to-br from-green-400 via-green-500 to-emerald-700 shadow-[0_0_40px_#22c55e] hover:shadow-[0_0_60px_#22c55e] transform hover:scale-105 transition-all duration-500"
            : "bg-gradient-to-br from-red-400 via-red-500 to-rose-700 shadow-[0_0_40px_#ef4444] hover:shadow-[0_0_60px_#ef4444] transform hover:scale-105 transition-all duration-500"
        }`}
        style={{
          boxShadow: success ? '0 20px 50px rgba(34, 197, 94, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)' : '0 20px 50px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* close */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 transform hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 🐵 Monkey Mascot with 3D Effect */}
        <div className="text-center -mt-14">
          <div className="text-6xl animate-bounce drop-shadow-2xl transform-gpu hover:rotate-y-12 transition-transform duration-300" style={{ transformStyle: 'preserve-3d' }}>
            🐵
          </div>
        </div>

        <h2 className="text-center text-xl font-bold mt-3 drop-shadow-lg">
          {success ? "Success 🎉" : "Failed ❌"}
        </h2>

        <p className="text-center mt-2 text-sm drop-shadow-md">
          {message}
        </p>

        {/* Super Button */}
        <button
          onClick={onClose}
          className={`block mx-auto mt-4 px-8 py-3 rounded-full font-bold text-lg shadow-2xl hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out border-2 active:scale-95 active:translate-y-0 ${
            success
              ? "bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:from-green-400 hover:via-green-500 hover:to-green-600 text-green-900 border-green-300 hover:border-green-400"
              : "bg-gradient-to-r from-red-300 via-red-400 to-red-500 hover:from-red-400 hover:via-red-500 hover:to-red-600 text-red-900 border-red-300 hover:border-red-400"
          }`}
          style={{
            boxShadow: success ? '0 10px 30px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)' : '0 10px 30px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
            transformStyle: 'preserve-3d',
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
