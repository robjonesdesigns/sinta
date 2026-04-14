import { describe, it, expect } from 'vitest'
import { stageTypes, templates, getStageType, createStageInstance } from '../../data/stages'

describe('stageTypes', () => {
  it('contains all 7 stage types', () => {
    expect(stageTypes).toHaveLength(7)
  })

  it('each stage type has required fields: id, label, icon, color, defaultDuration', () => {
    for (const stage of stageTypes) {
      expect(stage).toHaveProperty('id')
      expect(stage).toHaveProperty('label')
      expect(stage).toHaveProperty('icon')
      expect(stage).toHaveProperty('color')
      expect(stage).toHaveProperty('defaultDuration')
      expect(typeof stage.id).toBe('string')
      expect(typeof stage.label).toBe('string')
      expect(stage.icon).toBeDefined()
      expect(typeof stage.color).toBe('string')
      expect(typeof stage.defaultDuration).toBe('number')
    }
  })

  it('all stage type IDs are unique', () => {
    const ids = stageTypes.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('includes the expected stage type IDs', () => {
    const ids = stageTypes.map((s) => s.id)
    expect(ids).toContain('screening')
    expect(ids).toContain('single')
    expect(ids).toContain('panel')
    expect(ids).toContain('debrief')
    expect(ids).toContain('assessment')
    expect(ids).toContain('presentation')
    expect(ids).toContain('case-study')
  })
})

describe('getStageType', () => {
  it('returns the correct stage type for a valid ID', () => {
    const result = getStageType('screening')
    expect(result).toBeDefined()
    expect(result.id).toBe('screening')
    expect(result.label).toBe('Screening Call')
  })

  it('returns undefined for an invalid ID', () => {
    const result = getStageType('nonexistent')
    expect(result).toBeUndefined()
  })

  it('returns undefined when called with no argument', () => {
    const result = getStageType()
    expect(result).toBeUndefined()
  })
})

describe('createStageInstance', () => {
  it('returns an object with the correct shape', () => {
    const instance = createStageInstance('screening')
    expect(instance).toHaveProperty('instanceId')
    expect(instance).toHaveProperty('typeId', 'screening')
    expect(instance).toHaveProperty('duration')
    expect(instance).toHaveProperty('interviewers')
    expect(instance).toHaveProperty('questionSet')
    expect(instance).toHaveProperty('scorecard')
    expect(instance).toHaveProperty('signals')
    expect(instance).toHaveProperty('configured')
  })

  it('uses the default duration from the stage type', () => {
    const instance = createStageInstance('screening')
    expect(instance.duration).toBe(30)

    const panelInstance = createStageInstance('panel')
    expect(panelInstance.duration).toBe(60)
  })

  it('starts with empty interviewers array', () => {
    const instance = createStageInstance('screening')
    expect(instance.interviewers).toEqual([])
  })

  it('starts with null questionSet and scorecard', () => {
    const instance = createStageInstance('screening')
    expect(instance.questionSet).toBeNull()
    expect(instance.scorecard).toBeNull()
  })

  it('starts with empty signals array', () => {
    const instance = createStageInstance('screening')
    expect(instance.signals).toEqual([])
  })

  it('starts unconfigured', () => {
    const instance = createStageInstance('screening')
    expect(instance.configured).toBe(false)
  })

  it('generates unique instanceIds across multiple calls', () => {
    const a = createStageInstance('screening')
    const b = createStageInstance('screening')
    const c = createStageInstance('panel')
    expect(a.instanceId).not.toBe(b.instanceId)
    expect(a.instanceId).not.toBe(c.instanceId)
    expect(b.instanceId).not.toBe(c.instanceId)
  })

  it('includes the typeId in the instanceId string', () => {
    const instance = createStageInstance('panel')
    expect(instance.instanceId).toContain('panel')
  })

  it('returns null for an invalid typeId', () => {
    const result = createStageInstance('nonexistent')
    expect(result).toBeNull()
  })
})

describe('templates', () => {
  it('contains all 7 templates', () => {
    expect(templates).toHaveLength(7)
  })

  it('each template has required fields: id, label, stages', () => {
    for (const template of templates) {
      expect(template).toHaveProperty('id')
      expect(template).toHaveProperty('label')
      expect(template).toHaveProperty('stages')
      expect(typeof template.id).toBe('string')
      expect(typeof template.label).toBe('string')
      expect(Array.isArray(template.stages)).toBe(true)
      expect(template.stages.length).toBeGreaterThan(0)
    }
  })

  it('all template IDs are unique', () => {
    const ids = templates.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all stage references in templates point to valid stage type IDs', () => {
    const validIds = new Set(stageTypes.map((s) => s.id))
    for (const template of templates) {
      for (const stageId of template.stages) {
        expect(validIds.has(stageId)).toBe(true)
      }
    }
  })

  it('every template starts with screening', () => {
    for (const template of templates) {
      expect(template.stages[0]).toBe('screening')
    }
  })
})
