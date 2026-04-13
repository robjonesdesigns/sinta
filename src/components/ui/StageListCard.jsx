import { GripVertical, Clock, Users as UsersIcon, Check, AlertCircle } from 'lucide-react'
import { getStageType } from '../../data/stages'
import StageOverflowMenu from './StageOverflowMenu'

export default function StageListCard({
  stage,
  index,
  isSelected,
  isDragging,
  onClick,
  onRemove,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  dragHandleProps,
}) {
  const type = getStageType(stage.typeId)
  if (!type) return null
  const Icon = type.icon
  const interviewerCount = stage.interviewers.length
  const isConfigured = stage.configured

  return (
    <div
      className="stage-list-card"
      data-selected={isSelected}
      data-dragging={isDragging}
      style={{ '--stage-color': type.color }}
      onClick={() => onClick(stage.instanceId)}
      role="button"
      tabIndex={0}
      aria-label={`Stage ${index + 1}: ${type.label}`}
    >
      <div
        className="drag-handle"
        aria-label="Drag to reorder"
        {...dragHandleProps}
      >
        <GripVertical size={16} className="text-[var(--color-fg-tertiary)]" />
      </div>

      <div className="stage-number">
        {index + 1}
      </div>

      <div className="stage-icon-box" style={{ '--stage-color': type.color }}>
        <Icon size={18} style={{ color: type.color }} strokeWidth={1.75} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="type-card-title">
          {type.label}
        </p>
        <div className="flex items-center gap-10 mt-4">
          <span className="flex items-center gap-4 text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)]">
            <Clock size={12} strokeWidth={1.75} />
            {stage.duration} min
          </span>
          <div className="divider-v h-12" />
          <span className="flex items-center gap-4 text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)]">
            <UsersIcon size={12} strokeWidth={1.75} />
            {interviewerCount} {interviewerCount === 1 ? 'interviewer' : 'interviewers'}
          </span>
        </div>
      </div>

      {interviewerCount > 0 && (
        <div className="flex items-center -space-x-6 mr-8">
          {stage.interviewers.slice(0, 3).map((person) => (
            <div
              key={person.id}
              className="avatar-initials avatar-initials-sm"
              title={person.name}
            >
              {person.name.split(' ').map((n) => n[0]).join('')}
            </div>
          ))}
          {interviewerCount > 3 && (
            <div className="avatar-initials avatar-initials-sm bg-[var(--color-bg-muted)] text-[var(--color-fg-secondary)]">
              +{interviewerCount - 3}
            </div>
          )}
        </div>
      )}

      <StatusPill configured={isConfigured} />

      <StageOverflowMenu
        onDuplicate={onDuplicate}
        onDelete={onRemove}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
      />
    </div>
  )
}

function StatusPill({ configured }) {
  if (configured) {
    return (
      <span className="inline-flex items-center gap-4 px-8 py-2 rounded-full text-[var(--font-size-xs)] font-medium bg-[var(--color-accent-subtle)] text-[var(--color-accent-hover)]">
        <Check size={11} strokeWidth={2.5} />
        Ready
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-4 px-8 py-2 rounded-full text-[var(--font-size-xs)] font-medium bg-[var(--color-warning-subtle)] text-[var(--color-warning)]">
      <AlertCircle size={11} strokeWidth={2} />
      Setup
    </span>
  )
}
