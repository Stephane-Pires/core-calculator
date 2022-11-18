import { findOperator } from '../domain/operator'
import { isOperator, isValid, splitString } from '../parser/parser'

function compute(str: string) {
    if (!isValid(str)) throw new Error('This string is not valid')

    const operations = splitString(str)

    const result = operations.reduce((acc, elem, index, array) => {
        if (isOperator(elem)) {
            return findOperator(elem)(acc, Number(array[index + 1]))
        }
        return acc
    }, Number(operations[0]))

    return result
}

export default compute
