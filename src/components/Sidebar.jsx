import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection
import logo from "/logo.png"; 
import { 
  LayoutDashboard,
  Megaphone, 
  FileText, 
  BarChart2, 
  ChevronLeft, 
  ChevronRight,
  UserCircle,
  Moon,
  Sun,
  LogOut
} from "lucide-react";

function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // --- Theme Logic ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (e) => {
    e.stopPropagation(); // Prevent bubbling if needed
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // --- Logout Logic ---
  const handleLogout = async (e) => {
    e.stopPropagation();
    try {
        // Optional: Call API to invalidate session
        await fetch("http://localhost:5000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        // Always clear local storage and redirect
        localStorage.removeItem("user");
        navigate("/login");
    }
  };

  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "campaigns", label: "Campaigns", icon: Megaphone },
    { id: "content", label: "Content Hub", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  return (
    <aside 
      className={`flex-shrink-0 relative h-full bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-20 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      
      {/* Toggle Button (Sidebar Collapse) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 rounded-full p-1.5 shadow-lg transition-colors cursor-pointer flex items-center justify-center"
        style={{ width: "26px", height: "26px" }} 
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo */}
      <div className={`h-20 flex-shrink-0 flex items-center ${isCollapsed ? "justify-center" : "px-6 gap-3"}`}>
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-8 object-contain"
        />
        <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
          <span className="font-bold text-lg text-slate-900 dark:text-white whitespace-nowrap">
            AI-Marketing
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative
              ${
                active === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }
              ${isCollapsed ? "justify-center" : "justify-start"}
            `}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${!isCollapsed && "mr-3"}`} />
            
            <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </div>

            {isCollapsed && (
              <div className="absolute left-14 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-md">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Section: Profile + Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-800 mt-auto flex-shrink-0 space-y-3">
        
        {/* Profile Button */}
        <button
          onClick={() => setActive("profile")}
          className={`w-full flex items-center rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 p-2
            ${active === "profile" ? "bg-slate-100 dark:bg-slate-800" : ""}
            ${isCollapsed ? "justify-center" : "justify-start gap-3"}
          `}
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <UserCircle size={20} />
          </div>

          <div className={`text-left overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}`}>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
              My Profile
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Manage Account
            </p>
          </div>
        </button>

        {/* Action Row: Theme & Logout */}
        <div className={`flex items-center gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex-1 flex items-center justify-center p-2 rounded-lg border transition-all duration-200
              ${isDark 
                ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700" 
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }
            `}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
             {!isCollapsed && <span className="ml-2 text-xs font-semibold">{isDark ? "Light" : "Dark"}</span>}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center p-2 rounded-lg border border-transparent text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            title="Sign Out"
          >
            <LogOut size={18} />
            {!isCollapsed && <span className="ml-2 text-xs font-semibold">Logout</span>}
          </button>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;