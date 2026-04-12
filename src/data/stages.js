import {
  Phone,
  User,
  Users,
  MessageSquare,
  ClipboardCheck,
  Monitor,
} from 'lucide-react'

export const stageTypes = [
  {
    id: 'screening',
    label: 'Screening Call',
    icon: Phone,
    color: 'var(--color-warning)',
  },
  {
    id: 'single',
    label: 'Single Interview',
    icon: User,
    color: 'var(--color-primary)',
  },
  {
    id: 'panel',
    label: 'Panel Interview',
    icon: Users,
    color: '#e07040',
  },
  {
    id: 'debrief',
    label: 'Debrief',
    icon: MessageSquare,
    color: 'var(--color-success)',
  },
  {
    id: 'assessment',
    label: 'Assessment',
    icon: ClipboardCheck,
    color: 'var(--color-warning)',
  },
  {
    id: 'presentation',
    label: 'Presentation',
    icon: Monitor,
    color: 'var(--color-primary)',
  },
]

export const interviewers = [
  {
    id: 1,
    name: 'Diana Nambiar',
    email: 'dnambiar@world.com',
    role: 'Team Lead',
    avatar: null,
  },
  {
    id: 2,
    name: 'Shoaib Knott',
    email: 'sknott@world.com',
    role: 'Engineering Manager',
    avatar: null,
  },
  {
    id: 3,
    name: 'James Park',
    email: 'jpark@world.com',
    role: 'Senior Engineer',
    avatar: null,
  },
]

export const templates = [
  {
    id: 'standard',
    label: 'Standard Engineering',
    stages: ['screening', 'single', 'panel'],
  },
  {
    id: 'executive',
    label: 'Executive Hire',
    stages: ['screening', 'single', 'panel', 'presentation', 'debrief'],
  },
  {
    id: 'quick',
    label: 'Quick Screen',
    stages: ['screening', 'single'],
  },
]
