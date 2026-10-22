export interface Education {
  id: string;
  degree: string;
  institution: string;
  city: string;
  startYear: string;
  endYear: string;
  details: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string[];
}

export type SkillCategory = 'technical' | 'tools' | 'soft' | 'domain';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type ExperienceLevel = 'Entry-level' | 'Junior' | 'Mid-level' | 'Senior';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';

export interface JobSeekerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  preferredCity: string;
  title: string;
  targetRole: string;
  experienceLevel: ExperienceLevel;
  desiredJobType: JobType;
  summary: string;
  education: Education[];
  skills: SkillItem[];
  experience: Experience[];
  certifications: string[];
  languages: string[];
  links: { label: string; url: string }[];
}

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary: string;
  postedDate: string;
  deadline: string;
  department: string;
  description: string;
  requiredQualifications: string[];
  requiredSkills: string[];
  applicationUrl: string;
  contactEmail: string;
  source?: string;
  companyLogo?: string;
}

export type ApplicationStatus = 'saved' | 'pending' | 'applied' | 'interviewing' | 'offered' | 'archived';

export interface ApplicationRecord {
  jobId: string;
  status: ApplicationStatus;
  appliedDate?: string;
  notes?: string;
}

export type CVTemplateStyle = 'editorial' | 'minimal' | 'modern' | 'compact';
