import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

/* 🌐 Public Pages */
import AuthPage from "./app/page";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/RedSignupPage";

/* 🔐 Protected Pages */
import DashboardPage from "./app/Dashboard/page";
import NotesPage from "./app/notes/Notes";

/* 📄 Public Info Pages */
import AboutPage from "./app/about/About";
import ContactPage from "./app/contact/Contact";

export default function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 🔐 Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />

      {/* 📄 Public Info Pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
