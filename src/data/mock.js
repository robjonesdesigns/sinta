import {
  Brain, Code, Layout, FlowArrow,
  ChatCircle, Users, ShieldCheck, TrendUp,
  Target, Heart, Lightbulb, ChartBar,
  ShieldWarning
} from '@phosphor-icons/react'

/* ================================================================
   1. SIGNALS (Live interview reaction tags per category)
   ================================================================ */
export const signals = [
  // Technical
  { id: 'problem-solving', label: 'Problem Solving', category: 'Technical', icon: Brain, color: 'var(--color-signal-technical)' },
  { id: 'system-design', label: 'System Design', category: 'Technical', icon: Layout, color: 'var(--color-signal-technical)' },
  { id: 'code-quality', label: 'Code Quality', category: 'Technical', icon: Code, color: 'var(--color-signal-technical)' },
  { id: 'domain-expertise', label: 'Domain Expertise', category: 'Technical', icon: FlowArrow, color: 'var(--color-signal-technical)' },
  { id: 'analytical-rigor', label: 'Analytical Rigor', category: 'Technical', icon: ChartBar, color: 'var(--color-signal-technical)' },

  // Behavioral
  { id: 'communication', label: 'Communication', category: 'Behavioral', icon: ChatCircle, color: 'var(--color-signal-behavioral)' },
  { id: 'collaboration', label: 'Collaboration', category: 'Behavioral', icon: Users, color: 'var(--color-signal-behavioral)' },
  { id: 'leadership', label: 'Leadership', category: 'Behavioral', icon: ShieldCheck, color: 'var(--color-signal-behavioral)' },
  { id: 'adaptability', label: 'Adaptability', category: 'Behavioral', icon: TrendUp, color: 'var(--color-signal-behavioral)' },

  // Values
  { id: 'culture-alignment', label: 'Culture Alignment', category: 'Values', icon: Heart, color: 'var(--color-signal-values)' },
  { id: 'growth-mindset', label: 'Growth Mindset', category: 'Values', icon: Lightbulb, color: 'var(--color-signal-values)' },
  { id: 'ownership', label: 'Ownership', category: 'Values', icon: Target, color: 'var(--color-signal-values)' },
  { id: 'strategic-thinking', label: 'Strategic Thinking', category: 'Values', icon: Target, color: 'var(--color-signal-values)' },

  // Flags
  { id: 'red-flag', label: 'Red Flag', category: 'Risk', icon: ShieldWarning, color: 'var(--color-signal-risk)' },
]

/* ================================================================
   2. PERSONA TEMPLATES (Builder presets)
   ================================================================ */
export const personaTemplates = [
  {
    id: 'senior-sre',
    role: 'Senior SRE / Reliability',
    stages: ['screening', 'single', 'assessment', 'panel', 'debrief'],
  },
  {
    id: 'product-lead',
    role: 'Lead Product Manager',
    stages: ['screening', 'case-study', 'panel', 'debrief'],
  },
]

/* ================================================================
   3. THE DECISION LAB (Sample Review Dataset)
   ================================================================ */
export const reviewDataset = {
  interviewId: 'int-789-abc',
  candidate: {
    id: 'cand-456',
    name: 'Alex Rivera',
    role: 'Senior SRE',
    status: 'In Review',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  recording: {
    url: 'https://sinta.video/stream/alex-rivera-sre',
    duration: 3600,
    sentimentMap: Array.from({ length: 60 }, (_, i) => ({
      time: i * 60,
      score: Math.sin(i / 5) * 0.5 + 0.3,
      speaker: 'candidate'
    }))
  },
  transcript: [
    {
      time: 125,
      speaker: 'Shoaib Knott (EM)',
      text: 'Tell me about the last time you handled a cascading failure in a production environment.'
    },
    {
      time: 142,
      speaker: 'Alex Rivera',
      text: "It was actually at my last role. We had a memory leak in a sidecar container that wasn't being throttled properly. It took out the entire US-East node in under 4 minutes.",
      tags: ['problem-solving', 'communication']
    },
    {
      time: 210,
      speaker: 'Shoaib Knott (EM)',
      text: 'And how did you isolate the leak while the system was down?'
    },
    {
      time: 225,
      speaker: 'Alex Rivera',
      text: "I didn't try to isolate it initially. I killed the deployment and reverted to the previous known stable version of the cluster. Stability first, then forensics.",
      tags: ['problem-solving', 'system-design']
    }
  ],
  liveTags: [
    { type: 'problem-solving', time: 142, author: 'Shoaib Knott', note: 'Strong intuition on sidecar throttling.' },
    { type: 'system-design', time: 225, author: 'Shoaib Knott', note: 'Understands stability priority vs forensics.' },
    { type: 'red-flag', time: 3100, author: 'Shoaib Knott', note: 'Vague on how he would prevent this in the future.' }
  ],
  scorecard: {
    signals: [
      { id: 'problem-solving', rating: 4, feedback: 'Exceptional troubleshooting intuition.' },
      { id: 'system-design', rating: 5, feedback: 'Deep understanding of distributed systems.' },
      { id: 'communication', rating: 3, feedback: 'Clear, but occasionally gets lost in the weeds.' }
    ],
    recommendation: 'Strong Hire'
  }
}
