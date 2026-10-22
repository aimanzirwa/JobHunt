import React from 'react';
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  X,
} from 'lucide-react';
import { ApplicationRecord, ApplicationStatus, JobSeekerProfile, JobVacancy } from '../types';
import { calculateMatch } from '../data/mockData';

interface JobDetailsModalProps {
  job: JobVacancy | null;
  profile: JobSeekerProfile;
  applicationRecord?: ApplicationRecord;
  onClose: () => void;
  onToggleSave: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: ApplicationStatus) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  profile,
  applicationRecord,
  onClose,
  onToggleSave,
  onUpdateStatus,
}) => {
  if (!job) return null;

  const match = calculateMatch(profile, job);
  const isSaved = applicationRecord !== undefined;
  const status = applicationRecord?.status || 'saved';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6 sm:p-8 space-y-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold">
              Vacancy Details · {job.department}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-navy-950">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-navy-950">{job.company}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{job.location}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-teal-800 font-bold">{job.jobType}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono tabular-nums text-slate-700 font-medium">{job.salary}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-navy-950 rounded-md transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Compatibility Bar with Teal/Mint Pop */}
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy-950">Candidate Match Analysis</span>
            <span className="font-mono tabular-nums font-extrabold text-teal-700 text-sm">
              {match.score}% Alignment
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${match.score}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
            <div>
              <span className="text-slate-500">Profile matches: </span>
              <span className="text-teal-900 font-bold bg-mint-50 px-1 rounded border border-mint-200">
                {match.matchedSkills.length > 0 ? match.matchedSkills.join(', ') : 'None yet'}
              </span>
            </div>
            {match.missingSkills.length > 0 && (
              <div>
                <span className="text-slate-500">Additional requirements: </span>
                <span className="text-slate-600">{match.missingSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Job Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold tracking-wider uppercase text-navy-950 font-mono">
            About the Role
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Required Qualifications List */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold tracking-wider uppercase text-navy-950 font-mono">
            Required Qualifications
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {job.requiredQualifications.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-teal-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deadline & Contact in soft slate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-200 rounded-md p-3.5">
          <div>
            <div className="text-slate-500 font-semibold">Application Deadline</div>
            <div className="text-teal-800 font-mono tabular-nums mt-0.5 font-bold">
              {job.deadline}
            </div>
          </div>
          <div>
            <div className="text-slate-500 font-semibold">HR & Recruitment Contact</div>
            <div className="text-slate-900 mt-0.5 font-mono text-[11px] truncate font-medium">
              {job.contactEmail}
            </div>
          </div>
        </div>

        {/* Footer Actions: REMOVED "Tailor CV & Preview" button per user request */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md border font-semibold transition-colors ${
                isSaved
                  ? 'border-teal-700 bg-teal-600 text-white shadow-2xs'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-teal-500'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved in Tracker' : 'Bookmark Job'}</span>
            </button>

            {isSaved && (
              <select
                value={status}
                onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
                className="px-2.5 py-2 bg-slate-50 border border-slate-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-800"
              >
                <option value="saved">Status: Saved</option>
                <option value="pending">Status: Pending</option>
                <option value="applied">Status: Applied</option>
                <option value="interviewing">Status: Interviewing</option>
                <option value="offered">Status: Offer</option>
              </select>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white bg-teal-600 hover:bg-teal-700 border border-teal-700/50 rounded-md font-bold transition-all shadow-xs"
            >
              <span>Open Real Vacancy Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-100" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
