import {
    createNumeral,
    isStrNumeral,
    numeral,
    Numeral,
    templateNumeral,
} from '../numeral/numeral'
import {
    createOperator,
    isStrOperator,
    operator,
    Operator,
    OPERATOR_SYMBOL,
    templateOperator,
} from '../operator/operator'

const arithmeticalOperaton = Symbol('arithmeticalOperation')

export type Elements = Numeral | Operator

// move in utils, or somewhere else
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

    return arithmeticalOperation.split(regexOperator).map((str) => {
        if (isStrOperator(str)) {
            return createOperator(str)
        } else if (isStrNumeral(str)) {
            return createNumeral(str)
        }
        throw new Error(
            'not valid - Unable to parse arithmetical operation, this string is not an StrOperator or a StrNumeral'
        )
    })
}

export function isArithmeticalOperation(
    str: string
): str is ArithmeticalOperation {
    const template = `^(${templateNumeral}${templateOperator})*${templateNumeral}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

export function createArithmeticalOperation(str: string) {
    if (!isArithmeticalOperation(str))
        throw new Error(
            'not valid - This string is not an Arithmetical Operation'
        )

    return str
}

export function isNumeral(element: Elements): element is Numeral {
    return element.type === numeral
}

export function isOperator(element: Elements): element is Operator {
    return element.type === operator
}
