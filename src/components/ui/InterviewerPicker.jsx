import { useState, useRef, useEffect } from 'react'
import { CaretDown, X } from '@phosphor-icons/react'
import { interviewers } from '../../data/stages'

export default function InterviewerPicker({
  assigned,
  onAdd,
  onRemove,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const available = interviewers.filter(
    (i) => !assigned.find((a) => a.id === i.id)
  )

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="flex flex-col gap-8">
      {assigned.map((person) => (
        <div
          key={person.id}
          className="interviewer-chip"
        >
          <div className="flex items-center gap-10">
            <div className="avatar-initials">
              {person.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="text-[var(--font-size-sm)] font-medium leading-tight">
                {person.name}
              </p>
              <p className="text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)] leading-tight">
                {person.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => onRemove(person.id)}
            className="btn-ghost p-4 rounded-md"
            aria-label={`Remove ${person.name}`}
          >
            <X size={14} className="text-[var(--color-fg-tertiary)]" />
          </button>
        </div>
      ))}

      {available.length > 0 && (
        <div className="relative" ref={ref}>
          <button
            className="interviewer-add-btn"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>Add interviewer</span>
            <CaretDown
              size={14}
              weight="regular"
              className="text-[var(--color-fg-tertiary)]"
              style={{
                transform: open ? 'rotate(180deg)' : 'none',
                transition: 'transform 150ms ease',
              }}
            />
          </button>

          {open && (
            <div className="interviewer-dropdown">
              {available.map((person) => (
                <button
                  key={person.id}
                  className="interviewer-dropdown-item"
                  onClick={() => {
                    onAdd(person)
                    setOpen(false)
                  }}
                >
                  <div className="avatar-initials">
                    {person.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[var(--font-size-sm)] font-medium leading-tight">
                      {person.name}
                    </p>
                    <p className="text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)] leading-tight">
                      {person.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
