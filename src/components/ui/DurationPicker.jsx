import { useState, useRef, useEffect } from 'react'
import { Clock, CaretDown, Check } from '@phosphor-icons/react'

const durations = [15, 30, 45, 60, 90, 120]

export default function DurationPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        className="duration-picker-btn"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <div className="flex items-center gap-8">
          <Clock size={14} className="text-[var(--color-fg-tertiary)]" weight="regular" />
          <span>{value} min</span>
        </div>
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
        <div className="duration-dropdown">
          {durations.map((d) => (
            <button
              key={d}
              className={`duration-dropdown-item ${d === value ? 'duration-dropdown-item-active' : ''}`}
              onClick={() => {
                onChange(d)
                setOpen(false)
              }}
            >
              <span>{d} min</span>
              {d === value && (
                <Check size={14} className="text-[var(--color-primary)]" weight="regular" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
