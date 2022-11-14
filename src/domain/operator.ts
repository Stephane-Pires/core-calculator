export const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
} as const

// generate type keyof type of OPERATOR

export const OPERATOR_SYMBOL = Object.values(OPERATOR)

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

export function findOperator(operator: string) {
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
