import { describe, it, expect } from 'vitest'
import { signals, personaTemplates, reviewDataset } from '../../data/mock'

describe('signals', () => {
  it('contains all 14 signals', () => {
    expect(signals).toHaveLength(14)
  })

  it('each signal has required fields: id, label, category, icon, color', () => {
    for (const signal of signals) {
      expect(signal).toHaveProperty('id')
      expect(signal).toHaveProperty('label')
      expect(signal).toHaveProperty('category')
      expect(signal).toHaveProperty('icon')
      expect(signal).toHaveProperty('color')
      expect(typeof signal.id).toBe('string')
      expect(typeof signal.label).toBe('string')
      expect(typeof signal.category).toBe('string')
      expect(signal.icon).toBeDefined()
      expect(typeof signal.color).toBe('string')
    }
  })

  it('all signal IDs are unique', () => {
    const ids = signals.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains exactly the four expected categories', () => {
    const categories = [...new Set(signals.map((s) => s.category))]
    expect(categories.sort()).toEqual(['Behavioral', 'Risk', 'Technical', 'Values'])
  })

  it('has 5 Technical signals', () => {
    const technical = signals.filter((s) => s.category === 'Technical')
    expect(technical).toHaveLength(5)
  })

  it('has 4 Behavioral signals', () => {
    const behavioral = signals.filter((s) => s.category === 'Behavioral')
    expect(behavioral).toHaveLength(4)
  })

  it('has 4 Values signals', () => {
    const values = signals.filter((s) => s.category === 'Values')
    expect(values).toHaveLength(4)
  })

  it('has 1 Risk signal (red flag)', () => {
    const risk = signals.filter((s) => s.category === 'Risk')
    expect(risk).toHaveLength(1)
    expect(risk[0].id).toBe('red-flag')
  })

  it('all colors reference CSS custom properties', () => {
    for (const signal of signals) {
      expect(signal.color).toMatch(/^var\(--/)
    }
  })
})

describe('personaTemplates', () => {
  it('is an array with at least one template', () => {
    expect(Array.isArray(personaTemplates)).toBe(true)
    expect(personaTemplates.length).toBeGreaterThan(0)
  })

  it('each template has id, role, and stages fields', () => {
    for (const template of personaTemplates) {
      expect(template).toHaveProperty('id')
      expect(template).toHaveProperty('role')
      expect(template).toHaveProperty('stages')
      expect(typeof template.id).toBe('string')
      expect(typeof template.role).toBe('string')
      expect(Array.isArray(template.stages)).toBe(true)
      expect(template.stages.length).toBeGreaterThan(0)
    }
  })

  it('all template IDs are unique', () => {
    const ids = personaTemplates.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('reviewDataset', () => {
  it('has the expected top-level shape', () => {
    expect(reviewDataset).toHaveProperty('interviewId')
    expect(reviewDataset).toHaveProperty('candidate')
    expect(reviewDataset).toHaveProperty('recording')
    expect(reviewDataset).toHaveProperty('transcript')
    expect(reviewDataset).toHaveProperty('liveTags')
    expect(reviewDataset).toHaveProperty('scorecard')
  })

  it('candidate has id, name, role, status, and avatar', () => {
    const { candidate } = reviewDataset
    expect(candidate).toHaveProperty('id')
    expect(candidate).toHaveProperty('name')
    expect(candidate).toHaveProperty('role')
    expect(candidate).toHaveProperty('status')
    expect(candidate).toHaveProperty('avatar')
  })

  it('recording has url, duration, and sentimentMap', () => {
    const { recording } = reviewDataset
    expect(recording).toHaveProperty('url')
    expect(recording).toHaveProperty('duration')
    expect(recording).toHaveProperty('sentimentMap')
    expect(Array.isArray(recording.sentimentMap)).toBe(true)
    expect(recording.sentimentMap.length).toBe(60)
  })

  it('each sentimentMap entry has time, score, and speaker', () => {
    for (const entry of reviewDataset.recording.sentimentMap) {
      expect(entry).toHaveProperty('time')
      expect(entry).toHaveProperty('score')
      expect(entry).toHaveProperty('speaker')
      expect(typeof entry.time).toBe('number')
      expect(typeof entry.score).toBe('number')
    }
  })

  it('transcript is a non-empty array of entries with time, speaker, and text', () => {
    const { transcript } = reviewDataset
    expect(Array.isArray(transcript)).toBe(true)
    expect(transcript.length).toBeGreaterThan(0)
    for (const entry of transcript) {
      expect(entry).toHaveProperty('time')
      expect(entry).toHaveProperty('speaker')
      expect(entry).toHaveProperty('text')
    }
  })

  it('some transcript entries have tags that reference valid signal IDs', () => {
    const validSignalIds = new Set(signals.map((s) => s.id))
    const taggedEntries = reviewDataset.transcript.filter((e) => e.tags)
    expect(taggedEntries.length).toBeGreaterThan(0)
    for (const entry of taggedEntries) {
      for (const tag of entry.tags) {
        expect(validSignalIds.has(tag)).toBe(true)
      }
    }
  })

  it('liveTags reference valid signal IDs', () => {
    const validSignalIds = new Set(signals.map((s) => s.id))
    for (const tag of reviewDataset.liveTags) {
      expect(validSignalIds.has(tag.type)).toBe(true)
    }
  })

  it('scorecard has signals array and recommendation', () => {
    const { scorecard } = reviewDataset
    expect(scorecard).toHaveProperty('signals')
    expect(scorecard).toHaveProperty('recommendation')
    expect(Array.isArray(scorecard.signals)).toBe(true)
    expect(scorecard.signals.length).toBeGreaterThan(0)
  })

  it('scorecard signals have id, rating, and feedback', () => {
    for (const signal of reviewDataset.scorecard.signals) {
      expect(signal).toHaveProperty('id')
      expect(signal).toHaveProperty('rating')
      expect(signal).toHaveProperty('feedback')
      expect(typeof signal.rating).toBe('number')
    }
  })
})
