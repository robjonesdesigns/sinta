import { templates, getStageType } from '../../data/stages'
import { Zap } from 'lucide-react'

export default function TemplateSelector({ onSelect }) {
  return (
    <div className="flex gap-8 flex-wrap">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.stages)}
          className="template-btn"
        >
          <div className="flex items-center gap-8">
            <Zap size={13} className="text-[var(--color-primary)]" strokeWidth={2} />
            <span className="font-medium">{template.label}</span>
          </div>
          <div className="flex items-center gap-4 mt-6">
            {template.stages.map((stageId, i) => {
              const type = getStageType(stageId)
              if (!type) return null
              const Icon = type.icon
              return (
                <div
                  key={`${stageId}-${i}`}
                  className="flex items-center justify-center w-20 h-20 rounded-md"
                  style={{ background: type.color, opacity: 0.15 }}
                  title={type.label}
                >
                  <Icon size={11} style={{ color: type.color }} strokeWidth={2} />
                </div>
              )
            })}
            <span className="text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)] ml-4">
              {template.stages.length} stages
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
