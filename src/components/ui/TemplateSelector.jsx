import { templates, getStageType } from '../../data/stages'
import { Lightning } from '@phosphor-icons/react'

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
            <Lightning size={13} className="text-[var(--color-primary)]" weight="fill" />
            <span className="font-medium">{template.label}</span>
          </div>
          <div className="flex items-center gap-6 mt-8">
            {template.stages.map((stageId, i) => {
              const type = getStageType(stageId)
              if (!type) return null
              return (
                <div
                  key={`${stageId}-${i}`}
                  className="w-8 h-8 rounded-full"
                  style={{ background: type.color }}
                  title={type.label}
                />
              )
            })}
            <span className="type-meta ml-4">
              {template.stages.length} stages
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
