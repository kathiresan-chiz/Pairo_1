// Hover fill that pours out of a pill button's arrow circle and floods the button:
// a lighter ripple leads, the main colour follows, and both drain back on leave.
// The button needs `group relative isolate overflow-hidden` (see `.liquid-fill` in index.css).
export default function LiquidFill({ className }: { className: string }) {
  return (
    <>
      <span aria-hidden="true" className={`liquid-fill liquid-fill--lead ${className}`} />
      <span aria-hidden="true" className={`liquid-fill liquid-fill--main ${className}`} />
    </>
  )
}
