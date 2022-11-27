import {
    ArithmeticalOperation,
    createArithmeticalOperation,
    isNumeral,
    isOperator,
    parseArithmeticalOperation,
    removeWhitespaces,
} from 'src/domain/arithmetical-operation/arithmetical-operation'
import curry from 'src/utils/curry'
import { flip, mapFunction, pipe } from 'src/utils/functional'

export function compute(arithmeticalOperation: ArithmeticalOperation) {
    const operations = parseArithmeticalOperation(arithmeticalOperation)

    // const result = operations.reduce((acc, elem, index, array) => {
    //     if (isStrOperator(elem)) {
    //         return findOperator(elem)(acc, Number(array[index + 1]))
    //     }
    //     return acc
    // }, Number(operations[0]))

    const operators = operations.filter(isOperator).map((operator) => {
        if (!operator.isCommutative) {
            return flip(operator.value)
        }
        return operator.value
    }) // n - 2
    const numerals = operations
        .filter(isNumeral)
        .map((numeral) => numeral.value) // n

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

export function validate(str: string) {
    const strWithRemovedWhitespaces = removeWhitespaces(str)
    return createArithmeticalOperation(strWithRemovedWhitespaces)
}

export function run(str: string) {
    compute(validate(str))
}
