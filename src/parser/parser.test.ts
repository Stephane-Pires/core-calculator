import { ArithmeticalOperation } from 'src/domain/operator'
import { describe, expect, test } from 'vitest'

import {
    isArithmeticalOperation,
    isNumeral,
    isOperator,
    parseArithmeticalOperation,
    removeWhitespaces,
} from './parser'

const mockArithmeticalOperation = '1+2-3/4*5' as ArithmeticalOperation

describe('Validate string', () => {
    test('Should remove all whitespaces', () => {
        expect(removeWhitespaces('   1 + 2 - 3 / 4 *   5')).toBe('1+2-3/4*5')
    })

    test('Should split string into number and operators', () => {
        expect(
            parseArithmeticalOperation(mockArithmeticalOperation)
        ).toStrictEqual(['1', '+', '2', '-', '3', '/', '4', '*', '5'])
    })

    test('Should globally validate string input', () => {
        expect(isArithmeticalOperation('1+2-3/4*5')).toBe(true)
    })

    test('Should globally validate string input', () => {
        expect(
            isArithmeticalOperation('11231 + 123123    +   3232 - 123')
        ).toBe(true)
    })

    test('Should globally validate string input', () => {
        expect(isArithmeticalOperation('1 + 22 - 33 / 4.3232 * 5.98897')).toBe(
            true
        )
    })
})

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
