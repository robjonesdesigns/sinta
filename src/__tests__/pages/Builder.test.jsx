import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Builder from '../../pages/Builder'

// Mock Phosphor icons
vi.mock('@phosphor-icons/react', () => {
  const createIcon = (name) => {
    const Icon = (props) => <span data-testid={`icon-${name}`} {...props}>{name}</span>
    Icon.displayName = name
    return Icon
  }
  return {
    ArrowRight: createIcon('ArrowRight'),
    Stack: createIcon('Stack'),
    Plus: createIcon('Plus'),
    Check: createIcon('Check'),
    Lightning: createIcon('Lightning'),
    Phone: createIcon('Phone'),
    User: createIcon('User'),
    Users: createIcon('Users'),
    ChatCircle: createIcon('ChatCircle'),
    ClipboardText: createIcon('ClipboardText'),
    Monitor: createIcon('Monitor'),
    FileText: createIcon('FileText'),
    MagnifyingGlass: createIcon('MagnifyingGlass'),
    DotsSixVertical: createIcon('DotsSixVertical'),
    Clock: createIcon('Clock'),
    WarningCircle: createIcon('WarningCircle'),
    DotsThree: createIcon('DotsThree'),
    Copy: createIcon('Copy'),
    Trash: createIcon('Trash'),
    CaretUp: createIcon('CaretUp'),
    CaretDown: createIcon('CaretDown'),
    X: createIcon('X'),
    Brain: createIcon('Brain'),
    Code: createIcon('Code'),
    Layout: createIcon('Layout'),
    FlowArrow: createIcon('FlowArrow'),
    ShieldCheck: createIcon('ShieldCheck'),
    TrendUp: createIcon('TrendUp'),
    Target: createIcon('Target'),
    Heart: createIcon('Heart'),
    Lightbulb: createIcon('Lightbulb'),
    ChartBar: createIcon('ChartBar'),
    ShieldWarning: createIcon('ShieldWarning'),
  }
})

// Mock @hello-pangea/dnd to render children without drag-and-drop
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) => children({
    innerRef: vi.fn(),
    droppableProps: {},
    placeholder: null,
  }),
  Draggable: ({ children }) => children(
    {
      innerRef: vi.fn(),
      draggableProps: {},
      dragHandleProps: {},
    },
    { isDragging: false }
  ),
}))

// Mock StageOverflowMenu
vi.mock('../../components/ui/StageOverflowMenu', () => ({
  default: ({ onDuplicate, onDelete }) => (
    <div data-testid="overflow-menu">
      <button onClick={onDuplicate}>Duplicate</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}))

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear()
})

function renderBuilder() {
  return render(
    <MemoryRouter>
      <Builder />
    </MemoryRouter>
  )
}

describe('Builder page', () => {
  it('renders the page header with title "Interview Builder"', () => {
    renderBuilder()
    expect(screen.getByText('Interview Builder')).toBeInTheDocument()
  })

  it('renders the "Create Interview Template" heading', () => {
    renderBuilder()
    expect(screen.getByText('Create Interview Template')).toBeInTheDocument()
  })

  it('renders the template selector section', () => {
    renderBuilder()
    expect(screen.getByText('Start with a template')).toBeInTheDocument()
    expect(screen.getByText('Standard Engineering')).toBeInTheDocument()
  })

  it('renders all 7 templates in the selector', () => {
    renderBuilder()
    expect(screen.getByText('Standard Engineering')).toBeInTheDocument()
    expect(screen.getByText('SRE / Reliability')).toBeInTheDocument()
    expect(screen.getByText('Product Management')).toBeInTheDocument()
    expect(screen.getByText('UX / Product Design')).toBeInTheDocument()
    expect(screen.getByText('Customer Success')).toBeInTheDocument()
    expect(screen.getByText('QA / Automation')).toBeInTheDocument()
    expect(screen.getByText('Executive Hire')).toBeInTheDocument()
  })

  it('shows empty state when no stages exist', () => {
    renderBuilder()
    expect(screen.getByText('No stages yet')).toBeInTheDocument()
    expect(screen.getByText('0 Stages')).toBeInTheDocument()
  })

  it('shows "Continue to Scheduling" button that is disabled when no stages', () => {
    renderBuilder()
    const continueBtn = screen.getByText('Continue to Scheduling').closest('button')
    expect(continueBtn).toBeDisabled()
  })

  it('populates stages when a template is loaded', () => {
    renderBuilder()
    // Click the Standard Engineering template (4 stages: screening, single, panel, debrief)
    fireEvent.click(screen.getByText('Standard Engineering'))
    // Should now show 4 stages
    expect(screen.getByText('4 Stages')).toBeInTheDocument()
    expect(screen.getByText('Screening Call')).toBeInTheDocument()
    expect(screen.getByText('Single Interview')).toBeInTheDocument()
    expect(screen.getByText('Panel Interview')).toBeInTheDocument()
    expect(screen.getByText('Debrief')).toBeInTheDocument()
  })

  it('enables the Continue button after loading a template', () => {
    renderBuilder()
    fireEvent.click(screen.getByText('Standard Engineering'))
    const continueBtn = screen.getByText('Continue to Scheduling').closest('button')
    expect(continueBtn).not.toBeDisabled()
  })

  it('shows Details tab content by default in the right panel', () => {
    renderBuilder()
    // The segmented control should show Details and Signals tabs
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Signals')).toBeInTheDocument()
    // Default state: no stage selected
    expect(screen.getByText('Select a stage to configure')).toBeInTheDocument()
  })

  it('switches to Signals tab when clicked', () => {
    renderBuilder()
    fireEvent.click(screen.getByText('Signals'))
    // With no stages, SignalMatrix shows its empty state
    expect(screen.getByText('Signals map to stages')).toBeInTheDocument()
  })

  it('switches back to Details tab when clicked', () => {
    renderBuilder()
    fireEvent.click(screen.getByText('Signals'))
    fireEvent.click(screen.getByText('Details'))
    expect(screen.getByText('Select a stage to configure')).toBeInTheDocument()
  })

  it('shows ConfigDrawer when a stage is clicked', () => {
    renderBuilder()
    fireEvent.click(screen.getByText('Standard Engineering'))
    // Click the Screening Call stage card
    const screeningCard = screen.getByRole('button', { name: /Stage 1: Screening Call/ })
    fireEvent.click(screeningCard)
    // ConfigDrawer should show with "Configure this stage"
    expect(screen.getByText('Configure this stage')).toBeInTheDocument()
  })

  it('deselects a stage when clicking the same stage again', () => {
    renderBuilder()
    fireEvent.click(screen.getByText('Standard Engineering'))
    const screeningCard = screen.getByRole('button', { name: /Stage 1: Screening Call/ })
    // Click to select
    fireEvent.click(screeningCard)
    expect(screen.getByText('Configure this stage')).toBeInTheDocument()
    // Click again to deselect
    fireEvent.click(screeningCard)
    expect(screen.getByText('Select a stage to configure')).toBeInTheDocument()
  })

  it('renders the FlowStepper with "build" as the current step', () => {
    renderBuilder()
    expect(screen.getByText('Build Template')).toBeInTheDocument()
    const stepperDots = document.querySelectorAll('.stepper-dot')
    if (stepperDots.length > 0) {
      expect(stepperDots[0].dataset.state).toBe('current')
    }
  })

  it('shows "Save as draft" button', () => {
    renderBuilder()
    expect(screen.getByText('Save as draft')).toBeInTheDocument()
  })

  it('renders the Pipeline label', () => {
    renderBuilder()
    expect(screen.getByText('Pipeline')).toBeInTheDocument()
  })

  it('renders the Stage Configuration label', () => {
    renderBuilder()
    expect(screen.getByText('Stage Configuration')).toBeInTheDocument()
  })
})
