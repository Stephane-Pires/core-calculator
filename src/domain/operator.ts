export const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
} as const

export type Operator = typeof OPERATOR[keyof typeof OPERATOR]

export const OPERATOR_SYMBOL = Object.values(OPERATOR)

const numeral = Symbol('numeral')

export type Numeral = string & {
    __brand: typeof numeral
}

const arithmeticalOperaton = Symbol('arithmeticalOperation')

export type ArithmeticalOperation = string & {
    __brand: typeof arithmeticalOperaton
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

export function findOperator(operator: Operator) {
    switch (operator) {
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
                `This operator : ${operator} does not belong to the ${OPERATOR} handled by the domain`
            )
    }
}
