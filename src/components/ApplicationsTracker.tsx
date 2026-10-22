import React, { useState } from 'react';
import {
  Bookmark,
  ExternalLink,
  Search,
  Trash2,
  MessageSquare,
} from 'lucide-react';
import { ApplicationRecord, ApplicationStatus, JobVacancy } from '../types';

interface ApplicationsTrackerProps {
  jobs: JobVacancy[];
  applications: Record<string, ApplicationRecord>;
  onUpdateStatus: (jobId: string, status: ApplicationStatus) => void;
  onUpdateNotes: (jobId: string, notes: string) => void;
  onRemoveRecord: (jobId: string) => void;
  onNavigateToJobs: () => void;
}

export const ApplicationsTracker: React.FC<ApplicationsTrackerProps> = ({
  jobs,
  applications,
  onUpdateStatus,
  onUpdateNotes,
  onRemoveRecord,
  onNavigateToJobs,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ApplicationStatus>('all');
  const [editingNotesJobId, setEditingNotesJobId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const activeRecords = Object.values(applications)
    .filter((record) => record.status !== 'archived')
    .map((record) => {
      const job = jobs.find((j) => j.id === record.jobId);
      return {
        record,
        job,
      };
    })
    .filter((item): item is { record: ApplicationRecord; job: JobVacancy } => item.job !== undefined);

  const counts = {
    all: activeRecords.length,
    saved: activeRecords.filter((r) => r.record.status === 'saved').length,
    pending: activeRecords.filter((r) => r.record.status === 'pending').length,
    applied: activeRecords.filter((r) => r.record.status === 'applied').length,
    interviewing: activeRecords.filter((r) => r.record.status === 'interviewing').length,
    offered: activeRecords.filter((r) => r.record.status === 'offered').length,
  };

  const filteredRecords = activeRecords.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.record.status === activeFilter;
  });

  const startEditNotes = (jobId: string, currentNotes: string = '') => {
    setEditingNotesJobId(jobId);
    setNotesDraft(currentNotes);
  };

  const saveNotes = (jobId: string) => {
    onUpdateNotes(jobId, notesDraft);
    setEditingNotesJobId(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          <span>Step 4 · Application Pipeline & Real Bookmarks</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-950">
              Saved Jobs & Application Tracker
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Track bookmarks, log application statuses from Pending to Interviewing, record interview notes,
              and open original vacancy applications.
            </p>
          </div>

          <button
            onClick={onNavigateToJobs}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shrink-0 shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-teal-600" />
            <span>Search Live Vacancies</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Bar in Navy, Cream, Teal & Mint */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Total Bookmarked</div>
          <div className="text-xl font-extrabold text-navy-950 font-mono tabular-nums mt-1">
            {counts.all}
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Pending Review</div>
          <div className="text-xl font-bold text-slate-800 font-mono tabular-nums mt-1">
            {counts.pending}
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Submitted / Applied</div>
          <div className="text-xl font-bold text-teal-700 font-mono tabular-nums mt-1">
            {counts.applied}
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Interviewing</div>
          <div className="text-xl font-bold text-teal-800 font-mono tabular-nums mt-1">
            {counts.interviewing}
          </div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Offers Received</div>
          <div className="text-xl font-bold text-mint-700 font-mono tabular-nums mt-1">
            {counts.offered}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold">
        {[
          { key: 'all', label: 'All Jobs', count: counts.all },
          { key: 'saved', label: 'Saved Bookmarks', count: counts.saved },
          { key: 'pending', label: 'Pending Application', count: counts.pending },
          { key: 'applied', label: 'Applied', count: counts.applied },
          { key: 'interviewing', label: 'Interviewing', count: counts.interviewing },
          { key: 'offered', label: 'Offers', count: counts.offered },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeFilter === tab.key
                ? 'bg-white text-navy-950 shadow-2xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-navy-950'
            }`}
          >
            <span>{tab.label}</span>
            <span className="font-mono text-[11px] tabular-nums text-slate-400 font-normal">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Job Records List */}
      <div className="space-y-4">
        {activeRecords.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-14 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto ring-4 ring-teal-50/50">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-navy-950">No Saved Applications Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                You haven't bookmarked any jobs yet. As you browse real live listings in Step 2, click the Bookmark icon on any vacancy to track your pipeline, log contact dates, and manage your job hunt.
              </p>
            </div>
            <button
              onClick={onNavigateToJobs}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-all shadow-xs border border-teal-700/50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore Live Vacancies</span>
            </button>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3 shadow-xs">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-navy-950">No applications under "{activeFilter}"</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You have {counts.all} saved jobs total. Switch back to "All Jobs" to view your complete application queue.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-2xs"
            >
              Show All Saved Jobs
            </button>
          </div>
        ) : (
          filteredRecords.map(({ record, job }) => (
            <article
              key={job.id}
              className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 space-y-4 hover:border-teal-400 transition-colors shadow-xs"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-navy-950">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="font-bold text-navy-950">{job.company}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{job.location}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-mono tabular-nums">{job.salary}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>Deadline: <span className="font-mono tabular-nums text-teal-800 font-bold">{job.deadline}</span></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={record.status}
                    onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-800"
                  >
                    <option value="saved">Saved Bookmark</option>
                    <option value="pending">Pending Application</option>
                    <option value="applied">Applied (Submitted)</option>
                    <option value="interviewing">Interview Scheduled</option>
                    <option value="offered">Offer Received</option>
                  </select>

                  <button
                    onClick={() => onRemoveRecord(job.id)}
                    className="text-slate-400 hover:text-red-700 p-1.5 transition-colors"
                    title="Remove from tracker"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes Area */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-md p-3 text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-500">
                  <span className="font-bold flex items-center gap-1.5 text-navy-950">
                    <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                    <span>Application Notes & Follow-up log</span>
                  </span>
                  {editingNotesJobId !== job.id && (
                    <button
                      onClick={() => startEditNotes(job.id, record.notes)}
                      className="text-teal-700 hover:text-teal-900 font-bold underline"
                    >
                      {record.notes ? 'Edit Notes' : 'Add Note'}
                    </button>
                  )}
                </div>

                {editingNotesJobId === job.id ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={2}
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      placeholder="e.g. Applied via portal on Oct 21. Contacted recruiter on LinkedIn..."
                      className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNotesJobId(null)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveNotes(job.id)}
                        className="px-3 py-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded shadow-2xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-700 italic">
                    {record.notes || 'No private notes added yet. Record follow-up dates or contact details.'}
                  </p>
                )}
              </div>

              {/* Action Buttons: REMOVED "Open Tailored CV" button per user request */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 font-medium">
                  {record.appliedDate && (
                    <span>Last updated: <span className="font-mono tabular-nums font-semibold">{record.appliedDate}</span></span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 border border-teal-700/50 rounded-md transition-colors shadow-2xs"
                  >
                    <span>Open Real Vacancy Page</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-100" />
                  </a>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
