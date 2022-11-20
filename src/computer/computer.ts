import { ArithmeticalOperation, findOperator } from '../domain/operator'
import {
    isArithmeticalOperation,
    isOperator,
    parseArithmeticalOperation,
    removeWhitespaces,
} from '../parser/parser'

export function compute(arithmeticalOperation: ArithmeticalOperation) {
    const operations = parseArithmeticalOperation(arithmeticalOperation)

    const result = operations.reduce((acc, elem, index, array) => {
        if (isOperator(elem)) {
            return findOperator(elem)(acc, Number(array[index + 1]))
        }
        return acc
    }, Number(operations[0]))

    return result
}

export function validate(str: string) {
    const strWithRemovedWhitespaces = removeWhitespaces(str)

    if (isArithmeticalOperation(strWithRemovedWhitespaces))
        return strWithRemovedWhitespaces
    throw new Error('This string is not valid Arithmetical Operation')
}

export function run(str: string) {
    compute(validate(str))
}
