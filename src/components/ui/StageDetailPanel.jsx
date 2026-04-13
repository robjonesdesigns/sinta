import { X, UserPlus, Clock, FileText } from '@phosphor-icons/react'
import { interviewers } from '../../data/stages'

export default function StageDetailPanel({ stage, onClose }) {
  const Icon = stage.icon
  const assignedInterviewer = interviewers[0]

  return (
    <div className="card p-16 flex flex-col gap-16 animate-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div
            className="flex items-center justify-center w-28 h-28 rounded-md"
            style={{ background: stage.color, opacity: 0.9 }}
          >
            <Icon size={15} className="text-white" weight="duotone" />
          </div>
          <h3 className="text-[var(--font-size-md)] font-semibold">
            {stage.label}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="btn-ghost p-4 rounded-md"
          aria-label="Close panel"
        >
          <X size={16} />
        </button>
      </div>

      <div className="divider-h" />

      <div className="flex flex-col gap-14">
        <div className="flex items-center gap-8">
          <Clock size={14} className="text-[var(--color-fg-tertiary)]" />
          <span className="text-[var(--font-size-sm)] text-[var(--color-fg-secondary)]">
            45 min
          </span>
        </div>

        <div>
          <p className="section-label mb-8">Interviewer</p>
          <div className="flex items-center gap-10 p-10 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)]">
            <div className="w-28 h-28 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-fg)] text-[var(--font-size-xs)] font-semibold flex-shrink-0">
              {assignedInterviewer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex flex-col">
              <span className="text-[var(--font-size-sm)] font-medium">
                {assignedInterviewer.name}
              </span>
              <span className="text-[var(--font-size-xs)] text-[var(--color-fg-tertiary)]">
                {assignedInterviewer.role}
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="section-label mb-8">Questions</p>
          <button className="btn btn-secondary btn-sm w-full">
            <FileText size={14} />
            Add question set
          </button>
        </div>

        <div>
          <button className="btn btn-secondary btn-sm w-full">
            <UserPlus size={14} />
            Change interviewer
          </button>
        </div>
      </div>
    </div>
  )
}
