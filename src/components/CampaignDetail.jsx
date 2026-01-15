import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CampaignDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/content/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.data?.find((c) => c._id === id);
        setItem(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
          <p className="text-sm text-gray-500 font-medium">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-600 p-4 rounded-full inline-flex mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Not Found</h2>
          <p className="text-gray-500 mt-2 mb-6">We couldn't locate the campaign details you were looking for.</p>
          <Link
            to="/homepage/campaigns"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { originalContent, generatedContent, platforms, createdAt, status } = item;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 lg:p-10 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- TOP NAVIGATION --- */}
        <nav className="flex items-center justify-between">
          <Link
            to="/homepage/campaigns"
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <span className="bg-white dark:bg-gray-800 p-2 rounded-full border border-gray-200 dark:border-gray-700 mr-2 group-hover:border-blue-200 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </span>
            Back to Campaigns
          </Link>
          
          <div className="flex items-center gap-3">
             <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
              ${status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700'}`}>
              {status || "Completed"}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              ID: {id.slice(-6).toUpperCase()}
            </span>
          </div>
        </nav>

        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Campaign Overview
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Created on {new Date(createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          
          {/* Platform Badges */}
          <div className="flex gap-2">
            {platforms.map(p => (
              <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-medium capitalize">
                {/* Simple dot indicator */}
                <span className={`w-2 h-2 rounded-full ${p === 'twitter' ? 'bg-sky-500' : 'bg-pink-500'}`}></span>
                {p}
              </span>
            ))}
          </div>
        </header>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Input Data & Context */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Original Prompt Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Original Prompt </h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <div className="p-6">
                <p className="text-lg leading-relaxed font-medium text-gray-800 dark:text-gray-200">
                  "{originalContent}"
                </p>
              </div>
            </div>

            {/* Main Generated Image (Hero) */}
            {generatedContent?.imageUrl && (
              <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-black/70 hover:bg-black text-white px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm">
                    Download
                  </button>
                </div>
                <img
                  src={generatedContent.imageUrl}
                  alt="AI Generated Hero"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Primary Asset</p>
                  <p className="text-sm font-medium truncate">generated-image-{id.slice(-4)}.png</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Generated Social Previews */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold">Content Previews</h2>
               <button className="text-sm text-blue-600 font-medium hover:underline">Export All</button>
            </div>

            {/* TWITTER PREVIEW CARDS */}
            {generatedContent?.twitter?.map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 bg-gray-50/50 dark:bg-gray-900/20">
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">X (Twitter) Thread {i + 1}</span>
                </div>

                {/* Content Body */}
                <div className="p-6 md:p-8">
                  {/* Mock Twitter UI */}
                  <div className="flex gap-4">
                    {/* Avatar Mock */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        M
                      </div>
                    </div>
                    
                    {/* Tweet Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white">MarketAura</span>
                        <span className="text-gray-500 text-sm">@marketaura4u · Just now</span>
                      </div>
                      
                      <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap text-[15px] leading-normal">
                        {t.text}
                      </p>

                      {/* Tweet Image Attachment */}
                      {t.image_url && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            src={t.image_url}
                            alt="Tweet media"
                            className="w-full h-auto max-h-[400px] object-cover"
                          />
                        </div>
                      )}

                      {/* Mock Engagement Icons */}
                      <div className="flex items-center justify-between text-gray-500 pt-2 max-w-md">
                        <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer group">
                          <svg className="w-5 h-5 group-hover:bg-blue-50 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                          <span className="text-xs">Reply</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer group">
                           <svg className="w-5 h-5 group-hover:bg-green-50 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                           <span className="text-xs">Repost</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-pink-500 cursor-pointer group">
                           <svg className="w-5 h-5 group-hover:bg-pink-50 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                           <span className="text-xs">Like</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;