import { Numeral, templateNumeral } from '../numeral/numeral'
import {
    Operator,
    OPERATOR_SYMBOL,
    templateOperator,
} from '../operator/operator'

const arithmeticalOperaton = Symbol('arithmeticalOperation')

export function removeWhitespaces(str: string) {
    return str.replace(/\s+/g, '')
}

export type ArithmeticalOperation = string & {
    __brand: typeof arithmeticalOperaton
}

export function parseArithmeticalOperation(
    arithmeticalOperation: ArithmeticalOperation
) {
    const template = `([${OPERATOR_SYMBOL.join('')}])`
    const regexOperator = new RegExp(template)

    return arithmeticalOperation.split(regexOperator) as Array<
        Numeral | Operator
    >
}

export function isArithmeticalOperation(
    str: string
): str is ArithmeticalOperation {
    const template = `^(${templateNumeral}${templateOperator})*${templateNumeral}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}
