import { useState, useEffect, useRef } from 'react'
import {
  DotsThree,
  Copy,
  Trash,
  CaretUp,
  CaretDown,
} from '@phosphor-icons/react'

export default function StageOverflowMenu({
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) {
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
        className="btn-ghost p-6 rounded-md overflow-menu"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        aria-label="Stage options"
      >
        <DotsThree size={16} weight="regular" className="text-[var(--color-fg-tertiary)]" />
      </button>

      {open && (
        <div className="overflow-dropdown" role="menu">
          {canMoveUp && (
            <OverflowItem
              icon={CaretUp}
              label="Move up"
              onClick={() => { onMoveUp(); setOpen(false) }}
            />
          )}
          {canMoveDown && (
            <OverflowItem
              icon={CaretDown}
              label="Move down"
              onClick={() => { onMoveDown(); setOpen(false) }}
            />
          )}
          <OverflowItem
            icon={Copy}
            label="Duplicate"
            onClick={() => { onDuplicate(); setOpen(false) }}
          />
          <div className="divider-h my-4" />
          <OverflowItem
            icon={Trash}
            label="Delete"
            danger
            onClick={() => { onDelete(); setOpen(false) }}
          />
        </div>
      )}
    </div>
  )
}

function OverflowItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      className={`overflow-dropdown-item ${danger ? 'overflow-dropdown-item-danger' : ''}`}
      role="menuitem"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <Icon size={14} weight="regular" />
      <span>{label}</span>
    </button>
  )
}
