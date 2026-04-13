import { Check } from '@phosphor-icons/react'
import { competencies } from '../../data/mock'
import { getStageType } from '../../data/stages'

export default function SignalMatrix({ stages, onToggleSignal }) {
  if (stages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-48 text-center gap-8">
        <p className="type-body font-medium">No stages yet</p>
        <p className="type-meta">Add stages to start assigning signals.</p>
      </div>
    )
  }

  const categories = [...new Set(competencies.map(c => c.category))]

  return (
    <div className="flex flex-col gap-12">
      {/* Column headers -- stage icons with tooltip */}
      <div className="grid items-end gap-4" style={{ gridTemplateColumns: `1fr repeat(${stages.length}, 44px)` }}>
        <div />
        {stages.map((stage, idx) => {
          const type = getStageType(stage.typeId)
          if (!type) return null
          const Icon = type.icon
          return (
            <div
              key={stage.instanceId}
              className="flex flex-col items-center gap-4 p-4 cursor-default"
              title={`Stage ${idx + 1}: ${type.label}`}
              aria-label={`Stage ${idx + 1}: ${type.label}`}
            >
              <Icon size={16} style={{ color: type.color }} weight="duotone" />
              <span className="type-meta text-[10px] leading-none">{idx + 1}</span>
            </div>
          )
        })}
      </div>

      {/* Signal rows grouped by category */}
      {categories.map(category => {
        const signals = competencies.filter(c => c.category === category)
        return (
          <div key={category} className="flex flex-col gap-4">
            <p className="type-meta opacity-50 uppercase text-[10px] tracking-widest pl-4 mb-2">{category}</p>
            {signals.map(signal => {
              const Icon = signal.icon
              const assignedCount = stages.filter(s => (s.competencies || []).includes(signal.id)).length
              const hasCoverage = assignedCount > 0
              return (
                <div
                  key={signal.id}
                  className="grid items-center gap-4"
                  style={{ gridTemplateColumns: `1fr repeat(${stages.length}, 44px)` }}
                >
                  {/* Signal badge + coverage count */}
                  <div className="flex items-center gap-8 min-w-0">
                    <div className="signal-badge" style={{ '--signal-color': signal.color }}>
                      <Icon size={14} style={{ color: signal.color }} weight="fill" />
                      <span className="truncate" style={{ color: signal.color }}>{signal.label}</span>
                    </div>
                    <span className={`type-meta text-[10px] ml-auto flex-shrink-0 tabular-nums ${hasCoverage ? 'opacity-40' : 'text-[var(--color-fg-tertiary)]'}`}>
                      {assignedCount}/{stages.length}
                    </span>
                  </div>

                  {/* Checkboxes per stage */}
                  {stages.map(stage => {
                    const isActive = (stage.competencies || []).includes(signal.id)
                    return (
                      <div key={`${stage.instanceId}-${signal.id}`} className="flex items-center justify-center">
                        <button
                          onClick={() => onToggleSignal(stage.instanceId, signal.id)}
                          className="signal-check"
                          data-checked={isActive}
                          style={{ '--signal-color': signal.color }}
                          title={`${isActive ? 'Remove' : 'Assign'} ${signal.label}`}
                          aria-label={`${isActive ? 'Remove' : 'Assign'} ${signal.label} for stage ${stages.indexOf(stage) + 1}`}
                        >
                          <svg viewBox="0 0 12 10" fill="none" aria-hidden="true">
                            <path
                              d="M1 5L4.5 8.5L11 1"
                              stroke={signal.color}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}

      {/* Gap warning */}
      {(() => {
        const uncovered = competencies.filter(
          c => !stages.some(s => (s.competencies || []).includes(c.id))
        )
        if (uncovered.length === 0 || uncovered.length === competencies.length) return null
        return (
          <div className="flex items-start gap-8 p-12 rounded-lg bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/20 mt-4">
            <span className="type-meta text-[var(--color-warning)] leading-snug">
              {uncovered.length} signal{uncovered.length > 1 ? 's' : ''} untracked across all stages.
            </span>
          </div>
        )
      })()}
    </div>
  )
}
