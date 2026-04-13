import { X, FileText, ClipboardText } from '@phosphor-icons/react'
import { getStageType } from '../../data/stages'
import InterviewerPicker from './InterviewerPicker'
import DurationPicker from './DurationPicker'
import SelectPicker from './SelectPicker'

const questionSetOptions = [
  {
    value: 'leadership',
    label: 'Leadership & Culture',
    description: '8 questions on leadership, teamwork, values',
  },
  {
    value: 'technical',
    label: 'Technical Skills',
    description: '10 questions on problem-solving, system design',
  },
  {
    value: 'behavioral',
    label: 'Behavioral',
    description: '6 questions on past experience, conflict, growth',
  },
  {
    value: 'motivation',
    label: 'Motivation & Fit',
    description: '5 questions on goals, career path, culture fit',
  },
]

const scorecardOptions = [
  {
    value: 'standard-5',
    label: 'Standard 5-Point',
    description: 'Rate each competency 1-5 with written feedback',
  },
  {
    value: 'pass-fail',
    label: 'Pass / Fail',
    description: 'Binary decision per competency',
  },
  {
    value: 'competency-matrix',
    label: 'Competency Matrix',
    description: '6 competencies rated across 4 levels',
  },
]

export default function ConfigDrawer({ stage, onClose, onUpdate, variant = 'drawer' }) {
  const type = getStageType(stage.typeId)
  if (!type) return null
  const Icon = type.icon

  function handleDurationChange(duration) {
    onUpdate({ ...stage, duration: Number(duration) })
  }

  function handleAddInterviewer(interviewer) {
    if (stage.interviewers.find((i) => i.id === interviewer.id)) return
    onUpdate({
      ...stage,
      interviewers: [...stage.interviewers, interviewer],
      configured: true,
    })
  }

  function handleRemoveInterviewer(id) {
    const next = stage.interviewers.filter((i) => i.id !== id)
    onUpdate({
      ...stage,
      interviewers: next,
      configured: next.length > 0,
    })
  }

  function handleQuestionSetChange(value) {
    onUpdate({ ...stage, questionSet: value })
  }

  function handleScorecardChange(value) {
    onUpdate({ ...stage, scorecard: value })
  }

  const isEmbedded = variant === 'embedded'

  return (
    <div className={isEmbedded ? '' : 'config-drawer'}>
      <div className="config-drawer-header">
        <div className="flex items-center gap-12">
          <div
            className="stage-icon-box"
            style={{ '--stage-color': type.color }}
          >
            <Icon size={18} style={{ color: type.color }} weight="duotone" />
          </div>
          <div>
            <h3 className="text-[var(--font-size-md)] font-semibold leading-none">
              {type.label}
            </h3>
            <p className="type-meta mt-4">Configure stage anatomy</p>
          </div>
        </div>
        {!isEmbedded && (
          <button
            onClick={onClose}
            className="btn-ghost p-6 rounded-md"
            aria-label="Close configuration"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="config-drawer-body">
        <div className="grid grid-cols-1 gap-24">
          <section>
            <p className="config-field-label">Interviewers</p>
            <p className="type-meta mb-12">Assign team members to this stage.</p>
            <InterviewerPicker
              assigned={stage.interviewers}
              onAdd={handleAddInterviewer}
              onRemove={handleRemoveInterviewer}
            />
          </section>

          <section>
            <p className="config-field-label">Duration</p>
            <DurationPicker
              value={stage.duration}
              onChange={handleDurationChange}
            />
          </section>

          <section className="grid grid-cols-1 gap-16 pt-8 border-t border-[var(--color-border-subtle)]">
            <div>
              <p className="config-field-label">Question Set</p>
              <SelectPicker
                value={stage.questionSet}
                onChange={handleQuestionSetChange}
                options={questionSetOptions}
                placeholder="Select question set"
                icon={FileText}
              />
            </div>

            <div>
              <p className="config-field-label">Scorecard Template</p>
              <SelectPicker
                value={stage.scorecard}
                onChange={handleScorecardChange}
                options={scorecardOptions}
                placeholder="Select scorecard"
                icon={ClipboardText}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
