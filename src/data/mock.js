import { 
  Phone, User, Users, MessageSquare, ClipboardCheck, Monitor, 
  BrainCircuit, Layout, Target, FileText, Zap, ShieldAlert 
} from 'lucide-react'

/* ================================================================
   1. SIGNALS (The "Atomic Signal" definitions)
   ================================================================ */
export const signals = [
  // Technical Signals (EM / SRE)
  { 
    id: 'logic-leap', 
    label: 'Logic Leap', 
    category: 'Technical', 
    icon: BrainCircuit, 
    color: '#67ABA1', 
    description: 'Ability to troubleshoot cascading failures with intuition.' 
  },
  { 
    id: 'system-design', 
    label: 'System Design', 
    category: 'Technical', 
    icon: Layout, 
    color: '#67ABA1', 
    description: 'Scaling complexity without sacrificing reliability.' 
  },
  
  // Product Signals (PM)
  { 
    id: 'outcome-focus', 
    label: 'Outcome Focus', 
    category: 'Product', 
    icon: Target, 
    color: '#FFC802', 
    description: 'Prioritizing value over features.' 
  },
  { 
    id: 'narrative-clarity', 
    label: 'Narrative Clarity', 
    category: 'Product', 
    icon: FileText, 
    color: '#FFC802', 
    description: 'Communicating vision to cross-functional stakeholders.' 
  },

  // GTM Signals (Sales / Account Exec)
  { 
    id: 'objection-pivot', 
    label: 'Objection Pivot', 
    category: 'GTM', 
    icon: Zap, 
    color: '#ff9823', 
    description: 'Turning a "No" into a data point for a deeper conversation.' 
  },

  // Universal Flags
  { 
    id: 'red-flag', 
    label: 'Red Flag', 
    category: 'Risk', 
    icon: ShieldAlert, 
    color: '#cf222e', 
    description: 'Major concern regarding culture fit or technical integrity.' 
  }
]

/* ================================================================
   2. PERSONA TEMPLATES (Matrix Builder Presets)
   ================================================================ */
export const personaTemplates = [
  {
    id: 'senior-sre',
    role: 'Senior SRE / Reliability',
    persona: 'SRE Lead',
    stages: ['screening', 'single', 'assessment', 'panel', 'debrief'],
    matrix: {
      'logic-leap': ['assessment', 'panel'],
      'system-design': ['panel'],
      'narrative-clarity': ['screening', 'debrief']
    }
  },
  {
    id: 'product-lead',
    role: 'Lead Product Manager',
    persona: 'Impact PM',
    stages: ['screening', 'case-study', 'panel', 'debrief'],
    matrix: {
      'outcome-focus': ['case-study', 'panel'],
      'narrative-clarity': ['screening', 'case-study', 'panel'],
      'logic-leap': ['case-study']
    }
  }
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
      score: Math.sin(i / 5) * 0.5 + 0.3, // Mock fluctuation
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
      signals: ['logic-leap', 'narrative-clarity']
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
      signals: ['logic-leap', 'system-design']
    }
  ],
  liveTags: [
    { type: 'logic-leap', time: 142, author: 'Shoaib Knott', note: 'Strong intuition on sidecar throttling.' },
    { type: 'system-design', time: 225, author: 'Shoaib Knott', note: 'Understands stability priority vs forensics.' },
    { type: 'red-flag', time: 3100, author: 'Shoaib Knott', note: 'Vague on how he would prevent this in the future.' }
  ],
  scorecard: {
    competencies: [
      { id: 'logic-leap', rating: 4, feedback: 'Exceptional troubleshooting intuition.' },
      { id: 'system-design', rating: 5, feedback: 'Deep understanding of distributed systems.' },
      { id: 'narrative-clarity', rating: 3, feedback: 'Clear, but occasionally gets lost in the weeds.' }
    ],
    recommendation: 'Strong Hire'
  }
}
