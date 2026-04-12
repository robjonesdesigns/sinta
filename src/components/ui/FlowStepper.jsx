import { Check } from 'lucide-react'

const steps = [
  { id: 'build', label: 'Build Template' },
  { id: 'configure', label: 'Configure' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'interview', label: 'Interview' },
  { id: 'review', label: 'Review' },
  { id: 'decision', label: 'Decision' },
]

export default function FlowStepper({ currentStep }) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="flex items-center gap-4" role="navigation" aria-label="Interview progress">
      {steps.map((step, i) => {
        const isComplete = i < currentIndex
        const isCurrent = i === currentIndex
        const isFuture = i > currentIndex

        return (
          <div key={step.id} className="flex items-center gap-4">
            {i > 0 && (
              <div
                className="w-24 h-1 rounded-full"
                style={{
                  background: isComplete
                    ? 'var(--color-primary)'
                    : 'var(--color-border)',
                }}
              />
            )}
            <div className="flex items-center gap-6">
              <div
                className="stepper-dot"
                data-state={isComplete ? 'complete' : isCurrent ? 'current' : 'future'}
              >
                {isComplete ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span
                className="text-[var(--font-size-xs)] font-medium whitespace-nowrap"
                style={{
                  color: isFuture
                    ? 'var(--color-fg-tertiary)'
                    : 'var(--color-fg)',
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
