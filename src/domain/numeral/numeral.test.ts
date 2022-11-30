import { describe, expect, test } from 'vitest'

import { createNumeral, isStrNumeral, numeral, Numeral } from './numeral'

describe('isStrNumeral', () => {
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

describe('createNumeral', () => {
    const MOCK_NUMERAL: Numeral = {
        value: 123,
        type: numeral,
    }

    test('Should return a valid Operator', () => {
        expect(createNumeral('123')).toEqual(MOCK_NUMERAL)
    })

    test('Should throw when an uncorrect argument is passed', () => {
        expect(() => createNumeral('123/2313')).toThrowError(/not valid/)
    })
})
