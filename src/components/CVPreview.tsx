import React, { useState } from 'react';
import {
  Check,
  Copy,
  Edit3,
  Eye,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CVTemplateStyle, JobSeekerProfile, JobVacancy } from '../types';

interface CVPreviewProps {
  profile: JobSeekerProfile;
  setProfile: React.Dispatch<React.SetStateAction<JobSeekerProfile>>;
  tailoredJob: JobVacancy | null;
  onClearTailoredJob: () => void;
  onExportPdf: () => void;
  onNavigateToJobs: () => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({
  profile,
  setProfile,
  tailoredJob,
  onClearTailoredJob,
  onExportPdf,
  onNavigateToJobs,
}) => {
  const [template, setTemplate] = useState<CVTemplateStyle>('editorial');
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyPlainText = () => {
    const text = `
${profile.fullName}
${profile.targetRole || profile.title}
Email: ${profile.email} | Phone: ${profile.phone} | Location: ${profile.location}
${profile.links.map((l) => `${l.label}: ${l.url}`).join(' | ')}

PROFESSIONAL SUMMARY
${profile.summary}

SKILLS
${profile.skills.map((s) => `${s.name} (${s.level})`).join(', ')}

EXPERIENCE
${profile.experience
  .map(
    (exp) => `
${exp.role} - ${exp.company}, ${exp.city} (${exp.startDate} - ${exp.endDate})
${exp.achievements.map((a) => `• ${a}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${profile.education
  .map(
    (edu) => `
${edu.degree} - ${edu.institution}, ${edu.city} (${edu.startYear} - ${edu.endYear})
${edu.details ? `Details: ${edu.details}` : ''}
`
  )
  .join('\n')}

${profile.certifications.length > 0 ? `CERTIFICATIONS\n${profile.certifications.join(', ')}\n` : ''}
${profile.languages.length > 0 ? `LANGUAGES\n${profile.languages.join(', ')}` : ''}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Step Header */}
      <div className="no-print border-b border-slate-200 pb-5">
        <div className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold mb-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-500 ring-2 ring-mint-300" />
          <span>Curriculum Vitae Engine · Real-Time PDF Document</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-950">
              Curriculum Vitae Preview & Export
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              ATS-compliant, print-perfect CV document with bespoke typography. Edit personal credentials inline,
              switch typographic templates, and export cleanly as PDF.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyPlainText}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-teal-800 font-bold">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Plain Text</span>
                </>
              )}
            </button>
            <button
              onClick={onExportPdf}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] rounded-md transition-all shadow-2xs border border-teal-700/50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export as PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tailored Job Context Banner in deep Navy */}
      {tailoredJob && (
        <div className="no-print bg-navy-950 border border-navy-800 text-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-start sm:items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-mint-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-white">
                CV Tailored for: {tailoredJob.title} at {tailoredJob.company}
              </span>
              <span className="block sm:inline sm:ml-2 text-slate-300">
                ({tailoredJob.location} · Deadline: {tailoredJob.deadline})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToJobs}
              className="px-2.5 py-1 text-teal-300 hover:text-white underline text-xs font-bold"
            >
              Back to Job Board
            </button>
            <button
              onClick={onClearTailoredJob}
              className="px-2.5 py-1 text-xs bg-navy-800 hover:bg-navy-700 text-slate-200 rounded transition-colors border border-navy-700 font-medium"
            >
              Reset Target
            </button>
          </div>
        </div>
      )}

      {/* Toolbar Controls */}
      <div className="no-print bg-white border border-slate-200/90 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs shadow-xs">
        {/* Template Style Selector */}
        <div>
          <label className="block text-slate-700 font-bold mb-1.5">
            Document Typography & Layout Template
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTemplate('editorial')}
              className={`p-2.5 text-left rounded-md border text-xs transition-colors ${
                template === 'editorial'
                  ? 'border-teal-600 bg-teal-50 text-navy-950 font-bold ring-2 ring-teal-500/30 shadow-2xs'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="font-serif font-bold">Editorial</div>
              <div className="text-[10px] text-slate-500 font-normal">Classic serif prestige</div>
            </button>
            <button
              onClick={() => setTemplate('minimal')}
              className={`p-2.5 text-left rounded-md border text-xs transition-colors ${
                template === 'minimal'
                  ? 'border-teal-600 bg-teal-50 text-navy-950 font-bold ring-2 ring-teal-500/30 shadow-2xs'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="font-sans font-bold">Modern</div>
              <div className="text-[10px] text-slate-500 font-normal">Clean contemporary</div>
            </button>
            <button
              onClick={() => setTemplate('compact')}
              className={`p-2.5 text-left rounded-md border text-xs transition-colors ${
                template === 'compact'
                  ? 'border-teal-600 bg-teal-50 text-navy-950 font-bold ring-2 ring-teal-500/30 shadow-2xs'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="font-mono font-bold">Compact</div>
              <div className="text-[10px] text-slate-500 font-normal">Dense data layout</div>
            </button>
          </div>
        </div>

        {/* Live Inline Editing Toggle */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">
              Live Personal Information Direct Edit
            </label>
            <button
              onClick={() => setIsEditingInline(!isEditingInline)}
              className={`w-full py-2.5 px-3 rounded-md border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                isEditingInline
                  ? 'border-teal-700 bg-teal-50 text-navy-950 ring-2 ring-teal-500/30'
                  : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-teal-500'
              }`}
            >
              {isEditingInline ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-teal-700" />
                  <span>Switch to Clean Document View</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Enable Live Inline Quick Edit</span>
                </>
              )}
            </button>
          </div>
          <span className="text-[11px] text-slate-500 mt-1">
            {isEditingInline ? 'Active text fields enabled directly on the document' : 'Print-ready A4 preview mode without field borders'}
          </span>
        </div>
      </div>

      {/* =========================================================================
          THE PRINTABLE / PREVIEW A4 CV DOCUMENT CONTAINER
         ========================================================================= */}
      <div className="flex justify-center">
        <div
          id="cv-document"
          className={`print-cv-container print-page w-full max-w-[820px] bg-white border border-slate-200/90 rounded-sm shadow-sm p-8 sm:p-12 text-slate-900 transition-all ${
            template === 'editorial' ? 'font-serif' : 'font-sans'
          }`}
          style={{ minHeight: '1050px' }}
        >
          {/* Document Header */}
          <header className={`border-b border-teal-200 pb-5 mb-6 ${template === 'editorial' ? 'text-center' : 'text-left'}`}>
            {isEditingInline ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full text-2xl font-bold tracking-tight text-navy-950 border-b border-teal-400 focus:outline-none focus:border-teal-700 pb-1 font-sans"
                  placeholder="Full Legal Name"
                />
                <input
                  type="text"
                  value={profile.targetRole || profile.title}
                  onChange={(e) => setProfile({ ...profile, targetRole: e.target.value, title: e.target.value })}
                  className="w-full text-sm font-bold text-teal-800 border-b border-slate-200 focus:outline-none focus:border-teal-700 pb-0.5 font-sans"
                  placeholder="Professional Title"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs font-sans">
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                    placeholder="+92 300 1234567"
                  />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                    placeholder="e.g. Lahore, Pakistan"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-extrabold tracking-tight text-navy-950 font-sans">
                  {profile.fullName}
                </h1>
                <div className="text-sm font-bold text-teal-800 mt-1 font-sans">
                  {profile.targetRole || profile.title}
                </div>

                {/* Contact bar */}
                <div
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-3 font-sans ${
                    template === 'editorial' ? 'justify-center' : 'justify-start'
                  }`}
                >
                  <span>{profile.email}</span>
                  <span aria-hidden="true" className="text-teal-400">·</span>
                  <span>{profile.phone}</span>
                  <span aria-hidden="true" className="text-teal-400">·</span>
                  <span>{profile.location}</span>
                  {profile.links.map((link, lIdx) => (
                    <React.Fragment key={lIdx}>
                      <span aria-hidden="true" className="text-teal-400">·</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-900 font-semibold hover:underline"
                      >
                        {link.label}
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </header>

          {/* Section: Professional Summary */}
          <section className="mb-6 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-navy-950 border-b border-teal-100 pb-1 font-sans">
              Professional Summary
            </h2>
            {isEditingInline ? (
              <textarea
                rows={3}
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full text-xs text-slate-700 leading-relaxed p-2 bg-slate-50 border border-slate-200 rounded font-sans"
              />
            ) : (
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {profile.summary}
              </p>
            )}
          </section>

          {/* Section: Key Skills & Technical Proficiencies */}
          <section className="mb-6 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-navy-950 border-b border-teal-100 pb-1 font-sans">
              Core Competencies & Qualifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-sans">
              <div>
                <span className="font-bold text-navy-950">Technical & Systems: </span>
                <span className="text-slate-700">
                  {profile.skills
                    .filter((s) => s.category === 'technical' || s.category === 'tools')
                    .map((s) => s.name)
                    .join(', ')}
                </span>
              </div>
              <div>
                <span className="font-bold text-navy-950">Domain & Professional: </span>
                <span className="text-slate-700">
                  {profile.skills
                    .filter((s) => s.category === 'domain' || s.category === 'soft')
                    .map((s) => s.name)
                    .join(', ')}
                </span>
              </div>
            </div>
          </section>

          {/* Section: Professional Experience */}
          <section className="mb-6 space-y-3">
            <h2 className="text-xs font-bold tracking-wider uppercase text-navy-950 border-b border-teal-100 pb-1 font-sans">
              Work Experience
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-navy-950 text-sm">{exp.role}</span>
                      <span className="text-slate-600 font-medium"> — {exp.company}</span>
                      <span className="text-slate-400"> ({exp.city})</span>
                    </div>
                    <span className="text-teal-800 font-mono text-[11px] tabular-nums shrink-0 font-bold">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-normal">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="mb-6 space-y-3">
            <h2 className="text-xs font-bold tracking-wider uppercase text-navy-950 border-b border-teal-100 pb-1 font-sans">
              Education & Academic Credentials
            </h2>
            <div className="space-y-3 font-sans">
              {profile.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-navy-950 text-sm">{edu.degree}</span>
                      <span className="text-slate-600 font-medium"> — {edu.institution}</span>
                      <span className="text-slate-400"> ({edu.city})</span>
                    </div>
                    <span className="text-teal-800 font-mono text-[11px] tabular-nums shrink-0 font-bold">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  {edu.details && (
                    <div className="text-xs text-slate-600 leading-normal pl-0.5">
                      {edu.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Certifications & Languages */}
          {(profile.certifications.length > 0 || profile.languages.length > 0) && (
            <section className="space-y-2 pt-2 border-t border-teal-100 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {profile.certifications.length > 0 && (
                  <div>
                    <h3 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1">
                      Certifications & Licenses
                    </h3>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      {profile.certifications.map((cert, cIdx) => (
                        <li key={cIdx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {profile.languages.length > 0 && (
                  <div>
                    <h3 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] mb-1">
                      Languages
                    </h3>
                    <div className="text-slate-700 font-medium">{profile.languages.join(' · ')}</div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom Print Hint Callout */}
      <div className="no-print bg-teal-50 border border-teal-200/90 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 shadow-2xs">
        <div>
          <span className="font-bold text-navy-950">PDF Export Instructions:</span> Clicking "Export as PDF" triggers your browser's native print engine with exact A4 proportions. Set Destination to "Save as PDF" and Margins to "Default".
        </div>
        <button
          onClick={onExportPdf}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded transition-colors shrink-0 shadow-2xs border border-teal-700/50"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Launch Print Dialogue</span>
        </button>
      </div>
    </div>
  );
};
