import { Plus, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { competencies } from '../../data/mock'

export default function CompetencyPicker({ assignedIds = [], onAdd, onRemove }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const available = competencies.filter(c => !assignedIds.includes(c.id))

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-8 mb-12">
        {assignedIds.map(id => {
          const comp = competencies.find(c => c.id === id)
          if (!comp) return null
          const Icon = comp.icon
          return (
            <div key={id} className="badge badge-primary gap-6 pr-4 group">
              <Icon size={14} weight="fill" />
              {comp.label}
              <button
                onClick={() => onRemove(id)}
                className="opacity-40 hover:opacity-100 p-2 rounded-full hover:bg-[var(--color-primary-subtle)]"
              >
                <X size={10} />
              </button>
            </div>
          )
        })}
      </div>

      <button
        className="interviewer-add-btn"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Add Signal</span>
        <Plus size={14} />
      </button>

      {showDropdown && (
        <div className="interviewer-dropdown max-h-240 overflow-y-auto">
          {available.length === 0 ? (
            <p className="type-meta p-12 text-center">All signals assigned</p>
          ) : (
            available.map(comp => {
              const Icon = comp.icon
              return (
                <button
                  key={comp.id}
                  className="interviewer-dropdown-item group"
                  onClick={() => {
                    onAdd(comp.id)
                    setShowDropdown(false)
                  }}
                >
                  <div className="w-24 h-24 rounded bg-[var(--color-bg-muted)] flex items-center justify-center text-[var(--color-fg-tertiary)] group-hover:bg-[var(--color-primary-subtle)] group-hover:text-[var(--color-primary)]">
                    <Icon size={14} weight="fill" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[14px] font-medium">{comp.label}</p>
                    <p className="text-[11px] opacity-60 uppercase tracking-wide">{comp.category}</p>
                  </div>
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
