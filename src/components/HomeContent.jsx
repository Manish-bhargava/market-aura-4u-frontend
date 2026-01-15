import React from "react";
// Make sure these paths match where your files actually are!
import Campaigns from "./Campaigns";
import ContentPage from "./ContentPage";
// If Profile is in pages folder:
import Profile from "../pages/Profile"; 
// If Profile is in components folder, use: import Profile from "./Profile";

function HomeContent({ active }) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {active === "campaigns" && (
        <div className="p-6">
          <Campaigns />
        </div>
      )}

      {active === "content" && <ContentPage />}

      {active === "analytics" && (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">Performance metrics coming soon.</p>
        </div>
      )}

      {active === "profile" && (
        <Profile />
      )}

    </main>
  );
}

export default HomeContent;