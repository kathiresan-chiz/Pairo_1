// Parrot AI conversation data, shared by the home page, Parrot AI page and solution pages.

export interface DraftCard {
  title: string // e.g. 'Sales invoice · draft'
  party: string
  lines: [string, string][]
  total?: [string, string]
}

export interface ChatMessage {
  from: 'you' | 'parrot'
  time: string
  text?: string
  /** phrase(s) in `text` shown emphasised */
  highlight?: string | string[]
  /** voice note: duration, with the transcript in `text` */
  voice?: string
  /** attachment file name */
  attachment?: string
  card?: DraftCard
}

export const salesDraft: DraftCard = {
  title: 'Sales invoice · draft',
  party: 'Kumar Constructions',
  lines: [
    ['Cement 53 gr × 40', '₹16,800'],
    ['CGST 9% + SGST 9%', '₹3,024'],
  ],
  total: ['Total', '₹19,824'],
}

// The conversation shown on the home page and on "Parrot AI and Connect"
export const homeChat: ChatMessage[] = [
  { from: 'you', time: '10:02', text: 'Who owes us the most?' },
  {
    from: 'parrot',
    time: '10:02',
    text: 'Kumar Constructions — ₹1,77,000, of which ₹1,20,000 is 12 days overdue.',
    highlight: '₹1,77,000',
  },
  { from: 'you', time: '10:03', text: 'Send them a reminder' },
  { from: 'parrot', time: '10:03', text: 'Reminder sent by email, with a UPI pay link and account statement ✓' },
  { from: 'you', time: '10:05', voice: '0:04', text: '“Bill Kumar 40 bags cement”' },
  { from: 'parrot', time: '10:05', card: salesDraft },
  { from: 'you', time: '10:05', text: 'Confirm' },
  { from: 'parrot', time: '10:05', text: 'Posted · INV-1042. GST and credit limit verified ✓', highlight: 'INV-1042' },
]
