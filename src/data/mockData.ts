import { JobSeekerProfile, JobVacancy } from '../types';

export const FRIEND_PROFILES: { id: string; label: string; roleTag: string; profile: JobSeekerProfile }[] = [
  {
    id: 'alex-dev',
    label: 'Alex Morgan',
    roleTag: 'Junior Web Developer',
    profile: {
      id: 'alex-dev',
      fullName: 'Alex Morgan',
      email: 'alex.morgan.work@email.com',
      phone: '+92 300 1234567',
      location: 'Lahore, Pakistan',
      preferredCity: 'Lahore, Pakistan',
      title: 'Junior Web Developer',
      targetRole: 'Junior Web Developer',
      experienceLevel: 'Junior',
      desiredJobType: 'Full-time',
      summary:
        'Detail-oriented Junior Web Developer with strong foundation in React, TypeScript, and modern CSS frameworks. Experienced in translating design systems into responsive, accessible web interfaces. Passionate about clean code, testability, and collaborative software delivery.',
      education: [
        {
          id: 'edu-1',
          degree: 'B.S. in Computer Science',
          institution: 'FAST-NUCES',
          city: 'Lahore, Pakistan',
          startYear: '2021',
          endYear: '2025',
          details: 'Dean’s Honor List. Coursework: Data Structures, Web Engineering, Database Systems, Software Architecture.',
        },
        {
          id: 'edu-2',
          degree: 'Full-Stack Web Immersion Certificate',
          institution: 'CodeLab Academy',
          city: 'Lahore, Pakistan',
          startYear: '2024',
          endYear: '2024',
          details: 'Completed 600+ hours of hands-on project work in React, Node.js, and automated testing.',
        },
      ],
      skills: [
        { name: 'React', category: 'technical', level: 'Advanced' },
        { name: 'TypeScript', category: 'technical', level: 'Intermediate' },
        { name: 'JavaScript (ES6+)', category: 'technical', level: 'Advanced' },
        { name: 'Tailwind CSS', category: 'technical', level: 'Advanced' },
        { name: 'HTML5 & Accessible DOM', category: 'technical', level: 'Advanced' },
        { name: 'Node.js & Express', category: 'technical', level: 'Intermediate' },
        { name: 'Git & GitHub', category: 'tools', level: 'Advanced' },
        { name: 'RESTful APIs', category: 'technical', level: 'Intermediate' },
        { name: 'Vite / Webpack', category: 'tools', level: 'Intermediate' },
        { name: 'Agile Teamwork', category: 'soft', level: 'Advanced' },
        { name: 'Problem Solving', category: 'soft', level: 'Advanced' },
      ],
      experience: [
        {
          id: 'exp-1',
          role: 'Junior Frontend Developer Intern',
          company: 'Systems Limited',
          city: 'Lahore, Pakistan',
          startDate: 'Jun 2024',
          endDate: 'Dec 2024',
          isCurrent: false,
          achievements: [
            'Built 14 reusable React UI components conforming to WCAG AA accessibility guidelines.',
            'Collaborated with senior engineers to optimize bundle size, trimming initial page load latency by 28%.',
            'Implemented interactive forms with client-side validation using Zod and React Hook Form.',
          ],
        },
        {
          id: 'exp-2',
          role: 'Web Project Assistant',
          company: 'University Media Center',
          city: 'Troy, NY',
          startDate: 'Sep 2023',
          endDate: 'May 2024',
          isCurrent: false,
          achievements: [
            'Maintained and updated departmental portal serving 3,500+ active students and faculty.',
            'Authored clear documentation for non-technical content editors.',
          ],
        },
      ],
      certifications: ['Meta Front-End Developer Professional Certificate (Coursera)'],
      languages: ['English (Native)', 'Spanish (Conversational)'],
      links: [
        { label: 'GitHub', url: 'https://github.com' },
        { label: 'LinkedIn', url: 'https://linkedin.com' },
        { label: 'Portfolio', url: 'https://alexmorgan.dev' },
      ],
    },
  },
  {
    id: 'samira-admin',
    label: 'Samira Khan',
    roleTag: 'Office Assistant',
    profile: {
      id: 'samira-admin',
      fullName: 'Samira Khan',
      email: 'samira.khan.office@email.com',
      phone: '+1 (555) 781-4432',
      location: 'Chicago, IL',
      preferredCity: 'Chicago',
      title: 'Administrative Office Assistant',
      targetRole: 'Office Assistant',
      experienceLevel: 'Entry-level',
      desiredJobType: 'Full-time',
      summary:
        'Punctual and proactive Office Assistant with 2+ years of organizational experience coordinating front-desk administration, client correspondence, records management, and executive scheduling. Known for dependability, confidentiality, and calm composure under busy office conditions.',
      education: [
        {
          id: 'edu-samira-1',
          degree: 'Associate Degree in Business Administration',
          institution: 'City Colleges of Chicago',
          city: 'Chicago, IL',
          startYear: '2022',
          endYear: '2024',
          details: 'Specialization in Office Management, Business English, and Spreadsheets. GPA 3.8/4.0.',
        },
        {
          id: 'edu-samira-2',
          degree: 'High School Diploma with Honors',
          institution: 'Lincoln Park Academic High School',
          city: 'Chicago, IL',
          startYear: '2018',
          endYear: '2022',
          details: 'Student Council Secretary and Peer Tutoring Coordinator.',
        },
      ],
      skills: [
        { name: 'Microsoft Office (Word, Excel, PowerPoint)', category: 'tools', level: 'Advanced' },
        { name: 'Google Workspace', category: 'tools', level: 'Advanced' },
        { name: 'Calendar & Meeting Scheduling', category: 'domain', level: 'Advanced' },
        { name: 'Document Filing & Archiving', category: 'domain', level: 'Advanced' },
        { name: 'Data Entry & Verification', category: 'domain', level: 'Advanced' },
        { name: 'Client Reception & Telephone Etiquette', category: 'soft', level: 'Advanced' },
        { name: 'Travel & Itinerary Coordination', category: 'domain', level: 'Intermediate' },
        { name: 'Written & Oral Communication', category: 'soft', level: 'Advanced' },
        { name: 'Confidentiality & Discretion', category: 'soft', level: 'Advanced' },
      ],
      experience: [
        {
          id: 'exp-samira-1',
          role: 'Office Assistant & Receptionist',
          company: 'Horizon Logistics Partners',
          city: 'Chicago, IL',
          startDate: 'Aug 2024',
          endDate: 'Present',
          isCurrent: true,
          achievements: [
            'Greet 40+ daily visitors, manage multi-line phone switchboard, and route incoming correspondence.',
            'Audited and digitized 1,200 paper client files into searchable cloud records with 100% catalog integrity.',
            'Supervised office inventory orders, cutting supply waste by 18% through bi-weekly stock reconciliation.',
          ],
        },
        {
          id: 'exp-samira-2',
          role: 'Administrative Clerk',
          company: 'Midwest Dental Health Center',
          city: 'Chicago, IL',
          startDate: 'Jan 2023',
          endDate: 'Jul 2024',
          isCurrent: false,
          achievements: [
            'Handled appointment reminders, patient intake check-ins, and insurance verification workflows.',
            'Resolved scheduling overlaps with patience and courteous telephone communication.',
          ],
        },
      ],
      certifications: ['Certified Administrative Professional (CAP) Coursework', 'HIPAA Privacy Compliance'],
      languages: ['English (Fluent)', 'Urdu (Fluent)'],
      links: [
        { label: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
  },
  {
    id: 'david-operator',
    label: 'David Chen',
    roleTag: 'Computer Operator',
    profile: {
      id: 'david-operator',
      fullName: 'David Chen',
      email: 'david.chen.systems@email.com',
      phone: '+1 (555) 349-1102',
      location: 'Houston, TX',
      preferredCity: 'Houston',
      title: 'Computer Operator & Data Processor',
      targetRole: 'Computer Operator',
      experienceLevel: 'Entry-level',
      desiredJobType: 'Full-time',
      summary:
        'Diligent and methodical Computer Operator with 75+ WPM typing speed and rigorous attention to data verification. Proven track record executing routine system backups, processing high-volume batch transactions, generating compliance reports, and resolving peripheral hardware bottlenecks.',
      education: [
        {
          id: 'edu-david-1',
          degree: 'Associate of Applied Science in Information Technology',
          institution: 'Houston Community College System',
          city: 'Houston, TX',
          startYear: '2021',
          endYear: '2023',
          details: 'Courses in Computer Operations, Operating Systems (Windows & Linux), Data Management, and IT Troubleshooting.',
        },
      ],
      skills: [
        { name: 'High-Speed Typing (75+ WPM)', category: 'technical', level: 'Advanced' },
        { name: 'Data Entry & Data Cleaning', category: 'domain', level: 'Advanced' },
        { name: 'Batch Processing & Job Scheduling', category: 'technical', level: 'Advanced' },
        { name: 'System Backups & Recovery Verification', category: 'technical', level: 'Intermediate' },
        { name: 'Spreadsheet Formulas (VLOOKUP, Pivot)', category: 'tools', level: 'Advanced' },
        { name: 'Printer & Scanner Maintenance', category: 'tools', level: 'Advanced' },
        { name: 'SQL Query Basics', category: 'technical', level: 'Intermediate' },
        { name: 'Error Log Monitoring', category: 'domain', level: 'Advanced' },
        { name: 'Night Shift Reliability', category: 'soft', level: 'Advanced' },
      ],
      experience: [
        {
          id: 'exp-david-1',
          role: 'Computer Operator',
          company: 'Apex Clearinghouse & Records',
          city: 'Houston, TX',
          startDate: 'Feb 2024',
          endDate: 'Present',
          isCurrent: true,
          achievements: [
            'Operate enterprise mainframe print and data storage terminals, processing 15,000+ daily billing records.',
            'Conducted hourly verification runs to confirm scheduled automated data batches completed without errors.',
            'Troubleshot high-capacity thermal printers and optical scanning equipment, reducing downtime by 35%.',
          ],
        },
        {
          id: 'exp-david-2',
          role: 'Data Entry Assistant',
          company: 'Gulf Coast Freight Services',
          city: 'Houston, TX',
          startDate: 'May 2023',
          endDate: 'Jan 2024',
          isCurrent: false,
          achievements: [
            'Keyed freight manifests and shipping documentation with verified 99.7% accuracy score.',
            'Identified discrepancy trends in supplier invoice spreadsheets, saving $12,000 in duplicate billings.',
          ],
        },
      ],
      certifications: ['CompTIA IT Fundamentals (ITF+)', 'Advanced Excel Specialist'],
      languages: ['English (Fluent)', 'Mandarin (Conversational)'],
      links: [
        { label: 'LinkedIn', url: 'https://linkedin.com' },
      ],
    },
  },
  {
    id: 'elena-teacher',
    label: 'Elena Ramos',
    roleTag: 'Teacher',
    profile: {
      id: 'elena-teacher',
      fullName: 'Elena Ramos',
      email: 'elena.ramos.edu@email.com',
      phone: '+1 (555) 609-3281',
      location: 'Boston, MA',
      preferredCity: 'Boston',
      title: 'Secondary STEM Teacher',
      targetRole: 'Teacher',
      experienceLevel: 'Junior',
      desiredJobType: 'Full-time',
      summary:
        'Passionate and credentialed Secondary STEM Educator dedicated to fostering critical thinking, mathematical intuition, and inclusive classroom environments. Experienced in differentiated instruction, state standard alignment, and student-centered inquiry projects.',
      education: [
        {
          id: 'edu-elena-1',
          degree: 'Master of Education (M.Ed.) in Curriculum & Instruction',
          institution: 'Boston University Wheelock College',
          city: 'Boston, MA',
          startYear: '2022',
          endYear: '2024',
          details: 'Focus on STEM pedagogy and culturally responsive teaching methods.',
        },
        {
          id: 'edu-elena-2',
          degree: 'B.S. in Mathematics',
          institution: 'University of Massachusetts Amherst',
          city: 'Amherst, MA',
          startYear: '2018',
          endYear: '2022',
          details: 'Magna Cum Laude. Minor in Secondary Education.',
        },
      ],
      skills: [
        { name: 'Curriculum & Lesson Planning', category: 'domain', level: 'Advanced' },
        { name: 'Classroom Management', category: 'soft', level: 'Advanced' },
        { name: 'Differentiated Instruction', category: 'domain', level: 'Advanced' },
        { name: 'Formative & Summative Assessment', category: 'domain', level: 'Advanced' },
        { name: 'STEM Integration & Labs', category: 'technical', level: 'Advanced' },
        { name: 'Google Classroom & Canvas LMS', category: 'tools', level: 'Advanced' },
        { name: 'Parent-Teacher Communication', category: 'soft', level: 'Advanced' },
        { name: 'Student Mentorship', category: 'soft', level: 'Advanced' },
        { name: 'Special Education Accommodations (IEP/504)', category: 'domain', level: 'Intermediate' },
      ],
      experience: [
        {
          id: 'exp-elena-1',
          role: 'High School Mathematics Teacher',
          company: 'Beacon Hill Preparatory High School',
          city: 'Boston, MA',
          startDate: 'Aug 2024',
          endDate: 'Present',
          isCurrent: true,
          achievements: [
            'Instruct 95 students across 4 sections of Algebra I and Geometry, raising district test pass rates by 14%.',
            'Designed 12 real-world applied math project units incorporating financial literacy and architecture.',
            'Facilitate weekly bi-lingual parent updates and individualized office hours for struggling learners.',
          ],
        },
        {
          id: 'exp-elena-2',
          role: 'Student Teacher & Math Tutor',
          company: 'Cambridge Public Schools',
          city: 'Cambridge, MA',
          startDate: 'Sep 2023',
          endDate: 'Jun 2024',
          isCurrent: false,
          achievements: [
            'Co-taught 8th-grade pre-algebra under master teacher supervision, managing 26-student classroom.',
            'Conducted small-group intervention sessions that closed grade-level calculation gaps for 18 students.',
          ],
        },
      ],
      certifications: ['Massachusetts Educator License: Mathematics (Grades 8-12)', 'CPR & First Aid Certified'],
      languages: ['English (Native)', 'Spanish (Bilingual)'],
      links: [
        { label: 'LinkedIn', url: 'https://linkedin.com' },
        { label: 'Classroom Portfolio', url: 'https://sites.google.com/view/elenaramos-stem' },
      ],
    },
  },
  {
    id: 'blank-profile',
    label: 'Start Fresh (Blank)',
    roleTag: 'Custom Profile',
    profile: {
      id: 'custom-blank',
      fullName: 'Your Full Name',
      email: 'your.name@example.com',
      phone: '+1 (555) 000-0000',
      location: 'Your City, State',
      preferredCity: 'Your City',
      title: 'Professional Title',
      targetRole: 'Target Job Role',
      experienceLevel: 'Entry-level',
      desiredJobType: 'Full-time',
      summary: 'A short overview highlighting your career background, key competencies, and immediate objectives.',
      education: [
        {
          id: 'edu-blank-1',
          degree: 'Degree or Certification',
          institution: 'College or University Name',
          city: 'City, State',
          startYear: '2021',
          endYear: '2025',
          details: 'Key honors, relevant courses, or academic highlights.',
        },
      ],
      skills: [
        { name: 'Core Skill 1', category: 'technical', level: 'Intermediate' },
        { name: 'Core Skill 2', category: 'tools', level: 'Advanced' },
        { name: 'Communication', category: 'soft', level: 'Advanced' },
      ],
      experience: [
        {
          id: 'exp-blank-1',
          role: 'Job Role / Title',
          company: 'Company or Organization Name',
          city: 'City, State',
          startDate: 'Jan 2024',
          endDate: 'Present',
          isCurrent: true,
          achievements: [
            'Primary achievement or responsibility with measurable outcome.',
            'Secondary contribution to team goals, operations, or technology.',
          ],
        },
      ],
      certifications: ['Relevant License or Credential'],
      languages: ['English'],
      links: [{ label: 'LinkedIn', url: 'https://linkedin.com' }],
    },
  },
];

export const INITIAL_JOB_VACANCIES: JobVacancy[] = [
  {
    id: 'job-1',
    title: 'Junior Web Developer',
    company: 'Vanguard Digital Solutions',
    location: 'New York, NY',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    salary: '$68,000 - $82,000 / yr',
    postedDate: 'Oct 14, 2026',
    deadline: 'Nov 12, 2026',
    department: 'Engineering',
    description:
      'We are looking for an energetic Junior Web Developer to join our client-facing web application team. You will build clean user interfaces using React and modern CSS, collaborate on code reviews, and integrate RESTful backend endpoints.',
    requiredQualifications: [
      'Bachelor’s degree in Computer Science, Web Development, or equivalent practical experience',
      'Demonstrated experience with React, JavaScript (ES6+), and modern CSS (Tailwind CSS or styled systems)',
      'Understanding of Git version control, pull requests, and web accessibility standards',
      'Strong problem-solving instincts and eager attitude to learn from senior engineers',
    ],
    requiredSkills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git & GitHub', 'RESTful APIs'],
    applicationUrl: 'https://example.com/careers/vanguard/junior-web-dev',
    contactEmail: 'talent@vanguarddigital.example.com',
  },
  {
    id: 'job-2',
    title: 'Computer Operator',
    company: 'First National Clearinghouse & Records',
    location: 'Chicago, IL',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    salary: '$44,000 - $52,000 / yr',
    postedDate: 'Oct 18, 2026',
    deadline: 'Nov 08, 2026',
    department: 'IT Operations',
    description:
      'First National Clearinghouse is hiring a full-time Computer Operator to monitor mainframe consoles, execute scheduled nightly batch runs, ensure error-free data entry, and perform peripheral device maintenance.',
    requiredQualifications: [
      'Associate degree or technical diploma in IT, Information Systems, or related field',
      'Typing speed of 60+ WPM with minimum 98% verifiable accuracy',
      'Familiarity with spreadsheet tools (Excel/Google Sheets) and basic operating system commands',
      'Ability to maintain vigilance during production batch runs and log discrepancies promptly',
    ],
    requiredSkills: [
      'High-Speed Typing (75+ WPM)',
      'Data Entry & Data Cleaning',
      'Batch Processing & Job Scheduling',
      'Spreadsheet Formulas (VLOOKUP, Pivot)',
      'Error Log Monitoring',
    ],
    applicationUrl: 'https://example.com/careers/first-national/computer-operator',
    contactEmail: 'hr-ops@firstnationalclearing.example.com',
  },
  {
    id: 'job-3',
    title: 'High School STEM Teacher (Mathematics)',
    company: 'Beacon Hill Charter Academy',
    location: 'Boston, MA',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    salary: '$58,000 - $72,000 / yr',
    postedDate: 'Oct 12, 2026',
    deadline: 'Nov 15, 2026',
    department: 'Instructional Faculty',
    description:
      'Beacon Hill Charter Academy invites applications for a high school Mathematics Teacher. The ideal candidate creates inclusive, highly engaging lessons in Algebra, Geometry, and introductory data principles, actively collaborating with parents and department colleagues.',
    requiredQualifications: [
      'Bachelor’s or Master’s degree in Mathematics, Education, or related STEM field',
      'Valid state teaching certification or eligibility for standard license',
      'Proven ability to differentiate instruction for diverse student learning styles',
      'Strong classroom leadership and proficiency with digital LMS platforms (Google Classroom/Canvas)',
    ],
    requiredSkills: [
      'Curriculum & Lesson Planning',
      'Classroom Management',
      'Differentiated Instruction',
      'Formative & Summative Assessment',
      'Google Classroom & Canvas LMS',
      'Parent-Teacher Communication',
    ],
    applicationUrl: 'https://example.com/careers/beacon-charter/stem-teacher',
    contactEmail: 'recruitment@beaconcharterschool.example.com',
  },
  {
    id: 'job-4',
    title: 'Administrative Office Assistant',
    company: 'Metro Health Care Partners',
    location: 'New York, NY',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    salary: '$46,000 - $55,000 / yr',
    postedDate: 'Oct 19, 2026',
    deadline: 'Nov 20, 2026',
    department: 'Administration',
    description:
      'We are seeking a dependable, organized Administrative Office Assistant to assist with office reception, patient record filing, supply requisition, executive calendar management, and day-to-day administrative correspondence.',
    requiredQualifications: [
      'High school diploma or Associate degree in Business Administration or Office Systems',
      'Proficiency in Microsoft Office Suite (Word, Excel, Outlook) and cloud document management',
      'Polite and professional phone etiquette and interpersonal communication skills',
      'Strong organizational discipline and strict adherence to client privacy and confidentiality',
    ],
    requiredSkills: [
      'Microsoft Office (Word, Excel, PowerPoint)',
      'Calendar & Meeting Scheduling',
      'Document Filing & Archiving',
      'Data Entry & Verification',
      'Client Reception & Telephone Etiquette',
      'Confidentiality & Discretion',
    ],
    applicationUrl: 'https://example.com/careers/metrohealth/office-assistant',
    contactEmail: 'careers@metrohealthcare.example.com',
  },
  {
    id: 'job-5',
    title: 'Junior Frontend Engineer',
    company: 'CloudStream Software Systems',
    location: 'Remote',
    jobType: 'Remote',
    experienceLevel: 'Junior',
    salary: '$72,000 - $86,000 / yr',
    postedDate: 'Oct 17, 2026',
    deadline: 'Nov 25, 2026',
    department: 'Engineering',
    description:
      'Join our distributed team building cloud telemetry dashboards. You will implement new frontend features with React, TypeScript, and Tailwind CSS, work alongside product designers, and write unit tests.',
    requiredQualifications: [
      '1+ years hands-on experience or substantive portfolio of modern React/TypeScript projects',
      'Comfortable with asynchronous state management, REST APIs, and responsive mobile-first layouts',
      'Clear written asynchronous communication skills suited for remote work culture',
    ],
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'RESTful APIs', 'Git & GitHub', 'Agile Teamwork'],
    applicationUrl: 'https://example.com/careers/cloudstream/frontend-jr',
    contactEmail: 'jobs@cloudstreamsoftware.example.com',
  },
  {
    id: 'job-6',
    title: 'Computer Operator & Data Entry Specialist',
    company: 'Apex Global Logistics',
    location: 'Houston, TX',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    salary: '$45,000 - $53,000 / yr',
    postedDate: 'Oct 15, 2026',
    deadline: 'Nov 10, 2026',
    department: 'Data Operations',
    description:
      'Apex Global Logistics seeks a Computer Operator to process domestic shipping manifests, verify freight weights, execute hourly backup scripts, and manage high-volume network laser printers.',
    requiredQualifications: [
      'High school diploma or Associate degree; IT coursework is a plus',
      'Proven keyboarding speed (65+ WPM) and demonstrated accuracy in alphanumeric entry',
      'Experience troubleshooting workstation peripherals like label printers and document scanners',
      'Willingness to work flexible day or evening shifts',
    ],
    requiredSkills: [
      'High-Speed Typing (75+ WPM)',
      'Data Entry & Data Cleaning',
      'Spreadsheet Formulas (VLOOKUP, Pivot)',
      'Printer & Scanner Maintenance',
      'Error Log Monitoring',
    ],
    applicationUrl: 'https://example.com/careers/apex-logistics/data-operator',
    contactEmail: 'dispatch-jobs@apexlogistics.example.com',
  },
  {
    id: 'job-7',
    title: 'Executive Office Assistant',
    company: 'Summit Financial Advisory Group',
    location: 'Boston, MA',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    salary: '$52,000 - $62,000 / yr',
    postedDate: 'Oct 16, 2026',
    deadline: 'Nov 18, 2026',
    department: 'Executive Operations',
    description:
      'Provide dedicated operational support to senior partners. Tasks include managing high-priority client appointments, preparing client binders, routing confidential paperwork, and organizing firm seminars.',
    requiredQualifications: [
      'Associate or Bachelor’s degree in Communications, Business, or English',
      'Previous administrative or front-office customer service experience (1+ years)',
      'High proficiency in Microsoft Excel and PowerPoint slide preparation',
      'Exceptional written correspondence and calendar reconciliation abilities',
    ],
    requiredSkills: [
      'Microsoft Office (Word, Excel, PowerPoint)',
      'Calendar & Meeting Scheduling',
      'Travel & Itinerary Coordination',
      'Written & Oral Communication',
      'Confidentiality & Discretion',
    ],
    applicationUrl: 'https://example.com/careers/summit-advisory/office-assistant',
    contactEmail: 'talent@summitfinancial.example.com',
  },
  {
    id: 'job-8',
    title: 'Middle School STEM & Technology Teacher',
    company: 'Horizon Academy District',
    location: 'Chicago, IL',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    salary: '$56,000 - $69,000 / yr',
    postedDate: 'Oct 11, 2026',
    deadline: 'Nov 22, 2026',
    department: 'Faculty',
    description:
      'Inspire 6th–8th grade students in foundational math and introductory technology concepts. Facilitate hands-on robotics clubs and build creative, inclusive classroom spaces.',
    requiredQualifications: [
      'Bachelor’s degree in Education, Math, Science, or Computer Science',
      'Current state certification or willingness to attain alternative licensure',
      'Enthusiastic mentorship attitude and positive restorative classroom practices',
    ],
    requiredSkills: [
      'Curriculum & Lesson Planning',
      'Classroom Management',
      'Differentiated Instruction',
      'STEM Integration & Labs',
      'Parent-Teacher Communication',
      'Student Mentorship',
    ],
    applicationUrl: 'https://example.com/careers/horizon-academy/stem-teacher',
    contactEmail: 'hr@horizonacademychicago.example.com',
  },
  {
    id: 'job-9',
    title: 'Junior Web & UI Developer',
    company: 'Northstar Creative Studio',
    location: 'New York, NY',
    jobType: 'Full-time',
    experienceLevel: 'Junior',
    salary: '$65,000 - $78,000 / yr',
    postedDate: 'Oct 13, 2026',
    deadline: 'Nov 30, 2026',
    department: 'Design & Code',
    description:
      'Collaborate with brand designers to build marketing landing pages, interactive micro-sites, and headless CMS integrations. Strong emphasis on semantic HTML, Tailwind CSS, and smooth interaction states.',
    requiredQualifications: [
      'Demonstrated portfolio showcasing clean CSS layouts and interactive JavaScript/React components',
      'Attention to typography, spacing, and micro-interactions',
      'Basic knowledge of version control and build tools (Git, Vite)',
    ],
    requiredSkills: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & Accessible DOM', 'Git & GitHub'],
    applicationUrl: 'https://example.com/careers/northstar/ui-developer',
    contactEmail: 'work@northstarstudio.example.com',
  },
  {
    id: 'job-10',
    title: 'Data Operations & Computer Operator',
    company: 'Central Health Data Bank',
    location: 'Houston, TX',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    salary: '$46,000 - $54,000 / yr',
    postedDate: 'Oct 20, 2026',
    deadline: 'Nov 28, 2026',
    department: 'Information Infrastructure',
    description:
      'Maintain continuous uptime for patient registry databases, supervise nightly automated tape archiving, and perform routine audits to verify integrity of transferred hospital records.',
    requiredQualifications: [
      'Familiarity with database verification and error checking routines',
      'Accurate data input capability (65+ WPM) and disciplined compliance mindset',
      'High school diploma or vocational certificate in computer operations',
    ],
    requiredSkills: [
      'High-Speed Typing (75+ WPM)',
      'Data Entry & Data Cleaning',
      'System Backups & Recovery Verification',
      'Batch Processing & Job Scheduling',
      'Error Log Monitoring',
    ],
    applicationUrl: 'https://example.com/careers/centralhealth/data-operator',
    contactEmail: 'recruiting@centralhealthdatabank.example.com',
  },
];

export const CITIES_LIST = [
  'All Locations',
  'Karachi, Pakistan',
  'Lahore, Pakistan',
  'Islamabad, Pakistan',
  'Rawalpindi, Pakistan',
  'Faisalabad, Pakistan',
  'Peshawar, Pakistan',
  'Multan, Pakistan',
  'Remote',
];

export const JOB_ROLES_PRESETS = [
  'All Roles',
  'Junior Web Developer',
  'Computer Operator',
  'Teacher',
  'Office Assistant',
];

export function calculateMatch(profile: JobSeekerProfile, job: JobVacancy): {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  roleMatch: boolean;
  locationMatch: boolean;
} {
  const profileSkillNames = profile.skills.map((s) => s.name.toLowerCase().trim());
  const jobSkillNames = job.requiredSkills.map((s) => s.toLowerCase().trim());

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  job.requiredSkills.forEach((skill) => {
    const isMatch = profileSkillNames.some(
      (ps) => ps.includes(skill.toLowerCase()) || skill.toLowerCase().includes(ps)
    );
    if (isMatch) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillScore =
    job.requiredSkills.length > 0 ? (matchedSkills.length / job.requiredSkills.length) * 70 : 50;

  // Role title match
  const profileRoleWords = (profile.targetRole || profile.title || '').toLowerCase().split(/\s+/);
  const jobTitleLower = job.title.toLowerCase();
  const roleMatch = profileRoleWords.some((w) => w.length > 2 && jobTitleLower.includes(w));
  const roleScore = roleMatch ? 20 : 5;

  // Location match
  const prefCityLower = (profile.preferredCity || profile.location || '').toLowerCase();
  const locationMatch =
    job.location.toLowerCase().includes(prefCityLower) ||
    prefCityLower.includes(job.location.toLowerCase()) ||
    job.location.toLowerCase() === 'remote' ||
    prefCityLower === 'remote';
  const locationScore = locationMatch ? 10 : 0;

  const totalScore = Math.min(100, Math.round(skillScore + roleScore + locationScore));

  return {
    score: totalScore,
    matchedSkills,
    missingSkills,
    roleMatch,
    locationMatch,
  };
}
