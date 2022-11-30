import { describe, expect, test } from 'vitest'

import {
    createOperator,
    divide,
    findOperator,
    isStrOperator,
    multiply,
    operator,
    Operator,
    STRING_OPERATOR,
    StrOperator,
    substraction,
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

describe('Calculator is able to make operations', () => {
    test('Should addition two number', () => {
        expect(sum(1, 1)).toBe(2)
    })

    test('Should substract two number', () => {
        expect(substraction(2, 1)).toBe(1)
    })

    test('Should multiply two number', () => {
        expect(multiply(10, 2)).toBe(20)
    })

    test('Should divide two number', () => {
        expect(divide(10, 2)).toBe(5)
    })

    test('Should round result', () => {
        expect(divide(100, 3)).toBe(33)
    })
})

describe('Calculator should be able to return the correct operation function', () => {
    test('Should return a valid operation function', () => {
        expect(findOperator(STRING_OPERATOR.PLUS)).toEqual(sum)
    })
})
describe('Calculator is able to make operations', () => {
    test('Should addition two number', () => {
        expect(sum(1, 1)).toBe(2)
    })

    test('Should substract two number', () => {
        expect(substraction(2, 1)).toBe(1)
    })

    test('Should multiply two number', () => {
        expect(multiply(10, 2)).toBe(20)
    })

    test('Should divide two number', () => {
        expect(divide(10, 2)).toBe(5)
    })

    test('Should round result', () => {
        expect(divide(100, 3)).toBe(33)
    })
})

describe('findOperator', () => {
    test('Should return a valid operation function', () => {
        expect(findOperator(STRING_OPERATOR.PLUS)).toEqual(sum)
    })

    test('Should throw when an uncorrect argument is passed', () => {
        expect(() => findOperator('%' as StrOperator)).toThrowError(/not valid/)
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
