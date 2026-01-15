/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Copy, Check, Twitter, Linkedin, Mail, FileText, Loader2, Save,
  Zap, Upload, Sparkles, Instagram, PenTool, Edit2, Trash2, Eye, Layers, Cloud, MessageSquare
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// --- IMPORTS ---
 // <--- RESTORED HEADER IMPORT

/* =======================
   SUB-COMPONENT: STUDIO VIEW
======================= */
const StudioView = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [imagee, setImagee] = useState("");
  const [editingId, setEditingId] = useState(null);

  const channels = [
    { id: 'insta', name: 'Instagram', icon: <Instagram size={20} className="text-pink-600" /> },
    { id: 'twitter', name: 'Twitter', icon: <Twitter size={20} className="text-sky-500" /> },
    { id: 'blog', name: 'Blog Post', icon: <FileText size={20} className="text-blue-500" /> },
    { id: 'email', name: 'Email', icon: <MessageSquare size={20} className="text-orange-500" /> },
  ];

  const handleOrchestrate = async () => {
    if (!userPrompt) return toast.error("Enter a topic!");
    setImagee("");
    setGeneratedContent(null);
    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3000/api/v1/content/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userPrompt }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      const jobData = json.job.generatedContent;
      if (!jobData) throw new Error("AI data missing");

      const cleanText = (val, type) => {
        if (!val) return "No content generated";
        if (type === "twitter") {
           if (Array.isArray(val)) return val[0]?.text || "No tweet text";
           if (typeof val === 'object') return val.text || JSON.stringify(val);
           return String(val);
        }
        if (type === "insta" && typeof val === "object") return val.caption || "No caption generated";
        if (type === "blog" && typeof val === "object") return `${val.title?.toUpperCase() || 'BLOG POST'}\n\n${val.description || ''}\n\n${val.content || val.body || ''}`;
        if (type === "email" && typeof val === "object") return `SUBJECT: ${val.subject || 'No Subject'}\n\n${val.body || ''}`;
        return String(val);
      };

      setGeneratedContent({
        blog: cleanText(jobData.blog, "blog"),
        twitter: cleanText(jobData.twitter, "twitter"),
        insta: cleanText(jobData.instagram, "insta"),
        email: cleanText(jobData.email, "email"),
      });

      const keyword = encodeURIComponent(userPrompt.split(' ')[0]);
      const timestamp = new Date().getTime();
      const imageUrl = jobData.twitter?.[0]?.image_url || `https://loremflickr.com/1080/1080/${keyword}?random=${timestamp}`;
      setImagee(imageUrl);
      
      toast.success("Content Generated!");
    } catch (err) {
      console.error(err);
      toast.error("Generation Failed / Backend Offline. Using Demo Data.");
      setTimeout(() => {
         setGeneratedContent({
            twitter: "🚀 Launching our new eco-friendly bottle! #Sustainability",
            insta: "Excited to share our journey towards sustainability. 🌿 #EcoFriendly",
            blog: "TITLE: The Future of Packaging\n\nIntro: Sustainability is key...",
            email: "SUBJECT: Big News!\n\nHi Team, we are launching..."
         });
         setImagee(`https://loremflickr.com/1080/1080/${encodeURIComponent(userPrompt.split(' ')[0])}`);
         setIsGenerating(false);
      }, 1500);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentChange = (id, newText) => {
    setGeneratedContent(prev => ({ ...prev, [id]: newText }));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-[1600px] mx-auto text-black dark:text-white transition-colors duration-300">
      
      {/* SECTION 1: STUDIO INPUT */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Zap className="text-yellow-500" size={24} />
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">AI Content Studio</h2>
        </div>
        
        {/* Added dark:bg-slate-900, dark:border-slate-800 */}
        <div className="bg-white dark:bg-slate-900 border flex flex-col md:flex-row gap-6 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm mb-8 transition-colors duration-300">
          <div className="flex-1 flex flex-col gap-4">
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Topic..."
              // Added dark:bg-slate-950, dark:border-slate-800, dark:text-white
              className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-lg min-h-32 outline-none focus:border-blue-500 transition-all resize-none placeholder:text-slate-400 dark:text-white font-medium"
            />
            <div className="relative group cursor-pointer">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => toast.success("Image staged")} accept="image/*" />
              {/* Added dark:bg-slate-950, dark:border-slate-800, dark:hover:bg-slate-800 */}
              <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-slate-800 group-hover:border-blue-200 transition-all">
                <Cloud className="text-slate-400 group-hover:text-blue-500" size={20} />
                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Drop reference images here</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-64 flex flex-col gap-3 justify-center shrink-0">
            <button onClick={handleOrchestrate} disabled={isGenerating} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 hover:bg-blue-700">
              {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} fill="currentColor" />} 
              {isGenerating ? "Thinking..." : "AI Generation"}
            </button>
            {/* Added dark:bg-slate-800 */}
            <button onClick={() => toast.info("Custom Editor Opened")} className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 hover:bg-slate-700">
              <Edit2 size={18} /> Custom Build
            </button>
          </div>
        </div>

        {/* SECTION 2: GENERATED OUTPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((ch) => (
            // Added dark:bg-slate-900, dark:border-slate-800
            <div key={ch.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex flex-col group hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {/* Added dark:bg-slate-800 */}
                  <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">{ch.icon}</div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ch.name}</h4>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditingId(editingId === ch.id ? null : ch.id)} className="p-2 text-slate-300 hover:text-blue-600 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => { navigator.clipboard.writeText(generatedContent?.[ch.id]); toast.success("Copied!"); }} className="p-2 text-slate-300 hover:text-blue-600 transition-all"><Copy size={16} /></button>
                </div>
              </div>
              
              {(ch.id === 'insta' || ch.id === 'twitter') && (imagee || isGenerating) && (
                // Added dark:bg-slate-950, dark:border-slate-800
                <div className="mb-4 rounded-2xl overflow-hidden h-48 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative flex items-center justify-center shrink-0">
                  {isGenerating || !imagee ? <Loader2 className="text-blue-600 animate-spin" size={24}/> : <img src={imagee} alt={ch.name} className="w-full h-full object-cover animate-in fade-in" />}
                </div>
              )}
              
              {/* Added dark:bg-slate-950, dark:border-slate-800 */}
              <div className="flex-1 min-h-[160px] bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 relative overflow-y-auto custom-scrollbar transition-colors">
                {isGenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80">
                        <span className="text-xs font-bold text-slate-400 animate-pulse">Generating copy...</span>
                    </div>
                ) : (
                  editingId === ch.id ? 
                  // Added dark:text-white
                  <textarea value={generatedContent?.[ch.id] || ""} onChange={(e) => handleContentChange(ch.id, e.target.value)} className="w-full h-full bg-transparent text-sm text-slate-600 dark:text-white focus:outline-none resize-none font-medium p-1" autoFocus /> :
                  // Added dark:text-slate-300
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                      {generatedContent?.[ch.id] || <span className="text-slate-300 dark:text-slate-600 italic">Content ready to generate...</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */
const ContentPage = () => {
  return (
    // Added dark:bg-[#0F172A], dark:text-white
    <div className="bg-[#F8FAFC] dark:bg-[#0F172A] min-h-screen font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <Toaster position="top-right" />
      
      {/* 1. RESTORED HEADER */}
      

      {/* 2. Main content container */}
      <div className="p-8 lg:p-12">
         <StudioView />
      </div>
    </div>
  );
};

export default ContentPage;