import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { ArrowRight, Layers, Plus } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import FlowStepper from '../components/ui/FlowStepper'
import StageListCard from '../components/ui/StageListCard'
import StageConnector, { AddStageButton } from '../components/ui/StageConnector'
import StageAddPopover from '../components/ui/StageAddPopover'
import ConfigDrawer from '../components/ui/ConfigDrawer'
import TemplateSelector from '../components/ui/TemplateSelector'
import { createStageInstance } from '../data/stages'

export default function Builder() {
  const navigate = useNavigate()
  const [stages, setStages] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showAddPopover, setShowAddPopover] = useState(false)

  const selectedStage = stages.find((s) => s.instanceId === selectedId)

  const addStage = useCallback((typeId, atIndex) => {
    const instance = createStageInstance(typeId)
    if (!instance) return
    setStages((prev) => {
      const next = [...prev]
      const idx = atIndex !== undefined ? atIndex : next.length
      next.splice(idx, 0, instance)
      return next
    })
    setSelectedId(instance.instanceId)
  }, [])

  const removeStage = useCallback((instanceId) => {
    setStages((prev) => prev.filter((s) => s.instanceId !== instanceId))
    setSelectedId((prev) => (prev === instanceId ? null : prev))
  }, [])

  const duplicateStage = useCallback((instanceId) => {
    setStages((prev) => {
      const idx = prev.findIndex((s) => s.instanceId === instanceId)
      if (idx === -1) return prev
      const original = prev[idx]
      const copy = createStageInstance(original.typeId)
      if (!copy) return prev
      copy.duration = original.duration
      copy.interviewers = [...original.interviewers]
      copy.configured = original.configured
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }, [])

  const moveStage = useCallback((instanceId, direction) => {
    setStages((prev) => {
      const idx = prev.findIndex((s) => s.instanceId === instanceId)
      const targetIdx = idx + direction
      if (targetIdx < 0 || targetIdx >= prev.length) return prev
      const next = [...prev]
      const [moved] = next.splice(idx, 1)
      next.splice(targetIdx, 0, moved)
      return next
    })
  }, [])

  const updateStage = useCallback((updated) => {
    setStages((prev) =>
      prev.map((s) => (s.instanceId === updated.instanceId ? updated : s))
    )
  }, [])

  const loadTemplate = useCallback((stageTypeIds) => {
    const instances = stageTypeIds.map((id) => createStageInstance(id))
    setStages(instances.filter(Boolean))
    setSelectedId(null)
  }, [])

  function handleDragEnd(result) {
    if (!result.destination) return
    const from = result.source.index
    const to = result.destination.index
    if (from === to) return
    setStages((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  return (
    <>
      <PageHeader title="Interview Builder">
        <FlowStepper currentStep="build" />
      </PageHeader>

      <main className="page-content">
        <div className="builder-container">
          <div className="flex flex-col gap-6 mb-20">
            <h2 className="text-[var(--font-size-lg)] font-semibold">
              Create Interview Template
            </h2>
            <p className="text-[var(--color-fg-secondary)]">
              Build your interview pipeline by adding stages. Click a stage to
              configure interviewers, questions, and scorecards.
            </p>
          </div>

          <div className="mb-16">
            <TemplateSelector onSelect={loadTemplate} />
          </div>

          <div className="flex gap-24">
            <div className="flex-1 min-w-0">
              {stages.length === 0 ? (
                <EmptyState
                  onAdd={() => setShowAddPopover(true)}
                  showPopover={showAddPopover}
                  onSelect={(typeId) => {
                    addStage(typeId)
                    setShowAddPopover(false)
                  }}
                  onClose={() => setShowAddPopover(false)}
                />
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="stage-list">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex flex-col"
                      >
                        {stages.map((stage, index) => (
                          <Draggable
                            key={stage.instanceId}
                            draggableId={stage.instanceId}
                            index={index}
                          >
                            {(dragProvided, snapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                              >
                                {index > 0 && !snapshot.isDragging && (
                                  <StageConnector
                                    onAddStage={(typeId) =>
                                      addStage(typeId, index)
                                    }
                                  />
                                )}
                                <StageListCard
                                  stage={stage}
                                  index={index}
                                  isSelected={
                                    selectedId === stage.instanceId
                                  }
                                  isDragging={snapshot.isDragging}
                                  onClick={setSelectedId}
                                  onRemove={() =>
                                    removeStage(stage.instanceId)
                                  }
                                  onDuplicate={() =>
                                    duplicateStage(stage.instanceId)
                                  }
                                  onMoveUp={() =>
                                    moveStage(stage.instanceId, -1)
                                  }
                                  onMoveDown={() =>
                                    moveStage(stage.instanceId, 1)
                                  }
                                  canMoveUp={index > 0}
                                  canMoveDown={index < stages.length - 1}
                                  dragHandleProps={
                                    dragProvided.dragHandleProps
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <AddStageButton
                          onAddStage={(typeId) => addStage(typeId)}
                        />
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>

            {selectedStage && (
              <ConfigDrawer
                stage={selectedStage}
                onClose={() => setSelectedId(null)}
                onUpdate={updateStage}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

function EmptyState({ onAdd, showPopover, onSelect, onClose }) {
  return (
    <div className="builder-empty">
      <div className="builder-empty-icon">
        <Layers size={24} strokeWidth={1.5} />
      </div>
      <p className="text-[var(--font-size-md)] font-semibold">
        No stages yet
      </p>
      <p className="text-[var(--font-size-sm)] text-[var(--color-fg-secondary)] max-w-320">
        Build your interview pipeline by adding stages. Each stage can be
        configured with interviewers, questions, and scoring criteria.
      </p>
      <div className="relative mt-8">
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} />
          Add your first stage
        </button>
        {showPopover && (
          <StageAddPopover onSelect={onSelect} onClose={onClose} />
        )}
      </div>
    </div>
  )
}
