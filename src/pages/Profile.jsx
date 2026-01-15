/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building, Lock, Globe, Target, Save, Upload, 
  Linkedin, Twitter, Instagram, Facebook, Mail, FileText, 
  ShieldCheck, Camera, User, ExternalLink, LogOut, Loader2,
  Youtube, MessageSquare, Users, Briefcase, Moon, Sun
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// --- CONFIG: Platform Data ---
const PLATFORMS_CONFIG = [
  { id: "twitter", label: "Twitter / X", icon: Twitter, placeholder: "@username" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "Profile URL or ID" },
  { id: "instagram", label: "Instagram", icon: Instagram, placeholder: "@username" },
  { id: "youtube", label: "YouTube", icon: Youtube, placeholder: "Channel Name" },
  { id: "facebook", label: "Facebook", icon: Facebook, placeholder: "Page Name/ID" },
];

// --- HELPER: Convert Image to Base64 ---
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// --- SHARED STYLES ---
const inputStyle = "w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 font-medium text-slate-700 dark:text-slate-200 transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600";
const labelStyle = "text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 block ml-1 tracking-wider";

// --- SUB-COMPONENT: PERSONAL INFO FORM ---
const PersonalForm = ({ userData, onUpdateUser }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    bio: '',
    avatar: null,
    personalWebsite: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        jobTitle: userData.jobTitle || '',
        bio: userData.bio || '',
        avatar: userData.avatar || null,
        personalWebsite: userData.personalWebsite || ''
      });
    }
  }, [userData]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Max 2MB allowed");
      try {
        const base64 = await convertFileToBase64(file);
        setFormData(prev => ({ ...prev, avatar: base64 }));
        toast.success("Avatar selected! Click save to apply.");
      } catch (err) {
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); 
      const updatedUser = { ...userData, ...formData };
      if(onUpdateUser) onUpdateUser(updatedUser);
      toast.success("Personal profile saved!");
    } catch (error) {
      toast.error("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Personal Information</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage your personal details and public bio.</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
          <ExternalLink size={14} /> View Public Page
        </button>
      </div>
      <hr className="border-slate-100 dark:border-slate-800" />

      <div className="space-y-6">
        {/* AVATAR UPLOAD */}
        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
           <div className="relative group cursor-pointer w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm">
             <input type="file" accept="image/*" onChange={handleAvatarUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
             {formData.avatar ? (
               <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <User size={32} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500" />
             )}
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
               <Camera size={20} className="text-white" />
             </div>
           </div>
           <div>
             <h4 className="text-sm font-bold text-slate-800 dark:text-white">Profile Picture</h4>
             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">This will be displayed on your team page.</p>
             <label className="mt-3 inline-block px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-sm">
                 Upload New
                 <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
             </label>
           </div>
        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className={inputStyle} 
            />
          </div>
          <div>
            <label className={labelStyle}>Job Title</label>
            <input 
              type="text" 
              value={formData.jobTitle} 
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} 
              className={inputStyle} 
              placeholder="e.g. Head of Marketing"
            />
          </div>
        </div>

        {/* BIO */}
        <div>
            <label className={labelStyle}>About Me (Bio)</label>
            <textarea 
              rows="4" 
              value={formData.bio} 
              onChange={(e) => setFormData({...formData, bio: e.target.value})} 
              className={`${inputStyle} resize-none`} 
              placeholder="Tell us a bit about yourself..."
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 text-right">{formData.bio.length} / 250 Characters</p>
        </div>

        {/* WEBSITE */}
        <div>
            <label className={labelStyle}>Personal Website / Portfolio</label>
            <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                <input 
                  type="text" 
                  value={formData.personalWebsite} 
                  onChange={(e) => setFormData({...formData, personalWebsite: e.target.value})} 
                  className={`${inputStyle} pl-12`} 
                  placeholder="https://..."
                />
            </div>
        </div>

        <div className="flex justify-end pt-4 sticky bottom-0 bg-white dark:bg-slate-900 p-4 border-t border-slate-100 dark:border-slate-800 shadow-lg md:shadow-none md:border-none md:p-0 md:bg-transparent md:static z-20">
            <button onClick={handleSave} disabled={loading} className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 w-full md:w-auto justify-center">
                {loading ? 'Saving...' : <><Save size={18} /> Save Personal Info</>}
            </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: BRAND FORM ---
const BrandForm = ({ userData, onUpdateUser }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    uvp: '',
    targetAudience: '',
    brandTone: 'Professional',
    platforms: [],
    platformIds: {},
    website: '',
    logoPreview: null
  });

  useEffect(() => {
    if (userData) {
      const bp = userData.brandProfile || {};
      setFormData({
        companyName: bp.companyName || userData.companyName || '',
        industry: bp.industry || userData.industry || '',
        uvp: bp.uvp || userData.uvp || '',
        targetAudience: bp.targetAudience || userData.targetAudience || '',
        brandTone: bp.brandTone || userData.brandTone || 'Professional',
        platforms: bp.platforms || userData.platforms || [],
        platformIds: bp.platformIds || userData.platformIds || {},
        website: userData.website || '',
        logoPreview: bp.logoPreview || null,
      });
    }
  }, [userData]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Max 2MB");
      try {
        const base64 = await convertFileToBase64(file);
        setFormData(prev => ({ ...prev, logoPreview: base64 }));
        toast.success("Logo uploaded!");
      } catch (err) { toast.error("Failed"); }
    }
  };

  const togglePlatform = (pId) => {
    setFormData(prev => {
        const current = prev.platforms || [];
        const isSelected = current.includes(pId);
        let newPlatforms;
        let newIds = { ...prev.platformIds };

        if (isSelected) {
            newPlatforms = current.filter(id => id !== pId);
            delete newIds[pId]; 
        } else {
            newPlatforms = [...current, pId];
        }

        return { ...prev, platforms: newPlatforms, platformIds: newIds };
    });
  };

  const handlePlatformIdChange = (id, value) => {
    setFormData(prev => ({
        ...prev,
        platformIds: { ...prev.platformIds, [id]: value }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        website: formData.website,
        brandProfile: {
          companyName: formData.companyName,
          industry: formData.industry,
          uvp: formData.uvp,
          targetAudience: formData.targetAudience,
          brandTone: formData.brandTone,
          logoPreview: formData.logoPreview,
          platforms: formData.platforms,
          platformIds: formData.platformIds
        }
      };
      
      await new Promise(r => setTimeout(r, 800)); 
      
      const updatedUser = { ...userData, ...payload };
      if(onUpdateUser) onUpdateUser(updatedUser);
      
      toast.success("Brand settings updated!");
    } catch (error) { toast.error("Failed to save."); } finally { setLoading(false); }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
      <div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Brand Settings</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">This data is used to generate your custom AI marketing content.</p>
        <hr className="mt-6 border-slate-100 dark:border-slate-800" />
      </div>

      <div className="space-y-8">
        {/* LOGO UPLOAD */}
        <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
           <div className="relative group cursor-pointer w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden hover:border-indigo-500 dark:hover:border-indigo-500 transition-all">
             <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
             {formData.logoPreview ? <img src={formData.logoPreview} alt="Logo" className="w-full h-full object-cover" /> : <Upload className="text-slate-400 group-hover:text-indigo-500" size={24} />}
           </div>
           <div>
             <h4 className="text-sm font-bold text-slate-800 dark:text-white">Brand Logo</h4>
             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Upload a square image (PNG, JPG). Max 2MB.</p>
           </div>
        </div>

        {/* CORE DETAILS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelStyle}>Company Name</label>
                <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                    <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className={`${inputStyle} pl-12`} />
                </div>
            </div>
            <div>
                <label className={labelStyle}>Website URL</label>
                <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                    <input type="text" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className={`${inputStyle} pl-12`} />
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className={labelStyle}>Industry / Niche</label>
                <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                    <input type="text" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} className={`${inputStyle} pl-12`} />
                </div>
            </div>
            <div>
                <label className={labelStyle}>Target Audience</label>
                <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                    <input type="text" value={formData.targetAudience} onChange={(e) => setFormData({...formData, targetAudience: e.target.value})} className={`${inputStyle} pl-12`} />
                </div>
            </div>
        </div>

        {/* BRAND TONE SELECT */}
        <div>
            <label className={labelStyle}>Brand Tone</label>
            <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={18} />
                <select 
                    value={formData.brandTone} 
                    onChange={(e) => setFormData({...formData, brandTone: e.target.value})} 
                    className={`${inputStyle} pl-12 appearance-none cursor-pointer`}
                >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Witty / Humorous</option>
                    <option>Bold / Aggressive</option>
                    <option>Luxury / Elegant</option>
                    <option>Educational</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
        </div>

        {/* UVP */}
        <div>
            <label className={labelStyle}>One Sentence Pitch (UVP)</label>
            <div className="relative">
                <Target className="absolute left-4 top-4 text-slate-400 dark:text-slate-500" size={18} />
                <textarea 
                    rows="2" 
                    value={formData.uvp} 
                    onChange={(e) => setFormData({...formData, uvp: e.target.value})} 
                    className={`${inputStyle} pl-12 resize-none`} 
                    placeholder="What makes your brand unique?"
                />
            </div>
        </div>

        {/* PLATFORMS CONFIGURATION */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Connected Platforms</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {PLATFORMS_CONFIG.map((p) => {
                    const isSelected = formData.platforms.includes(p.id);
                    return (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => togglePlatform(p.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                                isSelected 
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500 dark:ring-indigo-500/50' 
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                <p.icon size={18} />
                            </div>
                            <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-600 dark:text-slate-400'}`}>{p.label}</span>
                        </button>
                    )
                })}
            </div>

            {formData.platforms.length > 0 && (
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in">
                    <h5 className="text-xs font-bold uppercase text-slate-400 mb-2">Account Handles / URLs</h5>
                    {formData.platforms.map(pId => {
                        const platform = PLATFORMS_CONFIG.find(p => p.id === pId);
                        return (
                            <div key={pId}>
                                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">{platform.label}</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <platform.icon size={16} />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder={platform.placeholder}
                                        value={formData.platformIds[pId] || ''} 
                                        onChange={(e) => handlePlatformIdChange(pId, e.target.value)} 
                                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

        <div className="flex justify-end pt-4"><button onClick={handleSave} disabled={loading} className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 w-full md:w-auto justify-center">{loading ? 'Saving...' : <><Save size={18} /> Save Brand Settings</>}</button></div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: SECURITY FORM ---
const SecurityForm = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    if (passwords.new !== passwords.confirm) return toast.error("Passwords mismatch");
    setLoading(true);
    setTimeout(() => { toast.success("Password updated!"); setLoading(false); }, 1000);
  };
  
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6"><Lock className="text-indigo-600 dark:text-indigo-400" size={20} /><h3 className="text-xl font-black text-slate-900 dark:text-white">Security Settings</h3></div>
      <div className="space-y-6">
          <div><label className={labelStyle}>Current Password</label><input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} className={inputStyle} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className={labelStyle}>New Password</label><input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} className={inputStyle} /></div>
              <div><label className={labelStyle}>Confirm</label><input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} className={inputStyle} /></div>
          </div>
          <div className="flex justify-end pt-4"><button onClick={handleUpdate} disabled={loading} className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2">{loading ? 'Updating...' : <><Lock size={18} /> Update Password</>}</button></div>
      </div>
    </div>
  );
};

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('brand');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false); // Local state for toggle

  // Theme Sync Logic
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    checkTheme();
    // Optional: Add event listener if you want real-time sync across tabs
    window.addEventListener('storage', checkTheme);
    return () => window.removeEventListener('storage', checkTheme);
  }, []);

  const toggleTheme = () => {
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      } catch (err) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
        await fetch("http://localhost:5000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        localStorage.removeItem("user");
        navigate("/login");
    } catch (error) {
        toast.error("Logout failed");
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  const displayUser = user || { name: 'User', email: 'user@example.com' };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-black dark:text-white pb-10">
      <Toaster position="top-right" />
      
      {/* Top Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-end mb-3"><span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Profile Completion</span><span className="text-sm font-black text-indigo-600 dark:text-indigo-400">85%</span></div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden"><div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `85%` }} /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-slate-50 dark:bg-slate-950/50 z-0" />
             <div className="relative z-10">
               <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center text-3xl font-black mx-auto shadow-xl shadow-indigo-200 dark:shadow-none mb-4 border-4 border-white dark:border-slate-800 overflow-hidden">
                 {displayUser.avatar ? (
                   <img src={displayUser.avatar} alt="User" className="w-full h-full object-cover" />
                 ) : displayUser.brandProfile?.logoPreview ? (
                   <img src={displayUser.brandProfile.logoPreview} alt="Brand" className="w-full h-full object-cover opacity-80" />
                 ) : (
                   displayUser.name?.substring(0, 1).toUpperCase() || 'U'
                 )}
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white">{displayUser.name || displayUser.companyName}</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-6">{displayUser.email}</p>
             </div>
             <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 mx-auto text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
             >
                <LogOut size={14} /> Sign Out
             </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2">
             <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Settings Menu</h4>
             
             {/* MENU BUTTONS */}
             <button onClick={() => setActiveSection('brand')} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeSection === 'brand' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><Building size={18} className={activeSection === 'brand' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} /><span className="text-sm font-bold">Brand Settings</span></div>
                {activeSection === 'brand' && <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
             </button>

             <button onClick={() => setActiveSection('personal')} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeSection === 'personal' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><User size={18} className={activeSection === 'personal' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} /><span className="text-sm font-bold">Personal Info</span></div>
                {activeSection === 'personal' && <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
             </button>

             <button onClick={() => setActiveSection('password')} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${activeSection === 'password' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><Lock size={18} className={activeSection === 'password' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} /><span className="text-sm font-bold">Security</span></div>
                {activeSection === 'password' && <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />}
             </button>

             {/* Dark Mode Toggle inside Profile Menu */}
             <button onClick={toggleTheme} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400`}>
                <div className="flex items-center gap-3">
                   {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-400" />}
                   <span className="text-sm font-bold">Appearance</span>
                </div>
                <div className="text-xs font-semibold bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                  {isDark ? 'Dark' : 'Light'}
                </div>
             </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm min-h-[600px]">
            {activeSection === 'brand' && <BrandForm userData={displayUser} onUpdateUser={handleUserUpdate} />}
            {activeSection === 'personal' && <PersonalForm userData={displayUser} onUpdateUser={handleUserUpdate} />}
            {activeSection === 'password' && <SecurityForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;