import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'
import StageAddPopover from './StageAddPopover'

export default function StageConnector({ onAddStage, isLast }) {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <div className="stage-connector">
      <button
        className="add-between-btn"
        onClick={() => setShowPopover(true)}
        aria-label="Add stage here"
        title="Add stage"
      >
        <Plus size={14} weight="bold" />
      </button>
      {showPopover && (
        <StageAddPopover
          onSelect={onAddStage}
          onClose={() => setShowPopover(false)}
        />
      )}
    </div>
  )
}

export function AddStageButton({ onAddStage }) {
  const [showPopover, setShowPopover] = useState(false)

  return (
    <div className="relative">
      <button
        className="add-stage-btn"
        onClick={() => setShowPopover(true)}
      >
        <Plus size={16} weight="regular" />
        Add stage
      </button>
      {showPopover && (
        <StageAddPopover
          onSelect={(typeId) => {
            onAddStage(typeId)
            setShowPopover(false)
          }}
          onClose={() => setShowPopover(false)}
        />
      )}
    </div>
  )
}
