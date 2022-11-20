import { isArithmeticalOperation } from 'src/parser/parser'
import { describe, expect, test } from 'vitest'

import { compute, validate } from './computer'

const arrayOfNumeralOperation = [
    '1+1',
    '1-1',
    '1 * 7',
    '10 /      2',
    '10  + 2  - 1   * 3 /    3',
].map((str) => {
    if (isArithmeticalOperation(str)) {
        return str
    }
    throw new Error('This string is not an Arithmetical Operation')
})

describe('Compute operation correctly', () => {
    test('Should addition two number', () => {
        expect(compute(arrayOfNumeralOperation[0])).toBe(2)
    })

    test('Should substract two number', () => {
        expect(compute(arrayOfNumeralOperation[1])).toBe(0)
    })

    test('Should multiply two number', () => {
        expect(compute(arrayOfNumeralOperation[2])).toBe(7)
    })

    test('Should divide two number', () => {
        expect(compute(arrayOfNumeralOperation[3])).toBe(5)
    })

    test('Should add/multiply/divide/substract numbers properly', () => {
        expect(compute(arrayOfNumeralOperation[4])).toBe(11)
    })
})

describe('Throw an error if input is incorrect', () => {
    test('Should throw', () => {
        expect(() => validate('lkdjvdlfjslkj')).toThrowError(/not valid/)
    })
})
