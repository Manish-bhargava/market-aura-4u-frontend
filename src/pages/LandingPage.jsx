import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Bell,
  ArrowUpRight,
  LayoutGrid,
  Zap,
  MessageSquare,
  User,
} from "lucide-react";

// Import your components
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";
import demoVideo from "../assets/sample.mp4";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* ==================== 1. HEADER (Custom Design + Links) ==================== */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Text Logo */}
        <div className="flex items-center text-2xl tracking-tighter cursor-pointer">
          <span className="font-black text-blue-600">MARKET</span>
          <span className="font-bold text-slate-900 dark:text-white ml-1">
            AURA4U
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-500 dark:text-slate-400">
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            FEATURES
          </a>
          <a
            href="#pricing"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            PRICING
          </a>
          <a
            href="#resources"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            RESOURCES
          </a>
        </div>

        {/* Right Side: CTA + Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {/* LINKING: Navigates to Dashboard */}
          <Link
            to="/HomePage"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition transform hover:-translate-y-0.5"
          >
            GET STARTED
          </Link>

          {/* Theme Toggle (Placed on the right) */}
          <ThemeToggle />
        </div>
      </nav>

      {/* ==================== 2. HERO SECTION (Custom Design + Links) ==================== */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase">
              The Future of B2B Marketing
            </span>
          </div>

          <h2 className="text-2xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.12] mb-6">
            Transform Your <br />
            <span className="text-blue-600">Marketing</span> <br />
            with AI
          </h2>

          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
            Aura is the B2B SaaS AI-powered Content Operations Platform designed
            to streamline your content workflows.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* LINKING: Main Hero CTA */}
            <Link
              to="/dashboard"
              className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-xl hover:bg-slate-800 dark:hover:bg-slate-700 transition flex items-center justify-center"
            >
              START STRATEGY
            </Link>

            <a
              href="#features"
              className="bg-white dark:bg-transparent text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-slate-50 dark:hover:bg-slate-900 transition shadow-sm flex items-center justify-center"
            >
              VIEW FEATURES
            </a>
          </div>
        </div>

        {/* Right Side: Phone Mockup (CSS Only) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-slate-900">
            <div className="bg-white w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col relative font-sans">
              {/* Phone Header */}
              <div className="p-6 pt-10 flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">
                    Welcome Back
                  </p>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Alex Rivera
                  </h3>
                </div>
                <div className="p-2 bg-slate-50 rounded-full border border-slate-100">
                  <Bell className="w-5 h-5 text-slate-600" />
                </div>
              </div>

              {/* Phone Body */}
              <div className="px-6 space-y-5 flex-1">
                <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/30 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold opacity-80 uppercase tracking-wider">
                        Efficiency Score
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-black italic tracking-tighter">
                        98.4
                      </span>
                      <div className="bg-white/20 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                        +4.2% <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-10 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
                </div>

                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">
                    Active Campaigns
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                      <span className="font-bold text-slate-800 text-sm">
                        LinkedIn Ads
                      </span>
                      <span className="text-green-500 font-bold text-xs bg-green-50 px-2 py-1 rounded-full">
                        +18%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 text-sm">
                        Email Funnel
                      </span>
                      <span className="text-blue-500 font-bold text-xs bg-blue-50 px-2 py-1 rounded-full">
                        +11%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-100 rounded-3xl p-4 flex flex-col justify-center items-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Avg. CTR
                    </p>
                    <span className="text-2xl font-black text-blue-600">
                      14.2%
                    </span>
                  </div>
                  <div className="border border-slate-100 rounded-3xl p-4 flex flex-col justify-center items-center shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      AI Saved
                    </p>
                    <span className="text-2xl font-black text-purple-600">
                      24h
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Dock */}
              <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-4 pb-2">
                <LayoutGrid className="w-6 h-6 text-blue-600" />
                <Zap className="w-6 h-6 text-slate-300" />
                <div className="bg-slate-900 rounded-xl p-3 -mt-8 shadow-lg shadow-slate-900/30 transform rotate-12 hover:rotate-0 transition">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <MessageSquare className="w-6 h-6 text-slate-300" />
                <User className="w-6 h-6 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. FEATURES SECTION ==================== */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-blue-400">
          What You Can Do With AI Marketing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition bg-white dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2">Generate Campaigns</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instantly create high-performing ad copies and creatives using AI.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition bg-white dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2">Launch in One Click</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deploy campaigns across platforms with a single click.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg transition bg-white dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold mb-2">
              Optimize Automatically
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI continuously improves performance to maximize ROI.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 4. DEMO VIDEO ==================== */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
            See AI Marketing in Action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Watch how campaigns are generated, launched, and optimized in
            seconds.
          </p>

          <div className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800 bg-black">
            <video
              className="w-full h-full object-cover"
              src={demoVideo}
              controls
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* ==================== 5. PRICING ==================== */}
      <section id="pricing" className="bg-slate-50 dark:bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Choose a plan that fits your growth stage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
              <h3 className="text-lg font-semibold mb-2">Starter</h3>
              <p className="text-3xl font-bold mb-4">₹0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Perfect for individuals & testing AI marketing.
              </p>
              <ul className="text-sm space-y-2 mb-6 text-left pl-4">
                <li>✔ AI Campaign Generator</li>
                <li>✔ Limited Launches</li>
                <li>✔ Basic Analytics</li>
              </ul>
              {/* LINKING */}
              <Link
                to="/dashboard"
                className="block w-full text-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-lg border-2 border-blue-500 bg-white dark:bg-slate-900/30 scale-105 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">
                ₹999<span className="text-sm font-medium">/mo</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Best for startups and growing teams.
              </p>
              <ul className="text-sm space-y-2 mb-6 text-left pl-4">
                <li>✔ Unlimited Campaigns</li>
                <li>✔ One-Click Launch</li>
                <li>✔ Advanced Analytics</li>
                <li>✔ Priority Support</li>
              </ul>
              {/* LINKING */}
              <Link
                to="/dashboard"
                className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Start Pro
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">Custom</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Tailored solutions for large organizations.
              </p>
              <ul className="text-sm space-y-2 mb-6 text-left pl-4">
                <li>✔ Custom AI Models</li>
                <li>✔ Dedicated Manager</li>
                <li>✔ SLA & Security</li>
              </ul>
              <button className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. FINAL CTA ==================== */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-blue-400">
          Start Marketing Smarter Today
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Let AI handle your campaigns while you focus on growth.
        </p>
        {/* LINKING */}
        <Link
          to="/dashboard"
          className="inline-block px-8 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Try It Free
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
