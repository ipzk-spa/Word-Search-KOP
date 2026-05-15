import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import StartPage from "../pages/StartPage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import GamePage from "../pages/GamePage.jsx";
import ResultsPage from "../pages/ResultsPage.jsx";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage.jsx";

import { useUserStore } from "../store/user.store.js";

export default function AppRouter() {
  const userId = useUserStore((s) => s.userId);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/user/${userId || "guest"}/start`} replace />}
      />

      <Route path="/privacy" element={<PrivacyPolicyPage />} />

      <Route element={<AppLayout />}>
        <Route path="/user/:userId/start" element={<StartPage />} />
        <Route path="/user/:userId/settings" element={<SettingsPage />} />
        <Route path="/user/:userId/game" element={<GamePage />} />
        <Route path="/user/:userId/results" element={<ResultsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
