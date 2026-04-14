import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import StageListCard from '../../components/ui/StageListCard'

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
    DotsSixVertical: createIcon('DotsSixVertical'),
    Clock: createIcon('Clock'),
    Check: createIcon('Check'),
    WarningCircle: createIcon('WarningCircle'),
    DotsThree: createIcon('DotsThree'),
    Copy: createIcon('Copy'),
    Trash: createIcon('Trash'),
    CaretUp: createIcon('CaretUp'),
    CaretDown: createIcon('CaretDown'),
  }
})

// Mock StageOverflowMenu to avoid its internal complexity
vi.mock('../../components/ui/StageOverflowMenu', () => ({
  default: ({ onDuplicate, onDelete }) => (
    <div data-testid="overflow-menu">
      <button onClick={onDuplicate} data-testid="duplicate-btn">Duplicate</button>
      <button onClick={onDelete} data-testid="delete-btn">Delete</button>
    </div>
  ),
}))

describe('StageListCard', () => {
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
    index: 0,
    isSelected: false,
    isDragging: false,
    onClick: vi.fn(),
    onRemove: vi.fn(),
    onDuplicate: vi.fn(),
    onMoveUp: vi.fn(),
    onMoveDown: vi.fn(),
    canMoveUp: false,
    canMoveDown: true,
    dragHandleProps: {},
  }

  it('renders the stage type label', () => {
    render(<StageListCard {...defaultProps} />)
    expect(screen.getByText('Screening Call')).toBeInTheDocument()
  })

  it('renders the stage number', () => {
    render(<StageListCard {...defaultProps} index={2} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders the duration', () => {
    render(<StageListCard {...defaultProps} />)
    expect(screen.getByText('30 min')).toBeInTheDocument()
  })

  it('renders interviewer count with correct pluralization', () => {
    render(<StageListCard {...defaultProps} />)
    expect(screen.getByText('0 interviewers')).toBeInTheDocument()
  })

  it('renders singular "interviewer" when count is 1', () => {
    const stageWithOne = {
      ...baseStage,
      interviewers: [{ id: 1, name: 'Diana Nambiar', role: 'Team Lead' }],
    }
    render(<StageListCard {...defaultProps} stage={stageWithOne} />)
    expect(screen.getByText('1 interviewer')).toBeInTheDocument()
  })

  it('shows Setup status pill when not configured', () => {
    render(<StageListCard {...defaultProps} />)
    expect(screen.getByText('Setup')).toBeInTheDocument()
  })

  it('shows Ready status pill when configured', () => {
    const configuredStage = { ...baseStage, configured: true }
    render(<StageListCard {...defaultProps} stage={configuredStage} />)
    expect(screen.getByText('Ready')).toBeInTheDocument()
  })

  it('calls onClick with instanceId when clicked', () => {
    const onClick = vi.fn()
    render(<StageListCard {...defaultProps} onClick={onClick} />)
    const card = screen.getByRole('button', { name: /Stage 1: Screening Call/ })
    fireEvent.click(card)
    expect(onClick).toHaveBeenCalledWith('screening-1')
  })

  it('calls onClick on Enter key press', () => {
    const onClick = vi.fn()
    render(<StageListCard {...defaultProps} onClick={onClick} />)
    const card = screen.getByRole('button', { name: /Stage 1: Screening Call/ })
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledWith('screening-1')
  })

  it('calls onClick on Space key press', () => {
    const onClick = vi.fn()
    render(<StageListCard {...defaultProps} onClick={onClick} />)
    const card = screen.getByRole('button', { name: /Stage 1: Screening Call/ })
    fireEvent.keyDown(card, { key: ' ' })
    expect(onClick).toHaveBeenCalledWith('screening-1')
  })

  it('calls onRemove through overflow menu', () => {
    const onRemove = vi.fn()
    render(<StageListCard {...defaultProps} onRemove={onRemove} />)
    fireEvent.click(screen.getByTestId('delete-btn'))
    expect(onRemove).toHaveBeenCalled()
  })

  it('calls onDuplicate through overflow menu', () => {
    const onDuplicate = vi.fn()
    render(<StageListCard {...defaultProps} onDuplicate={onDuplicate} />)
    fireEvent.click(screen.getByTestId('duplicate-btn'))
    expect(onDuplicate).toHaveBeenCalled()
  })

  it('renders avatar initials when interviewers are assigned', () => {
    const stageWithInterviewers = {
      ...baseStage,
      interviewers: [
        { id: 1, name: 'Diana Nambiar', role: 'Team Lead' },
        { id: 2, name: 'Shoaib Knott', role: 'Engineering Manager' },
      ],
    }
    render(<StageListCard {...defaultProps} stage={stageWithInterviewers} />)
    expect(screen.getByText('DN')).toBeInTheDocument()
    expect(screen.getByText('SK')).toBeInTheDocument()
  })

  it('shows +N overflow when more than 3 interviewers', () => {
    const stageWithMany = {
      ...baseStage,
      interviewers: [
        { id: 1, name: 'Diana Nambiar', role: 'Lead' },
        { id: 2, name: 'Shoaib Knott', role: 'EM' },
        { id: 3, name: 'James Park', role: 'SE' },
        { id: 4, name: 'Alex Rivera', role: 'SRE' },
      ],
    }
    render(<StageListCard {...defaultProps} stage={stageWithMany} />)
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('has correct aria-label with stage number and type', () => {
    render(<StageListCard {...defaultProps} index={3} />)
    expect(screen.getByRole('button', { name: 'Stage 4: Screening Call' })).toBeInTheDocument()
  })

  it('returns null for an invalid stage typeId', () => {
    const invalidStage = { ...baseStage, typeId: 'nonexistent' }
    const { container } = render(<StageListCard {...defaultProps} stage={invalidStage} />)
    expect(container.innerHTML).toBe('')
  })
})
