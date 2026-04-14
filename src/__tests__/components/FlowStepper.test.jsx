import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FlowStepper from '../../components/ui/FlowStepper'
import { vi } from 'vitest'

// Mock Phosphor icons
vi.mock('@phosphor-icons/react', () => {
  const createIcon = (name) => {
    const Icon = (props) => <span data-testid={`icon-${name}`} {...props}>{name}</span>
    Icon.displayName = name
    return Icon
  }
  return {
    Check: createIcon('Check'),
  }
})

describe('FlowStepper', () => {
  it('renders all 6 step labels', () => {
    render(<FlowStepper currentStep="build" />)
    expect(screen.getByText('Build Template')).toBeInTheDocument()
    expect(screen.getByText('Configure')).toBeInTheDocument()
    expect(screen.getByText('Schedule')).toBeInTheDocument()
    expect(screen.getByText('Interview')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Decision')).toBeInTheDocument()
  })

  it('renders step numbers for current and future steps', () => {
    render(<FlowStepper currentStep="build" />)
    // "build" is index 0 (current), so steps 1-6 show numbers for current+future
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('renders check icons for completed steps', () => {
    render(<FlowStepper currentStep="schedule" />)
    // "schedule" is index 2, so steps 0 and 1 are complete
    const checkIcons = screen.getAllByTestId('icon-Check')
    expect(checkIcons).toHaveLength(2)
  })

  it('highlights the current step', () => {
    render(<FlowStepper currentStep="configure" />)
    // "configure" is index 1 -- step 0 is complete, step 1 is current
    const stepperDots = document.querySelectorAll('.stepper-dot')
    expect(stepperDots[0].dataset.state).toBe('complete')
    expect(stepperDots[1].dataset.state).toBe('current')
    expect(stepperDots[2].dataset.state).toBe('future')
  })

  it('marks all steps as future when currentStep is the first step', () => {
    render(<FlowStepper currentStep="build" />)
    const stepperDots = document.querySelectorAll('.stepper-dot')
    expect(stepperDots[0].dataset.state).toBe('current')
    expect(stepperDots[1].dataset.state).toBe('future')
    expect(stepperDots[5].dataset.state).toBe('future')
  })

  it('marks all steps except last as complete when on last step', () => {
    render(<FlowStepper currentStep="decision" />)
    const stepperDots = document.querySelectorAll('.stepper-dot')
    for (let i = 0; i < 5; i++) {
      expect(stepperDots[i].dataset.state).toBe('complete')
    }
    expect(stepperDots[5].dataset.state).toBe('current')
  })

  it('has navigation role with aria-label', () => {
    render(<FlowStepper currentStep="build" />)
    expect(screen.getByRole('navigation', { name: 'Interview progress' })).toBeInTheDocument()
  })
})
