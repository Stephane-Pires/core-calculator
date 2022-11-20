import { findOperator } from '../domain/operator'
import {
    isArithmeticalOperation,
    isOperator,
    parseArithmeticalOperation,
} from '../parser/parser'

function compute(str: string) {
    if (!isArithmeticalOperation(str))
        throw new Error('This string is not valid')

    const operations = parseArithmeticalOperation(str)

    const result = operations.reduce((acc, elem, index, array) => {
        if (isOperator(elem)) {
            return findOperator(elem)(acc, Number(array[index + 1]))
        }
        return acc
    }, Number(operations[0]))

    return result
}

export default compute
