import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function SelectPicker({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((o) => o.value === value)

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
          {Icon && (
            <Icon
              size={14}
              className="text-[var(--color-fg-tertiary)]"
              strokeWidth={1.75}
            />
          )}
          <span className={selected ? '' : 'text-[var(--color-fg-tertiary)]'}>
            {selected ? selected.label : placeholder}
          </span>
        </div>
        <ChevronDown
          size={14}
          className="text-[var(--color-fg-tertiary)]"
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 150ms ease',
          }}
        />
      </button>

      {open && (
        <div className="duration-dropdown">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`duration-dropdown-item ${opt.value === value ? 'duration-dropdown-item-active' : ''}`}
              onClick={() => {
                onChange(opt.value === value ? null : opt.value)
                setOpen(false)
              }}
            >
              <div>
                <span>{opt.label}</span>
                {opt.description && (
                  <p className="text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)] mt-2">
                    {opt.description}
                  </p>
                )}
              </div>
              {opt.value === value && (
                <Check
                  size={14}
                  className="text-[var(--color-primary)] flex-shrink-0"
                  strokeWidth={2}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
