import { Navigate } from "react-router-dom";

const OnboardingGuard = ({ children }) => {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ FIXED FIELD NAME
  if (user.isOnboarded !== true) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default OnboardingGuard;
