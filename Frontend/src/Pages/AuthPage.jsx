import React from "react";

export default function AuthPage({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#D4DE95]/20 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        {children}
      </div>
    </div>
  );
}
