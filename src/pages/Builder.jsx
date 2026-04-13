import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { ArrowRight, Layers, Plus, BrainCircuit } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import FlowStepper from '../components/ui/FlowStepper'
import StageListCard from '../components/ui/StageListCard'
import StageConnector, { AddStageButton } from '../components/ui/StageConnector'
import StageAddPopover from '../components/ui/StageAddPopover'
import ConfigDrawer from '../components/ui/ConfigDrawer'
import TemplateSelector from '../components/ui/TemplateSelector'
import SignalMatrix from '../components/ui/SignalMatrix'
import { createStageInstance } from '../data/stages'
import { personaTemplates } from '../data/mock'

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

  const toggleSignal = useCallback((stageId, signalId) => {
    setStages(prev => prev.map(s => {
      if (s.instanceId !== stageId) return s
      const competencies = s.competencies || []
      const nextCompetencies = competencies.includes(signalId)
        ? competencies.filter(id => id !== signalId)
        : [...competencies, signalId]
      return { ...s, competencies: nextCompetencies }
    }))
  }, [])

  const loadTemplate = useCallback((templateId) => {
    // If we get an array of IDs (old way), find the template object
    const template = typeof templateId === 'string' 
      ? personaTemplates.find(t => t.id === templateId)
      : null

    if (template) {
      const instances = template.stages.map(typeId => {
        const instance = createStageInstance(typeId)
        // Apply matrix signals to this instance if they exist
        const signalsForStage = Object.entries(template.matrix)
          .filter(([signalId, stageTypes]) => stageTypes.includes(typeId))
          .map(([signalId]) => signalId)
        
        return { ...instance, competencies: signalsForStage }
      })
      setStages(instances)
    } else if (Array.isArray(templateId)) {
      // Fallback for old simple template structure
      const instances = templateId.map((id) => createStageInstance(id))
      setStages(instances.filter(Boolean))
    }
    
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
        <div className="flex flex-col gap-6 mb-24">
          <h2 className="type-section-heading">Create Interview Template</h2>
          <p className="type-body-secondary max-w-640">
            Build your interview pipeline by adding stages. Each stage holds unique 
            configurations for duration, interviewers, and scorecard criteria.
          </p>
        </div>

        <div className="mb-24">
          <p className="type-label mb-12">Start with a template</p>
          <TemplateSelector onSelect={loadTemplate} />
        </div>

        {/* ── Split-Pane Architecture ─────────────────────────────── */}
        <div className="flex gap-32 items-start">
          
          {/* Left: Pipeline Column */}
          <div className="w-480 flex-shrink-0">
            <div className="flex items-center justify-between mb-12">
              <p className="type-label">Pipeline Architecture</p>
              <span className="type-meta">{stages.length} Stages</span>
            </div>

            <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl p-24">
              {stages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-48 text-center gap-12">
                  <Layers size={32} className="text-[var(--color-fg-tertiary)] opacity-40" />
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
                                  onClick={setSelectedId}
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

          {/* Right: Config Anatomy Column */}
          <div className="flex-1 min-w-320 sticky top-100">
            <div className="flex items-center justify-between mb-12">
              <p className="type-label">Stage Anatomy & Config</p>
              {selectedStage && (
                <span className="badge badge-primary">{selectedStage.instanceId}</span>
              )}
            </div>

            {selectedStage ? (
              <div className="animate-in">
                <ConfigDrawer
                  stage={selectedStage}
                  onClose={() => setSelectedId(null)}
                  onUpdate={updateStage}
                  variant="embedded" // New variant for the split-pane
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-64 flex flex-col items-center justify-center text-center gap-12 bg-[var(--color-bg-subtle)]/50">
                <div className="w-48 h-48 rounded-full bg-[var(--color-bg-muted)] flex items-center justify-center text-[var(--color-fg-tertiary)]">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <p className="type-body font-medium">Select a stage to configure</p>
                  <p className="type-meta mt-4 max-w-200">
                    Define interviewers, question sets, and scorecard criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Signal Matrix Architecture ─────────────────────────── */}
        <div className="mt-64 animate-in">
          <div className="flex flex-col gap-6 mb-24">
            <div className="flex items-center gap-12">
              <h2 className="type-section-heading">Signal Coverage Audit</h2>
              <span className="badge badge-primary gap-6">
                <BrainCircuit size={12} />
                Matrix View
              </span>
            </div>
            <p className="type-body-secondary max-w-640">
              Map desired competency signals across your interview loop. Sinta will 
              automatically generate live shortcut buttons for interviewers based on this grid.
            </p>
          </div>
          
          <SignalMatrix 
            stages={stages} 
            onToggleSignal={toggleSignal}
          />
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
