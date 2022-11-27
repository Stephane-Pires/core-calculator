export const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
} as const

export const operator = Symbol('operator')

export type StrOperator = typeof OPERATOR[keyof typeof OPERATOR]

// TODO : simplify with  ENUM
export type FunctionOperator =
    | typeof sum
    | typeof substraction
    | typeof multiply
    | typeof divide

export type Operator = {
    type: typeof operator
    value: FunctionOperator
    isCommutative: boolean
}

export const OPERATOR_SYMBOL = Object.values(OPERATOR)

export const templateOperator = `\\s*[${OPERATOR_SYMBOL.join('')}]\\s*`

export function isStrOperator(str: string): str is StrOperator {
    const template = `^${templateOperator}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

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

// TODO to move in MATH module
export function isCommutative(f: (a: number, b: number) => number) {
    const a = 5
    const b = 12
    return f(a, b) === f(b, a)
}

export function findOperator(strOperator: StrOperator) {
    switch (strOperator) {
        case OPERATOR.PLUS:
            return sum
        case OPERATOR.DIVIDE:
            return divide
        case OPERATOR.MINUS:
            return substraction
        case OPERATOR.MULTIPLY:
            return multiply
        default:
            throw new Error(
                `This operator : ${strOperator} does not belong to the ${OPERATOR} handled by the domain`
            )
    }
}

export function createOperator(str: string): Operator {
    if (!isStrOperator(str))
        throw new Error('not valid - This string is not an StrOperator')

    const funcOperator = findOperator(str)

    return {
        type: operator,
        value: funcOperator,
        isCommutative: isCommutative(funcOperator),
    }
}
