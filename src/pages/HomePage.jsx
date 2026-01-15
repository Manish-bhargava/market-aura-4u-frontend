import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HomeContent from "../components/HomeContent";

function HomePage() {
  const [active, setActive] = useState("campaigns");

  return (
    // CRITICAL FIX: w-screen and overflow-hidden locks the layout
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-slate-900 text-black dark:text-white">
      
      {/* Sidebar is fixed width and will not shrink */}
      <Sidebar active={active} setActive={setActive} />

      {/* Main content takes remaining space */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HomeContent active={active} />
      </div>

    </div>
  );
}

export default HomePage;