import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";

/* Pages */
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";

/* Components (used inside HomePage <Outlet />) */
import Campaigns from "./components/Campaigns";
import ContentPage from "./components/ContentPage";
import CampaignDetail from "./components/CampaignDetail";

/* Route Guards */
import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingGuard from "./routes/OnboardingGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------------- PUBLIC ---------------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------------- ONBOARDING ---------------- */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* ---------------- MAIN APP (SIDEBAR + OUTLET) ---------------- */}
        <Route
          path="/homepage"
          element={
            <OnboardingGuard>
              <HomePage />
            </OnboardingGuard>
          }
        >
          {/* 👇 RENDERED INSIDE <Outlet /> */}
          <Route
            index
            element={
              <div className="p-6">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <p className="text-gray-500">
                  Welcome to your AI-powered marketing workspace.
                </p>
              </div>
            }
          />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="content" element={<ContentPage />} />
          <Route
            path="analytics"
            element={
              <div className="p-6">
                <h2 className="text-xl font-bold">Analytics</h2>
                <p className="text-gray-500">Coming soon…</p>
              </div>
            }
          />
        </Route>

        {/* ---------------- CAMPAIGN DETAIL (FULL PAGE) ---------------- */}
        <Route
          path="/campaign/:id"
          element={
            <OnboardingGuard>
              <CampaignDetail />
            </OnboardingGuard>
          }
        />

        {/* ---------------- PROFILE ---------------- */}
        <Route
          path="/profile"
          element={
            <OnboardingGuard>
              <Profile />
            </OnboardingGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
