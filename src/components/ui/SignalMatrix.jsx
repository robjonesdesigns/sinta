import { Check, Plus, Minus, Info } from 'lucide-react'
import { signals as allSignals } from '../../data/mock'

export default function SignalMatrix({ stages, onToggleSignal }) {
  return (
    <div className="overflow-x-auto border border-[var(--color-border)] rounded-xl bg-[var(--color-bg-subtle)]">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-16 text-left border-b border-r border-[var(--color-border)] bg-[var(--color-bg-muted)] sticky left-0 z-20 min-w-240">
              <span className="type-label">Competency Signals</span>
            </th>
            {stages.map((stage, idx) => (
              <th key={stage.instanceId} className="p-16 text-center border-b border-[var(--color-border)] bg-[var(--color-bg-muted)] min-w-140">
                <div className="flex flex-col items-center gap-4">
                  <span className="type-meta opacity-60 uppercase text-[10px] tracking-widest">Stage {idx + 1}</span>
                  <span className="type-card-title truncate max-w-120">{stage.label || stage.typeId}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSignals.map((signal) => (
            <tr key={signal.id} className="group hover:bg-[var(--color-bg-muted)]/50 transition-colors">
              <td className="p-16 border-b border-r border-[var(--color-border)] bg-[var(--color-bg-subtle)] sticky left-0 z-10 group-hover:bg-[var(--color-bg-muted)] transition-colors">
                <div className="flex items-center gap-12">
                  <div className="w-24 h-24 rounded flex items-center justify-center bg-[var(--color-bg-muted)] text-[var(--color-fg-tertiary)] group-hover:bg-[var(--color-primary-subtle)] group-hover:text-[var(--color-primary)] transition-colors">
                    <signal.icon size={14} />
                  </div>
                  <div>
                    <p className="type-body font-medium leading-none">{signal.label}</p>
                    <p className="text-[11px] opacity-60 mt-4 uppercase tracking-wide">{signal.category}</p>
                  </div>
                </div>
              </td>
              {stages.map((stage) => {
                const isActive = (stage.competencies || []).includes(signal.id)
                return (
                  <td 
                    key={`${stage.instanceId}-${signal.id}`} 
                    className="p-0 border-b border-[var(--color-border)] text-center relative"
                  >
                    <button
                      onClick={() => onToggleSignal(stage.instanceId, signal.id)}
                      className={`w-full h-64 flex items-center justify-center transition-all ${
                        isActive 
                        ? 'bg-[var(--color-primary-subtle)]/30 text-[var(--color-primary)]' 
                        : 'text-transparent hover:text-[var(--color-fg-tertiary)]/20'
                      }`}
                    >
                      <div className={`w-32 h-32 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isActive 
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-fg)] shadow-sm' 
                        : 'border-transparent group-hover:border-[var(--color-border-strong)]'
                      }`}>
                        <Check size={16} strokeWidth={3} className={isActive ? 'scale-100' : 'scale-0 transition-transform'} />
                      </div>
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* ── Matrix Legend ────────────────────────────────────────── */}
      <div className="p-16 bg-[var(--color-bg-muted)]/30 border-t border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-24">
          <div className="flex items-center gap-8">
            <div className="w-12 h-12 rounded bg-[var(--color-primary)]"></div>
            <span className="type-meta">Signal Assigned</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="w-12 h-12 rounded border-2 border-[var(--color-border-strong)]"></div>
            <span className="type-meta">Untracked</span>
          </div>
        </div>
        <div className="flex items-center gap-8 text-[var(--color-fg-tertiary)] cursor-help">
          <Info size={14} />
          <span className="type-meta italic">Signals tagged in live interviews will populate the Tufte Sparkline.</span>
        </div>
      </div>
    </div>
  )
}
