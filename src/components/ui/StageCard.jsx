import { DotsSixVertical, DotsThree } from '@phosphor-icons/react'

export default function StageCard({ stage, onDragStart, onAdd }) {
  const Icon = stage.icon

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', stage.id)
    e.dataTransfer.effectAllowed = 'copy'
    onDragStart?.(stage.id)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onAdd?.(stage.id)}
      className="stage-card"
      role="button"
      tabIndex={0}
      aria-label={`Add ${stage.label} stage`}
    >
      <div className="flex items-center gap-10">
        <DotsSixVertical
          size={16}
          weight="regular"
          className="text-[var(--color-fg-tertiary)] flex-shrink-0 cursor-grab"
        />
        <div
          className="flex items-center justify-center w-28 h-28 rounded-md flex-shrink-0"
          style={{ background: stage.color, opacity: 0.9 }}
        >
          <Icon size={15} className="text-white" weight="duotone" />
        </div>
        <span className="text-[var(--font-size-base)] font-medium">
          {stage.label}
        </span>
      </div>
      <button
        className="btn-ghost p-4 rounded-md"
        onClick={(e) => e.stopPropagation()}
        aria-label={`Options for ${stage.label}`}
      >
        <DotsThree size={16} weight="regular" className="text-[var(--color-fg-tertiary)]" />
      </button>
    </div>
  )
}
