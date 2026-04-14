import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TemplateSelector from '../../components/ui/TemplateSelector'

// Mock Phosphor icons
vi.mock('@phosphor-icons/react', () => {
  const createIcon = (name) => {
    const Icon = (props) => <span data-testid={`icon-${name}`} {...props}>{name}</span>
    Icon.displayName = name
    return Icon
  }
  return {
    Lightning: createIcon('Lightning'),
    Phone: createIcon('Phone'),
    User: createIcon('User'),
    Users: createIcon('Users'),
    ChatCircle: createIcon('ChatCircle'),
    ClipboardText: createIcon('ClipboardText'),
    Monitor: createIcon('Monitor'),
    FileText: createIcon('FileText'),
  }
})

describe('TemplateSelector', () => {
  it('renders all 7 templates', () => {
    const onSelect = vi.fn()
    render(<TemplateSelector onSelect={onSelect} />)
    expect(screen.getByText('Standard Engineering')).toBeInTheDocument()
    expect(screen.getByText('SRE / Reliability')).toBeInTheDocument()
    expect(screen.getByText('Product Management')).toBeInTheDocument()
    expect(screen.getByText('UX / Product Design')).toBeInTheDocument()
    expect(screen.getByText('Customer Success')).toBeInTheDocument()
    expect(screen.getByText('QA / Automation')).toBeInTheDocument()
    expect(screen.getByText('Executive Hire')).toBeInTheDocument()
  })

  it('renders 7 template buttons', () => {
    render(<TemplateSelector onSelect={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(7)
  })

  it('shows stage count for each template', () => {
    render(<TemplateSelector onSelect={vi.fn()} />)
    // Standard(4), SRE(5), Product(5), UX(4), Customer(4), QA(4), Executive(5)
    expect(screen.getAllByText('4 stages')).toHaveLength(4)
    expect(screen.getAllByText('5 stages')).toHaveLength(3)
  })

  it('calls onSelect with the correct stage IDs when Standard Engineering is clicked', () => {
    const onSelect = vi.fn()
    render(<TemplateSelector onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Standard Engineering'))
    expect(onSelect).toHaveBeenCalledWith(['screening', 'single', 'panel', 'debrief'])
  })

  it('calls onSelect with the correct stage IDs when SRE / Reliability is clicked', () => {
    const onSelect = vi.fn()
    render(<TemplateSelector onSelect={onSelect} />)
    fireEvent.click(screen.getByText('SRE / Reliability'))
    expect(onSelect).toHaveBeenCalledWith(['screening', 'single', 'assessment', 'panel', 'debrief'])
  })

  it('calls onSelect with the correct stage IDs when Executive Hire is clicked', () => {
    const onSelect = vi.fn()
    render(<TemplateSelector onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Executive Hire'))
    expect(onSelect).toHaveBeenCalledWith(['screening', 'single', 'panel', 'presentation', 'debrief'])
  })

  it('renders a Lightning icon for each template', () => {
    render(<TemplateSelector onSelect={vi.fn()} />)
    const lightningIcons = screen.getAllByTestId('icon-Lightning')
    expect(lightningIcons).toHaveLength(7)
  })

  it('renders colored dots for each stage in a template', () => {
    const { container } = render(<TemplateSelector onSelect={vi.fn()} />)
    // Each stage dot has a title matching the stage type label
    expect(container.querySelectorAll('[title="Screening Call"]')).toHaveLength(7) // Every template starts with screening
  })
})
