import { describe, expect, test } from 'vitest'

import {
    ArithmeticalOperation,
    isArithmeticalOperation,
    parseArithmeticalOperation,
    removeWhitespaces,
} from './arithmetical-operation'

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
