import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Wrench,
  Check,
  ArrowRight,
  User,
  Globe,
  Award,
} from 'lucide-react';
import {
  Education,
  Experience,
  JobSeekerProfile,
  SkillCategory,
  SkillItem,
} from '../types';

interface ProfileBuilderProps {
  profile: JobSeekerProfile;
  setProfile: React.Dispatch<React.SetStateAction<JobSeekerProfile>>;
  onNavigateToJobs: () => void;
  onNavigateToCV: () => void;
}

export const ProfileBuilder: React.FC<ProfileBuilderProps> = ({
  profile,
  setProfile,
  onNavigateToJobs,
  onNavigateToCV,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Skill draft state
  const [newSkillName, setNewSkillName] = useState('');

  // New Link draft state
  const [newLinkLabel, setNewLinkLabel] = useState('LinkedIn');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // New Certification / Language draft state
  const [newCert, setNewCert] = useState('');
  const [newLang, setNewLang] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Education helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      city: profile.location || '',
      startYear: '2022',
      endYear: '2025',
      details: '',
    };
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
    showToast('New degree entry added.');
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skill helpers: Simple, reliable addition without dropdowns
  const handleAddSkill = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const raw = newSkillName.trim();
    if (!raw) return;

    // Support single skill or comma-separated skills (e.g. "React, JavaScript, HTML")
    const names = raw.includes(',')
      ? raw.split(',').map((s) => s.trim()).filter(Boolean)
      : [raw];

    const newItems: SkillItem[] = names.map((name) => ({
      name,
      category: 'technical',
      level: 'Advanced',
    }));

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, ...newItems],
    }));
    setNewSkillName('');
    showToast(names.length > 1 ? `Added ${names.length} skills.` : `Added ${names[0]} to skills.`);
  };

  const removeSkill = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index),
    }));
  };

  // Experience helpers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      city: profile.location || '',
      startDate: '2024',
      endDate: 'Present',
      isCurrent: true,
      achievements: ['Delivered core operational tasks and improved team workflow efficiency.'],
    };
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
    showToast('New position added.');
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));
  };

  const updateAchievement = (expId: string, achIndex: number, text: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        const newAchs = [...exp.achievements];
        newAchs[achIndex] = text;
        return { ...exp, achievements: newAchs };
      }),
    }));
  };

  const addAchievementBullet = (expId: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        return { ...exp, achievements: [...exp.achievements, 'Added new responsibility or milestone.'] };
      }),
    }));
  };

  const removeAchievementBullet = (expId: string, achIndex: number) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== expId) return exp;
        return { ...exp, achievements: exp.achievements.filter((_, i) => i !== achIndex) };
      }),
    }));
  };

  const removeExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Add Link
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;
    setProfile((prev) => ({
      ...prev,
      links: [...prev.links, { label: newLinkLabel, url: newLinkUrl.trim() }],
    }));
    setNewLinkUrl('');
  };

  const removeLink = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      links: prev.links.filter((_, idx) => idx !== index),
    }));
  };

  // Certifications & Languages
  const addCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.trim()) return;
    setProfile((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert.trim()],
    }));
    setNewCert('');
  };

  const removeCert = (idx: number) => {
    setProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  };

  const addLang = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLang.trim()) return;
    setProfile((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang.trim()],
    }));
    setNewLang('');
  };

  const removeLang = (idx: number) => {
    setProfile((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="w-full">
      {/* 1. TOP BANNER BLOCK */}
      <section className="w-full bg-[#134E4A] border-b border-[#0f3f3c] text-white">
        <div className="max-w-[1100px] mx-auto px-5 pt-[18px] pb-6 sm:pb-7 flex flex-col gap-2.5">
          {/* Row 1: Logo mark + Brand name in Cormorant Garamond */}
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-lg bg-white flex items-center justify-center font-bold text-lg text-[#134E4A] shrink-0 shadow-xs select-none">
              J
            </div>
            <span
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              className="text-[1.4rem] font-bold text-white tracking-tight leading-none"
            >
              JobHunt
            </span>
          </div>

          {/* Row 2: Headline in Cormorant Garamond, clamp(1.9rem, 5vw, 2.7rem) */}
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(1.9rem, 5vw, 2.7rem)',
              lineHeight: 1.15,
            }}
            className="font-semibold text-white tracking-tight max-w-[640px] m-0"
          >
            Welcome back, manage everything in one place.
          </h1>

          {/* Row 3: Short description line in soft light tint, max width 560px */}
          <p className="text-[#D1FAE5] text-sm leading-relaxed max-w-[560px] m-0 font-normal">
            Customize your professional profile, align credentials with Pakistani job vacancies, and generate ATS-compliant CVs.
          </p>
        </div>
      </section>

      {/* Main Dashboard Content Area */}
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-navy-950 text-white text-xs py-2.5 px-4 rounded-md shadow-lg flex items-center gap-2 border border-teal-500 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-mint-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Professional Header & Primary Quick Navigation */}
        <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-teal-700 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 ring-2 ring-mint-300" />
              <span>Step 1 · Profile Management & Credentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy-950">
              Professional Job Seeker Profile
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Maintain your legal contact details, executive summary, academic background, and competencies.
              All personal information remains fully editable and instantly updates your CV.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToJobs}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Search Live Jobs</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
            </button>
            <button
              onClick={onNavigateToCV}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors shadow-2xs border border-teal-700/50 cursor-pointer"
            >
              <span>Preview CV</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      {/* Main Profile Form Sections */}
      <div className="space-y-6">
        {/* 01. Contact & Personal Information */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-50 rounded text-teal-800">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
                01. Personal & Contact Information
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Rendered on CV Header</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 font-medium"
                placeholder="e.g. Alex Morgan"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value, targetRole: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 font-medium text-navy-950"
                placeholder="e.g. Junior Web Developer, Office Administrator"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 font-medium"
                placeholder="+92 300 1234567"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">Current Residence / City</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value, preferredCity: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 font-medium"
                placeholder="e.g. Lahore, Pakistan or Karachi"
              />
            </div>
          </div>

          {/* Social Links & Web Profiles */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>Web Profiles & Professional Links</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {profile.links.map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800"
                >
                  <span className="font-semibold text-teal-800">{link.label}:</span>
                  <span className="truncate max-w-[200px] text-slate-600">{link.url}</span>
                  <button
                    type="button"
                    onClick={() => removeLink(idx)}
                    className="text-slate-400 hover:text-red-700 ml-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddLink} className="flex gap-2 pt-1 text-xs">
              <select
                value={newLinkLabel}
                onChange={(e) => setNewLinkLabel(e.target.value)}
                className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-teal-600 font-medium"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="GitHub">GitHub</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Website">Website</option>
              </select>
              <input
                type="text"
                placeholder="https://..."
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-navy-950 hover:bg-navy-900 text-white rounded text-xs font-semibold"
              >
                Add Link
              </button>
            </form>
          </div>
        </section>

        {/* 02. Professional Summary */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
              02. Professional Summary & Bio
            </h2>
            <span className="text-xs text-slate-400 font-mono tabular-nums">
              {profile.summary.length} characters
            </span>
          </div>

          <div>
            <textarea
              rows={4}
              value={profile.summary}
              onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50/70 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 leading-relaxed font-sans"
              placeholder="State your career background, key competencies, and direct value proposition for target roles..."
            />
          </div>
        </section>

        {/* 03. Education & Academic Background */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-50 rounded text-teal-800">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
                03. Education & Academic Background
              </h2>
            </div>
            <button
              onClick={addEducation}
              className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1 rounded"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-4">
            {profile.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="p-4 bg-slate-50/80 border border-slate-200 rounded-md space-y-3 relative group"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs font-mono text-teal-800 font-bold uppercase tracking-wide">
                    Degree Entry #{idx + 1}
                  </span>
                  {profile.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-slate-400 hover:text-red-700 transition-colors p-1"
                      title="Remove entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Degree / Program
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="e.g. B.S. in Computer Science"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Institution / College
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="e.g. State Polytechnic Institute"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">City, Country</label>
                    <input
                      type="text"
                      value={edu.city}
                      onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                      placeholder="e.g. Lahore, Pakistan"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Start Year</label>
                      <input
                        type="text"
                        value={edu.startYear}
                        onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-mono tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">End Year</label>
                      <input
                        type="text"
                        value={edu.endYear}
                        onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-mono tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Coursework, GPA, or Honors
                  </label>
                  <input
                    type="text"
                    value={edu.details}
                    onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                    placeholder="e.g. Dean's List, Relevant courses: Web Architecture, Database Systems"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04. Skills Inventory & Qualifications */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-50 rounded text-teal-800">
                <Wrench className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
                04. Skills & Competencies Inventory
              </h2>
            </div>
            <span className="text-xs font-mono text-teal-900 tabular-nums bg-mint-50 border border-mint-200 px-2 py-0.5 rounded font-bold">
              {profile.skills.length} skills listed
            </span>
          </div>

          {/* Add skill input & button (no dropdowns per user request) */}
          <div className="flex items-center gap-2 pb-2">
            <input
              type="text"
              placeholder="Enter skill name (e.g. React, Data Entry, Excel, Communication)..."
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-700 font-medium"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-[0.98] rounded-md transition-all shadow-xs border border-teal-700/50 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>

          {/* Render Skills in soft mint chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-mint-50/80 border border-mint-200 rounded-md text-xs text-navy-950 hover:bg-mint-100 transition-colors group shadow-2xs"
              >
                <span className="font-semibold">{skill.name}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-slate-400 hover:text-red-700 transition-colors ml-1 p-0.5 rounded cursor-pointer"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 05. Experience & Employment Record */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-teal-50 rounded text-teal-800">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
                05. Work Experience & Projects
              </h2>
            </div>
            <button
              onClick={addExperience}
              className="flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1 rounded"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 bg-slate-50/80 border border-slate-200 rounded-md space-y-3 relative"
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs font-mono text-teal-800 font-bold uppercase tracking-wide">
                    Position #{idx + 1}
                  </span>
                  {profile.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-slate-400 hover:text-red-700 transition-colors p-1"
                      title="Remove experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      placeholder="e.g. Junior Web Developer"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Nexus Interactive"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">City, Country</label>
                    <input
                      type="text"
                      value={exp.city}
                      onChange={(e) => updateExperience(exp.id, 'city', e.target.value)}
                      placeholder="e.g. Karachi, Pakistan"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                        placeholder="e.g. Jun 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                        placeholder="e.g. Present"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold text-slate-700">
                      Key Responsibilities & Measurable Impact
                    </label>
                    <button
                      type="button"
                      onClick={() => addAchievementBullet(exp.id)}
                      className="text-[11px] text-teal-800 hover:text-teal-950 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add bullet</span>
                    </button>
                  </div>

                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2">
                      <span className="text-teal-600 text-xs font-bold">·</span>
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => updateAchievement(exp.id, aIdx, e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-teal-700"
                      />
                      {exp.achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAchievementBullet(exp.id, aIdx)}
                          className="text-slate-400 hover:text-red-700 p-0.5"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. Certifications & Languages */}
        <section className="bg-white border border-slate-200/90 rounded-lg p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <div className="p-1.5 bg-teal-50 rounded text-teal-800">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-xs font-bold text-navy-950 uppercase tracking-wider font-mono">
              06. Certifications & Spoken Languages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Certifications */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-800">Professional Certifications</label>
              <div className="flex flex-wrap gap-1.5">
                {profile.certifications.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800">
                    <span>{c}</span>
                    <button type="button" onClick={() => removeCert(i)} className="text-slate-400 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={addCert} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  className="flex-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                <button type="submit" className="px-3 py-1 bg-navy-950 hover:bg-navy-900 text-white rounded font-medium">
                  Add
                </button>
              </form>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-800">Languages</label>
              <div className="flex flex-wrap gap-1.5">
                {profile.languages.map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800">
                    <span>{l}</span>
                    <button type="button" onClick={() => removeLang(i)} className="text-slate-400 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={addLang} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. English (Fluent), Spanish"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  className="flex-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
                <button type="submit" className="px-3 py-1 bg-navy-950 hover:bg-navy-900 text-white rounded font-medium">
                  Add
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Step Progression Banner in deep Navy with Mint accent */}
      <div className="bg-navy-950 border border-navy-800 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-mint-400" />
            <span>Candidate Credentials Saved</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Proceed to Step 2 to search live job board listings or preview your formatted CV immediately.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToCV}
            className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-navy-800 hover:bg-navy-700 rounded-md transition-colors border border-navy-700"
          >
            Preview Formatted CV
          </button>
          <button
            onClick={onNavigateToJobs}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-navy-950 bg-teal-400 hover:bg-teal-300 rounded-md transition-colors shadow-xs"
          >
            <span>Proceed to Live Job Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
