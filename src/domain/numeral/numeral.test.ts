import { describe, expect, test } from 'vitest'

import { isStrNumeral } from './numeral'

describe('Number', () => {
    describe('Validation', () => {
        test('Should validate whole number', () => {
            expect(isStrNumeral('12342')).toBe(true)
        })

        test('Should validate decimal number (with a comma)', () => {
            expect(isStrNumeral('12342,46')).toBe(true)
        })

        test('Should validate decimal number (with a point)', () => {
            expect(isStrNumeral('12342.46')).toBe(true)
        })

        test('Should validate number with trailing zeros', () => {
            expect(isStrNumeral('000012342')).toBe(true)
        })
    })
    describe('Reject', () => {
        test('Should reject unvalide number', () => {
            expect(isStrNumeral('12342,,46')).toBe(false)
        })

        test('Should reject unvalide number', () => {
            expect(isStrNumeral('this is not a number')).toBe(false)
        })
    })
})
