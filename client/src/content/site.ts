// All website copy lives here (and in solutions.ts / parrot.ts) so it can be edited
// without touching layout code. Source: "PairO Website Content & Content Architecture"
// (modern business edition, 13 November 2026).
// Items marked `placeholder` must be confirmed by the PairO team before launch.

export const company = {
  name: 'PairO',
  legalName: 'PairO',
  tagline: 'The agentic ERP built for Indian business',
  promise: 'The agentic ERP built for Indian business.',
  description:
    'PairO is the agentic ERP for Indian businesses: a dedicated accountant at work for your business around the clock, fully automated, 24×7.',
  // placeholder: the source document shows [email] and [phone]. Replace with approved contact details.
  email: '[email]',
  phone: '[phone]',
  address: 'Office address to be confirmed',
  hours: 'Monday – Friday, 9:00 – 18:00',
  social: [] as { label: string; href: string }[],
}

// placeholder: the sign-in destination is not defined in the source document.
export const signIn = { label: 'Sign in', to: '/' }
export const demoLink = '/contact?intent=demo'

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Agentic solutions', to: '/solutions' },
  { label: 'Parrot AI', to: '/parrot-ai' },
  { label: 'Health Check', to: '/health-check' },
  { label: 'Compliance', to: '/compliance' },
  { label: 'Pricing', to: '/pricing' },
]

export const globalCta = {
  title: 'Put the accountant that never stops to work for you.',
  primary: { label: 'Start for free', to: '/pricing#packs' },
  secondary: { label: 'View pricing', to: '/pricing#compare' },
}

/* ------------------------------------------------------------------ Home */

export const home = {
  eyebrow: 'The agentic ERP built for Indian business',
  title: ['The agentic', 'accountant that', 'closes your books.'],
  lead: 'Fully automated, 24×7. A dedicated accountant at work for your business around the clock.',
  onboardingStats: [
    { value: '3 days', label: 'migration' },
    { value: '2 weeks', label: 'to go live' },
    { value: 'Day 0', label: 'month-end close' },
  ],
  agentTicker: ['Banking', 'Bills', 'Sales', 'Collections', 'GST & TDS', 'Audit'],
  liveAgent: { label: 'PairO agent', status: 'at work · 24×7', event: 'Banking agent · 08:02', detail: '58 bank lines matched' },
  agentResults: [
    { agent: 'Banking agent', value: '58', label: 'bank lines matched' },
    { agent: 'Collection agent', value: '₹2.3 L', label: 'collected today' },
    { agent: 'Audit agent', value: '70/70', label: 'checks clear' },
  ],
  builtBy: 'Built by accountants, for business owners and accountants alike.',
}

export const dualRole = {
  eyebrow: 'One agent · a dual role',
  title: 'Your accountant. Your auditor. One agent.',
  accountant: {
    role: 'Accountant',
    caption: 'gets the work done',
    items: ['Raises and posts every sales invoice', 'Books every supplier bill', 'Matches every bank line', 'Brings the month to a close'],
  },
  auditor: {
    role: 'Auditor',
    caption: 'verifies it in real time',
    items: ['GST rate and place of supply verified', 'Duplicate and blocked ITC flagged', 'Double payments prevented', 'Health Check · 70 checks'],
  },
  outcomes: ['Verified', 'Complete audit', 'Audit trail', 'No year-end rush'],
}

export const agentDay = {
  eyebrow: 'The agentic accountant · a coordinated team of agents',
  title: 'One business day. Zero follow-ups.',
  events: [
    { time: '08:02', agent: 'Banking agent', text: '58 bank lines matched' },
    { time: '08:40', agent: 'Bills agent', text: '6 bills captured from photos' },
    { time: '09:00', agent: 'Sales agent', text: '14 invoices raised and sent' },
    { time: '10:15', agent: 'Approval agent', text: '1 decision awaiting you', needsYou: true },
    { time: '18:00', agent: 'Close agent', text: 'Day 0 books ready to close' },
  ],
  summary: ['5 agents at work', '1 decision for you', 'Books closed the very same day'],
}

export const onboarding = {
  eyebrow: 'Onboarding',
  title: 'Migrated in 3 days. Live in 2 weeks.',
  timeline: [
    { when: 'Day 1', what: 'Master data' },
    { when: 'Day 2', what: 'Opening balances and open bills' },
    { when: 'Day 3', what: 'Reconciled to your legacy books' },
    { when: 'Week 1–2', what: 'Team and approvals set up' },
    { when: 'Week 2', what: 'Live' },
  ],
}

/* ---------------------------------------------------------- Parrot AI (home) */

export const parrotIntro = {
  eyebrow: 'Parrot AI · your intelligent accounting assistant',
  title: 'Just ask. Parrot AI takes care of the entry.',
  features: [
    { title: 'Text or voice', text: 'Type a question or hold to speak, and Parrot AI drafts the entry.', fill: 0.95 },
    { title: 'English · Tamil · Hindi', text: 'Speak your language, including everyday Tanglish and Hindi.', fill: 0.85 },
    { title: 'One-tap confirmation', text: 'Nothing is posted until you confirm the draft card.', fill: 0.9 },
    { title: 'No data shared with any external AI', text: "Runs on PairO's own model. Your data is never sent to an external AI.", fill: 1 },
  ],
  link: { label: 'Discover everything Parrot AI can do', to: '/parrot-ai' },
}

/* ----------------------------------------------------------- Health Check */

export type CheckStatus = 'ok' | 'warn' | 'fail'

export const healthCheck = {
  eyebrow: 'Real-time Health Check',
  homeEyebrow: 'Real-time Health Check · your audit, running continuously',
  homeTitle: 'An auditor that is always in the room.',
  title: 'Your auditor, always on.',
  lead: '70 checks across 12 areas of your live books — run at any time, in seconds. Add your own rules on top.',
  tags: ['70 built-in checks', 'Custom checks', 'Alerts'],
  ticker: ['Trial balance', 'Numbering', 'Duplicate bill', 'TDS ties', 's.17(5) ITC', 'Stock value', 'Cash limit', 'Locked periods'],
  stats: [
    { value: '70', label: 'built-in checks' },
    { value: '12', label: 'audit areas covered' },
    { value: 'Live', label: 'with every posting' },
  ],
  score: 96,
  live: 'Live · verified as you post',
  scope: '70 checks · 12 areas',
  counts: { clear: '67 clear', warnings: '2 warnings', problems: '1 problem' },
  checks: [
    { status: 'ok', name: 'Trial balance balances', result: 'Dr = Cr' },
    { status: 'ok', name: 'Numbering gaps', result: 'none' },
    { status: 'warn', name: 'Duplicate purchase bills', result: '2 likely' },
    { status: 'ok', name: 'GSTR-3B, GSTR-1 and books agree', result: 'tied' },
    { status: 'fail', name: 'ITC on blocked heads · s.17(5)', result: '₹18,400' },
    { status: 'ok', name: 'TDS register equals ledger', result: 'tied' },
    { status: 'ok', name: 'Stock value equals inventory ledgers', result: 'tied' },
    { status: 'warn', name: 'Cash over limit · s.40A(3)', result: '1 entry' },
    { status: 'ok', name: 'Entries in locked periods', result: 'none' },
  ] as { status: CheckStatus; name: string; result: string }[],
  alert: {
    title: 'ITC on blocked heads · s.17(5)',
    text: 'ITC of ₹18,400 claimed on motor car repairs. Reverse it before filing GSTR-3B.',
    action: 'Resolve now',
  },
  link: { label: 'Explore every check', to: '/health-check' },
  areas: [
    { name: 'Books', count: 10, text: 'Trial balance, numbering gaps and locked periods' },
    { name: 'Duplicates', count: 7, text: 'Bills, invoices, parties and items' },
    { name: 'GST', count: 8, text: '3B vs 1 vs books, 2B, s.17(5)' },
    { name: 'TDS', count: 7, text: 'Sections, PAN and register vs ledger' },
    { name: 'Inventory', count: 7, text: 'Negative, stale and expiring stock' },
    { name: 'Manufacturing', count: 12, text: 'BOM loops, WIP and variances' },
    { name: 'Sales & purchase', count: 5, text: 'Open items and settlements' },
    { name: 'Fixed assets', count: 3, text: 'Register vs ledger, and depreciation' },
    { name: 'Time & billing', count: 6, text: 'Unbilled hours and rates' },
    { name: 'Banking', count: 1, text: 'Unreconciled balances' },
    { name: 'Platform', count: 4, text: 'Access, approvals and setup' },
  ],
  custom: {
    eyebrow: 'Custom checks',
    homeTitle: 'Your rules. Enforced every day.',
    title: 'Build the checks your auditor would run.',
    steps: ['Select data', 'Define the rule', 'Set severity', 'Configure alerts'],
    highlights: ['Any rule, zero code', 'Severity you define', 'Alerts routed to the right people', 'Fine-tune the built-in checks'],
    features: [
      { title: 'Any rule', text: 'Applied to rows or totals — for example, "cash expense over ₹10,000 a day".' },
      { title: 'Fine-tune built-ins', text: 'Switch off, or adjust severity or threshold. Every change is audited.' },
      { title: 'Alerts', text: 'By email and in-app, daily or weekly.' },
    ],
    note: 'Professional Plus: up to 10 custom checks · Enterprise: unlimited. Built-in checks are included in every pack.',
    builder: {
      title: 'Create a custom check',
      plans: 'Professional Plus · Enterprise',
      fields: [
        { label: 'Examine', value: 'Sales invoices' },
        { label: 'When', value: '> 15%' },
        { label: 'Severity', value: 'Warning' },
        { label: 'Notify', value: 'Owner, Accounts head · daily 8 am' },
      ],
      result: '3 invoices',
    },
  },
}

/* ------------------------------------------------------------- Compliance */

export const compliance = {
  eyebrow: 'Built deep for Indian compliance',
  homeTitle: 'Statutory compliance, built in.',
  title: 'Statutory compliance, built in.',
  lead: 'GST, TDS under the Income-tax Act 2025, the Companies Act and MSME — verified as you post, and ready ahead of every due date.',
  tags: ['GST', 'TDS · TCS', 'Schedule III', 'MSME'],
  link: { label: 'Explore compliance in depth', to: '/compliance' },
  calendar: {
    month: 'November 2026',
    title: 'Compliance calendar',
    // 1 November 2026 falls on a Sunday
    firstWeekday: 0,
    days: 30,
    due: { 7: 'TDS', 11: 'GSTR-1', 20: 'GSTR-3B' } as Record<number, string>,
    legend: [
      { label: 'TDS challan', date: '7 Nov' },
      { label: 'GSTR-1', date: '11 Nov' },
      { label: 'GSTR-3B', date: '20 Nov' },
      { label: 'MSME dues', date: 'within 45 days' },
    ],
  },
  acts: [
    {
      id: 'gst',
      num: '01',
      act: 'CGST · IGST Act',
      name: 'GST',
      steps: ['Post', 'Tax verified', '2B matched', 'GSTR-1 · 3B', 'Return ready'],
      tags: ['Place of supply', 'ITC · s.17(5)', 'Branch transfers'],
    },
    {
      id: 'tds',
      num: '02',
      act: 'Income-tax Act, 2025',
      name: 'TDS · TCS',
      steps: ['Bill', 's.393 section', 'Rate + threshold', 'Challan', 'Return'],
      tags: ['Legacy sections alongside', 'No-PAN · s.397', 'Cash limits · s.40A(3)'],
    },
    {
      id: 'books',
      num: '03',
      act: 'Companies Act · CARO · AS',
      name: 'Books & audit',
      steps: ['Entry', 'Audit trail', 'Approve', 'Lock', 'Schedule III'],
      tags: ['Edit log, always on', 'AS 2 · cost or NRV', 'CARO 3(ii)'],
    },
    {
      id: 'msme',
      num: '04',
      act: 'MSMED Act · s.43B(h)',
      name: 'MSME',
      steps: ['Bill', '45-day clock', 'Alert', 'Pay'],
      tags: ['Dues by supplier', 'Disallowance', 'Bank stock statement'],
    },
  ],
  gstPanel: {
    title: 'GSTR-1 · October 2026 · 33AABCQ7301S1Z…',
    badge: 'Ready to file',
    meter: { label: '2B matched', value: '98.6%', pct: 0.986 },
    caption: '2B matched 98.6% · 6 supplier mismatches listed',
  },
  tdsPanel: {
    title: 'TDS register · Income-tax Act, 2025',
    badge: 'Reconciled to the ledger',
    caption: 'Awaiting approval ₹4,200 shown separately · Form 140 ready',
  },
  auditTrail: {
    title: 'Audit trail · INV-1042',
    events: [
      { time: '10:05', action: 'Created', detail: 'Parrot AI draft · confirmed by Priya' },
      { time: '10:41', action: 'Edited', detail: 'Rate ₹420 → ₹410 · reason: agreed price' },
      { time: '11:02', action: 'Approved', detail: 'Ravi · maker-checker' },
      { time: '1 Nov', action: 'Period locked', detail: 'October closed' },
    ],
    notes: ['The edit log cannot be switched off', 'Rule 3(1) · Companies (Accounts) Rules'],
  },
  msmePanel: {
    title: 'MSME dues · s.43B(h)',
    countdown: { value: '6', label: 'days left' },
    suppliers: [
      { name: 'Sri Balaji Steels', day: 'day 39' },
      { name: 'Anna Packaging', day: 'day 21' },
      { name: 'KR Transport', day: 'day 47 · disallow', late: true },
    ],
    notes: ['Alert ahead of day 45', 'Disallowance calculated for tax audit'],
  },
  footnote: 'E-invoice and e-way bill generation are currently in development.',
  // Short form used on the home page
  refs: [
    { name: 'GST', act: 'CGST · IGST Act' },
    { name: 'TDS · TCS', act: 'Income-tax Act, 2025' },
    { name: 'Books & audit', act: 'Companies Act · CARO · AS' },
    { name: 'MSME', act: 'MSMED Act · s.43B(h)' },
  ],
}

/* ---------------------------------------------------------------- Pricing */

export const pricing = {
  eyebrow: 'Packs and pricing',
  title: 'One simple price per company. Every agent included.',
  lead: 'Start for free. Add users, companies and controls as you grow.',
  billing: { yearly: 'Yearly', yearlyNote: '2 months free', monthly: 'Monthly' },
  packs: [
    {
      name: 'Free',
      audience: 'For individuals getting started',
      price: null as number | null,
      cta: { label: 'Start for free', to: demoLink },
      features: ['1 user · 1 company', '1,000 invoices a year', 'GST returns and TDS', 'UPI pay links', 'Built-in Health Check'],
    },
    {
      name: 'Standard',
      audience: 'For small teams',
      price: 6000,
      cta: { label: 'Choose Standard', to: demoLink },
      features: [
        'Everything in Free, plus',
        '3 users · 3 branches',
        'Unlimited invoices',
        'Parrot AI entries and voice',
        'Collection agent',
        'Warehouses · GSTR-2B reconciliation',
      ],
    },
    {
      name: 'Professional',
      audience: 'For growing SMEs',
      price: 12000,
      cta: { label: 'Choose Professional', to: demoLink },
      features: [
        'Everything in Standard, plus',
        '10 users · 3 companies',
        'Budgets',
        'Approval workflows',
        'Collection autopilot',
        'Batches and price lists',
      ],
    },
    {
      name: 'Professional Plus',
      audience: 'For customisation and control',
      price: 48000,
      featured: true,
      cta: { label: 'Book a demo', to: demoLink },
      features: [
        'Everything in Professional, plus',
        '25 users · 3 companies',
        'Custom fields and print designer',
        'Report builder · 25 reports',
        '10 automations · 10 custom checks',
        'Own roles and API',
      ],
    },
    {
      name: 'Enterprise',
      audience: 'For business groups',
      price: 180000,
      cta: { label: 'Choose Enterprise', to: demoLink },
      features: [
        'Everything in Plus, plus',
        '50 users · group consolidation',
        'Manufacturing included',
        'Governance and advanced planning',
        'SSO, success manager, SLA',
        'Unlimited custom checks',
      ],
    },
  ],
  assurances: ['Migration in 3 days', 'Live in 2 weeks', 'Users, branches and warehouses shared across all your companies', 'No external AI'],
  suites: [
    { name: 'Professional One', text: 'Professional Plus, with the complete business suite.', price: 90000 },
    { name: 'Enterprise One', text: 'Enterprise, with every suite module included.', price: 276000 },
  ],
  compare: {
    eyebrow: 'Compare',
    title: 'Every pack, compared side by side.',
    // placeholder: the source document lost the row labels of this table. Labels and values
    // below are taken from the pack cards and the plan-availability notes on each solution page.
    rows: [
      { label: 'Price per company / year', values: ['Free', '₹6,000', '₹12,000', '₹48,000', '₹1,80,000'] },
      { label: 'Users', values: ['1', '3', '10', '25', '50'] },
      { label: 'Companies', values: ['1', '1', '3', '3', '3 + group'] },
      { label: 'Invoices a year', values: ['1,000', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'GST returns and TDS', values: [true, true, true, true, true] },
      { label: 'UPI pay links', values: [true, true, true, true, true] },
      { label: 'Built-in Health Check', values: [true, true, true, true, true] },
      { label: 'Parrot AI questions', values: [true, true, true, true, true] },
      { label: 'Parrot AI entries and voice', values: [false, true, true, true, true] },
      { label: 'Collection agent', values: [false, true, true, true, true] },
      { label: 'Warehouses · GSTR-2B reconciliation', values: [false, true, true, true, true] },
      { label: 'Budgets', values: [false, false, true, true, true] },
      { label: 'Approval workflows', values: [false, false, '1 step', '3 steps', 'Unlimited'] },
      { label: 'Collection autopilot', values: [false, false, true, true, true] },
      { label: 'Batches and price lists', values: [false, false, true, true, true] },
      { label: 'Custom fields and print designer', values: [false, false, false, true, true] },
      { label: 'Report builder', values: [false, false, false, '25', 'Unlimited'] },
      { label: 'Automations', values: [false, false, false, '10', 'Unlimited'] },
      { label: 'Custom checks', values: [false, false, false, '10', 'Unlimited'] },
      { label: 'Own roles and API', values: [false, false, false, true, true] },
      { label: 'Group consolidation', values: [false, false, false, false, true] },
      { label: 'Manufacturing', values: [false, 'Add-on', 'Add-on', 'Add-on', 'Included'] },
      { label: 'Governance and advanced planning', values: [false, false, false, false, true] },
      { label: 'SSO, success manager, SLA', values: [false, false, false, false, true] },
    ] as { label: string; values: (string | boolean)[] }[],
  },
  faqs: {
    eyebrow: 'FAQs',
    title: 'Before you decide.',
    items: [
      {
        q: 'Is GST included?',
        a: 'Prices are exclusive of GST. Monthly billing is charged at one-tenth of the yearly price, each month.',
      },
      { q: 'What is shared across companies?', a: 'Users, branches and warehouses are pooled across all your companies.' },
      { q: 'Can I upgrade my pack?', a: 'Yes. Your books remain exactly as they are, and the new features are switched on.' },
    ],
  },
}

export const formatInr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// Used by the contact form
export const industries = [
  'Manufacturing',
  'Distribution & Wholesale',
  'Retail',
  'Construction',
  'Professional Services',
  'Healthcare',
  'Other',
]
