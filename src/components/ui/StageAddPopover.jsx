import { useEffect, useRef } from 'react'
import { stageTypes } from '../../data/stages'

export default function StageAddPopover({ onSelect, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div ref={ref} className="stage-popover" role="menu">
      <p className="px-12 py-6 text-[var(--font-size-xs)] font-semibold text-[var(--color-fg-tertiary)] uppercase tracking-wider">
        Add stage
      </p>
      {stageTypes.map((stage) => {
        const Icon = stage.icon
        return (
          <button
            key={stage.id}
            className="stage-popover-item"
            role="menuitem"
            onClick={() => {
              onSelect(stage.id)
              onClose()
            }}
          >
            <div
              className="stage-icon-box"
              style={{ '--stage-color': stage.color, width: 30, height: 30 }}
            >
              <Icon size={15} style={{ color: stage.color }} strokeWidth={1.75} />
            </div>
            <span>{stage.label}</span>
          </button>
        )
      })}
    </div>
  )
}
