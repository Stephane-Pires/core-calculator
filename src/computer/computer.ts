import {
    ArithmeticalFormula,
    createArithmeticalFormula,
    isNumeral,
    isOperator,
} from 'src/domain/arithmetical-operation/arithmetical-operation'
import curry from 'src/utils/curry'
import { flip, mapFunction, pipe } from 'src/utils/functional'
import removeWhitespaces from 'src/utils/string'

function calculate(formula: ArithmeticalFormula) {
    const operators = formula.filter(isOperator).map((operator) => {
        if (!operator.isCommutative) {
            return flip(operator.value)
        }
        return operator.value
    })
    const numerals = formula.filter(isNumeral).map((numeral) => numeral.value)

    const firstNumeral = numerals.shift()

    const partialApplication = mapFunction(
        numerals,
        operators.map((operator) => curry(operator))
    )

    const result = pipe(firstNumeral, partialApplication)

    return result
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest

    describe('calculate', () => {
        test('Should calculate correctly ArithmeticalFormula', () => {
            expect(calculate(createArithmeticalFormula('1+2+3+4-5'))).toBe(5)
        })
    })
}

function validate(str: string) {
    const strWithRemovedWhitespaces = removeWhitespaces(str)

    return createArithmeticalFormula(strWithRemovedWhitespaces)
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Throw an error if input is incorrect', () => {
        test('Should throw', () => {
            expect(() => validate('lkdjvdlfjslkj')).toThrowError(/not valid/)
        })
    })
}

export default function compute(str: string) {
    return calculate(validate(str))
}
