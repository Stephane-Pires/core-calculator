import { describe, expect, test } from 'vitest'

import { createNumeral, isStrNumeral } from '../numeral/numeral'
import { createOperator } from '../operator/operator'
import {
    ArithmeticalOperation,
    isArithmeticalOperation,
    parseArithmeticalOperation,
    removeWhitespaces,
} from './arithmetical-operation'

const mockStrArithmeticalOperation = '1+2-3/4*5' as ArithmeticalOperation
const mockArithmeticalOperation = mockStrArithmeticalOperation
    .split('')
    .map((elem) => {
        if (isStrNumeral(elem)) {
            return createNumeral(elem)
        }
        return createOperator(elem)
    })

describe('Validate string', () => {
    test('Should remove all whitespaces', () => {
        expect(removeWhitespaces('   1 + 2 - 3 / 4 *   5')).toBe('1+2-3/4*5')
    })

    test('Should split string into number and operators', () => {
        expect(
            parseArithmeticalOperation(mockStrArithmeticalOperation)
        ).toStrictEqual(mockArithmeticalOperation)
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
