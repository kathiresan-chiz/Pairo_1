import { Plus } from 'lucide-react'

// Native <details> keeps the FAQ accessible and works without JavaScript.
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-[2rem] bg-white px-6 ring-1 ring-line sm:px-8">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(0.22,0.8,0.2,1)] group-open:rotate-45 group-open:bg-ink group-open:text-white">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl pr-12 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
