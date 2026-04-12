import TimelineNode from './TimelineNode'
import { stageTypes } from '../../data/stages'

export default function Timeline({
  placedStages,
  onRemoveStage,
  onSelectStage,
  selectedStageIndex,
  onDrop,
}) {
  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  function handleDrop(e) {
    e.preventDefault()
    const stageId = e.dataTransfer.getData('text/plain')
    onDrop?.(stageId)
  }

  const isEmpty = placedStages.length === 0

  return (
    <div
      className="timeline-dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-empty={isEmpty}
    >
      {isEmpty ? (
        <div className="flex flex-col items-center gap-8 text-[var(--color-fg-tertiary)]">
          <div className="w-48 h-2 rounded-full bg-[var(--color-border)] relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-border-strong)]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-border-strong)]" />
          </div>
          <p className="text-[var(--font-size-sm)]">
            Drag stages here or click to add
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-0 relative">
          {placedStages.map((stageId, index) => {
            const stage = stageTypes.find((s) => s.id === stageId)
            if (!stage) return null

            return (
              <div key={`${stageId}-${index}`} className="flex items-start">
                {index > 0 && (
                  <div className="w-40 h-2 bg-[var(--color-border)] self-center mt-[-18px] rounded-full" />
                )}
                <TimelineNode
                  stage={stage}
                  onRemove={() => onRemoveStage(index)}
                  onClick={() => onSelectStage(index)}
                  isSelected={selectedStageIndex === index}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
