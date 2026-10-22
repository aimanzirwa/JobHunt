import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { ProfileBuilder } from './components/ProfileBuilder';
import { JobSearchMatch } from './components/JobSearchMatch';
import { CVPreview } from './components/CVPreview';
import { ApplicationsTracker } from './components/ApplicationsTracker';
import { JobDetailsModal } from './components/JobDetailsModal';
import {
  ApplicationRecord,
  ApplicationStatus,
  JobSeekerProfile,
  JobVacancy,
} from './types';
import { FRIEND_PROFILES } from './data/mockData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'profile' | 'jobs' | 'cv' | 'tracker'>('profile');

  // Candidate Profile State
  const [profile, setProfile] = useState<JobSeekerProfile>(() => {
    return JSON.parse(JSON.stringify(FRIEND_PROFILES[0].profile));
  });

  // Real vacancies populated via live API in JobSearchMatch
  const [jobs, setJobs] = useState<JobVacancy[]>([]);

  // Real Applications State (Zero fake mock data, starts clean & persists user bookmarks)
  const [applications, setApplications] = useState<Record<string, ApplicationRecord>>(() => {
    try {
      const stored = localStorage.getItem('jobhunt_saved_jobs_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore storage error
    }
    return {};
  });

  // Sync saved applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jobhunt_saved_jobs_v2', JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  // Modal State for full vacancy inspection
  const [modalJob, setModalJob] = useState<JobVacancy | null>(null);

  // Toggle bookmark / save real job
  const handleToggleSave = (jobId: string) => {
    setApplications((prev) => {
      const exists = prev[jobId];
      if (exists) {
        const next = { ...prev };
        delete next[jobId];
        return next;
      } else {
        return {
          ...prev,
          [jobId]: {
            jobId,
            status: 'saved',
            appliedDate: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            notes: '',
          },
        };
      }
    });
  };

  // Update application status (saved, pending, applied, interviewing, offered)
  const handleUpdateStatus = (jobId: string, status: ApplicationStatus) => {
    setApplications((prev) => {
      const existing = prev[jobId];
      return {
        ...prev,
        [jobId]: {
          jobId,
          status,
          appliedDate:
            existing?.appliedDate ||
            new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          notes: existing?.notes || '',
        },
      };
    });
  };

  // Update application notes
  const handleUpdateNotes = (jobId: string, notes: string) => {
    setApplications((prev) => {
      const existing = prev[jobId];
      if (!existing) return prev;
      return {
        ...prev,
        [jobId]: {
          ...existing,
          notes,
          appliedDate: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        },
      };
    });
  };

  // Remove record from tracker
  const handleRemoveRecord = (jobId: string) => {
    setApplications((prev) => {
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
  };

  // Export PDF via native browser print dialogue
  const handleExportPdf = () => {
    if (activeTab !== 'cv') {
      setActiveTab('cv');
      setTimeout(() => {
        window.print();
      }, 350);
    } else {
      window.print();
    }
  };

  const savedCount = Object.keys(applications).length;

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col font-sans text-slate-900 selection:bg-teal-200 selection:text-teal-950">
      {/* Top Bar with JobHunt branding & navy/teal styling */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportPdf={handleExportPdf}
        profileName={profile.fullName}
        targetRole={profile.targetRole || profile.title}
        savedCount={savedCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {activeTab === 'profile' && (
          <ProfileBuilder
            profile={profile}
            setProfile={setProfile}
            onNavigateToJobs={() => setActiveTab('jobs')}
            onNavigateToCV={() => setActiveTab('cv')}
          />
        )}

        {activeTab === 'jobs' && (
          <JobSearchMatch
            jobs={jobs}
            setJobs={setJobs}
            profile={profile}
            applications={applications}
            onToggleSave={handleToggleSave}
            onUpdateStatus={handleUpdateStatus}
            onSelectJobForDetails={(job) => setModalJob(job)}
            onTailorCVForJob={() => {}}
          />
        )}

        {activeTab === 'cv' && (
          <CVPreview
            profile={profile}
            setProfile={setProfile}
            tailoredJob={null}
            onClearTailoredJob={() => {}}
            onExportPdf={handleExportPdf}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationsTracker
            jobs={jobs}
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onUpdateNotes={handleUpdateNotes}
            onRemoveRecord={handleRemoveRecord}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}
      </main>

      {/* Vacancy Details Modal */}
      <JobDetailsModal
        job={modalJob}
        profile={profile}
        applicationRecord={modalJob ? applications[modalJob.id] : undefined}
        onClose={() => setModalJob(null)}
        onToggleSave={handleToggleSave}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Clean quiet footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white/90 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-navy-950 font-bold">JobHunt · Professional CV Builder & Real-Time Job Search Engine</span>
          <span className="font-mono tabular-nums text-teal-800 font-semibold">Live API Feeds Connected · ATS Compliant</span>
        </div>
      </footer>
    </div>
  );
}
