import React, { useState } from 'react';
import { TopNav } from '../components/layout/TopNav';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { AnimatedBackground } from '../components/layout/AnimatedBackground';

import { SettingsSidebar, SETTINGS_SECTIONS } from '../components/settings/SettingsSidebar';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { AIModelSettings } from '../components/settings/AIModelSettings';
import { GenerationSettings } from '../components/settings/GenerationSettings';
import { EditorSettings } from '../components/settings/EditorSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { ShortcutSettings } from '../components/settings/ShortcutSettings';
import { BillingSettings } from '../components/settings/BillingSettings';
import { DangerZoneSettings } from '../components/settings/DangerZoneSettings';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'ai-models': return <AIModelSettings />;
      case 'generation': return <GenerationSettings />;
      case 'editor': return <EditorSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'shortcuts': return <ShortcutSettings />;
      case 'billing': return <BillingSettings />;
      case 'danger': return <DangerZoneSettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-zinc-100 flex flex-col overflow-hidden font-sans select-none relative">
      <AnimatedBackground />
      <TopNav loading={false} projectName="Settings" />

      <div className="flex-1 flex overflow-hidden relative z-10">
        <LeftSidebar />

        <div className="flex-1 flex flex-col relative overflow-hidden bg-black/20 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <main className="flex-1 overflow-y-auto w-full p-6 lg:p-12 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            
            <div className="max-w-5xl mx-auto">
              
              <div className="mb-10">
                <h1 className="text-3xl font-display font-bold text-white tracking-tight mb-2">
                  Settings
                </h1>
                <p className="text-zinc-400">
                  Manage your account preferences and customize your workspace.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative items-start">
                {/* Sticky Sidebar */}
                <div className="w-full md:w-64 shrink-0 md:sticky md:top-0">
                  <SettingsSidebar 
                    activeSection={activeSection} 
                    onSelect={setActiveSection} 
                  />
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  {renderSection()}
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
