import {
    ArithmeticalOperation,
    Numeral,
    Operator,
    OPERATOR_SYMBOL,
} from '../domain/operator'

const templateNumber = `(\\d+[.|,]?)?\\d+`
const templateOperator = `\\s*[${OPERATOR_SYMBOL.join('')}]\\s*`

export function removeWhitespaces(str: string) {
    return str.replace(/\s+/g, '')
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

export function isNumeral(str: string): str is Numeral {
    const template = `^${templateNumber}$`
    const regexNumber = new RegExp(template)

    return regexNumber.test(str)
}

export function isOperator(str: string): str is Operator {
    const template = `^${templateOperator}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

export function isArithmeticalOperation(
    str: string
): str is ArithmeticalOperation {
    const template = `^(${templateNumber}${templateOperator})*${templateNumber}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}
