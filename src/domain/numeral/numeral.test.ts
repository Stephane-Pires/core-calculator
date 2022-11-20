import { describe, expect, test } from 'vitest'

import { isNumeral } from './numeral'

describe('Number', () => {
    describe('Validation', () => {
        test('Should validate whole number', () => {
            expect(isNumeral('12342')).toBe(true)
        })

        test('Should validate decimal number (with a comma)', () => {
            expect(isNumeral('12342,46')).toBe(true)
        })

        test('Should validate decimal number (with a point)', () => {
            expect(isNumeral('12342.46')).toBe(true)
        })

        test('Should validate number with trailing zeros', () => {
            expect(isNumeral('000012342')).toBe(true)
        })
    })
    describe('Reject', () => {
        test('Should reject unvalide number', () => {
            expect(isNumeral('12342,,46')).toBe(false)
        })

        test('Should reject unvalide number', () => {
            expect(isNumeral('this is not a number')).toBe(false)
        })
    })
})
