import { describe, expect, test } from 'vitest'

import {
    createOperator,
    isStrOperator,
    operator,
    Operator,
    STRING_OPERATOR,
    sum,
} from './operator'

describe('StrOperator', () => {
    describe('Validation', () => {
        test('Should validate operator', () => {
            expect(isStrOperator('+')).toBe(true)
        })

        test('Should validate decimal number (with a comma)', () => {
            expect(isStrOperator('-')).toBe(true)
        })

        test('Should validate decimal number (with a point)', () => {
            expect(isStrOperator('/')).toBe(true)
        })

        test('Should validate number with trailing zeros', () => {
            expect(isStrOperator('*')).toBe(true)
        })
    })
    describe('Reject', () => {
        test('Should reject unvalide number', () => {
            expect(isStrOperator('++')).toBe(false)
        })

        test('Should reject unvalide number', () => {
            expect(isStrOperator('--')).toBe(false)
        })
    })
})

describe('createOperator', () => {
    const MOCK_OPERATOR: Operator = {
        isCommutative: true,
        value: sum,
        type: operator,
    }

    test('Should return a valid Operator', () => {
        expect(createOperator(STRING_OPERATOR.PLUS)).toEqual(MOCK_OPERATOR)
    })

    test('Should throw when an uncorrect argument is passed', () => {
        expect(() => createOperator('%')).toThrowError(/not valid/)
    })
})
