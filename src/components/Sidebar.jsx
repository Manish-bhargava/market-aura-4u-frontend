import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/homepage" },
    { label: "Campaigns", path: "/homepage/campaigns" },
    { label: "Content Hub", path: "/homepage/content" },
    { label: "Analytics", path: "/homepage/analytics" },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col">
      
      {/* Logo */}
      <div className="h-16 px-6 flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-9 w-auto" />
        <span className="font-semibold text-lg text-black dark:text-white">
          AI-Marketing
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/homepage" &&
              location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
