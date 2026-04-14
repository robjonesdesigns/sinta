import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ConfigDrawer from '../../components/ui/ConfigDrawer'

// Mock Phosphor icons
vi.mock('@phosphor-icons/react', () => {
  const createIcon = (name) => {
    const Icon = (props) => <span data-testid={`icon-${name}`} {...props}>{name}</span>
    Icon.displayName = name
    return Icon
  }
  return {
    Phone: createIcon('Phone'),
    User: createIcon('User'),
    Users: createIcon('Users'),
    ChatCircle: createIcon('ChatCircle'),
    ClipboardText: createIcon('ClipboardText'),
    Monitor: createIcon('Monitor'),
    FileText: createIcon('FileText'),
    X: createIcon('X'),
    Clock: createIcon('Clock'),
    CaretDown: createIcon('CaretDown'),
    Check: createIcon('Check'),
  }
})

// Mock sub-components to isolate ConfigDrawer behavior
vi.mock('../../components/ui/InterviewerPicker', () => ({
  default: ({ assigned, onAdd, onRemove }) => (
    <div data-testid="interviewer-picker">
      <span data-testid="assigned-count">{assigned.length}</span>
    </div>
  ),
}))

vi.mock('../../components/ui/DurationPicker', () => ({
  default: ({ value, onChange }) => (
    <div data-testid="duration-picker">
      <span data-testid="duration-value">{value}</span>
      <button data-testid="change-duration" onClick={() => onChange(60)}>
        Set 60
      </button>
    </div>
  ),
}))

vi.mock('../../components/ui/SelectPicker', () => ({
  default: ({ value, onChange, placeholder }) => (
    <div data-testid="select-picker">
      <span>{value || placeholder}</span>
      <button data-testid={`select-${placeholder}`} onClick={() => onChange('test-value')}>
        Select
      </button>
    </div>
  ),
}))

describe('ConfigDrawer', () => {
  const baseStage = {
    instanceId: 'screening-1',
    typeId: 'screening',
    duration: 30,
    interviewers: [],
    questionSet: null,
    scorecard: null,
    signals: [],
    configured: false,
  }

  const defaultProps = {
    stage: baseStage,
    onClose: vi.fn(),
    onUpdate: vi.fn(),
  }

  it('renders the stage type label in the header', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Screening Call')).toBeInTheDocument()
  })

  it('renders the configure subheading', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Configure this stage')).toBeInTheDocument()
  })

  it('renders the stage icon', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByTestId('icon-Phone')).toBeInTheDocument()
  })

  it('renders the Interviewers section', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Interviewers')).toBeInTheDocument()
    expect(screen.getByText('Assign team members to this stage.')).toBeInTheDocument()
    expect(screen.getByTestId('interviewer-picker')).toBeInTheDocument()
  })

  it('renders the Duration section', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Duration')).toBeInTheDocument()
    expect(screen.getByTestId('duration-picker')).toBeInTheDocument()
  })

  it('renders the Question Set section', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Question Set')).toBeInTheDocument()
  })

  it('renders the Scorecard Template section', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByText('Scorecard Template')).toBeInTheDocument()
  })

  it('calls onUpdate with new duration when duration changes', () => {
    const onUpdate = vi.fn()
    render(<ConfigDrawer {...defaultProps} onUpdate={onUpdate} />)
    fireEvent.click(screen.getByTestId('change-duration'))
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ duration: 60 })
    )
  })

  it('shows close button in default drawer variant', () => {
    render(<ConfigDrawer {...defaultProps} />)
    expect(screen.getByLabelText('Close configuration')).toBeInTheDocument()
  })

  it('hides close button in embedded variant', () => {
    render(<ConfigDrawer {...defaultProps} variant="embedded" />)
    expect(screen.queryByLabelText('Close configuration')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<ConfigDrawer {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('Close configuration'))
    expect(onClose).toHaveBeenCalled()
  })

  it('returns null for an invalid stage typeId', () => {
    const invalidStage = { ...baseStage, typeId: 'nonexistent' }
    const { container } = render(<ConfigDrawer {...defaultProps} stage={invalidStage} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders for a panel stage type correctly', () => {
    const panelStage = { ...baseStage, typeId: 'panel', instanceId: 'panel-1', duration: 60 }
    render(<ConfigDrawer {...defaultProps} stage={panelStage} />)
    expect(screen.getByText('Panel Interview')).toBeInTheDocument()
    expect(screen.getByTestId('icon-Users')).toBeInTheDocument()
  })
})
