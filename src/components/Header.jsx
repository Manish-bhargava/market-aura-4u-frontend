import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom"; 

function Header() {
  const navigate = useNavigate();

  // Get user initial safely (Auth Check)
  const user = JSON.parse(localStorage.getItem("user"));
  const userInitial = user?.email?.[0]?.toUpperCase() || "U";

  // LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-slate-950 dark:text-white border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
      {/* CHANGED: justify-between -> justify-end to push content to the right */}
      <div className="flex items-center justify-end px-6 py-4">

        {/* Right: Theme + Profile + Logout */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="flex items-center gap-3">
            {/* PROFILE ICON */}
            <Link to="/profile" title="View Profile">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold hover:bg-blue-700 transition shadow-sm">
                {userInitial}
              </div>
            </Link>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-3 py-2 rounded-md border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;