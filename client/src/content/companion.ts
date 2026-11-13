// What the Parrot AI companion (bottom-right, every page) says and answers.
// Sample answers from the demo company, matching the Parrot AI page and agent pages.

import { scenarios } from './parrot'
import { solutions } from './solutions'

export const companionAnswers: Record<string, string> = {
  ...Object.fromEntries(
    scenarios.flatMap((s) => {
      const reply = s.chat.find((m) => m.from === 'parrot' && m.text)
      return reply?.text ? [[s.prompt, reply.text]] : []
    }),
  ),
  'Received ₹50,000 from Kumar': 'Draft receipt: Kumar Constructions, into HDFC Bank, against INV-1031 (part). Confirm?',
  // Tamil and Hindi replies: placeholder text, confirm with a native speaker.
  'எவ்வளவு GST கட்டணும்?': 'இந்த மாசம் GST ₹3.86 லட்சம் கட்டணும் — ITC adjust பண்ணின பிறகு. Due 20ஆம் தேதி.',
  'Aaj ka sales kitna hua?': 'Aaj ₹1.8 lakh ki sales hui — 9 invoices, sabse bada Kumar Constructions ₹42,000.',
  'Who owes us the most?': 'Kumar Constructions — ₹1,77,000. ₹1,20,000 is 12 days overdue.',
  'Invoice Kumar 40 bags cement': 'Draft ready: cement 53 grade × 40, ₹16,800 + GST ₹3,024 = ₹19,824. Confirm?',
  'Which bills are due this week?': '7 bills, ₹8.4 L. Largest: Sri Balaji Steels ₹1,18,000 on Thursday.',
  'Book this bill': 'Read it — Sri Balaji Steels, ₹1,18,000, matches PO-114 and GRN-208. Confirm?',
  'Why is October profit lower?': 'Down ₹1.6 L: rent revised +₹40,000 and freight up ₹1.1 L.',
  'Show cash in hand today': '₹48,250 — Madurai ₹31,000, Trichy ₹17,250.',
  "What's unreconciled?": '8 lines, ₹14,200. 5 look like bank charges — book them?',
  "Did Ravi's payment come in?": 'Yes — ₹62,000 by NEFT on 3 Nov, settled against INV-1036 ✓',
  "What's below reorder level?": '6 items. Cement 53 grade: 38 bags left, reorder at 100.',
  'Stock of cement in Madurai': '212 bags · ₹89,040 at cost. 40 reserved for SO-224.',
  'Can we deliver 500 units by Friday?': 'Yes, if steel arrives by Wednesday. 320 can be ready Thursday from stock.',
  'What should we buy?': '3 items short: steel 2 t, paint 40 L, bolts 5,000. Draft the POs?',
  'Is GSTR-1 ready?': 'Yes — 312 invoices, ₹1.42 Cr taxable. Health Check clear ✓',
  "Which suppliers haven't filed?": '4 suppliers — ITC ₹22,650 at risk. Send them a note?',
  'TDS due this month?': '₹64,300 by 7 Dec — contracts ₹21,000, rent ₹43,300 (s.393).',
  'Which parties have no PAN?': '2 parties — the higher no-PAN rate (s.397) is applied. Ask them for PAN?',
  'Send P&L to my CA': 'Sent October P&L and balance sheet to your CA ✓',
  'Top 10 customers this year': 'Kumar Constructions leads at ₹38 L. Opened the full list.',
  'Where are we over budget?': 'Marketing: ₹2.46 L against ₹2.00 L (+23%). Everything else is on track.',
  'Marketing spend vs plan': '₹2.46 L against a ₹2.00 L plan, plus ₹30,000 in open POs — landing at ₹2.76 L.',
  "What's waiting for my approval?": '2 items: payment ₹4.8 L to Sri Balaji Steels, and JV-221.',
  'Who changed this voucher?': 'Priya, at 10:41 yesterday — rate ₹420 → ₹410, reason: agreed price.',
}

export const companionFallback =
  'I answer that from your live books, and nothing posts until you confirm. Want to see it in a demo?'

export interface CompanionScript {
  say: string
  asks: string[]
}

const pages: Record<string, CompanionScript> = {
  '/': {
    say: "Hi, I'm Parrot AI — the AI behind every agent on this site. Ask me anything about your books.",
    asks: ["What's my bank balance?", 'Who owes us the most?', 'Is my 3B ready?'],
  },
  '/solutions': {
    say: 'Twelve agents, one AI. Whichever agent you open, you can ask me.',
    asks: ["What's unreconciled?", 'Which bills are due this week?', 'Where are we over budget?'],
  },
  '/parrot-ai': {
    say: "That's me! Ask in plain words — English, Tamil or Hindi. I'll draft it, you confirm.",
    asks: ['Received ₹50,000 from Kumar', 'Why did margin drop?', "What's my bank balance?"],
  },
  '/health-check': {
    say: 'I run 70 checks on every posting. Ask me before you file.',
    asks: ['Is my 3B ready?', "Which suppliers haven't filed?", "What's unreconciled?"],
  },
  '/compliance': {
    say: 'GST, TDS and MSME — I keep them ready before every due date.',
    asks: ['Is GSTR-1 ready?', 'TDS due this month?', 'Which parties have no PAN?'],
  },
  '/pricing': {
    say: 'Every pack includes me. Ask away — questions are free in every pack.',
    asks: ["What's my bank balance?", 'Who should we remind today?', 'Send P&L to my CA'],
  },
  '/contact': {
    say: "Tell us about your books — I'll be in the demo.",
    asks: ["What's my bank balance?", 'Who owes us the most?', 'Is GSTR-1 ready?'],
  },
}

export function companionScript(pathname: string): CompanionScript {
  const sol = pathname.match(/^\/solutions\/([^/]+)/)
  const s = sol && solutions.find((x) => x.slug === sol[1])
  if (s) {
    const extra = Object.keys(companionAnswers).find((a) => !s.prompts.includes(a))
    return {
      say:
        s.slug === 'parrot'
          ? "That's me. Ask in plain words — I'll draft it, you confirm."
          : `I work with the ${s.agent} here. Try asking me: “${s.prompts[0]}”`,
      asks: extra ? [...s.prompts, extra] : s.prompts,
    }
  }
  return pages[pathname.replace(/\/$/, '') || '/'] ?? pages['/']
}
