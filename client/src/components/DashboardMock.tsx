import monogram from '../assets/brand/monogram-white.png'

const bars = [38, 52, 44, 63, 58, 72, 66, 81, 74, 88, 79, 92]

// Agent results and the agents' day, from the home page content.
const kpis = [
  { label: 'Banking agent', value: '58', change: 'bank lines matched' },
  { label: 'Collection agent', value: '₹2.3 L', change: 'collected today' },
  { label: 'Audit agent', value: '70/70', change: 'checks clear' },
]

const ledger = [
  { ref: '08:02', type: 'Banking agent · 58 bank lines matched', status: 'Done', tone: 'bg-seal text-navy' },
  { ref: '09:00', type: 'Sales agent · 14 invoices raised and sent', status: 'Done', tone: 'bg-brand/10 text-brand-deep' },
  { ref: '10:15', type: 'Approval agent · 1 decision awaiting you', status: 'Needs you', tone: 'bg-crimson/15 text-[#c23a56]' },
]

// Illustrative product UI built in HTML (sample data only).
export default function DashboardMock({ className = '' }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of PairO agents at work: bank lines matched, collections and audit checks (sample data)"
      className={`rounded-3xl bg-white p-4 text-ink shadow-2xl ring-1 shadow-navy/40 ring-white/60 sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-b from-navy-deep to-brand">
            <img src={monogram} alt="" className="w-5" />
          </span>
          <span className="text-sm font-semibold">PairO agent · at work · 24×7</span>
        </div>
        <div className="hidden gap-1 rounded-full bg-mist p-1 text-[11px] font-medium sm:flex">
          <span className="rounded-full bg-white px-2.5 py-1 shadow-sm">Banking</span>
          <span className="px-2.5 py-1 text-muted">Bills</span>
          <span className="px-2.5 py-1 text-muted">Sales</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl bg-mist p-2.5 sm:p-3">
            <p className="text-[10px] leading-tight text-muted [overflow-wrap:anywhere] sm:text-xs">{k.label}</p>
            <p className="mt-1 text-sm font-semibold sm:text-lg">{k.value}</p>
            <p className="text-[10px] font-medium text-brand">{k.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl bg-mist p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">Agent activity</span>
          <span className="text-muted">Today</span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5 sm:h-24">
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-brand-deep to-brand-soft"
              style={{ height: `${h}%`, opacity: 0.55 + i * 0.04 }}
            />
          ))}
        </div>
      </div>

      <ul className="mt-3 divide-y divide-line">
        {ledger.map((row) => (
          <li key={row.ref} className="flex items-center justify-between py-2 text-xs">
            <span>
              <span className="font-semibold">{row.ref}</span>
              <span className="ml-2 text-muted">{row.type}</span>
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${row.tone}`}>{row.status}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
