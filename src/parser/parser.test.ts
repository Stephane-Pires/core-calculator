import { describe, expect, test } from 'vitest'

import {
    isNumber,
    isOperator,
    isValid,
    removeWhitespaces,
    splitString,
} from './parser'

describe('Validate string', () => {
    test('Should remove all whitespaces', () => {
        expect(removeWhitespaces('   1 + 2 - 3 / 4 *   5')).toBe('1+2-3/4*5')
    })

    test('Should split string into number and operators', () => {
        expect(splitString('1+2-3/4*5')).toStrictEqual([
            '1',
            '+',
            '2',
            '-',
            '3',
            '/',
            '4',
            '*',
            '5',
        ])
    })

    test('Should globally validate string input', () => {
        expect(isValid('1+2-3/4*5')).toBe(true)
    })

    test('Should globally validate string input', () => {
        expect(isValid('11231 + 123123    +   3232 - 123')).toBe(true)
    })

    test('Should globally validate string input', () => {
        expect(isValid('1 + 22 - 33 / 4.3232 * 5.98897')).toBe(true)
    })
})

describe('Number', () => {
    describe('Validation', () => {
        test('Should validate whole number', () => {
            expect(isNumber('12342')).toBe(true)
        })

        test('Should validate decimal number (with a comma)', () => {
            expect(isNumber('12342,46')).toBe(true)
        })

        test('Should validate decimal number (with a point)', () => {
            expect(isNumber('12342.46')).toBe(true)
        })

        test('Should validate number with trailing zeros', () => {
            expect(isNumber('000012342')).toBe(true)
        })
    })
    describe('Reject', () => {
        test('Should reject unvalide number', () => {
            expect(isNumber('12342,,46')).toBe(false)
        })

        test('Should reject unvalide number', () => {
            expect(isNumber('this is not a number')).toBe(false)
        })
    })
})

describe('Operator', () => {
    describe('Validation', () => {
        test('Should validate operator', () => {
            expect(isOperator('+')).toBe(true)
        })

        test('Should validate decimal number (with a comma)', () => {
            expect(isOperator('-')).toBe(true)
        })

        test('Should validate decimal number (with a point)', () => {
            expect(isOperator('/')).toBe(true)
        })

        test('Should validate number with trailing zeros', () => {
            expect(isOperator('*')).toBe(true)
        })
    })
    describe('Reject', () => {
        test('Should reject unvalide number', () => {
            expect(isOperator('++')).toBe(false)
        })

        test('Should reject unvalide number', () => {
            expect(isOperator('--')).toBe(false)
        })
    })
})
