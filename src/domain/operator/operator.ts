import isCommutative from 'src/utils/math'

/*

BELOW OPERATORS THAT OPERATES ON STRING

*/

export const STRING_OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
} as const

export const OPERATOR_SYMBOL = Object.values(STRING_OPERATOR)

export type StrOperator = typeof STRING_OPERATOR[keyof typeof STRING_OPERATOR]

export const templateOperator = `\\s*[${OPERATOR_SYMBOL.join('')}]\\s*`

export function isStrOperator(str: string): str is StrOperator {
    const template = `^${templateOperator}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

/*

BELOW FUNCTION OPERATORS

*/

export function sum(a: number, b: number) {
    return a + b
}

export function substraction(a: number, b: number) {
    return a - b
}

export function multiply(a: number, b: number) {
    return a * b
}

export function divide(numerator: number, denominator: number) {
    return Math.round(numerator / denominator)
}

export const FUNCTION_OPERATOR = {
    PLUS: sum,
    MINUS: substraction,
    DIVIDE: divide,
    MULTIPLY: multiply,
} as const

export type FunctionOperator =
    typeof FUNCTION_OPERATOR[keyof typeof FUNCTION_OPERATOR]

export function findOperator(strOperator: StrOperator) {
    switch (strOperator) {
        case STRING_OPERATOR.PLUS:
            return sum
        case STRING_OPERATOR.DIVIDE:
            return divide
        case STRING_OPERATOR.MINUS:
            return substraction
        case STRING_OPERATOR.MULTIPLY:
            return multiply
        default:
            throw new Error(
                `This operator is not valid: ${strOperator} does not belong to the OPERATOR_SYMBOL : (${OPERATOR_SYMBOL.join(
                    ','
                )}) handled by the domain`
            )
    }
}

/*

BELOW OPERATORS

*/

export const operator = Symbol('operator')

export type Operator = {
    type: typeof operator
    value: FunctionOperator
    isCommutative: boolean
}

export function createOperator(str: string): Operator {
    if (!isStrOperator(str))
        throw new Error('not valid - This string is not an StrOperator')

    const funcOperator = findOperator(str)

    return {
        type: operator,
        value: findOperator(str),
        isCommutative: isCommutative(funcOperator),
    }
}
