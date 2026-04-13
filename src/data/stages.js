import {
  Phone,
  User,
  Users,
  ChatCircle,
  ClipboardText,
  Monitor,
  FileText,
} from '@phosphor-icons/react'

export const stageTypes = [
  {
    id: 'screening',
    label: 'Screening Call',
    icon: Phone,
    color: 'var(--color-stage-screening)',
    defaultDuration: 30,
  },
  {
    id: 'single',
    label: 'Single Interview',
    icon: User,
    color: 'var(--color-stage-single)',
    defaultDuration: 45,
  },
  {
    id: 'panel',
    label: 'Panel Interview',
    icon: Users,
    color: 'var(--color-stage-panel)',
    defaultDuration: 60,
  },
  {
    id: 'debrief',
    label: 'Debrief',
    icon: ChatCircle,
    color: 'var(--color-stage-debrief)',
    defaultDuration: 30,
  },
  {
    id: 'assessment',
    label: 'Assessment',
    icon: ClipboardText,
    color: 'var(--color-stage-assessment)',
    defaultDuration: 90,
  },
  {
    id: 'presentation',
    label: 'Presentation',
    icon: Monitor,
    color: 'var(--color-stage-presentation)',
    defaultDuration: 60,
  },
  {
    id: 'case-study',
    label: 'Case Study',
    icon: FileText,
    color: 'var(--color-stage-case-study)',
    defaultDuration: 60,
  },
]

export function getStageType(typeId) {
  return stageTypes.find((s) => s.id === typeId)
}

let _stageCounter = 0

export function createStageInstance(typeId) {
  const type = getStageType(typeId)
  if (!type) return null
  _stageCounter += 1

  return {
    instanceId: `${typeId}-${_stageCounter}`,
    typeId,
    duration: type.defaultDuration,
    interviewers: [],
    questionSet: null,
    scorecard: null,
    signals: [],
    configured: false,
  }
}

export const interviewers = [
  {
    id: 1,
    name: 'Diana Nambiar',
    email: 'dnambiar@world.com',
    role: 'Team Lead',
  },
  {
    id: 2,
    name: 'Shoaib Knott',
    email: 'sknott@world.com',
    role: 'Engineering Manager',
  },
  {
    id: 3,
    name: 'James Park',
    email: 'jpark@world.com',
    role: 'Senior Engineer',
  },
]

export const templates = [
  {
    id: 'standard',
    label: 'Standard Engineering',
    stages: ['screening', 'single', 'panel', 'debrief'],
  },
  {
    id: 'sre-reliability',
    label: 'SRE / Reliability',
    stages: ['screening', 'single', 'assessment', 'panel', 'debrief'],
  },
  {
    id: 'product-strategy',
    label: 'Product Management',
    stages: ['screening', 'single', 'presentation', 'panel', 'debrief'],
  },
  {
    id: 'ux-design',
    label: 'UX / Product Design',
    stages: ['screening', 'presentation', 'panel', 'debrief'],
  },
  {
    id: 'customer-success',
    label: 'Customer Success',
    stages: ['screening', 'single', 'assessment', 'debrief'],
  },
  {
    id: 'qa-automation',
    label: 'QA / Automation',
    stages: ['screening', 'assessment', 'single', 'debrief'],
  },
  {
    id: 'executive',
    label: 'Executive Hire',
    stages: ['screening', 'single', 'panel', 'presentation', 'debrief'],
  },
]
