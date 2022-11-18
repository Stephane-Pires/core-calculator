import { describe, expect, test } from 'vitest'

import {
    divide,
    findOperator,
    multiply,
    OPERATOR,
    substraction,
    sum,
} from './operator'

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
        expect(findOperator(OPERATOR.PLUS)).toEqual(sum)
    })
})
