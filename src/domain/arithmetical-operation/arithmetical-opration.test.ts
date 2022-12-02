import { describe, expect, test } from 'vitest'

import {
    createArithmeticalFormula,
    isNumeral,
    isOperator,
    isStrArithmeticalFormula,
} from './arithmetical-operation'
import { createNumeral, isStrNumeral, Numeral } from './numeral/numeral'
import { createOperator, Operator } from './operator/operator'

const mockStrArithmeticalFormula = '1+2-3/4*5'
const mockArithmeticalFormula = mockStrArithmeticalFormula
    .split('')
    .map((elem) => {
        if (isStrNumeral(elem)) {
            return createNumeral(elem)
        }
        return createOperator(elem)
    })

describe('createArithmeticalFormula', () => {
    describe('Should return an Arithmetical Formula', () => {
        test('When argument is a valid StrArithmeticalFormula ', () => {
            expect(
                createArithmeticalFormula(mockStrArithmeticalFormula)
            ).toStrictEqual(mockArithmeticalFormula)
        })
    })

    describe('Should throw', () => {
        test('When argument is an unvalid StrArithmeticalFormula ', () => {
            expect(() => createArithmeticalFormula('1+2/dsfsfds')).toThrowError(
                /not valid/
            )
        })
    })
})

describe('isStrArithmeticalFormula', () => {
    describe('Should validate', () => {
        test('When argument is a valide StrArithmeticalFormula', () => {
            expect(isStrArithmeticalFormula('1+2-3/4*5')).toBe(true)
        })

        test('When argument is a valide StrArithmeticalFormula', () => {
            expect(
                isStrArithmeticalFormula('11231 + 123123.231    +   3232 - 123')
            ).toBe(true)
        })
    })

    describe('Should unvalidate', () => {
        test('When argument is an unvalid StrArithmeticalFormula', () => {
            expect(
                isStrArithmeticalFormula('1 + 2EAZOEI / 4.3232 * 5.98897')
            ).toBe(false)
        })
    })
})

describe('isNumeral', () => {
    describe('Should validate', () => {
        test('When argument is a valide StrArithmeticalFormula', () => {
            expect(isNumeral(createNumeral('3'))).toBe(true)
        })
    })

    describe('Should unvalidate', () => {
        test('When argument is an unvalid StrArithmeticalFormula', () => {
            expect(
                isNumeral({
                    type: 'nawak',
                    value: 'avcd',
                } as unknown as Numeral)
            ).toBe(false)
        })
    })
})

describe('isOperator', () => {
    describe('Should validate', () => {
        test('When argument is a valide StrArithmeticalFormula', () => {
            expect(isOperator(createOperator('/'))).toBe(true)
        })
    })

    describe('Should unvalidate', () => {
        test('When argument is an unvalid StrArithmeticalFormula', () => {
            expect(
                isOperator({
                    type: 'nawak',
                    value: '1267',
                    isCommutative: false,
                } as unknown as Operator)
            ).toBe(false)
        })
    })
})
