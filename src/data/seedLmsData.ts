import {
  Profile,
  Course,
  Channel,
  CourseEnrollment,
  ChannelAccess,
  LearningProgress,
  AdminAuditLog,
  CompanyNewsArticle,
  CompanyVideoItem,
  TopPerformerEntry,
  EmailLogEntry,
} from '../types/lms';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'u0000000-0000-0000-0000-000000000001',
    username: 'admin',
    full_name: 'U Aung Thu',
    email: 'admin@kbzlife.com',
    role: 'admin',
    account_status: 'active',
    employee_id: 'KBZ-ADM-001',
    department: 'LMS Administration & HR Governance',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    must_change_password: true,
    created_at: '2026-01-15T08:00:00Z',
    updated_at: '2026-10-20T10:00:00Z',
    last_sign_in_at: '2026-10-20T21:00:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000002',
    username: 'daw.thida',
    full_name: 'Daw Thida',
    email: 'daw.thida@kbzlife.com',
    role: 'user',
    account_status: 'active',
    employee_id: 'KBZ-UW-104',
    department: 'Underwriting & Policy Issue',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-02-01T09:30:00Z',
    updated_at: '2026-10-18T14:20:00Z',
    last_sign_in_at: '2026-10-20T18:45:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000003',
    username: 'ko.zawmin',
    full_name: 'Ko Zaw Min',
    email: 'ko.zawmin@kbzlife.com',
    role: 'user',
    account_status: 'active',
    employee_id: 'KBZ-AGY-208',
    department: 'Alliance Agency Network (Mandalay Region)',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-03-10T11:15:00Z',
    updated_at: '2026-10-19T08:00:00Z',
    last_sign_in_at: '2026-10-20T16:10:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000004',
    username: 'ma.hninyu',
    full_name: 'Ma Hnin Yu',
    email: 'susp.user@kbzlife.com',
    role: 'user',
    account_status: 'suspended',
    employee_id: 'KBZ-OPS-330',
    department: 'Branch Operations (Yangon South)',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-04-12T13:45:00Z',
    updated_at: '2026-10-15T09:20:00Z',
    last_sign_in_at: '2026-10-14T11:30:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000005',
    username: 'kyaw.zin',
    full_name: 'U Kyaw Zin Lat',
    email: 'kyaw.zin@kbzlife.com',
    role: 'user',
    account_status: 'active',
    employee_id: 'KBZ-BAN-012',
    department: 'Bancassurance Channel Headquarters',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-05-20T10:00:00Z',
    updated_at: '2026-10-17T11:00:00Z',
    last_sign_in_at: '2026-10-20T14:15:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000006',
    username: 'mg.phyowai',
    full_name: 'Mg Phyo Wai',
    email: 'phyo.wai@kbzlife.com',
    role: 'user',
    account_status: 'pending',
    employee_id: 'KBZ-REG-501',
    department: 'Retail Agency Distribution (Naypyitaw)',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-10-20T19:30:00Z',
    updated_at: '2026-10-20T19:30:00Z',
  },
  {
    id: 'u0000000-0000-0000-0000-000000000007',
    username: 'daw.ayemaw',
    full_name: 'Daw Aye Aye Maw',
    email: 'aye.maw@kbzlife.com',
    role: 'user',
    account_status: 'rejected',
    employee_id: 'KBZ-REG-502',
    department: 'External Affiliate Contractor',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    must_change_password: false,
    created_at: '2026-10-19T14:20:00Z',
    updated_at: '2026-10-20T08:15:00Z',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    title: 'KBZLife Foundation: Underwriting & Risk Analysis',
    description:
      'Master the core life underwriting guidelines, standard and substandard medical classifications, financial underwriting thresholds, and ethical appraisal rules for KBZLife Insurance.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    category: 'Underwriting & Actuarial',
    published: true,
    duration_hours: 6.0,
    modules_count: 8,
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-10-10T10:00:00Z',
    learning_outcomes: [
      'Interpret KBZLife standard medical and non-medical underwriting limits',
      'Accurately calculate financial insurance capacity and anti-selection risks',
      'Handle substandard health loading and policy exclusion endorsements',
    ],
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    title: 'AML/CFT & Regulatory Compliance 2026',
    description:
      'Mandatory annual regulatory certification covering Anti-Money Laundering, Counter-Financing of Terrorism, and Central Bank & IBRB supervisory directives.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    category: 'Compliance & Ethics',
    published: true,
    duration_hours: 4.0,
    modules_count: 5,
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-10-12T10:00:00Z',
    learning_outcomes: [
      'Execute robust Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD)',
      'Detect red flags in single-premium policies and large cash transactions',
      'Submit Suspicious Transaction Reports (STR) through approved institutional channels',
    ],
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    title: 'Customer Consultation & Advisory Mastery',
    description:
      'Professional life advisory curriculum focused on empathetic consultative dialogues, family protection needs analysis, and trustworthy claim advisory.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Advisory & Customer Care',
    published: true,
    duration_hours: 5.0,
    modules_count: 6,
    created_at: '2026-02-05T10:00:00Z',
    updated_at: '2026-10-15T10:00:00Z',
    learning_outcomes: [
      'Conduct holistic family protection and education savings needs audits',
      'Articulate policy benefits and exclusions in transparent Myanmar language',
      'Provide compassionate, efficient support during beneficiary claims processing',
    ],
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    title: 'Group Life & Corporate Welfare Solutions',
    description:
      'Structuring comprehensive group term life, executive health riders, and corporate employee welfare schemes for institutional clients across Myanmar.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'Corporate Solutions',
    published: true,
    duration_hours: 3.5,
    modules_count: 4,
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-10-18T10:00:00Z',
    learning_outcomes: [
      'Design tailored group life proposals for corporate and NGO workforces',
      'Calculate group risk mortality pooling and claims retention limits',
      'Manage annual policy renewal audits and employee roster adjustments',
    ],
  },
];

export const INITIAL_CHANNELS: Channel[] = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    course_id: 'c0000000-0000-0000-0000-000000000001',
    title: 'Bancassurance Channel Mastery',
    description:
      'Dedicated learning stream for KBZ Bank branch relationship executives, bancassurance specialists, and customer-facing advisors.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    published: true,
    order_index: 1,
    tags: ['Bancassurance', 'KBZ Bank Branch', 'Customer Consultation'],
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-10-12T10:00:00Z',
    key_highlights: [
      'In-branch ethical presentation guidelines',
      'Seamless digital enrollment via bank partner terminals',
      'Immediate referral escalation and advisor synchronization',
    ],
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    course_id: 'c0000000-0000-0000-0000-000000000003',
    title: 'Alliance Channel Growth & Partner Ethics',
    description:
      'Specialized curriculum for licensed agency leaders, regional business associates, and independent life protection consultants.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    published: true,
    order_index: 2,
    tags: ['Alliance Channel', 'Agency Leadership', 'Advisor Honor Code'],
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-10-14T10:00:00Z',
    key_highlights: [
      'Agency team coaching and ethical recruitment',
      'Regional community outreach workshops',
      'Long-term client relationship governance and retention',
    ],
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    course_id: 'c0000000-0000-0000-0000-000000000004',
    title: 'Corporate Channel & Key Account Governance',
    description:
      'Advanced executive briefings for enterprise sales managers handling enterprise conglomerates, manufacturing plants, and financial institutions.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    published: true,
    order_index: 3,
    tags: ['Corporate Channel', 'Group Life', 'Key Accounts'],
    created_at: '2026-03-05T10:00:00Z',
    updated_at: '2026-10-16T10:00:00Z',
    key_highlights: [
      'Corporate tendering and customized benefit design',
      'Executive service level agreements (SLAs)',
      'Enterprise group claims turnaround benchmarks',
    ],
  },
  {
    id: 'a0000000-0000-0000-0000-000000000004',
    course_id: 'c0000000-0000-0000-0000-000000000002',
    title: 'Compliance & Ethics Briefing Channel',
    description:
      'Weekly micro-briefings from KBZLife legal counsel covering updated sanctions, AML typologies, and data confidentiality.',
    thumbnail_url:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    published: true,
    order_index: 4,
    tags: ['Regulatory Briefings', 'Ethics Case Studies', 'Legal Notices'],
    created_at: '2026-03-20T10:00:00Z',
    updated_at: '2026-10-18T10:00:00Z',
    key_highlights: [
      'Real-world insurance fraud case studies',
      'Confidential whistleblowing channels and protections',
      'Quarterly compliance assessment milestones',
    ],
  },
];

export const INITIAL_NEWS: CompanyNewsArticle[] = [
  {
    id: 'n0000000-0000-0000-0000-000000000001',
    title: 'KBZLife Launches Enhanced Internal Learning Portal for Nationwide Operations',
    summary:
      'A state-of-the-art centralized knowledge portal goes live today, uniting employee learning across life underwriting, customer consultation, and compliance.',
    content: [
      'Yangon, Myanmar — KBZLife Insurance has officially introduced the first phase of its internal Employee Learning Portal. This digital ecosystem provides streamlined access to corporate orientation, policy guidelines, actuarial foundations, and executive leadership directives.',
      'Designed to elevate professional mastery across all branches, the portal serves as the single source of truth for organizational culture, product intelligence, and professional ethics.',
      'In his leadership address, the CEO underscored that continuous daily learning and proactive mindset transformation remain the cornerstone of delivering empathetic, reliable life protection to families throughout Myanmar.',
    ],
    cover_image_url:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    category: 'Corporate Milestone',
    status: 'published',
    is_featured: true,
    author_name: 'Internal Communications Desk',
    read_time_minutes: 3,
    published_at: '2026-10-20T08:00:00Z',
    created_at: '2026-10-20T08:00:00Z',
    updated_at: '2026-10-20T08:00:00Z',
  },
  {
    id: 'n0000000-0000-0000-0000-000000000002',
    title: 'Customer First Initiative: Accelerating Claims Settlement and Empathy Standards',
    summary:
      'KBZLife reinforces claims turnaround commitments, empowering branch relationship managers with responsive digital processing.',
    content: [
      'As part of KBZLife’s strategic aspirations for national service excellence, our operational governance council has updated underwriting and claims response protocols.',
      'Employees across regional centers will undergo dedicated refresher workshops this quarter focusing on empathetic claimant communication and accelerated document validation.',
    ],
    cover_image_url:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    category: 'Operations',
    status: 'published',
    is_featured: false,
    author_name: 'Claims Governance Council',
    read_time_minutes: 2,
    published_at: '2026-10-18T10:00:00Z',
    created_at: '2026-10-18T10:00:00Z',
    updated_at: '2026-10-18T10:00:00Z',
  },
  {
    id: 'n0000000-0000-0000-0000-000000000003',
    title: 'Bancassurance & Alliance Channel Partnership Expansion for Q4 2026',
    summary:
      'Strengthening synergy between KBZ Bank branch networks and certified life advisors to bring accessible term life plans to rural and urban communities.',
    content: [
      'KBZLife announces an expanded joint enablement initiative with KBZ Bank branch relationship teams. Under this framework, customer advisory kiosks and digital quotation tools will be deployed across 120 key branch hubs.',
      'Branch personnel will complete accredited product certifications on whole life, endowment, and critical illness riders before year-end.',
    ],
    cover_image_url:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    category: 'Channel Growth',
    status: 'published',
    is_featured: false,
    author_name: 'Partnership Steering Committee',
    read_time_minutes: 4,
    published_at: '2026-10-15T09:30:00Z',
    created_at: '2026-10-15T09:30:00Z',
    updated_at: '2026-10-15T09:30:00Z',
  },
];

export const INITIAL_VIDEOS: CompanyVideoItem[] = [
  {
    id: 'v0000000-0000-0000-0000-000000000001',
    title: 'CEO Address: Strategic Vision and Mindset for Life Protection in Myanmar',
    description:
      'Executive briefing delivered by the CEO on corporate values, digital transformation, and our daily commitment to policyholders and families.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    category: 'Leadership Address',
    display_order: 1,
    duration: '03:32',
    status: 'published',
    published_at: '2026-10-15T10:00:00Z',
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-15T10:00:00Z',
  },
  {
    id: 'v0000000-0000-0000-0000-000000000002',
    title: 'Underwriting Protocols & Medical Risk Assessment Fundamentals (Vimeo Broadcast)',
    description:
      'Chief Underwriter provides step-by-step guidance on standard proposal appraisal, medical questionnaire validation, and anti-selection prevention.',
    video_url: 'https://vimeo.com/76979871',
    thumbnail_url:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    category: 'Training & Ethics',
    display_order: 2,
    duration: '09:55',
    status: 'published',
    published_at: '2026-10-12T11:00:00Z',
    created_at: '2026-10-12T11:00:00Z',
    updated_at: '2026-10-12T11:00:00Z',
  },
  {
    id: 'v0000000-0000-0000-0000-000000000003',
    title: 'Customer First & Empathy Standards (Direct Video Stream)',
    description:
      'High-definition corporate documentary demonstration demonstrating internal customer care and claims assistance standards.',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail_url:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    category: 'Operational Updates',
    display_order: 3,
    duration: '09:56',
    status: 'published',
    published_at: '2026-10-08T09:00:00Z',
    created_at: '2026-10-08T09:00:00Z',
    updated_at: '2026-10-08T09:00:00Z',
  },
];

export const INITIAL_TOP_PERFORMERS: TopPerformerEntry[] = [
  {
    id: 'tp000000-0000-0000-0000-000000000001',
    employee_name: 'Daw May Thu Khaing',
    employee_title: 'Senior Agency Leader',
    department: 'Mandalay Central Agency',
    channel: 'Alliance Channel',
    achievement_title: 'Top Life Advisor — Highest Policy Retention Rate',
    achievement_description:
      'Achieved a 98.4% persistency rate while onboarding 140 new family protection policies across upper Myanmar.',
    image_url:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    recognition_period: 'January 2026',
    month_index: 1,
    ranking: 1,
    award_date: '2026-01-31',
    status: 'published',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-01T10:00:00Z',
  },
  {
    id: 'tp000000-0000-0000-0000-000000000002',
    employee_name: 'U Kyaw Zin Lat',
    employee_title: 'Bancassurance Branch Executive',
    department: 'KBZ Bank Kyauktada Branch',
    channel: 'Bancassurance Channel',
    achievement_title: 'Top Bank Branch Production & Customer Satisfaction',
    achievement_description:
      'Surpassed annual endowment protection targets by 135% through transparent customer consultation.',
    image_url:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    recognition_period: 'January 2026',
    month_index: 1,
    ranking: 1,
    award_date: '2026-01-31',
    status: 'published',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-01T10:00:00Z',
  },
  {
    id: 'tp000000-0000-0000-0000-000000000003',
    employee_name: 'Daw Khin Sandar',
    employee_title: 'Corporate Account Manager',
    department: 'Headquarters Enterprise Risk Group',
    channel: 'Corporate Channel',
    achievement_title: 'Largest Group Life Onboarding',
    achievement_description:
      'Structured group life and medical rider coverage for a 3,200-employee manufacturing conglomerate.',
    image_url:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    recognition_period: 'January 2026',
    month_index: 1,
    ranking: 1,
    award_date: '2026-01-31',
    status: 'published',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-02-01T10:00:00Z',
  },
  {
    id: 'tp000000-0000-0000-0000-000000000004',
    employee_name: 'Ko Thet Naing Oo',
    employee_title: 'Senior Field Consultant',
    department: 'Taunggyi Regional Center',
    channel: 'Alliance Channel',
    achievement_title: 'Outstanding Regional Outreach & Family Protection',
    achievement_description:
      'Delivered educational life protection seminars across Shan State, protecting 110 farming households.',
    image_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    recognition_period: 'February 2026',
    month_index: 2,
    ranking: 1,
    award_date: '2026-02-28',
    status: 'published',
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },
];

export const INITIAL_ENROLLMENTS: CourseEnrollment[] = [
  {
    id: 'e0000000-0000-0000-0000-000000000001',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    course_id: 'c0000000-0000-0000-0000-000000000001', // Foundation Underwriting
    status: 'enrolled',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-01T10:00:00Z',
    expires_at: '2027-09-01T10:00:00Z',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000002',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    course_id: 'c0000000-0000-0000-0000-000000000002', // AML/CFT
    status: 'enrolled',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000003',
    user_id: 'u0000000-0000-0000-0000-000000000003', // Ko Zaw Min
    course_id: 'c0000000-0000-0000-0000-000000000003', // Customer Consultation
    status: 'enrolled',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-10T11:00:00Z',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000004',
    user_id: 'u0000000-0000-0000-0000-000000000004', // Ma Hnin Yu (suspended)
    course_id: 'c0000000-0000-0000-0000-000000000001',
    status: 'enrolled',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-08-01T10:00:00Z',
    restriction_note: 'Under administrative review for compliance verification',
  },
  {
    id: 'e0000000-0000-0000-0000-000000000005',
    user_id: 'u0000000-0000-0000-0000-000000000005', // U Kyaw Zin Lat
    course_id: 'c0000000-0000-0000-0000-000000000004', // Corporate Welfare
    status: 'enrolled',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-15T10:00:00Z',
  },
];

export const INITIAL_CHANNEL_ACCESS: ChannelAccess[] = [
  {
    id: 'ca000000-0000-0000-0000-000000000001',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    channel_id: 'a0000000-0000-0000-0000-000000000001', // Bancassurance
    status: 'granted',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'ca000000-0000-0000-0000-000000000002',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    channel_id: 'a0000000-0000-0000-0000-000000000004', // Compliance Briefing
    status: 'granted',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'ca000000-0000-0000-0000-000000000003',
    user_id: 'u0000000-0000-0000-0000-000000000003', // Ko Zaw Min
    channel_id: 'a0000000-0000-0000-0000-000000000002', // Alliance Channel
    status: 'granted',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-10T11:00:00Z',
  },
  {
    id: 'ca000000-0000-0000-0000-000000000004',
    user_id: 'u0000000-0000-0000-0000-000000000005', // U Kyaw Zin Lat
    channel_id: 'a0000000-0000-0000-0000-000000000003', // Corporate Channel
    status: 'granted',
    assigned_by: 'u0000000-0000-0000-0000-000000000001',
    assigned_at: '2026-09-15T10:00:00Z',
  },
];

export const INITIAL_PROGRESS: LearningProgress[] = [
  {
    id: 'p0000000-0000-0000-0000-000000000001',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    course_id: 'c0000000-0000-0000-0000-000000000001',
    progress_percentage: 65,
    completion_status: 'in_progress',
    last_accessed_at: '2026-10-20T17:30:00Z',
    updated_at: '2026-10-20T17:30:00Z',
    completed_modules: [
      'Module 1: Principles of Risk',
      'Module 2: Medical Underwriting Tables',
      'Module 3: Financial Capacity Assessment',
    ],
  },
  {
    id: 'p0000000-0000-0000-0000-000000000002',
    user_id: 'u0000000-0000-0000-0000-000000000002', // Daw Thida
    course_id: 'c0000000-0000-0000-0000-000000000002',
    progress_percentage: 100,
    completion_status: 'completed',
    last_accessed_at: '2026-10-18T14:00:00Z',
    updated_at: '2026-10-18T14:00:00Z',
    completed_modules: [
      'Module 1: AML Foundations',
      'Module 2: CDD Protocols',
      'Module 3: Reporting Suspicious Flows',
      'Module 4: Final Certification Exam',
    ],
  },
  {
    id: 'p0000000-0000-0000-0000-000000000003',
    user_id: 'u0000000-0000-0000-0000-000000000003', // Ko Zaw Min
    course_id: 'c0000000-0000-0000-0000-000000000003',
    progress_percentage: 30,
    completion_status: 'in_progress',
    last_accessed_at: '2026-10-19T08:15:00Z',
    updated_at: '2026-10-19T08:15:00Z',
    completed_modules: [
      'Module 1: Client Consultation Fundamentals',
      'Module 2: Family Protection Needs Analysis',
    ],
  },
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'l0000000-0000-0000-0000-000000000001',
    admin_user_id: 'u0000000-0000-0000-0000-000000000001',
    admin_name: 'U Aung Thu',
    target_user_id: 'u0000000-0000-0000-0000-000000000004',
    target_user_name: 'Ma Hnin Yu',
    action: 'user_status_changed',
    entity_type: 'user',
    entity_id: 'u0000000-0000-0000-0000-000000000004',
    details: 'Account status set to suspended pending annual AML compliance re-certification.',
    created_at: '2026-10-15T09:20:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000002',
    admin_user_id: 'u0000000-0000-0000-0000-000000000001',
    admin_name: 'U Aung Thu',
    target_user_id: 'u0000000-0000-0000-0000-000000000002',
    target_user_name: 'Daw Thida',
    action: 'course_assigned',
    entity_type: 'course',
    entity_id: 'c0000000-0000-0000-0000-000000000001',
    details: 'Assigned course "KBZLife Foundation: Underwriting & Risk Analysis" with 1-year validity.',
    created_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000003',
    admin_user_id: 'u0000000-0000-0000-0000-000000000001',
    admin_name: 'U Aung Thu',
    target_user_id: 'u0000000-0000-0000-0000-000000000002',
    target_user_name: 'Daw Thida',
    action: 'channel_granted',
    entity_type: 'channel',
    entity_id: 'a0000000-0000-0000-0000-000000000001',
    details: 'Granted access to "Bancassurance Channel Mastery" stream.',
    created_at: '2026-09-01T10:05:00Z',
  },
  {
    id: 'l0000000-0000-0000-0000-000000000004',
    admin_user_id: 'u0000000-0000-0000-0000-000000000001',
    admin_name: 'U Aung Thu',
    target_user_id: 'u0000000-0000-0000-0000-000000000003',
    target_user_name: 'Ko Zaw Min',
    action: 'course_assigned',
    entity_type: 'course',
    entity_id: 'c0000000-0000-0000-0000-000000000003',
    details: 'Assigned "Customer Consultation & Advisory Mastery" for regional agency rollout.',
    created_at: '2026-09-10T11:00:00Z',
  },
];

export const INITIAL_EMAIL_LOGS: EmailLogEntry[] = [
  {
    id: 'eml_001',
    recipient: 'daw.thida@kbzlife.com',
    subject: 'Welcome to KBZLife Employee Learning Portal',
    template: 'user_invitation',
    status: 'sent',
    created_at: '2026-02-01T09:30:00Z',
  },
  {
    id: 'eml_002',
    recipient: 'ko.zawmin@kbzlife.com',
    subject: 'Welcome to KBZLife Employee Learning Portal',
    template: 'user_invitation',
    status: 'sent',
    created_at: '2026-03-10T11:15:00Z',
  },
];
