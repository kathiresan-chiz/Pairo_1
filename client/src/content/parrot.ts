// The Parrot AI page. Tamil and Hindi text was reconstructed: its glyphs did not survive
// export from the source document (placeholder: confirm with a native speaker).

import type { ChatMessage } from './chat'

export interface Scenario {
  title: string
  text: string
  prompt: string
  chat: ChatMessage[]
}

export const parrotPage = {
  eyebrow: 'Parrot AI · your intelligent accounting assistant',
  title: 'Just ask. Parrot AI takes care of the entry.',
  lead: 'Type, speak or share a photo — in English, Tamil or Hindi. Nothing is posted until you confirm.',
  tags: ['Voice', 'Bill photos', '3 languages', 'Own model'],
  greetings: ['Hello', 'வணக்கம்', 'नमस्ते'],
  listening: 'Parrot AI is listening',
  prompts: [
    '“What\'s my bank balance?”',
    '“Invoice Kumar 40 bags cement”',
    '“Is my 3B ready?”',
    '“இந்த மாசம் sales எவ்வளவு?”',
    '“Aaj ka collection kitna hua?”',
    '“Who should we remind today?”',
  ],
  scenariosHint: 'Select a card to watch that scenario play out in the chat.',
  footnote: "Runs on PairO's own model. Your data is never sent to an external AI.",
}

export const scenarios: Scenario[] = [
  {
    title: 'Answers from your books',
    text: 'Live figures, never estimates.',
    prompt: "What's my bank balance?",
    chat: [
      { from: 'you', time: '09:10', text: "What's my bank balance?" },
      {
        from: 'parrot',
        time: '09:10',
        text: 'HDFC ₹62.1 L, ICICI ₹8.4 L — ₹70.5 L in total, reconciled this morning.',
        highlight: ['₹62.1 L', '₹8.4 L'],
      },
      { from: 'you', time: '09:11', text: 'And cash in hand?' },
      { from: 'parrot', time: '09:11', text: '₹48,250 — Madurai ₹31,000, Trichy ₹17,250.', highlight: '₹48,250' },
    ],
  },
  {
    title: 'Create entries',
    text: 'Sales, purchases, receipts and journals.',
    prompt: 'Received ₹50,000 from Kumar',
    chat: [
      { from: 'you', time: '11:02', text: 'Received ₹50,000 from Kumar' },
      {
        from: 'parrot',
        time: '11:02',
        card: {
          title: 'Receipt · draft',
          party: 'Kumar Constructions',
          lines: [
            ['Into', 'HDFC Bank'],
            ['Against', 'INV-1031 (part)'],
          ],
          total: ['Amount', '₹50,000'],
        },
      },
      { from: 'you', time: '11:02', text: 'Confirm' },
      { from: 'parrot', time: '11:02', text: 'Posted · RCT-0412. INV-1031 now has ₹70,000 outstanding ✓', highlight: 'RCT-0412' },
    ],
  },
  {
    title: 'Capture voice notes',
    text: 'Hold, speak, done.',
    prompt: '🎙 Pay rent for November',
    chat: [
      { from: 'you', time: '08:45', voice: '0:04', text: '“Pay rent for November”' },
      {
        from: 'parrot',
        time: '08:45',
        card: {
          title: 'Payment · draft',
          party: 'S. Kannan · rent',
          lines: [
            ['Rent', '₹50,000'],
            ['TDS s.393 · 10%', '−₹5,000'],
          ],
          total: ['Net paid', '₹45,000'],
        },
      },
      { from: 'you', time: '08:46', text: 'Confirm' },
      { from: 'parrot', time: '08:46', text: "Paid and posted · PV-1194. TDS added to this month's challan ✓", highlight: 'PV-1194' },
    ],
  },
  {
    title: 'Read documents',
    text: 'Bills, receipts and statements.',
    prompt: '📎 bill_0412.jpg',
    chat: [
      { from: 'you', time: '10:20', attachment: 'bill_0412.jpg' },
      {
        from: 'parrot',
        time: '10:20',
        text: 'Captured — Sri Balaji Steels, B-882, ₹1,18,000 incl. 18% GST. Matches PO-114 and GRN-208.',
        highlight: 'B-882',
      },
      {
        from: 'parrot',
        time: '10:20',
        card: {
          title: 'Purchase bill · draft',
          party: 'Sri Balaji Steels',
          lines: [
            ['TMT 12 mm × 2 t', '₹1,00,000'],
            ['CGST + SGST 18%', '₹18,000'],
          ],
          total: ['Total', '₹1,18,000'],
        },
      },
      { from: 'you', time: '10:21', text: 'Confirm' },
    ],
  },
  {
    title: 'Drive collections',
    text: 'Email follow-ups with UPI pay links.',
    prompt: 'Who should we remind today?',
    chat: [
      { from: 'you', time: '09:30', text: 'Who should we remind today?' },
      {
        from: 'parrot',
        time: '09:30',
        text: '6 customers, ₹4.6 L overdue. Reminders are ready — friendly for 4, firm for 2.',
        highlight: '₹4.6 L',
      },
      { from: 'you', time: '09:31', text: 'Send them' },
      { from: 'parrot', time: '09:31', text: 'Approved · emails go out at 10 am with UPI pay links and statements ✓' },
    ],
  },
  {
    title: 'Explain reports',
    text: 'Why a figure moved, in plain language.',
    prompt: 'Why did margin drop?',
    chat: [
      { from: 'you', time: '16:05', text: 'Why did margin drop?' },
      {
        from: 'parrot',
        time: '16:05',
        text: 'Gross margin fell from 24% to 21%: cement cost rose 6%, and 3 invoices carried discounts above 15%.',
        highlight: '24% to 21%',
      },
      { from: 'you', time: '16:06', text: 'Show those invoices' },
      { from: 'parrot', time: '16:06', text: 'INV-1040, 1044 and 1047 — ₹1.9 L in total. The list is open for you.' },
    ],
  },
  {
    title: 'Verify compliance',
    text: 'GST and TDS, before you file.',
    prompt: 'Is my 3B ready?',
    chat: [
      { from: 'you', time: '17:40', text: 'Is my 3B ready?' },
      {
        from: 'parrot',
        time: '17:40',
        text: 'Almost. 1 issue: ITC of ₹18,400 on motor car repairs is blocked under s.17(5). Shall I reverse it?',
        highlight: '₹18,400',
      },
      { from: 'you', time: '17:41', text: 'Yes' },
      { from: 'parrot', time: '17:41', text: 'Reversed · JV-221. GSTR-3B, GSTR-1 and books now agree ✓', highlight: 'JV-221' },
    ],
  },
  {
    title: 'Speak your language',
    text: 'English, Tamil, Hindi and Tanglish.',
    prompt: 'Indha maasam sales evvalavu?',
    chat: [
      { from: 'you', time: '18:02', text: 'இந்த மாசம் sales எவ்வளவு?' },
      {
        from: 'parrot',
        time: '18:02',
        text: 'இந்த மாசம் sales ₹48.6 லட்சம் — போன மாசத்தை விட 12% அதிகம்.',
        highlight: '₹48.6 லட்சம்',
      },
      { from: 'you', time: '18:03', text: 'Aaj ka collection kitna hua?' },
      { from: 'parrot', time: '18:03', text: 'Aaj ₹2.3 lakh aaye — 5 customers se.', highlight: '₹2.3 lakh' },
    ],
  },
  {
    title: 'Learn your preferences',
    text: 'Every correction becomes a rule.',
    prompt: 'Always book diesel to Vehicle exp.',
    chat: [
      { from: 'you', time: '12:15', text: 'Always book diesel to Vehicle expenses' },
      {
        from: 'parrot',
        time: '12:15',
        text: 'Noted. Diesel bills will be booked to Vehicle expenses from now on.',
        highlight: 'Vehicle expenses',
      },
      { from: 'you', time: '15:40', attachment: 'diesel_bill_0911.jpg' },
      { from: 'parrot', time: '15:40', text: 'Booked ₹6,480 to Vehicle expenses — just as you taught me ✓' },
    ],
  },
]
