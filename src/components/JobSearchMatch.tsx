import React, { useState, useEffect, useMemo } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Search,
  RefreshCw,
} from 'lucide-react';
import {
  ApplicationRecord,
  ApplicationStatus,
  JobSeekerProfile,
  JobVacancy,
} from '../types';
import { calculateMatch, CITIES_LIST, JOB_ROLES_PRESETS } from '../data/mockData';
import { fetchLiveJobs } from '../services/jobsApi';

interface JobSearchMatchProps {
  jobs: JobVacancy[];
  setJobs: React.Dispatch<React.SetStateAction<JobVacancy[]>>;
  profile: JobSeekerProfile;
  applications: Record<string, ApplicationRecord>;
  onToggleSave: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: ApplicationStatus) => void;
  onSelectJobForDetails: (job: JobVacancy) => void;
  onTailorCVForJob: (job: JobVacancy) => void;
}

export const JobSearchMatch: React.FC<JobSearchMatchProps> = ({
  jobs,
  setJobs,
  profile,
  applications,
  onToggleSave,
  onUpdateStatus,
  onSelectJobForDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedExperience, setSelectedExperience] = useState('All Levels');
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'recent'>('match');
  const [onlySaved, setOnlySaved] = useState(false);

  // Live API States
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiSourceLabel, setApiSourceLabel] = useState('Remotive Global API (Live)');

  const loadLiveJobs = async (query: string = '') => {
    setIsLoadingApi(true);
    try {
      const res = await fetchLiveJobs(query);
      setJobs(res.jobs);
      setApiSourceLabel(res.source);
    } catch (err) {
      console.error('Error fetching live jobs:', err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  useEffect(() => {
    loadLiveJobs();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLiveJobs(searchQuery);
  };

  const handlePresetClick = (role: string) => {
    const q = role === 'All Roles' ? '' : role;
    setSearchQuery(q);
    loadLiveJobs(q);
  };

  const processedJobs = useMemo(() => {
    return jobs
      .map((job) => {
        const matchInfo = calculateMatch(profile, job);
        const appRecord = applications[job.id];
        return {
          ...job,
          match: matchInfo,
          isSaved: Boolean(appRecord?.status && appRecord.status !== 'archived'),
          status: appRecord?.status || 'saved',
        };
      })
      .filter((job) => {
        if (selectedLocation !== 'All Locations') {
          const locTarget = selectedLocation.toLowerCase().split(',')[0].trim();
          const jobLoc = job.location.toLowerCase();
          if (locTarget.includes('remote')) {
            if (!jobLoc.includes('remote') && job.jobType !== 'Remote') {
              return false;
            }
          } else {
            // Match specific Pakistani city OR remote vacancy available in Pakistan
            const matchesCity = jobLoc.includes(locTarget);
            const isRemote = jobLoc.includes('remote');
            if (!matchesCity && !isRemote) {
              return false;
            }
          }
        }

        if (selectedExperience !== 'All Levels') {
          if (job.experienceLevel !== selectedExperience) return false;
        }

        if (onlySaved) {
          const isBookmarked = applications[job.id] !== undefined;
          if (!isBookmarked) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.match.score - a.match.score;
        }
        if (sortBy === 'deadline') {
          return a.deadline.localeCompare(b.deadline);
        }
        return b.postedDate.localeCompare(a.postedDate);
      });
  }, [jobs, profile, applications, selectedLocation, selectedExperience, sortBy, onlySaved]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Live API Feed Banner (Navy & Teal/Mint) */}
      <div className="bg-navy-950 border border-navy-800 text-white rounded-lg p-3.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint-500"></span>
          </span>
          <div className="font-mono">
            <span className="font-bold text-white">Live Job API: </span>
            <span className="text-teal-300 font-bold">{apiSourceLabel}</span>
            <span className="text-slate-400 ml-1">· Real-time verified vacancies</span>
          </div>
        </div>

        <button
          onClick={() => loadLiveJobs(searchQuery)}
          disabled={isLoadingApi}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-navy-800 hover:bg-navy-700 text-teal-200 border border-navy-700 transition-colors font-bold disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingApi ? 'animate-spin' : ''}`} />
          <span>{isLoadingApi ? 'Syncing API...' : 'Sync Live Jobs'}</span>
        </button>
      </div>

      {/* Step Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold mb-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          <span>Step 2 & 3 · Real Job Search & Automated Profile Alignment</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-950">
              Live Job Board & Vacancy Match
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Real job listings streamed directly from live API feeds. Search any title or keyword, compare
              requirements against your profile credentials, and apply directly.
            </p>
          </div>

          <div className="text-xs text-teal-900 bg-teal-50 border border-teal-200 font-mono tabular-nums px-2.5 py-1 rounded font-bold">
            Showing {processedJobs.length} active vacancies
          </div>
        </div>
      </div>

      {/* Step 2 Search & Filter Panel */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-5 space-y-4 shadow-xs">
        {/* Main Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-teal-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live jobs (e.g. computer operator, junior web developer, teacher, office assistant, data entry)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 placeholder:text-slate-400 font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-bold transition-all shadow-xs shrink-0 border border-teal-700/50"
          >
            Search Live
          </button>
        </form>

        {/* Quick Role Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 mr-1 font-semibold">Quick search:</span>
          {JOB_ROLES_PRESETS.map((preset) => {
            const isActive =
              (preset === 'All Roles' && !searchQuery) ||
              searchQuery.toLowerCase() === preset.toLowerCase();
            return (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`px-3 py-1 rounded-md text-xs transition-colors border ${
                  isActive
                    ? 'bg-teal-600 text-white font-bold border-teal-700 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-900 border-slate-200 font-medium'
                }`}
              >
                {preset}
              </button>
            );
          })}
        </div>

        {/* Profile Requirements Sync Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-cream-100/80 border border-teal-200/80 rounded-md text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-700">
            <span className="font-bold text-navy-950 font-mono">My Saved Target:</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-teal-900">
              {profile.preferredCity || 'Pakistan'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-teal-900">
              {profile.experienceLevel}
            </span>
            <span className="text-slate-400">·</span>
            <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium text-teal-900">
              {profile.desiredJobType}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedLocation(profile.preferredCity || 'All Locations');
              setSelectedExperience(profile.experienceLevel || 'All Levels');
            }}
            className="text-xs font-bold text-teal-800 hover:text-teal-950 underline decoration-teal-400 underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <span>Apply My Saved Requirements Filter</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Filter by Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
            >
              {CITIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Filter by Experience</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
            >
              <option value="All Levels">All Experience Levels</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Sort Vacancies</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none font-mono focus:ring-1 focus:ring-teal-600 font-medium"
            >
              <option value="match">Match with Profile (%)</option>
              <option value="deadline">Application Deadline</option>
              <option value="recent">Recently Posted</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`w-full py-1.5 px-3 rounded-md border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                onlySaved
                  ? 'border-teal-700 bg-teal-600 text-white shadow-2xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{onlySaved ? 'Showing Saved Only' : 'Filter Saved Only'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 3: View matching jobs (List of authentic cards in navy, cream, teal & mint) */}
      <div className="space-y-4">
        {isLoadingApi ? (
          <div className="bg-white border border-slate-200 rounded-lg p-16 text-center space-y-3 shadow-xs">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-navy-950">Streaming Live Vacancies...</h3>
            <p className="text-xs text-slate-500">Querying real-time job board API endpoints</p>
          </div>
        ) : processedJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3 shadow-xs">
            <div className="text-slate-400 font-mono text-xs uppercase tracking-wider">
              No matching vacancies found
            </div>
            <h3 className="text-base font-bold text-navy-950">
              Try adjusting your search criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find live listings matching your active query and filter combination. Reset filters or search for another term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All Locations');
                setSelectedExperience('All Levels');
                setOnlySaved(false);
                loadLiveJobs('');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors shadow-2xs"
            >
              Reset All Filters & Reload
            </button>
          </div>
        ) : (
          processedJobs.map((job) => {
            const isBookmarked = applications[job.id] !== undefined;

            return (
              <article
                key={job.id}
                className="bg-white border border-slate-200/90 rounded-lg p-5 sm:p-6 transition-all hover:border-teal-500 hover:shadow-xs space-y-4"
              >
                {/* Header Row: Title, Company, Match Score, Bookmark */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-navy-950 tracking-tight">
                        {job.title}
                      </h2>
                      {job.source && (
                        <span className="text-[10px] text-teal-900 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded font-mono font-bold">
                          {job.source}
                        </span>
                      )}
                    </div>

                    {/* Zero-pill metadata row with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="font-bold text-navy-950">{job.company}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span>{job.location}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-teal-800 font-bold">{job.jobType}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-mono tabular-nums text-slate-700">{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start">
                    {/* Match Score Indicator */}
                    <div className="text-right pr-2 border-r border-slate-200">
                      <div className="font-mono text-sm font-bold tabular-nums text-teal-700">
                        {job.match.score}% Match
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {job.match.matchedSkills.length} of {job.requiredSkills.length} skills
                      </div>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleSave(job.id)}
                      className={`p-2 rounded-md border transition-colors ${
                        isBookmarked
                          ? 'border-teal-700 bg-teal-600 text-white shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-400 hover:text-teal-700 hover:border-teal-300'
                      }`}
                      title={isBookmarked ? 'Job saved in tracker' : 'Save / Bookmark job'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Job Summary Description */}
                <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Step 3 Requirement: Required Qualifications List */}
                <div className="bg-slate-50/80 border border-slate-200/90 rounded-md p-3.5 space-y-2">
                  <div className="text-[11px] font-bold text-navy-950 uppercase tracking-wider font-mono">
                    Key Qualifications & Skill Requirements
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-700">
                    {job.requiredQualifications.map((qual, qIdx) => (
                      <li key={qIdx} className="flex items-start gap-2">
                        <span className="text-teal-600 text-xs mt-0.5">•</span>
                        <span className="leading-snug">{qual}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Alignment Bar: Matched vs Needed */}
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px] font-medium">Matched in Profile:</span>
                      {job.match.matchedSkills.length > 0 ? (
                        <span className="font-bold text-teal-900 bg-mint-50 px-1.5 py-0.5 rounded border border-mint-200">
                          {job.match.matchedSkills.join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">None yet</span>
                      )}
                    </div>
                    {job.match.missingSkills.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 text-[11px] font-medium">Additional Skills:</span>
                        <span className="text-slate-600">
                          {job.match.missingSkills.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3 & 4 Footer Bar: Experience Level, Deadline, Application Link, and Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {/* Metadata: Experience level & Deadline */}
                  <div className="flex flex-wrap items-center gap-3 text-slate-600">
                    <div>
                      <span className="text-slate-400">Level: </span>
                      <span className="font-semibold text-navy-950">{job.experienceLevel}</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div>
                      <span className="text-slate-400">Deadline: </span>
                      <span className="font-mono tabular-nums font-semibold text-teal-800">
                        {job.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Action Group: REMOVED "Tailor CV to Job" per user request! */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status dropdown */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 text-[11px] font-medium">Status:</span>
                      <select
                        value={applications[job.id]?.status || 'pending'}
                        onChange={(e) => onUpdateStatus(job.id, e.target.value as ApplicationStatus)}
                        className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
                      >
                        <option value="saved">Saved</option>
                        <option value="pending">Pending</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offered">Offer Received</option>
                      </select>
                    </div>

                    {/* View Details Modal */}
                    <button
                      onClick={() => onSelectJobForDetails(job)}
                      className="px-3 py-1 text-xs text-slate-800 bg-slate-100 hover:bg-slate-200 rounded font-semibold transition-colors"
                    >
                      Details
                    </button>

                    {/* Step 4: Open original vacancy page (Styled with pop of Teal) */}
                    <a
                      href={job.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded transition-colors shadow-2xs border border-teal-700/50"
                    >
                      <span>Real Vacancy Link</span>
                      <ExternalLink className="w-3 h-3 text-teal-100" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
