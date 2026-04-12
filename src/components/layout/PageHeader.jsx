import { Search } from 'lucide-react'

export default function PageHeader({ title, children }) {
  return (
    <header className="page-header">
      <h1 className="text-[var(--font-size-xl)] font-semibold">{title}</h1>
      <div className="flex items-center gap-12">
        <div className="relative">
          <Search
            className="absolute left-10 top-1/2 -translate-y-1/2 text-[var(--color-fg-tertiary)]"
            size={16}
            strokeWidth={1.75}
          />
          <input
            type="search"
            placeholder="Search..."
            className="input pl-34 w-240"
          />
        </div>
        {children}
      </div>
    </header>
  )
}
