import {
    ArithmeticalFormula,
    createArithmeticalFormula,
    isNumeral,
    isOperator,
    removeWhitespaces,
} from 'src/domain/arithmetical-operation/arithmetical-operation'
import curry from 'src/utils/curry'
import { flip, mapFunction, pipe } from 'src/utils/functional'

function calculate(formula: ArithmeticalFormula) {
    // const result = operations.reduce((acc, elem, index, array) => {
    //     if (isStrOperator(elem)) {
    //         return findOperator(elem)(acc, Number(array[index + 1]))
    //     }
    //     return acc
    // }, Number(operations[0]))

    const operators = formula.filter(isOperator).map((operator) => {
        if (!operator.isCommutative) {
            return flip(operator.value)
        }
        return operator.value
    }) // n - 2
    const numerals = formula.filter(isNumeral).map((numeral) => numeral.value) // n

    const firstNumeral = numerals.shift()

    const curriedOperators = operators.map((operator) => curry(operator))
    const partialApplication = mapFunction(numerals, curriedOperators)

    const result = pipe(firstNumeral, partialApplication)

    // 1 + 2 + 3 + 4
    // 2 3 4
    // + + +

    // add(2), add(3), add(4)

    // add(2)(1), add(3)(3), add(4)(6) = 10

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
