import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import './app.css'
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingGuard from "./routes/OnboardingGuard";
import CampaignDetail from "./components/CampaignDetail";
import ContentPage from "./components/ContentPage"; // <--- CHANGE 1: Import added

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Onboarding */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* App (only after onboarding) */}
        <Route
          path="/homepage"
          element={
            <OnboardingGuard>
              <HomePage />
            </OnboardingGuard>
          }
        />

        {/* <--- CHANGE 2: Added Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <OnboardingGuard>
              <ContentPage />
            </OnboardingGuard>
          }
        />

        <Route
          path="/profile"
          element={
          <OnboardingGuard>
            <Profile />
          </OnboardingGuard>
          }
        />

         <Route path="/campaign/:id" element={<CampaignDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;