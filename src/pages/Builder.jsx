import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { ArrowRight, Stack, Plus } from '@phosphor-icons/react'
import PageHeader from '../components/layout/PageHeader'
import FlowStepper from '../components/ui/FlowStepper'
import StageListCard from '../components/ui/StageListCard'
import StageConnector, { AddStageButton } from '../components/ui/StageConnector'
import StageAddPopover from '../components/ui/StageAddPopover'
import ConfigDrawer from '../components/ui/ConfigDrawer'
import SignalMatrix from '../components/ui/SignalMatrix'
import TemplateSelector from '../components/ui/TemplateSelector'
import { createStageInstance } from '../data/stages'

export default function Builder() {
  const navigate = useNavigate()
  const [stages, setStages] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showAddPopover, setShowAddPopover] = useState(false)
  const [rightTab, setRightTab] = useState('details')

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

  const loadTemplate = useCallback((stageTypeIds) => {
    const instances = stageTypeIds.map((id) => createStageInstance(id))
    setStages(instances.filter(Boolean))
    setSelectedId(null)
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
      copy.competencies = [...(original.competencies || [])]
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

  const toggleSignal = useCallback((instanceId, signalId) => {
    setStages((prev) =>
      prev.map((s) => {
        if (s.instanceId !== instanceId) return s
        const has = (s.competencies || []).includes(signalId)
        return {
          ...s,
          competencies: has
            ? s.competencies.filter((id) => id !== signalId)
            : [...(s.competencies || []), signalId],
        }
      })
    )
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
        <div className="mb-24">
          <h2 className="type-section-heading">Create Interview Template</h2>
        </div>

        <div className="mb-24">
          <p className="type-label mb-12">Start with a template</p>
          <TemplateSelector onSelect={loadTemplate} />
        </div>

        {/* ── Pipeline + Config ────────────────────────────────── */}
        <div className="flex gap-24 items-start">

          {/* Pipeline: takes available space */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-12">
              <p className="type-label">Pipeline Architecture</p>
              <span className="type-meta">{stages.length} Stages</span>
            </div>

            <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl p-24">
              {stages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-48 text-center gap-12">
                  <Stack size={32} weight="regular" className="text-[var(--color-fg-tertiary)] opacity-40" />
                  <p className="type-body font-medium">No stages yet</p>
                  <button className="btn btn-accent btn-sm mt-4" onClick={() => setShowAddPopover(true)}>
                    <Plus size={14} /> Add your first stage
                  </button>
                  {showAddPopover && (
                    <div className="relative mt-8">
                      <StageAddPopover onSelect={(id) => { addStage(id); setShowAddPopover(false); }} onClose={() => setShowAddPopover(false)} />
                    </div>
                  )}
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="stage-list">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
                        {stages.map((stage, index) => (
                          <Draggable key={stage.instanceId} draggableId={stage.instanceId} index={index}>
                            {(dragProvided, snapshot) => (
                              <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                                {index > 0 && !snapshot.isDragging && (
                                  <StageConnector onAddStage={(typeId) => addStage(typeId, index)} />
                                )}
                                <StageListCard
                                  stage={stage}
                                  index={index}
                                  isSelected={selectedId === stage.instanceId}
                                  isDragging={snapshot.isDragging}
                                  onClick={(id) => setSelectedId(prev => prev === id ? null : id)}
                                  onRemove={() => removeStage(stage.instanceId)}
                                  onDuplicate={() => duplicateStage(stage.instanceId)}
                                  onMoveUp={() => moveStage(stage.instanceId, -1)}
                                  onMoveDown={() => moveStage(stage.instanceId, 1)}
                                  canMoveUp={index > 0}
                                  canMoveDown={index < stages.length - 1}
                                  dragHandleProps={dragProvided.dragHandleProps}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <div className="mt-12">
                          <AddStageButton onAddStage={(typeId) => addStage(typeId)} />
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>

          {/* Right panel: segmented control (Details / Signals) */}
          <div className="w-400 flex-shrink-0 sticky top-80">
            <div className="flex items-center justify-between mb-12">
              <p className="type-label">Stage Anatomy & Config</p>
            </div>

            {/* Segmented control */}
            <div className="flex gap-2 p-2 bg-[var(--color-bg-muted)] rounded-lg mb-12">
              <button
                className={`flex-1 px-12 py-6 rounded-md text-[13px] font-medium transition-colors ${
                  rightTab === 'details'
                    ? 'bg-[var(--color-surface)] text-[var(--color-fg-primary)] shadow-xs'
                    : 'text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-secondary)]'
                }`}
                onClick={() => setRightTab('details')}
              >
                Details
              </button>
              <button
                className={`flex-1 px-12 py-6 rounded-md text-[13px] font-medium transition-colors ${
                  rightTab === 'signals'
                    ? 'bg-[var(--color-surface)] text-[var(--color-fg-primary)] shadow-xs'
                    : 'text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg-secondary)]'
                }`}
                onClick={() => setRightTab('signals')}
              >
                Signals
              </button>
            </div>

            {/* Tab content */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden">
              {rightTab === 'details' ? (
                selectedStage ? (
                  <ConfigDrawer
                    stage={selectedStage}
                    onClose={() => setSelectedId(null)}
                    onUpdate={updateStage}
                    variant="embedded"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-48 text-center gap-8 px-24">
                    <ArrowRight size={28} className="text-[var(--color-fg-tertiary)] opacity-30" />
                    <p className="type-body font-medium">Select a stage to configure</p>
                    <p className="type-meta">Define interviewers, duration,<br />and scorecard criteria.</p>
                  </div>
                )
              ) : (
                <div className="p-20">
                  <SignalMatrix stages={stages} onToggleSignal={toggleSignal} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-12 mt-48 py-24 border-t border-[var(--color-border)]">
          <button className="btn btn-ghost">Save as draft</button>
          <button
            className="btn btn-accent"
            disabled={stages.length === 0}
            onClick={() => navigate('/scheduling')}
          >
            Finalize Pipeline
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    </>
  )
}
