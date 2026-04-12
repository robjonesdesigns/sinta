import { templates } from '../../data/stages'
import { Zap } from 'lucide-react'

export default function TemplateSelector({ onSelect }) {
  return (
    <div className="flex gap-8">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.stages)}
          className="btn btn-secondary btn-sm"
        >
          <Zap size={12} />
          {template.label}
        </button>
      ))}
    </div>
  )
}
