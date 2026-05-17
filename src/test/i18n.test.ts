import { describe, it, expect } from 'vitest'
import en from '@/i18n/locales/en.json'
import ar from '@/i18n/locales/ar.json'

describe('i18n', () => {
  it('has matching keys between en and ar', () => {
    const getKeys = (obj: Record<string, unknown>, prefix = ''): string[] => {
      return Object.entries(obj).flatMap(([key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          return getKeys(value as Record<string, unknown>, path)
        }
        return [path]
      })
    }

    const enKeys = getKeys(en).sort()
    const arKeys = getKeys(ar).sort()
    expect(enKeys).toEqual(arKeys)
  })
})
