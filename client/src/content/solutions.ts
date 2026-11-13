// The Agentic solutions hub and the twelve solution pages.
// Every solution page follows the same template (see pages/Solution.tsx).

import {
  BarChart3,
  Bird,
  BookOpen,
  Boxes,
  Factory,
  FileCheck2,
  Landmark,
  Percent,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react'
import { homeChat, salesDraft, type ChatMessage } from './chat'

export interface VisualRow {
  label?: string
  detail?: string
  value?: string
  status?: string
  tone?: 'ok' | 'warn' | 'fail' | 'info'
  /** 0–1, draws a bar */
  pct?: number
}

export interface Solution {
  slug: string
  num: string
  name: string
  agent: string
  icon: LucideIcon
  /** one line on the hub card */
  summary: string
  /** what the hub card shows once the agent has done its work */
  result: string
  tagline: string
  tags: string[]
  workflow: string[]
  status: string
  duties: string[]
  prompts: string[]
  capabilities: { title: string; text: string }[]
  visual: {
    title: string
    rows?: VisualRow[]
    meter?: { label: string; value: string; pct: number }
    badge?: string
    footer?: { label: string; value?: string }
    actions?: string[]
    caption?: string
    chat?: ChatMessage[]
  }
  flagship: {
    eyebrow: string
    title: string
    /** steps with a title only render as a timeline */
    steps: { title: string; text?: string }[]
    extra?: { label: string; value: string }
    panel: { label: string; title: string; lines?: string[]; message?: { subject: string; body: string; pay: string; attachment: string }; actions?: string[]; facts: string[] }
    outcomesTitle: string
    outcomes: { title: string; text: string }[]
    note: string
  }
  chat?: ChatMessage[]
  compareTitle: string
  manual: { file: string; time: string; columns: string[]; rows: string[][]; tasks: [string, string][] }
  agentWay: {
    label: string
    time: string
    kpis: { label: string; value: string; delta?: string }[]
    tasks: [string, 'auto' | 'approve'][]
    results: [string, string][]
    note: string
  }
}

const whenSomethingDoesntAddUp = "When something doesn't add up"

export const solutions: Solution[] = [
  {
    slug: 'sales',
    num: '01',
    name: 'Sales and receivables',
    agent: 'Sales agent',
    icon: ReceiptText,
    summary: 'Collection agent follows up on every invoice that falls due',
    result: '₹19,824 received · invoice settled',
    tagline: 'From enquiry to cash, with GST accurate on every invoice.',
    tags: ['Bill-by-bill settlement', 'Collection agent', 'Credit limit control'],
    workflow: ['Quote', 'Order', 'Invoice', 'Receipt'],
    status: 'Quote Q-218 sent to Kumar Constructions',
    duties: [
      'Collection agent follows up on every invoice that falls due',
      'Issues recurring invoices on schedule',
      'Holds orders that exceed credit limits',
    ],
    prompts: ['Who owes us the most?', 'Invoice Kumar 40 bags cement'],
    capabilities: [
      { title: 'Bill-by-bill settlement', text: 'Every receipt is applied to the right invoices.' },
      { title: 'Collection agent', text: 'Follows up, reads replies and stops once payment arrives.' },
      { title: 'Credit limit control', text: 'Orders over the limit await your decision.' },
    ],
    visual: {
      title: 'Sales invoices',
      rows: [
        { status: 'Paid', tone: 'ok' },
        { status: 'Due in 5 days', tone: 'info' },
        { status: 'Overdue 12 days', tone: 'fail' },
        { status: 'Paid', tone: 'ok' },
      ],
      meter: { label: 'Ravi Enterprises · credit utilised', value: '₹4,60,000 of ₹5,00,000', pct: 0.92 },
    },
    flagship: {
      eyebrow: 'Collection agent',
      title: 'It handles the follow-up. You get paid.',
      steps: [{ title: '−3 days' }, { title: 'Due date' }, { title: '+3 days' }, { title: '+7 days' }, { title: '+15 days' }, { title: '+30 days' }],
      extra: { label: 'Tone', value: 'Friendly' },
      panel: {
        label: 'Ready · awaiting approval',
        title: 'Sri Lakshmi Traders',
        lines: ['to accounts@kumarconstructions.in'],
        message: {
          subject: 'Invoice INV-1031 · ₹1,20,000',
          body: 'A gentle reminder — INV-1031 for ₹1,20,000 falls due on 8 Nov.',
          pay: 'Pay ₹1,20,000 by UPI',
          attachment: 'Statement of account.pdf',
        },
        actions: ['Send', 'Edit', 'Skip'],
        facts: [
          'Approval before anything is sent',
          'Autopilot, customer by customer',
          'Sent between 9 am and 8 pm only',
          'No more than 1 reminder every 3 days',
          'Stops the moment payment arrives',
          'English · தமிழ் · हिन्दी',
        ],
      },
      outcomesTitle: 'When the customer responds',
      outcomes: [
        { title: 'Promise to pay logged', text: 'Reminder sent that day if still unpaid' },
        { title: 'Dispute', text: 'Reminders paused · you are notified' },
        { title: 'Bank verified', text: 'Not found? The UTR is requested' },
        { title: 'Matched by invoice number', text: 'Reminders end' },
      ],
      note: "Collections: Standard and above · Autopilot: Professional and above · UPI pay links: every pack · Drafted from PairO's own templates, never an external AI.",
    },
    chat: [
      { from: 'you', time: '10:02', text: 'Who owes us the most?' },
      {
        from: 'parrot',
        time: '10:02',
        text: 'Kumar Constructions — ₹1,77,000, of which ₹1,20,000 is 12 days overdue.',
        highlight: '₹1,77,000',
      },
      { from: 'you', time: '10:04', text: 'Invoice Kumar 40 bags cement' },
      { from: 'parrot', time: '10:04', card: salesDraft },
    ],
    compareTitle: 'The same week. Two very different ways.',
    manual: {
      file: 'receivables_FINAL_v7.xlsx',
      time: '≈ 4 h 10 min a week',
      columns: ['Customer', 'Inv', 'Due', 'Paid?'],
      rows: [
        ['Kumar Constr.', '1031', '12 days late', '??'],
        ['Sri Murugan', '1034', '20 Nov', 'part?'],
        ['Ravi Agencies', '1036', '5 days late', 'call'],
      ],
      tasks: [
        ['Key in each monthly invoice', '45 min'],
        ['Match bank receipts to invoices by hand', '60 min'],
        ['Call overdue customers', '90 min'],
        ['Verify credit before dispatch', '30 min'],
        ['Update the ageing spreadsheet', '25 min'],
      ],
    },
    agentWay: {
      label: 'PairO · Sales agent',
      time: '≈ 10 min of your time',
      kpis: [
        { label: 'Collected this week', value: '₹6.2 L' },
        { label: 'Overdue', value: '₹1.2 L', delta: '↓ 38%' },
      ],
      tasks: [
        ['14 recurring invoices raised and emailed', 'auto'],
        ['23 invoices settled against bank lines', 'auto'],
        ['Email follow-ups with UPI links sent to 9 customers', 'auto'],
        ['Order above credit limit — placed on hold', 'approve'],
        ['Ageing updated in real time', 'auto'],
      ],
      results: [
        ['4 h → 10 min', 'per week on receivables'],
        ['1 tap', 'is all you approve'],
        ['0', 'spreadsheets'],
      ],
      note: 'Illustrative week for a business raising around 200 invoices a month.',
    },
  },
  {
    slug: 'purchases',
    num: '02',
    name: 'Purchases and payables',
    agent: 'Purchase agent',
    icon: ShoppingCart,
    summary: 'Captures supplier bills from photos and PDFs',
    result: "Paid in Thursday's payment run",
    tagline: 'From order to payment, with three-way matching and TDS applied at the bill.',
    tags: ['Three-way matching', 'Bills captured from photos', 'ITC safeguarded'],
    workflow: ['Request', 'PO', 'GRN', 'Bill', 'Pay'],
    status: 'Request for 2 t steel approved',
    duties: [
      'Captures supplier bills from photos and PDFs',
      'Matches PO, GRN and bill — and flags every gap',
      "Recommends the week's payment run",
    ],
    prompts: ['Which bills are due this week?', 'Book this bill'],
    capabilities: [
      { title: 'Three-way matching', text: 'PO, GRN and bill must all agree.' },
      { title: 'Bills captured from photos', text: 'Snap a photo — Parrot AI drafts the entry.' },
      { title: 'ITC safeguarded', text: 'Blocked credits flagged at the point of entry.' },
    ],
    visual: {
      title: 'Three-way match · PO/2627/0088',
      rows: [
        { label: 'Purchase order', detail: '500 kg × ₹62', value: '₹31,000' },
        { label: 'Goods receipt', detail: '480 kg', value: 'GRN/2627/0412' },
        { label: 'Supplier bill', detail: '480 kg × ₹62', value: '₹29,760 + GST' },
      ],
      footer: { label: 'Matched', value: '₹0.00' },
    },
    flagship: {
      eyebrow: 'Bill inbox · three-way matching',
      title: 'Snap the bill. It is booked correctly.',
      steps: [
        { title: 'Send it', text: 'Share a photo or PDF over WhatsApp, or simply upload it.' },
        { title: "Processed on PairO's server", text: 'Text layer or local OCR. No external AI involved.' },
        { title: 'Validated', text: 'Totals within ₹1, GSTIN, dates, GST rate and place of supply.' },
        { title: 'Duplicate guard', text: 'Same supplier and invoice number already booked? It is flagged, never silently dropped.' },
        { title: 'Three-way match', text: 'Bills only what was received, with the rate checked against the PO within your tolerance.' },
        { title: 'You confirm', text: 'The draft is posted only once a person confirms. The image is retained as ITC evidence.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Bill inbox',
        lines: ['bill_0412.jpg · from Priya on WhatsApp', 'Received · virus-scanned · securely stored'],
        facts: [
          'Nothing is posted without your confirmation',
          'Left blank rather than guessed',
          "Learns every supplier's bill layout",
          'Price policy: off · warn · block',
          'Every override requires a reason',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Flagged as duplicate', text: 'It would otherwise claim ITC twice' },
        { title: 'Warn or block', text: 'Override with a reason, fully audited' },
        { title: 'Refused', text: 'Limited to what the GRN received' },
        { title: 'Fields left blank', text: 'Complete them, or re-read the bill' },
      ],
      note: 'Bill inbox and three-way matching: every pack · Monthly bill reads: Free 25 · Standard 100 · Professional 200 · Plus 1,000 · Enterprise 3,000 · WhatsApp requires your business number to be set up.',
    },
    chat: [
      { from: 'you', time: '09:15', text: 'Which bills are due this week?' },
      { from: 'parrot', time: '09:15', text: '7 bills, ₹8.4 L. Largest: Sri Balaji Steels ₹1,18,000 on Thursday.', highlight: '₹8.4 L' },
      { from: 'you', time: '09:17', attachment: 'bill_0412.jpg', text: 'book this' },
      {
        from: 'parrot',
        time: '09:17',
        card: {
          title: 'Purchase bill · draft',
          party: 'Sri Balaji Steels',
          lines: [
            ['Matches', 'PO-114 · GRN-208'],
            ['CGST + SGST 18%', '₹18,000'],
          ],
          total: ['Total', '₹1,18,000'],
        },
      },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'bills_to_book_OCT.xlsx',
      time: '≈ 5 h a week',
      columns: ['Supplier', 'Bill', 'PO?', 'GRN?'],
      rows: [
        ['Sri Balaji Steels', 'B-882', 'PO-114', '?'],
        ['Anna Packaging', 'AP-77', 'none', 'yes'],
        ['KR Transport', 'T-019', 'n/a', 'n/a'],
      ],
      tasks: [
        ['Key in bills from paper and PDFs', '80 min'],
        ['Check PO and GRN against every bill', '60 min'],
        ['Assess ITC eligibility', '40 min'],
        ["Compile this week's payment list", '50 min'],
        ['Track down duplicate bills', '70 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 15 min of your time',
      kpis: [
        { label: 'Bills booked this week', value: '31' },
        { label: 'Price variances caught', value: '₹42,600' },
      ],
      tasks: [
        ['31 bills captured from photos and PDFs', 'auto'],
        ['PO · GRN · bill matched, with 2 gaps flagged', 'auto'],
        ['Blocked ITC flagged at the point of entry', 'auto'],
        ['Payment run recommended · ₹8.4 L', 'approve'],
        ['Duplicate bill intercepted', 'auto'],
      ],
      results: [
        ['5 h → 15 min', 'per week on bills'],
        ['1 tap', 'to release payments'],
        ['0', 'duplicate payments'],
      ],
      note: 'Illustrative week for a business booking around 120 supplier bills a month.',
    },
  },
  {
    slug: 'accounting',
    num: '03',
    name: 'Accounting',
    agent: 'Books agent',
    icon: BookOpen,
    summary: 'Handles recurring journals and accruals',
    result: 'October closed · period locked',
    tagline: "A general ledger built to an auditor's standard.",
    tags: ['Audit trail', 'Period locks', '3 companies'],
    workflow: ['Entry', 'Approve', 'Post', 'Close'],
    status: 'Rent accrual drafted',
    duties: ['Handles recurring journals and accruals', 'Identifies unusual entries before you do', 'Prepares your month-end close checklist'],
    prompts: ['Why is October profit lower?', 'Show cash in hand today'],
    capabilities: [
      { title: 'Audit trail', text: 'Always on, as the Act mandates.' },
      { title: 'Period locks', text: 'Closed periods stay closed.' },
      { title: '3 companies', text: 'Consolidated into a single view.' },
    ],
    visual: {
      title: 'Trial balance · 1 Apr – 5 Nov 2026',
      rows: [
        { label: 'Dr', value: '3,12,44,180' },
        { label: 'Cr', value: '3,12,44,180' },
      ],
      footer: { label: 'Balanced' },
      caption: 'Period locked through 30 Sep · audit trail active',
    },
    flagship: {
      eyebrow: 'Period locks · year-end close',
      title: 'Close the month. Keep it that way.',
      steps: [
        { title: 'Lock the period', text: 'A supervisor locks the month. Any posting within it is refused.' },
        { title: 'One-entry permit', text: 'Authorise a single entry for 24 hours, without unlocking the period.' },
        { title: 'Under audit', text: 'The year progresses from Active → Under audit → Closed.' },
        { title: 'Close the year', text: 'Close and lock the entire year in a single step.' },
        { title: 'Carried forward, live', text: "Closing balances become next year's opening balances. Profit is held in Reserves and Surplus." },
        { title: 'Reopen only with a reason', text: 'Restricted to Admin and to the latest year, with a written reason.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Period locks',
        lines: ['October 2026 · locked by Ravi', 'Entry dated 14 Oct → refused'],
        facts: [
          'Existing entries are never altered',
          'Unlocking requires a reason',
          'Every step is audited',
          'Optional year-end transfer journal',
          'Closing stock analysed by class',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Refused', text: 'Request a one-entry permit' },
        { title: 'Only the first', text: 'Consumed on first use' },
        { title: 'Not permitted', text: 'Only the latest closed year' },
        { title: 'Warning', text: 'Reflected on the P&L and balance sheet' },
      ],
      note: 'Period locks and year-end close: every pack · Under-audit stage: Professional and above.',
    },
    chat: [
      { from: 'you', time: '16:20', text: 'Why is October profit lower?' },
      { from: 'parrot', time: '16:20', text: 'Down ₹1.6 L: rent revised by +₹40,000 and freight up ₹1.1 L.', highlight: '₹1.6 L' },
      { from: 'you', time: '16:21', text: 'Show cash in hand today' },
      { from: 'parrot', time: '16:21', text: '₹48,250 — Madurai ₹31,000, Trichy ₹17,250.', highlight: '₹48,250' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'journals_month_end.xlsx',
      time: '≈ 6 h every month-end',
      columns: ['Entry', 'Dr', 'Cr', 'Done?'],
      rows: [
        ['Rent accrual', '50,000', '50,000', '?'],
        ['Depreciation', '—', '—', 'pending'],
        ['Prepaid ins.', '12,000', '', 'check'],
      ],
      tasks: [
        ['Post recurring journals manually', '60 min'],
        ['Compute and post accruals', '70 min'],
        ['Review entries for errors', '90 min'],
        ['Follow up approvals over email', '60 min'],
        ['Work through a month-end checklist', '80 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 20 min of your time',
      kpis: [
        { label: 'Trial balance', value: 'Tallied' },
        { label: 'Days to close', value: '1', delta: '↓ from 8' },
      ],
      tasks: [
        ['18 recurring journals posted', 'auto'],
        ['Accruals and prepayments posted', 'auto'],
        ['3 unusual entries flagged', 'auto'],
        ['2 journals awaiting your approval', 'approve'],
        ['Period locked · profit carried forward', 'auto'],
      ],
      results: [
        ['8 days → Day 0', 'month-end close'],
        ['2 taps', 'is all you approve'],
        ['100%', 'audit trail'],
      ],
      note: 'Illustrative month-end for a single company.',
    },
  },
  {
    slug: 'banking',
    num: '04',
    name: 'Banking',
    agent: 'Banking agent',
    icon: Landmark,
    summary: 'Matches statement lines each morning',
    result: 'BRS ready · ₹14,200 to review',
    tagline: 'Bank reconciliation every day — not just at month-end.',
    tags: ['Auto-matching', 'Bank rules', 'Duplicate guard'],
    workflow: ['Import', 'Match', 'Reconcile'],
    status: 'HDFC statement imported · 220 lines',
    duties: ['Matches statement lines each morning', 'Builds rules from your corrections', 'Stops duplicate payments before release'],
    prompts: ["What's unreconciled?", "Did Ravi's payment come in?"],
    capabilities: [
      { title: 'Auto-matching', text: 'With the reasoning shown.' },
      { title: 'Bank rules', text: 'Recurring lines post automatically.' },
      { title: 'Duplicate guard', text: 'The same bill is never paid twice.' },
    ],
    visual: {
      title: 'HDFC Current A/c · statement review',
      rows: [
        { status: 'Auto-matched', tone: 'ok' },
        { label: 'Staff welfare', status: 'Auto-matched', tone: 'ok' },
        { status: 'Needs your input', tone: 'warn' },
      ],
      caption: '58 of 61 lines matched · reasoning shown for every match',
    },
    flagship: {
      eyebrow: 'Statement import · auto-matching',
      title: 'Your bank account, reconciled every morning.',
      steps: [
        { title: 'Statement arrives', text: 'Upload a CSV or Excel file, or have it emailed, delivered by SFTP or fetched on a schedule.' },
        { title: 'Auto-match', text: 'Within ±3 days (configurable). Exact amount and reference → reconciled.' },
        { title: 'Suggestions', text: 'Near matches receive a confidence score. Ties are referred to you.' },
        { title: 'Categorise the rest', text: 'Using the invoice number in the UPI note, party names, keywords and your own rules.' },
        { title: 'Draft first, then post', text: 'Every line becomes a draft voucher. Posting happens on your confirmation.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 5',
        title: 'HDFC · statement',
        lines: ['220 lines received', '6 duplicate lines excluded'],
        facts: [
          'Never chooses silently',
          'Rejected suggestions never resurface',
          'Rules: contains · starts with · exact · pattern',
          'Shows how many other lines each rule would match',
          'Duplicate warnings on new entries',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Skipped', text: 'Only new lines are added' },
        { title: 'Both are shown', text: 'You choose one' },
        { title: 'Suggested, not matched', text: 'Confidence score reduced' },
        { title: 'Drafted by rule or keyword', text: 'You confirm the posting' },
      ],
      note: 'Banking: every pack (Free: 1 account, manual import) · Automated statement feeds by email, SFTP or URL: Standard and above · Direct bank connections are not yet available.',
    },
    chat: [
      { from: 'you', time: '11:05', text: "What's unreconciled?" },
      { from: 'parrot', time: '11:05', text: '8 lines, ₹14,200. 5 look like bank charges — shall I book them?', highlight: '₹14,200' },
      { from: 'you', time: '11:06', text: "Did Ravi's payment come in?" },
      { from: 'parrot', time: '11:06', text: 'Yes — ₹62,000 by NEFT on 3 Nov, settled against INV-1036 ✓', highlight: 'INV-1036' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'bank_reco_HDFC.xlsx',
      time: '≈ 4 h a week',
      columns: ['Date', 'Narration', 'Amount', 'Matched?'],
      rows: [
        ['02-11', 'NEFT/KUMAR CON', '1,20,000', '?'],
        ['03-11', 'UPI/9876…', '4,500', 'who?'],
        ['03-11', 'CHQ 004512', '-38,000', '?'],
      ],
      tasks: [
        ['Download and paste in statements', '30 min'],
        ['Match lines one at a time', '100 min'],
        ['Work out who sent each UPI amount', '50 min'],
        ['Book bank charges and interest', '30 min'],
        ['Prepare the BRS', '40 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 10 min of your time',
      kpis: [
        { label: 'Lines matched', value: '96%' },
        { label: 'Unreconciled', value: '₹14,200', delta: '↓ 91%' },
      ],
      tasks: [
        ['Statement imported', 'auto'],
        ['212 of 220 lines matched, with reasons', 'auto'],
        ['UPI payers identified from payment history', 'auto'],
        ['8 lines await your decision', 'approve'],
        ['BRS available for any date', 'auto'],
      ],
      results: [
        ['4 h → 10 min', 'per week on banking'],
        ['8', 'lines for you to decide'],
        ['Daily', 'reconciled'],
      ],
      note: 'Illustrative week for one current account with around 220 lines.',
    },
  },
  {
    slug: 'inventory',
    num: '05',
    name: 'Inventory',
    agent: 'Stock agent',
    icon: Boxes,
    summary: 'Alerts you to reorder levels and expiry',
    result: 'Count complete · variance approved',
    tagline: 'Inventory you can value, verify and report under Schedule III.',
    tags: ['RM · WIP · FG', 'Batches and expiry', 'Branch transfers'],
    workflow: ['Receive', 'Store', 'Move', 'Count'],
    status: '40 bags received into Madurai',
    duties: ['Alerts you to reorder levels and expiry', 'Flags GRNs still awaiting a bill', 'Values inventory at cost or NRV'],
    prompts: ["What's below reorder level?", 'Stock of cement in Madurai'],
    capabilities: [
      { title: 'RM · WIP · FG', text: 'Classes that drive the accounting.' },
      { title: 'Batches and expiry', text: 'FEFO picking as standard.' },
      { title: 'Branch transfers', text: 'With GST handled correctly.' },
    ],
    visual: {
      title: 'Stock summary by class · as at 5 Nov',
      rows: [
        { label: 'Raw materials', value: '₹28,40,000', pct: 0.74 },
        { label: 'Work in progress', value: '₹9,10,000', pct: 0.24 },
        { label: 'Finished goods', value: '₹38,40,000', pct: 1 },
        { label: 'Stock-in-trade', value: '₹16,20,000', pct: 0.42 },
        { label: 'Stores and spares', value: '₹4,35,000', pct: 0.11 },
      ],
      caption: 'Chennai Godown · Bengaluru · Mumbai · Average cost on every movement',
    },
    flagship: {
      eyebrow: 'Inventory classes · physical count',
      title: 'Every item, in its Schedule III class.',
      steps: [
        { title: 'Classify', text: '8 classes: raw materials, packing, WIP, finished goods, stock-in-trade, stores, tools and consumables.' },
        { title: 'Value', text: 'Weighted average (default), standard cost or last cost.' },
        { title: 'Reclassify', text: 'Change the class, and a stock journal transfers the value.' },
        { title: 'Count', text: 'Book stock is captured as a snapshot, and physical counts are entered.' },
        { title: 'Freeze and approve', text: 'Counted items are frozen, and a second person approves the variance.' },
        { title: 'Post differences', text: 'Every difference becomes a draft stock journal for you to post.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Cement 53 grade',
        lines: ['Class: stock-in-trade', 'Ledger: stock-in-trade inventory'],
        facts: [
          'Inventories note presented by class',
          'Schedule III P&L by class',
          'Differences are never auto-posted',
          'Counting by session',
          'Lifting a freeze requires a reason',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Value transferred', text: 'Stock journal between class ledgers' },
        { title: 'Refused', text: 'Until the count is complete' },
        { title: 'Not permitted', text: 'Segregation of duties' },
        { title: 'Later sales are not re-costed', text: 'Costs remain predictable' },
      ],
      note: 'Classes and valuation: core inventory · Physical count: Standard and above · Freeze and variance approval: Enterprise · Batches: Professional and above.',
    },
    chat: [
      { from: 'you', time: '10:40', text: "What's below reorder level?" },
      { from: 'parrot', time: '10:40', text: '6 items. Cement 53 grade: 38 bags left, reorder level 100.', highlight: '38 bags' },
      { from: 'you', time: '10:41', text: 'Stock of cement in Madurai' },
      { from: 'parrot', time: '10:41', text: '212 bags · ₹89,040 at cost. 40 reserved for SO-224.', highlight: '₹89,040' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'stock_register_godown.xlsx',
      time: '≈ 5 h a week',
      columns: ['Item', 'Book', 'Physical', 'Batch exp.'],
      rows: [
        ['Cement 53 gr', '420', '398', '—'],
        ['Paint 20 L', '36', '36', '12-11'],
        ['TMT 12 mm', '-8', '?', '—'],
      ],
      tasks: [
        ['Update the stock sheet after every GRN', '70 min'],
        ['Review reorder levels', '40 min'],
        ['Monitor batch expiry', '40 min'],
        ['List GRNs awaiting bills', '50 min'],
        ['Value closing stock', '100 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 15 min of your time',
      kpis: [
        { label: 'Stock value', value: '₹38.4 L' },
        { label: 'Negative stock', value: '0' },
      ],
      tasks: [
        ['Stock updated with every GRN and invoice', 'auto'],
        ['Reorder list ready · 6 items', 'auto'],
        ['Expiring batches picked first', 'auto'],
        ['4 GRNs awaiting bills · follow up?', 'approve'],
        ['Stock valued at cost or NRV', 'auto'],
      ],
      results: [
        ['5 h → 15 min', 'per week on stock'],
        ['0', 'negative stock'],
        ['Live', 'valuation'],
      ],
      note: 'Illustrative week for two warehouses with around 400 items.',
    },
  },
  {
    slug: 'manufacturing',
    num: '06',
    name: 'Manufacturing',
    agent: 'Production agent',
    icon: Factory,
    summary: 'Plans material requirements from orders',
    result: 'Finished · materials backflushed',
    tagline: 'Plan, produce and cost every production run with confidence.',
    tags: ['Multi-level BOM', 'MRP', 'Job work'],
    workflow: ['BOM', 'Plan', 'Produce', 'Finish'],
    status: 'BOM checked · 4 levels',
    duties: ['Plans material requirements from orders', 'Backflushes consumption on completion', 'Provides a can-we-deliver date'],
    prompts: ['Can we deliver 500 units by Friday?', 'What should we buy?'],
    capabilities: [
      { title: 'Multi-level BOM', text: 'Backflush on completion.' },
      { title: 'MRP', text: 'What to buy, and when.' },
      { title: 'Job work', text: 'ITC-04 ready.' },
    ],
    visual: {
      title: 'MRP · what to buy and what to make',
      rows: [
        { status: 'Buy 260', tone: 'info' },
        { status: 'Make 80', tone: 'warn' },
        { status: 'Sufficient', tone: 'ok' },
        { status: 'Buy 2 × 100', tone: 'info' },
      ],
      footer: { label: 'Can we deliver?', value: 'Yes, by 14 Nov' },
    },
    flagship: {
      eyebrow: 'MRP · backflush',
      title: 'Know exactly what to buy, what to make, and when.',
      steps: [
        { title: 'Demand', text: 'Open sales orders, approved forecasts, safety stock and order components.' },
        { title: 'Supply', text: 'Stock on hand, goods in transit, open POs and production orders.' },
        { title: 'Net, level by level', text: 'Lead-time offsets and lot-sizing rules: lot-for-lot, fixed, minimum and multiples.' },
        { title: 'Recommendations', text: 'Buy, make, reschedule or cancel — each with its reasoning.' },
        { title: 'You approve', text: 'Buy recommendations become draft POs by supplier; make recommendations become planned orders.' },
        { title: 'Backflush', text: 'Report the output, and materials are issued against the BOM automatically.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'MRP · nightly run',
        lines: ['SO-224 · 500 units', 'Forecast December · 300 units'],
        facts: [
          'Rules and arithmetic — no AI',
          'Multi-level BOMs, with loops refused',
          'Actual costing through WIP',
          'Period locks and stock checks are enforced',
          'Optional finite-capacity planning',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Refused', text: 'Caught at the point of saving' },
        { title: 'Shortage highlighted', text: 'Before production begins' },
        { title: 'Variance posted', text: 'Price · usage · yield · labour' },
        { title: 'Never saved as orders', text: 'Plan with confidence' },
      ],
      note: 'Manufacturing: available as an add-on with Standard, Professional and Plus · included in Enterprise.',
    },
    chat: [
      { from: 'you', time: '14:10', text: 'Can we deliver 500 units by Friday?' },
      { from: 'parrot', time: '14:10', text: 'Yes, provided steel arrives by Wednesday. 320 can be ready on Thursday from stock.', highlight: '320' },
      { from: 'you', time: '14:11', text: 'What should we buy?' },
      {
        from: 'parrot',
        time: '14:11',
        text: '3 items are short: steel 2 t, paint 40 L, bolts 5,000. Shall I draft the POs?',
        highlight: 'Shall I draft the POs?',
      },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'production_plan_wk45.xlsx',
      time: '≈ 7 h a week',
      columns: ['Order', 'Qty', 'RM ok?', 'Ready by'],
      rows: [
        ['SO-221', '500', 'short', '?'],
        ['SO-224', '120', 'yes', 'Fri?'],
        ['SO-230', '800', '?', '?'],
      ],
      tasks: [
        ['Explode BOMs to work out material requirements', '90 min'],
        ['Compare stock against requirements', '60 min'],
        ['Record consumption after production', '80 min'],
        ['Commit to delivery dates', '60 min'],
        ['Calculate production variances', '130 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 20 min of your time',
      kpis: [
        { label: 'Orders on time', value: '94%' },
        { label: 'Shortages', value: '3' },
      ],
      tasks: [
        ['Material plan generated from open orders', 'auto'],
        ['Shortages identified · 3 POs drafted', 'approve'],
        ['Consumption backflushed on completion', 'auto'],
        ['Can-we-deliver date: Friday', 'auto'],
        ['Variances flagged above 5%', 'auto'],
      ],
      results: [
        ['7 h → 20 min', 'per week on planning'],
        ['1 tap', 'to raise POs'],
        ['Live', 'WIP value'],
      ],
      note: 'Illustrative week for a plant running around 25 production orders.',
    },
  },
  {
    slug: 'gst',
    num: '07',
    name: 'GST',
    agent: 'GST agent',
    icon: FileCheck2,
    summary: 'Validates tax on every entry as it is posted',
    result: 'GSTR-1 ready · Health Check clear',
    tagline: 'Returns prepared directly from your books.',
    tags: ['Every GSTR-1 table', '2B reconciliation', 'Health Check'],
    workflow: ['Post', 'Check', 'Reconcile', 'Return ready'],
    status: 'INV-1042 · place of supply set',
    duties: ['Validates tax on every entry as it is posted', 'Reconciles purchases against GSTR-2B', 'Runs a Health Check ahead of every filing'],
    prompts: ['Is GSTR-1 ready?', "Which suppliers haven't filed?"],
    capabilities: [
      { title: 'Every GSTR-1 table', text: 'From your books, not a spreadsheet.' },
      { title: '2B reconciliation', text: 'Mismatches surfaced before filing.' },
      { title: 'Health Check', text: 'Errors caught before they reach the portal.' },
    ],
    visual: {
      title: 'GSTR-1 · October 2026 · 33AABCQ7301S1Z…',
      badge: 'Ready to file',
      meter: { label: '2B matched', value: '98.6%', pct: 0.986 },
      caption: '2B matched 98.6% · 6 supplier mismatches listed',
    },
    flagship: {
      eyebrow: 'GSTR-2B reconciliation · ITC Guard',
      title: 'Claim every rupee of eligible ITC. Not a rupee more.',
      steps: [
        { title: 'Import 2B', text: 'Upload the 2B file from the portal or the offline tool.' },
        { title: 'Match', text: 'Matched by supplier GSTIN and invoice number, within a ₹2 tolerance.' },
        { title: 'Identify the gaps', text: 'Entries only in 2B (unclaimed credit) and only in books (credit at risk).' },
        {
          title: 'ITC Guard',
          text: 'Covers not in 2B, mismatches, Rule 37 (unpaid beyond 180 days), the s.16(4) deadline and s.17(5) blocked credits.',
        },
        { title: 'Propose the adjustment', text: 'The reversal journal awaits approval from a second person.' },
        { title: 'Decide', text: 'Reverse, reclaim or accept the risk — with a recorded reason.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'GSTR-2B · October 2026',
        lines: ['412 supplier invoices imported'],
        facts: [
          'Nothing is posted automatically',
          '₹2 tolerance',
          'Credit notes matched to debit notes',
          'No-GSTIN and RCM entries listed separately',
          'Act-by dates displayed',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Only in books', text: 'Credit at risk, s.16(2)(aa)' },
        { title: 'Only in 2B', text: 'Claim before the s.16(4) deadline' },
        { title: 'Rule 37 flag', text: 'Interest under s.50' },
        { title: 's.17(5) flag', text: 'Reverse with a single approval' },
      ],
      note: '2B reconciliation: Standard and above · ITC Guard: add-on with Standard to Plus, included in Enterprise · Portal filing and IMS: coming soon.',
    },
    chat: [
      { from: 'you', time: '17:30', text: 'Is GSTR-1 ready?' },
      { from: 'parrot', time: '17:30', text: 'Yes — 312 invoices, ₹1.42 Cr taxable. Health Check clear ✓', highlight: '₹1.42 Cr' },
      { from: 'you', time: '17:31', text: "Which suppliers haven't filed?" },
      { from: 'parrot', time: '17:31', text: '4 suppliers — ₹22,650 of ITC at risk. Shall I send them a note?', highlight: '₹22,650' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'GSTR1_working_OCT.xlsx',
      time: '≈ 6 h a month',
      columns: ['GSTIN', 'Inv', 'Books', '2B'],
      rows: [
        ['33AAB…1Z5', 'B-882', '18,400', '—'],
        ['29KLM…1Z2', 'AP-77', '9,000', '9,000'],
        ['33XYZ…1Z9', 'T-019', '2,250', '2,520'],
      ],
      tasks: [
        ['Export sales into the return format', '60 min'],
        ['Reconcile purchases against GSTR-2B', '120 min'],
        ['Strip out blocked ITC', '40 min'],
        ['Reconcile GSTR-1, 3B and books', '70 min'],
        ['Correct errors rejected by the portal', '70 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 15 min of your time',
      kpis: [
        { label: 'ITC at risk', value: '₹22,650' },
        { label: 'Health Check', value: '0 errors' },
      ],
      tasks: [
        ['GSTR-1 tables built directly from books', 'auto'],
        ['2B reconciled · 4 suppliers yet to file', 'auto'],
        ['s.17(5) ITC blocked at entry', 'auto'],
        ['Health Check clear · ready to file', 'approve'],
        ['GSTR-1, 3B and books reconciled', 'auto'],
      ],
      results: [
        ['6 h → 15 min', 'per month on GST'],
        ['Clear', 'Health Check before filing'],
        ['Tied', '3B · 1 · books'],
      ],
      note: 'Illustrative month for a business with around 300 B2B invoices.',
    },
  },
  {
    slug: 'tds',
    num: '08',
    name: 'TDS, TCS and MSME',
    agent: 'TDS agent',
    icon: Percent,
    summary: 'Selects the correct section and rate',
    result: 'Certificates ready for 18 parties',
    tagline: 'The Income-tax Act 2025, applied to every entry.',
    tags: ['Income-tax Act 2025', 'The right rate, every time', 'Reconciled to the ledger'],
    workflow: ['Deduct', 'Deposit', 'Return', 'Certificate'],
    status: 'Rent ₹50,000 · TDS under s.393',
    duties: ['Selects the correct section and rate', 'Monitors thresholds for every party', 'Reminds you ahead of challan due dates'],
    prompts: ['TDS due this month?', 'Which parties have no PAN?'],
    capabilities: [
      { title: 'Income-tax Act 2025', text: 's.393, with legacy sections shown alongside.' },
      { title: 'The right rate, every time', text: 'Thresholds, HUF and no-PAN cases.' },
      { title: 'Reconciled to the ledger', text: 'Register matches the books.' },
    ],
    visual: {
      title: 'TDS register · Income-tax Act, 2025',
      badge: 'Reconciled to the ledger',
      caption: 'Awaiting approval ₹4,200 shown separately · Form 140 ready',
    },
    flagship: {
      eyebrow: 'TDS engine · Income-tax Act 2025',
      title: 'The right section. The right rate. Every time.',
      steps: [
        { title: 'The right law', text: 'The 2025 Act applies from 1 Apr 2026; earlier entries retain their 1961 Act references.' },
        { title: 'The right section', text: 'Legacy 194C is read as its s.393 equivalent; forms map from 26Q → 140.' },
        { title: 'Threshold', text: 'Single, annual, monthly or excess-over — with catch-up once crossed.' },
        { title: 'Rate', text: 'Lower-deduction certificate applied first, then no-PAN (the higher of the section rate or 20%).' },
        { title: 'Follows the entry', text: 'Applied on posting; held while the entry awaits approval.' },
        { title: 'Challan and return', text: 'Due by the 7th (March: 30 April), with a return file ready for the validation utility.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Bill · Raj Builders · ₹80,000',
        lines: ['Dated 4 Nov 2026 → Income-tax Act 2025'],
        facts: [
          'Stored data is never rewritten',
          'Inoperative PAN treated as no PAN',
          'Certificates honoured within their dates and limits',
          'Multiple TANs supported',
          'Correction returns supported',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Higher rate applied', text: 'Higher of section rate or 20%' },
        { title: 'Catch-up deduction', text: 'On earlier amounts' },
        { title: 'TDS released', text: 'Excluded from the register' },
        { title: 'Certificate rate applied', text: 'Within its validity dates and amount' },
      ],
      note: 'TDS and TCS: every pack · Until the return format under the new Act is finalised, run the latest validation utility before upload.',
    },
    chat: [
      { from: 'you', time: '12:00', text: 'TDS due this month?' },
      { from: 'parrot', time: '12:00', text: '₹64,300 by 7 Dec — contracts ₹21,000, rent ₹43,300 (s.393).', highlight: '₹64,300' },
      { from: 'you', time: '12:01', text: 'Which parties have no PAN?' },
      { from: 'parrot', time: '12:01', text: '2 parties — the higher no-PAN rate (s.397) has been applied. Shall I request their PAN?' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'TDS_workings_Q3.xlsx',
      time: '≈ 4 h a month',
      columns: ['Party', 'Nature', 'Section', 'Rate'],
      rows: [
        ['Raj Builders', 'Contract', '194C?', '1%?'],
        ['S. Kannan', 'Rent', '194I', '10%'],
        ['New vendor', 'Prof.', '?', 'no PAN'],
      ],
      tasks: [
        ['Determine the section for every bill', '50 min'],
        ['Track thresholds party by party', '40 min'],
        ['Apply no-PAN and special rates', '30 min'],
        ['Prepare challans', '40 min'],
        ['Reconcile the TDS register to the ledger', '80 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 10 min of your time',
      kpis: [
        { label: 'TDS this month', value: '₹64,300' },
        { label: 'Parties without PAN', value: '2' },
      ],
      tasks: [
        ['s.393 section selected on every bill', 'auto'],
        ['Thresholds tracked for every party', 'auto'],
        ['No-PAN rate applied · s.397', 'auto'],
        ['Challan due 7 Dec · ₹64,300', 'approve'],
        ['Register matches the ledger', 'auto'],
      ],
      results: [
        ['4 h → 10 min', 'per month on TDS'],
        ['Income-tax Act 2025', 'rates built in'],
        ['0', 'short deductions'],
      ],
      note: 'Illustrative month for a business deducting TDS on around 60 bills.',
    },
  },
  {
    slug: 'reports',
    num: '09',
    name: 'Reports and analytics',
    agent: 'Reports agent',
    icon: BarChart3,
    summary: 'Delivers your workbooks by email, on schedule',
    result: 'Margin moved — with the reasons explained',
    tagline: 'From statutory statements to the answers business owners need.',
    tags: ['Schedule III', 'Report builder', 'Scheduled delivery'],
    workflow: ['Books', 'Statements', 'Insight'],
    status: 'Live books · no exports required',
    duties: ['Delivers your workbooks by email, on schedule', 'Explains why a figure moved', 'Raises alerts on anomalies'],
    prompts: ['Send P&L to my CA', 'Top 10 customers this year'],
    capabilities: [
      { title: 'Schedule III', text: 'Statements ready for sign-off.' },
      { title: 'Report builder', text: 'Your own views, saved for reuse.' },
      { title: 'Scheduled delivery', text: 'Workbooks delivered to your inbox.' },
    ],
    visual: {
      title: 'Balance Sheet · Schedule III',
      caption: 'Vertical format · notes · previous-year column',
    },
    flagship: {
      eyebrow: 'Report builder · scheduled reports',
      title: 'Your report, built from a sentence. Delivered on schedule.',
      steps: [
        { title: 'Describe it', text: "“Sales with customer PAN for last two months” — interpreted by PairO's own model." },
        { title: 'Shape it', text: 'Fields, filters, groupings, subtotals and formulas.' },
        { title: 'Run it', text: 'Read-only, with accurate subtotals, in seconds.' },
        { title: 'Save and share', text: "Versions are retained; share by role without widening anyone's access." },
        { title: 'Pin it', text: 'Pin to a module menu — for yourself or the whole company.' },
        { title: 'Schedule it', text: 'Daily, weekly or monthly, in Excel or PDF, to as many as 20 recipients.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Report builder',
        lines: ['Data: sales invoices', 'Fields: customer, PAN, amount', 'Period: last 2 months'],
        facts: [
          'Runs with the access of the person who scheduled it',
          'Access lost → schedule paused, and you are notified',
          'External addresses only with Admin approval',
          'Ready-made starter templates',
          '20-second safety limit',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Displayed as chips', text: 'Correct them in a tap' },
        { title: 'Schedule is paused', text: 'Notified in-app and by email' },
        { title: 'Reports continue to run', text: 'Editing locked' },
        { title: 'Data scope preserved', text: 'Every user sees only their own data' },
      ],
      note: 'Report builder: Professional Plus (25 reports) and Enterprise (unlimited) · Scheduled reports: every pack (Free 5 · Standard 25 · Professional 100 · Plus and Enterprise unlimited).',
    },
    chat: [
      { from: 'you', time: '18:10', text: 'Send P&L to my CA' },
      { from: 'parrot', time: '18:10', text: 'October P&L and balance sheet sent to your CA ✓' },
      { from: 'you', time: '18:11', text: 'Top 10 customers this year' },
      { from: 'parrot', time: '18:11', text: 'Kumar Constructions leads at ₹38 L. The full list is open for you.', highlight: '₹38 L' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'MIS_pack_OCT_v3.xlsx',
      time: '≈ 6 h a month',
      columns: ['Report', 'Source', 'Updated', 'Sent?'],
      rows: [
        ['P&L', 'TB export', '3 Nov', 'no'],
        ['Debtors ageing', 'manual', '?', 'no'],
        ['Cash flow', '—', '—', '—'],
      ],
      tasks: [
        ['Export the trial balance to Excel', '40 min'],
        ['Rebuild the P&L and balance sheet', '90 min'],
        ['Explain why the numbers moved', '80 min'],
        ['Format and email the MIS', '60 min'],
        ['Search for anomalies', '90 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 5 min of your time',
      kpis: [
        { label: 'Reports scheduled', value: '7' },
        { label: 'Net profit', value: '₹9.8 L', delta: '↑ 6%' },
      ],
      tasks: [
        ['Schedule III statements, always live', 'auto'],
        ['Cash flow and forecast prepared', 'auto'],
        ['Commentary on major movements written', 'auto'],
        ['MIS emailed to MD and CA · 1st, 8 am', 'auto'],
        ['2 anomalies flagged for your review', 'approve'],
      ],
      results: [
        ['6 h → 5 min', 'per month on MIS'],
        ['Auto', 'emailed on the 1st'],
        ['Live', 'every report'],
      ],
      note: 'Illustrative month for a monthly MIS pack of around 7 reports.',
    },
  },
  {
    slug: 'budgets',
    num: '10',
    name: 'Budgets and planning',
    agent: 'Budget agent',
    icon: PiggyBank,
    summary: 'Warns on or blocks over-budget spend',
    result: 'Overrun routed to you',
    tagline: 'Budgets that step in before the money is spent.',
    tags: ['Warn · block · route', 'Scenarios', 'Profitability'],
    workflow: ['Plan', 'Track', 'Alert'],
    status: 'FY 2026-27 budget approved',
    duties: ['Warns on or blocks over-budget spend', 'Escalates overruns for approval', 'Forecasts where the month will land'],
    prompts: ['Where are we over budget?', 'Marketing spend vs plan'],
    capabilities: [
      { title: 'Warn · block · route', text: 'You choose the level of control.' },
      { title: 'Scenarios', text: 'Versions compared side by side.' },
      { title: 'Profitability', text: 'By item, branch and project.' },
    ],
    visual: {
      title: 'Budget vs actual · FY 2026-27',
      rows: [
        { label: 'Marketing', value: '88% · warn', pct: 0.88, tone: 'warn' },
        { label: 'Travel', value: '102% · blocked', pct: 1, tone: 'fail' },
        { label: 'Repairs', value: '46%', pct: 0.46, tone: 'ok' },
        { label: 'Salaries', value: '61%', pct: 0.61, tone: 'ok' },
      ],
      footer: { label: 'Sent for approval', value: 'Travel claim ₹18,400 routed to CFO' },
    },
    flagship: {
      eyebrow: 'Budget control',
      title: 'Stop overspending before it is posted.',
      steps: [
        { title: 'Plan', text: 'Budget ledgers across 12 months, by department, cost centre or project; pre-fill from last year ± %.' },
        { title: 'Approve', text: 'Draft → submitted → approved. The preparer can never be the approver.' },
        { title: 'Check at posting', text: 'Actual + committed + the current entry, measured against budget for the month or year to date.' },
        { title: 'Warn · block · route', text: 'Warn and proceed, block unless overridden, or route to an approver.' },
        { title: 'Commitments', text: 'Open POs are counted before they are billed.' },
        { title: 'Versions', text: 'Revisions supersede earlier versions, with forecasts and scenarios for what-if analysis.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Budget · FY 2026-27',
        lines: ['Marketing · ₹24 L a year', 'Pre-filled from last year +10%'],
        facts: [
          'Income is never blocked',
          'Every override is recorded',
          'Two entries can never claim the same last rupee',
          'Budget can be locked for the year',
          'Forecasts never block posting',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Posts with a warning', text: 'Recorded in the register' },
        { title: 'Refused', text: 'Override with a reason' },
        { title: 'Awaits an approver', text: 'With your reason' },
        { title: 'One is held', text: 'No double spending' },
      ],
      note: 'Budgets: Professional (warn) · Plus (warn, block, commitments, forecasts) · Enterprise (route, scenarios, drivers).',
    },
    chat: [
      { from: 'you', time: '15:00', text: 'Where are we over budget?' },
      {
        from: 'parrot',
        time: '15:00',
        text: 'Marketing: ₹2.46 L against ₹2.00 L (+23%). Everything else is on track.',
        highlight: '₹2.46 L',
      },
      { from: 'you', time: '15:01', text: "What's committed on marketing?" },
      { from: 'parrot', time: '15:01', text: 'A further ₹30,000 in open POs — landing at ₹2.76 L if all are billed.' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'budget_vs_actual.xlsx',
      time: '≈ 4 h a month',
      columns: ['Head', 'Budget', 'Actual', 'Var.'],
      rows: [
        ['Marketing', '2,00,000', '2,46,000', '+23%'],
        ['Travel', '80,000', '61,000', '?'],
        ['Repairs', '50,000', '—', '—'],
      ],
      tasks: [
        ['Copy actuals into the budget spreadsheet', '60 min'],
        ['Identify heads over budget', '40 min'],
        ['Seek approval for overspends', '50 min'],
        ['Re-forecast the month', '60 min'],
        ['Apportion overheads by branch', '30 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 10 min of your time',
      kpis: [
        { label: 'Over budget', value: '1 head' },
        { label: 'Forecast landing', value: '₹1.2 Cr' },
      ],
      tasks: [
        ['Actuals vs budget, in real time', 'auto'],
        ['Over-budget spend warned or blocked', 'auto'],
        ['Overrun routed to you', 'approve'],
        ['Month-end landing forecast', 'auto'],
        ['Overheads allocated by driver', 'auto'],
      ],
      results: [
        ['4 h → 10 min', 'per month on budgets'],
        ['Before', 'money is spent'],
        ['1 tap', 'to approve overruns'],
      ],
      note: 'Illustrative month for around 25 budget heads across 2 branches.',
    },
  },
  {
    slug: 'control',
    num: '11',
    name: 'Approvals and control',
    agent: 'Approval agent',
    icon: ShieldCheck,
    summary: 'Directs approvals by amount and role',
    result: 'Logged with reason and timestamp',
    tagline: 'Maker-checker discipline, without slowing your team down.',
    tags: ['Maker-checker', 'Roles and limits', '2FA · SSO'],
    workflow: ['Request', 'Approve', 'Audit'],
    status: 'Payment ₹4.8 L requested by Priya',
    duties: ['Directs approvals by amount and role', 'Executes your automations', 'Records every change for audit'],
    prompts: ["What's waiting for my approval?", 'Who changed this voucher?'],
    capabilities: [
      { title: 'Maker-checker', text: 'Set by amount and type.' },
      { title: 'Roles and limits', text: 'See only what is yours to see.' },
      { title: '2FA · SSO', text: 'Bank-grade sign-in security.' },
    ],
    visual: {
      title: 'Approvals inbox',
      actions: ['Approve', 'Send back'],
      caption: 'Maker-checker · 3 levels · delegation enabled',
    },
    flagship: {
      eyebrow: 'Approvals · automations',
      title: 'The right approver, every time. Nothing slips through.',
      steps: [
        { title: 'Set the rule', text: 'For each voucher type: approval at or above a set amount, with approver limits.' },
        { title: 'Route', text: 'Steps by role, manager, named individuals or position — any one approver, or all.' },
        { title: 'Remind', text: 'After your escalation period (default: one day), then daily.' },
        { title: 'Approve', text: 'The maker can never approve. Every step is audited.' },
        { title: 'Automate', text: 'When an event occurs, check the conditions and act. 39 templates included.' },
        { title: 'Drafts only', text: 'Automations create drafts and tasks — they never post.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Payment · ₹4,80,000',
        lines: ['Rule: payments of ₹1 L or more require approval'],
        facts: [
          'The maker is never the checker',
          'Workflow versions retained',
          'Vacant seat → escalates to the next level',
          'New automations are switched off by default',
          'Test mode writes nothing',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Next level up', text: 'Delegation available on Enterprise' },
        { title: 'Earlier version continues', text: 'For documents already in progress' },
        { title: 'Stopped', text: 'Chain depth 3 · 200 runs an hour' },
        { title: 'Refused on saving', text: 'Validated before it goes live' },
      ],
      note: 'Maker-checker and workflows: Professional (1 step) · Plus (3 steps) · Enterprise (unlimited, delegation) · Automations: Plus (10) and Enterprise (unlimited).',
    },
    chat: [
      { from: 'you', time: '09:05', text: "What's waiting for my approval?" },
      { from: 'parrot', time: '09:05', text: '2 items: ₹4.8 L payment to Sri Balaji Steels, and JV-221.', highlight: '₹4.8 L' },
      { from: 'you', time: '09:06', text: 'Who changed JV-221?' },
      { from: 'parrot', time: '09:06', text: 'Priya, at 10:41 yesterday — rate changed from ₹420 → ₹410, reason: agreed price.' },
    ],
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'approvals_tracker.xlsx',
      time: '≈ 3 h a week',
      columns: ['Voucher', 'Amount', 'Approver', 'Status'],
      rows: [
        ['PV-1182', '4,80,000', 'MD?', 'email sent'],
        ['JV-221', '62,000', '—', 'posted!'],
        ['PV-1190', '18,000', 'Ravi', '?'],
      ],
      tasks: [
        ['Email vouchers out for approval', '50 min'],
        ['Follow up with approvers', '50 min'],
        ['Trace who changed what', '40 min'],
        ['Grant and revoke access', '20 min'],
        ['Run routine tasks manually', '20 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 10 min of your time',
      kpis: [
        { label: 'Awaiting you', value: '1' },
        { label: 'Changes logged', value: '100%' },
      ],
      tasks: [
        ['Routed by amount and role', 'auto'],
        ['Reminders sent to approvers', 'auto'],
        ['Every change logged with a reason', 'auto'],
        ['₹4.8 L payment awaiting approval', 'approve'],
        ['Automations run on schedule', 'auto'],
      ],
      results: [
        ['3 h → 10 min', 'per week on approvals'],
        ['0', 'unapproved payments'],
        ['Full', 'audit trail'],
      ],
      note: 'Illustrative week for a team of around 10 users.',
    },
  },
  {
    slug: 'parrot',
    num: '12',
    name: 'Parrot AI and Connect',
    agent: 'Parrot AI',
    icon: Bird,
    summary: 'Turns plain language into draft entries',
    result: 'Posted on your tap · INV-1042',
    tagline: 'Your intelligent accounting assistant, and a connected network of PairO businesses.',
    tags: ['Plain language', 'Confirmation card', 'Own model'],
    workflow: ['Ask', 'Draft', 'Confirm'],
    status: '“Invoice Kumar 40 bags cement”',
    duties: ['Turns plain language into draft entries', 'Answers directly from your live books', 'Learns how you prefer to book'],
    // Tamil reconstructed from the source (its Tamil glyphs did not survive export): "How much GST is due?"
    prompts: ['எவ்வளவு GST கட்டணும்?', 'Aaj ka sales kitna hua?'],
    capabilities: [
      { title: 'Plain language', text: 'Typed or spoken.' },
      { title: 'Confirmation card', text: 'Nothing is posted without you.' },
      { title: 'Own model', text: 'No external AI, ever.' },
    ],
    visual: { title: 'Parrot AI', chat: homeChat },
    flagship: {
      eyebrow: 'Parrot AI actions',
      title: 'Say it. Review the card. Tap to post.',
      steps: [
        { title: 'Ask', text: 'Type or speak: “Esaki paid 5k”, “expense 500 travel from cash”.' },
        { title: 'Understand', text: "Interpreted by PairO's own rules and model. A question is never treated as an action." },
        { title: 'Find the name', text: 'Exact, partial, every-word and sound-alike matching. It asks when unsure.' },
        { title: 'Dry run', text: 'The live service runs in dry-run mode, and a card shows exactly what would be posted.' },
        { title: 'Confirm', text: 'By the same person, within 15 minutes. Every check is run again.' },
        { title: 'Undo', text: 'A 10-minute window to undo a Parrot AI invoice, provided it has not been shared, paid or filed.' },
      ],
      panel: {
        label: 'PairO · Step 1 of 6',
        title: 'Parrot AI',
        lines: ['“Esaki paid 5k”'],
        facts: [
          'Voice never posts — you confirm with a tap',
          'Access: read · draft · post',
          'WhatsApp confirmation requires YES + code',
          'Optional posting PIN',
          'No external AI, ever',
        ],
      },
      outcomesTitle: whenSomethingDoesntAddUp,
      outcomes: [
        { title: 'Asks which one', text: 'Never guesses' },
        { title: 'Prompts for a tap', text: 'Voice alone cannot post' },
        { title: 'Expired', text: 'Simply ask again' },
        { title: 'Refused at confirmation', text: 'The same checks as on screen' },
      ],
      note: 'Questions: every pack · Entries and voice: Standard and above · WhatsApp and approvals: Professional and above · Posting PIN: Enterprise.',
    },
    compareTitle: 'The same work. Two very different ways.',
    manual: {
      file: 'notes_for_accountant.txt',
      time: '≈ 3 h a week',
      columns: ['Note', 'From', 'Date', 'Done?'],
      rows: [
        ['bill for cement??', 'owner', '02-11', 'no'],
        ['how much GST due', 'owner', '03-11', '?'],
        ['Kumar paid?', 'sales', '04-11', '?'],
      ],
      tasks: [
        ['Wait for the accountant to respond', '60 min'],
        ['Write notes for every bill', '30 min'],
        ['Look up balances in reports', '40 min'],
        ['Explain entries to the team', '30 min'],
        ['Re-key the same entries', '20 min'],
      ],
    },
    agentWay: {
      label: 'PairO · agent',
      time: '≈ 5 min of your time',
      kpis: [
        { label: 'Questions answered', value: '46' },
        { label: 'Entries drafted', value: '38' },
      ],
      tasks: [
        ['Answers from your live books in seconds', 'auto'],
        ['Voice note converted into a draft invoice', 'auto'],
        ['Balances and dues, on demand', 'auto'],
        ['Draft confirmed in one tap', 'approve'],
        ['Learns your booking preferences', 'auto'],
      ],
      results: [
        ['3 h → 5 min', 'per week of back-and-forth'],
        ['Tamil · Hindi', 'and English'],
        ['0', 'external AI'],
      ],
      note: 'Illustrative week for an owner and a small accounts team.',
    },
  },
]

export const solutionBySlug = (slug?: string) => solutions.find((s) => s.slug === slug)
export const solutionPath = (s: Solution) => `/solutions/${s.slug}`

/* ------------------------------------------------------------------ Hub */

export const solutionsHub = {
  eyebrow: 'Agentic solutions',
  title: 'A dedicated agent for every module.',
  lead: 'Twelve agents handle the routine work, all posting to a single ledger. You approve only what matters.',
  stats: [
    { value: '12', label: 'agents' },
    { value: '1', label: 'ledger' },
    { value: '0', label: 're-entry' },
  ],
  ledgerLabel: 'entries in one unified ledger',
  hint: 'Hover over a card · or watch the agents work in turn',
  homeTitle: 'Twelve agentic solutions. One unified ledger.',
  link: { label: 'View all agentic solutions', to: '/solutions' },
  extras: {
    eyebrow: 'Also built into PairO',
    title: 'Collaborate, consolidate and query — without ever leaving your books.',
    teamChat: {
      label: 'Team chat',
      title: 'Built-in team chat',
      text: 'Message a colleague, a team or the entire company — right alongside your books.',
      channels: ['# Company room', 'Accounts team', 'Priya', 'Ravi'],
      messages: [
        { who: 'Priya · 10:41', text: 'JV-221 is ready — could you approve it?', chip: 'JV-221 · ₹62,000' },
        { who: 'Ravi · 10:42', text: 'Approved ✓ Please send across the rent agreement.' },
        { who: 'Priya · 10:43', attachment: 'rent-agreement.pdf' },
      ],
      points: ['Direct, group and company-wide channels', 'Files remain private to each conversation', 'Messages delivered in real time'],
      plan: 'Included in every pack',
    },
    consolidation: {
      label: 'Consolidation agent',
      title: 'Inter-company and eliminations',
      text: 'Every inter-company entry is tracked, paired and eliminated from the group figures.',
      pairs: [
        { company: 'Sri Lakshmi Traders', entries: ['Dr ₹12.40 L', 'Dr ₹0.85 L'] },
        { company: 'SLT Exports', entries: ['Cr ₹12.40 L', 'exception'] },
      ],
      tb: {
        title: 'Consolidated trial balance',
        rows: [
          ['Combined receivables', '₹2.08 Cr'],
          ['Inter-company elimination', '− ₹12.40 L'],
          ['Group receivables', '₹1.96 Cr'],
        ],
      },
      points: [
        'Equal-and-opposite pairing, with a reason for every exception',
        'Eliminations in line with AS 21 / Ind AS 110',
        'Adjustments confined to group figures, fully audited',
      ],
      plan: 'Enterprise',
    },
    reports: {
      label: 'Reports agent',
      title: 'Reports in plain language',
      text: 'Describe what you need. PairO builds the report — fields, filters and totals included.',
      chips: ['Data · Sales invoices', 'Fields · customer, PAN, amount', 'Period · last 2 months'],
      columns: ['Customer', 'PAN', 'Amount'],
      rows: [
        ['Kumar Constructions', 'AABCK••••Q', '₹38.2 L'],
        ['Mehta Traders', 'AAGFM••••L', '₹12.6 L'],
        ['Ravi Enterprises', 'AFTPR••••K', '₹9.4 L'],
      ],
      points: ["Interpreted by PairO's own model", 'Handles everyday Tanglish and Hindi', 'Save, share by role and schedule by email'],
      plan: 'Professional Plus · Enterprise',
    },
  },
}
