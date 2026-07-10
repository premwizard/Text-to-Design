/* eslint-disable no-unused-vars, no-empty, no-self-assign */
import React, { useEffect, useState } from 'react';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/profileService';
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.id) {
      profileService.getProfile(user.id)
        .then(data => {
          setProfile(data);
          setFullName(data?.full_name || '');
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching profile", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await profileService.updateProfile(user.id, { full_name: fullName });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-app text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      <TopNav projectName="My Profile" />
      <div className="flex-1 flex overflow-hidden relative z-10">
        <LeftSidebar />
        <div className="flex-1 overflow-y-auto p-8 bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-display font-bold text-white mb-8">Profile Settings</h1>
            
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              </div>
            ) : (
              <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={user?.email || ''}
                      disabled
                      className="w-full bg-zinc-900/30 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-all"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button 
                      type="button"
                      onClick={logout}
                      className="px-6 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-semibold rounded-xl transition-colors"
                    >
                      Sign Out
                    </button>
                    
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
