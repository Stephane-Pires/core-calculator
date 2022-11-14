import { describe, expect, test } from 'vitest'

import compute from './computer'

describe('Compute operation correctly', () => {
    test('Should addition two number', () => {
        expect(compute('1+1')).toBe(2)
    })

    test('Should substract two number', () => {
        expect(compute('1 - 1')).toBe(0)
    })

    test('Should multiply two number', () => {
        expect(compute('1 * 7')).toBe(7)
    })

    test('Should divide two number', () => {
        expect(compute('10 /     2')).toBe(5)
    })

    test('Should add/multiply/divide/substract numbers properly', () => {
        expect(compute('10  + 2   - 1 *   3 /       3')).toBe(11)
    })
})
