// All website copy lives here so it can be edited without touching layout code.
// Items marked `placeholder: true` must be confirmed by the PAIRO team before launch
// (see section 9 of the content architecture document).

import {
  Banknote,
  Boxes,
  BarChart3,
  Briefcase,
  FileCheck2,
  FolderKanban,
  ShoppingCart,
  Users,
  Sparkles,
  ScanText,
  Workflow,
  TrendingUp,
  FileBarChart,
  Link2,
  Database,
  Eye,
  Layers,
  MousePointerClick,
  Building2,
  CreditCard,
  Mail,
  Store,
  Sheet,
  Landmark,
  Settings2,
  ArrowRightLeft,
  GraduationCap,
  LifeBuoy,
  Rocket,
  Contact,
  Cloud,
} from 'lucide-react'

export const company = {
  name: 'PAIRO',
  legalName: 'PairoApps',
  tagline: 'Business, Connected. Intelligence, Built In.',
  promise: 'One connected business. Smarter decisions. Better growth.',
  description:
    'PAIRO is an AI-powered ERP platform that brings finance, operations, people and processes into one connected system for growing businesses.',
  // placeholder: replace with verified contact details
  email: 'hello@pairoapps.com',
  phone: '+91 00000 00000',
  address: 'Office address to be confirmed',
  hours: 'Monday – Friday, 9:00 – 18:00',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const tickerWords = [
  'Finance',
  'Inventory',
  'Sales & CRM',
  'Procurement',
  'People',
  'Tax & Compliance',
  'Projects',
  'Analytics',
  'Automation',
  'Growth',
]

// placeholder: validate the final module list with the product team
export const modules = [
  {
    id: 'finance',
    icon: Banknote,
    name: 'Finance & Accounting',
    short: 'Ledgers, receivables, payables and reporting in one place.',
    detail:
      'Keep every transaction, ledger and reconciliation in one source of truth. Sales, purchases and payroll post into finance automatically, so the numbers are ready when you need them.',
    points: ['General ledger & journals', 'Receivables and payables', 'Bank reconciliation', 'Financial statements'],
  },
  {
    id: 'sales',
    icon: Briefcase,
    name: 'Sales & CRM',
    short: 'From first conversation to final invoice.',
    detail:
      'Track leads, quotes and orders alongside the customer history. When a deal closes, the order, the stock reservation and the invoice follow without re-keying.',
    points: ['Leads and pipeline', 'Quotations and orders', 'Customer history', 'Invoicing'],
  },
  {
    id: 'purchase',
    icon: ShoppingCart,
    name: 'Purchase Management',
    short: 'Requests, approvals and purchase orders that stay in step.',
    detail:
      'Raise requests, route approvals and issue purchase orders with supplier terms at hand. Goods received update stock and payables at the same time.',
    points: ['Purchase requests', 'Approval workflows', 'Supplier management', 'Goods received'],
  },
  {
    id: 'inventory',
    icon: Boxes,
    name: 'Inventory Management',
    short: 'Live stock across every location.',
    detail:
      'See stock levels, movements and valuation as they change. Reorder points and transfers keep the right items where they are needed.',
    points: ['Multi-location stock', 'Stock movements', 'Reorder levels', 'Valuation'],
  },
  {
    id: 'hr',
    icon: Users,
    name: 'HR Management',
    short: 'People, attendance and payroll, connected to finance.',
    detail:
      'Manage employee records, attendance and leave in one place. Payroll runs from the same data and posts straight into the books.',
    points: ['Employee records', 'Attendance & leave', 'Payroll', 'Self-service'],
  },
  {
    id: 'tax',
    icon: FileCheck2,
    name: 'Tax & Compliance',
    short: 'Tax-ready records from every transaction.',
    detail:
      'Apply tax rules at the point of transaction and keep records organised for filing and audit, so compliance is part of daily work rather than a month-end scramble.',
    points: ['Tax configuration', 'Compliance reports', 'Audit trail', 'Filing support'],
  },
  {
    id: 'projects',
    icon: FolderKanban,
    name: 'Projects & Budgets',
    short: 'Plan work and track spend against budget.',
    detail:
      'Set budgets, assign resources and track costs as they happen, with project spend linked directly to purchasing and finance.',
    points: ['Budget planning', 'Cost tracking', 'Resource allocation', 'Project reports'],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    name: 'Analytics & Reports',
    short: 'Clear dashboards built on live data.',
    detail:
      'Because every module shares one data model, reports draw from the full picture. Build dashboards for each team and share them in a click.',
    points: ['Live dashboards', 'Custom reports', 'Scheduled exports', 'Role-based views'],
  },
]

// placeholder: include only AI capabilities confirmed by the product team
// `fill` (0–1) sets the bar in the AI section; without it the bar shows the item's position in the list.
export const aiCapabilities = [
  {
    icon: Sparkles,
    title: 'AI-powered assistance',
    text: 'Ask questions about your business in plain language and get answers drawn from your own data.',
    fill: 0.95,
  },
  {
    icon: ScanText,
    title: 'Intelligent document processing',
    text: 'Capture details from invoices and receipts so teams spend less time on manual entry.',
    fill: 0.9,
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    text: 'Automate supported, repetitive steps such as approvals, reminders and recurring entries.',
    fill: 0.85,
  },
  {
    icon: TrendingUp,
    title: 'Predictive insights',
    text: 'Spot trends in sales, stock and cash flow early, so decisions are made ahead of time.',
  },
  {
    icon: FileBarChart,
    title: 'Automated reporting',
    text: 'Generate recurring reports on schedule and send them to the people who need them.',
  },
]

export const steps = [
  { title: 'Connect', text: 'Bring your business operations onto one platform.' },
  { title: 'Centralise', text: 'Keep information in a single, shared source of truth.' },
  { title: 'Automate', text: 'Let supported workflows run without manual effort.' },
  { title: 'Understand', text: 'Access meaningful insights on live data.' },
  { title: 'Decide', text: 'Make informed decisions with confidence.' },
]

// `highlight` is a phrase from `text` shown in the accent colour; `to` is where the card's arrow leads.
export const differentiators = [
  {
    icon: Link2,
    title: 'Connected business management',
    text: 'Every function shares one data model, so work flows between teams instead of between spreadsheets.',
    highlight: 'one data model',
    to: '/services#modules',
  },
  {
    icon: Sparkles,
    title: 'Intelligent automation',
    text: 'Routine tasks run in the background, leaving your people free for the work that needs judgement.',
    highlight: 'Routine tasks run in the background',
    to: '/services#ai',
  },
  {
    icon: Database,
    title: 'Centralised information',
    text: 'One place for transactions, records and documents, with a clear history behind every number.',
    highlight: 'a clear history behind every number',
    to: '/services#modules',
  },
  {
    icon: Eye,
    title: 'Operational visibility',
    text: 'See what is happening across finance, stock and people as it happens, not at month end.',
    highlight: 'as it happens',
    to: '/services#modules',
  },
  {
    icon: Layers,
    title: 'Flexible, scalable architecture',
    text: 'Start with the modules you need today and add more as the business grows.',
    highlight: 'add more as the business grows',
    to: '/pricing',
  },
  {
    icon: MousePointerClick,
    title: 'User-friendly experience',
    text: 'A calm, consistent interface that teams can pick up quickly and use every day.',
    highlight: 'pick up quickly',
    to: '/contact?intent=demo',
  },
]

// placeholder: replace with real, approved customer testimonials
export const testimonials = [
  {
    quote:
      'We closed our books in days instead of weeks once finance and inventory were working from the same numbers.',
    name: 'Finance Director',
    company: 'Manufacturing company',
    placeholder: true,
  },
  {
    quote:
      'Purchase approvals used to live in email threads. Now every request has an owner, a status and a history.',
    name: 'Operations Manager',
    company: 'Distribution business',
    placeholder: true,
  },
  {
    quote:
      'Our team finally has one place to look. The dashboards answer questions that used to take a full afternoon.',
    name: 'Managing Director',
    company: 'Retail group',
    placeholder: true,
  },
]

// placeholder: replace categories with confirmed integrations
export const integrations = [
  { icon: Landmark, name: 'Banking' },
  { icon: CreditCard, name: 'Payment gateways' },
  { icon: Store, name: 'E-commerce' },
  { icon: Mail, name: 'Email & calendar' },
  { icon: Sheet, name: 'Spreadsheets' },
  { icon: Building2, name: 'Tax portals' },
  { icon: Contact, name: 'CRM tools' },
  { icon: Cloud, name: 'Cloud storage' },
]

export const philosophy = [
  { title: 'Connection', text: 'Bring business functions together so information moves with the work.' },
  { title: 'Intelligence', text: 'Make technology more useful, so it supports decisions rather than adding steps.' },
  { title: 'Progress', text: 'Help organisations improve continuously, one better process at a time.' },
]

// placeholder: validate service areas
export const services = [
  { icon: Rocket, title: 'ERP implementation', text: 'A structured roll-out plan, from discovery to go-live, shaped around how your teams work.' },
  { icon: Settings2, title: 'System configuration', text: 'Workflows, approvals, roles and reports set up to match your processes.' },
  { icon: ArrowRightLeft, title: 'Data migration', text: 'Careful transfer of masters, balances and history from your existing systems.' },
  { icon: Link2, title: 'Third-party integrations', text: 'Connect PAIRO with the tools your business already relies on.' },
  { icon: GraduationCap, title: 'User training', text: 'Role-based training so every team member is confident from day one.' },
  { icon: LifeBuoy, title: 'Technical support', text: 'Responsive help from a team that knows your setup.' },
]

// placeholder: proposed plans, not confirmed commercial packages
export const plans = [
  {
    name: 'Essential',
    audience: 'For small businesses',
    text: 'The core modules to run finance, sales and stock from one place.',
    features: ['Finance & Accounting', 'Sales & Invoicing', 'Inventory', 'Standard reports', 'Email support'],
  },
  {
    name: 'Professional',
    audience: 'For growing businesses',
    text: 'More modules, automation and insight as your teams and volumes grow.',
    features: ['Everything in Essential', 'Purchase & HR modules', 'Workflow automation', 'AI-powered assistance', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    audience: 'For large or complex organisations',
    text: 'A tailored ecosystem for multiple entities, locations and integrations.',
    features: ['Everything in Professional', 'Multi-entity & multi-location', 'Custom integrations', 'Dedicated implementation', 'Account manager'],
  },
]

export const pricingFactors = [
  'Number of users',
  'Selected ERP modules',
  'Implementation requirements',
  'Integrations',
  'Support requirements',
]

export const faqs = [
  {
    q: 'How is ERP pricing calculated?',
    a: 'Pricing depends on the number of users, the modules you select, implementation needs, integrations and the level of support. We prepare a clear quote after understanding your requirements.',
  },
  {
    q: 'Can I choose individual modules?',
    a: 'Yes. You can start with the modules you need now and add more as your business grows.',
  },
  {
    q: 'Is implementation included?',
    a: 'Implementation is scoped with each plan. Your quote will set out exactly what is included, from configuration to data migration and training.',
  },
  {
    q: 'Can I upgrade my plan?',
    a: 'Yes. You can move to a higher plan or add modules and users at any time.',
  },
  {
    q: 'Does PAIRO support integrations?',
    a: 'PAIRO can connect with the tools your business relies on. Tell us what you use and we will confirm the options available.',
  },
  {
    q: 'Is product training available?',
    a: 'Yes. Role-based training is available so every team can use PAIRO confidently.',
  },
]

export const insightCategories = [
  'ERP & Enterprise Technology',
  'Artificial Intelligence',
  'Business Automation',
  'Finance & Accounting',
  'Operations & Management',
  'Industry Perspectives',
]

// placeholder: article bodies are outlines until the full articles are written
export const articles = [
  {
    slug: 'what-is-ai-powered-erp-software',
    title: 'What Is AI-Powered ERP Software?',
    category: 'Artificial Intelligence',
    excerpt: 'How intelligence built into an ERP changes the way businesses record, understand and act on their data.',
    readTime: '6 min read',
    featured: true,
    outline: ['What an ERP does', 'Where AI fits in', 'Practical examples', 'Questions to ask before you choose'],
  },
  {
    slug: 'how-erp-improves-business-efficiency',
    title: 'How ERP Software Helps Businesses Improve Efficiency',
    category: 'ERP & Enterprise Technology',
    excerpt: 'Fewer hand-offs, less re-keying and one version of the truth: where the efficiency gains really come from.',
    readTime: '5 min read',
    featured: true,
    outline: ['The cost of disconnected systems', 'Shared data, shared work', 'Measuring the difference'],
  },
  {
    slug: 'traditional-erp-vs-ai-powered-erp',
    title: 'Traditional ERP vs. AI-Powered ERP',
    category: 'ERP & Enterprise Technology',
    excerpt: 'A clear comparison of what changes, and what stays the same, when intelligence is built into the system.',
    readTime: '7 min read',
    featured: true,
    outline: ['Recording vs. understanding', 'Automation in practice', 'Choosing the right fit'],
  },
  {
    slug: 'signs-your-business-needs-an-erp',
    title: '7 Signs Your Business Needs an ERP System',
    category: 'Operations & Management',
    excerpt: 'From spreadsheet sprawl to slow month-end closes, the signals that it is time for a connected system.',
    readTime: '5 min read',
    outline: ['Spreadsheet sprawl', 'Slow closes', 'Stock surprises', 'Approval bottlenecks'],
  },
  {
    slug: 'how-business-automation-reduces-manual-work',
    title: 'How Business Automation Reduces Manual Work',
    category: 'Business Automation',
    excerpt: 'Which tasks are worth automating first, and how to keep people in control of the process.',
    readTime: '6 min read',
    outline: ['Finding repetitive work', 'Automating safely', 'Keeping people in the loop'],
  },
  {
    slug: 'why-connected-business-systems-matter',
    title: 'Why Connected Business Systems Matter',
    category: 'Operations & Management',
    excerpt: 'When finance, stock and people share one data model, teams stop reconciling and start deciding.',
    readTime: '4 min read',
    outline: ['The reconciliation trap', 'One data model', 'Visibility across teams'],
  },
  {
    slug: 'erp-implementation-complete-guide',
    title: 'ERP Implementation: A Complete Guide',
    category: 'ERP & Enterprise Technology',
    excerpt: 'A practical walkthrough from discovery to go-live, with the decisions that matter at each stage.',
    readTime: '10 min read',
    outline: ['Discovery', 'Configuration', 'Data migration', 'Training', 'Go-live and beyond'],
  },
  {
    slug: 'how-to-choose-the-right-erp-software',
    title: 'How to Choose the Right ERP Software',
    category: 'Finance & Accounting',
    excerpt: 'The criteria, questions and trade-offs to weigh when selecting an ERP for a growing business.',
    readTime: '8 min read',
    outline: ['Start with your processes', 'Evaluate the ecosystem', 'Plan for growth', 'Total cost of ownership'],
  },
]

export type Module = (typeof modules)[number]
export type Article = (typeof articles)[number]
export type Integration = (typeof integrations)[number]

export const industries = [
  'Manufacturing',
  'Distribution & Wholesale',
  'Retail',
  'Professional Services',
  'Construction',
  'Healthcare',
  'Other',
]
