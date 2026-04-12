import { X } from 'lucide-react'

export default function TimelineNode({ stage, onRemove, onClick, isSelected }) {
  const Icon = stage.icon

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <button
        onClick={() => onClick?.(stage)}
        className={`timeline-node ${isSelected ? 'timeline-node-selected' : ''}`}
        style={{ '--node-color': stage.color }}
        aria-label={`${stage.label} stage`}
      >
        <Icon size={18} className="text-white" strokeWidth={2} />
      </button>
      <span className="text-[var(--font-size-xs)] text-[var(--color-fg-secondary)] whitespace-nowrap">
        {stage.label}
      </span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute -top-4 -right-4 w-16 h-16 flex items-center justify-center rounded-full bg-[var(--color-surface-overlay)] border border-[var(--color-border)] text-[var(--color-fg-tertiary)] hover:text-[var(--color-danger)] hover:border-[var(--color-danger)] transition-colors"
          aria-label={`Remove ${stage.label}`}
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </div>
  )
}
