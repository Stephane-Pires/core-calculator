import { describe, expect, test } from 'vitest'

import compute from './computer'

const ARRAY_OF_ARITHMETICAL_FORMULA = [
    '1+1',
    '1-2',
    '1*7',
    '10/2',
    '10+2-1*3/3',
]

describe('Compute operation correctly', () => {
    test('Should addition two number', () => {
        expect(compute(ARRAY_OF_ARITHMETICAL_FORMULA[0])).toBe(2)
    })

    test('Should substract two number', () => {
        expect(compute(ARRAY_OF_ARITHMETICAL_FORMULA[1])).toBe(-1)
    })

    test('Should multiply two number', () => {
        expect(compute(ARRAY_OF_ARITHMETICAL_FORMULA[2])).toBe(7)
    })

    test('Should divide two number', () => {
        expect(compute(ARRAY_OF_ARITHMETICAL_FORMULA[3])).toBe(5)
    })

    test('Should add/multiply/divide/substract numbers properly', () => {
        expect(compute(ARRAY_OF_ARITHMETICAL_FORMULA[4])).toBe(11)
    })
})
