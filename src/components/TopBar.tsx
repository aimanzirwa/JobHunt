import React from 'react';
import { Printer } from 'lucide-react';

interface TopBarProps {
  activeTab: 'profile' | 'jobs' | 'cv' | 'tracker';
  setActiveTab: (tab: 'profile' | 'jobs' | 'cv' | 'tracker') => void;
  onExportPdf: () => void;
  profileName: string;
  targetRole: string;
  savedCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onExportPdf,
  savedCount,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark: JobHunt (navy with teal pop) */}
        <button
          onClick={() => setActiveTab('profile')}
          className="text-xl font-extrabold tracking-tight text-navy-950 hover:text-navy-800 transition-colors whitespace-nowrap shrink-0 text-left focus:outline-none flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-teal-300 inline-block" />
          <span>JobHunt</span>
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'profile'
                ? 'text-navy-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            1. Job Seeker Profile
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'jobs'
                ? 'text-navy-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            2. Search & Match Jobs
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
              activeTab === 'cv'
                ? 'text-navy-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            3. Personalized CV
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'text-navy-950 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600'
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            <span>4. Saved & Applied</span>
            {savedCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-teal-900 bg-mint-100 border border-mint-300 font-bold px-1.5 py-0.2 rounded">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action in pop teal */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExportPdf}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] rounded-md transition-all whitespace-nowrap shrink-0 shadow-xs border border-teal-700/50"
            title="Export clean PDF resume via browser print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export CV as PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-white px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-2 py-1 rounded ${activeTab === 'profile' ? 'font-bold text-navy-950 bg-teal-50' : 'text-slate-600'}`}
        >
          1. Profile
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-2 py-1 rounded ${activeTab === 'jobs' ? 'font-bold text-navy-950 bg-teal-50' : 'text-slate-600'}`}
        >
          2. Jobs
        </button>
        <button
          onClick={() => setActiveTab('cv')}
          className={`px-2 py-1 rounded ${activeTab === 'cv' ? 'font-bold text-navy-950 bg-teal-50' : 'text-slate-600'}`}
        >
          3. CV
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-2 py-1 rounded ${activeTab === 'tracker' ? 'font-bold text-navy-950 bg-teal-50' : 'text-slate-600'}`}
        >
          4. Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
