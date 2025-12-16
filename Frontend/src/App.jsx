import React from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import AuthPage from "./app/page"               // HOME
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/RedSignupPage"
import DashboardPage from "./app/Dashboard/page"
import PlatformPage from "./app/platform/page"

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
        path="/platform"
        element={
          <ProtectedRoute>
            <PlatformPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
