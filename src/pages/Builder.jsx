import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import FlowStepper from '../components/ui/FlowStepper'
import StageCard from '../components/ui/StageCard'
import Timeline from '../components/ui/Timeline'
import StageDetailPanel from '../components/ui/StageDetailPanel'
import TemplateSelector from '../components/ui/TemplateSelector'
import { stageTypes } from '../data/stages'

export default function Builder() {
  const navigate = useNavigate()
  const [placedStages, setPlacedStages] = useState([])
  const [selectedStageIndex, setSelectedStageIndex] = useState(null)

  const addStage = useCallback((stageId) => {
    setPlacedStages((prev) => [...prev, stageId])
  }, [])

  const removeStage = useCallback((index) => {
    setPlacedStages((prev) => prev.filter((_, i) => i !== index))
    setSelectedStageIndex(null)
  }, [])

  const selectStage = useCallback((index) => {
    setSelectedStageIndex((prev) => (prev === index ? null : index))
  }, [])

  const loadTemplate = useCallback((stages) => {
    setPlacedStages(stages)
    setSelectedStageIndex(null)
  }, [])

  const selectedStage =
    selectedStageIndex !== null
      ? stageTypes.find((s) => s.id === placedStages[selectedStageIndex])
      : null

  return (
    <>
      <PageHeader title="Interview Builder">
        <FlowStepper currentStep="build" />
      </PageHeader>

      <main className="page-content">
        <div className="flex flex-col gap-6 mb-20">
          <h2 className="text-[var(--font-size-lg)] font-semibold">
            Create Interview Template
          </h2>
          <p className="text-[var(--color-fg-secondary)] text-[var(--font-size-base)]">
            Drag stages into the timeline to build your interview pipeline, or
            start from a template.
          </p>
        </div>

        <div className="mb-16">
          <TemplateSelector onSelect={loadTemplate} />
        </div>

        <div className="flex gap-24">
          {/* Left column: available stages */}
          <div className="w-280 flex-shrink-0">
            <p className="section-label mb-10">Stages</p>
            <div className="flex flex-col gap-6">
              {stageTypes.map((stage) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  onDragStart={() => {}}
                  onAdd={addStage}
                />
              ))}
            </div>
          </div>

          {/* Right column: timeline + detail */}
          <div className="flex-1 flex flex-col gap-16">
            <p className="section-label">Timeline</p>
            <Timeline
              placedStages={placedStages}
              onRemoveStage={removeStage}
              onSelectStage={selectStage}
              selectedStageIndex={selectedStageIndex}
              onDrop={addStage}
            />

            {selectedStage && (
              <StageDetailPanel
                stage={selectedStage}
                onClose={() => setSelectedStageIndex(null)}
              />
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-12 mt-32 pt-16 border-t border-[var(--color-border)]">
          <button className="btn btn-ghost">Save as draft</button>
          <button
            className="btn btn-primary"
            disabled={placedStages.length === 0}
            onClick={() => navigate('/scheduling')}
          >
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      </main>
    </>
  )
}
