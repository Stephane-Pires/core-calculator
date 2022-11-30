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

export type StrOperator = typeof STRING_OPERATOR[keyof typeof STRING_OPERATOR]

export const templateOperator = `\\s*[${Object.values(STRING_OPERATOR).join(
    ''
)}]\\s*`

export function isStrOperator(str: string): str is StrOperator {
    const template = `^${templateOperator}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

/*

BELOW FUNCTION OPERATORS

*/

// private, exported only to be used in operator.test.ts
export function sum(a: number, b: number) {
    return a + b
}

function substraction(a: number, b: number) {
    return a - b
}

function multiply(a: number, b: number) {
    return a * b
}

function divide(numerator: number, denominator: number) {
    return Math.round(numerator / denominator)
}

// in-source test suites
if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Calculator is able to make operations', () => {
        test('Should addition two number', () => {
            expect(sum(1, 1)).toBe(2)
        })

        test('Should substract two number', () => {
            expect(substraction(2, 1)).toBe(1)
        })

        test('Should multiply two number', () => {
            expect(multiply(10, 2)).toBe(20)
        })

        test('Should divide two number', () => {
            expect(divide(10, 2)).toBe(5)
        })

        test('Should round result', () => {
            expect(divide(100, 3)).toBe(33)
        })
    })
}

export const FUNCTION_OPERATOR = {
    PLUS: sum,
    MINUS: substraction,
    DIVIDE: divide,
    MULTIPLY: multiply,
} as const

export type FunctionOperator =
    typeof FUNCTION_OPERATOR[keyof typeof FUNCTION_OPERATOR]

function findFunctionOperator(strOperator: StrOperator) {
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
                `This operator is not valid: ${strOperator} does not belong to : (${Object.values(
                    STRING_OPERATOR
                ).join(',')}) handled by the domain`
            )
    }
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest
    describe('Calculator should be able to return the correct operation function', () => {
        test('Should return a valid operation function', () => {
            expect(findFunctionOperator(STRING_OPERATOR.PLUS)).toEqual(sum)
        })
    })

    describe('findOperator', () => {
        test('Should return a valid operation function', () => {
            expect(findFunctionOperator(STRING_OPERATOR.PLUS)).toEqual(sum)
        })

        test('Should throw when an uncorrect argument is passed', () => {
            expect(() => findFunctionOperator('%' as StrOperator)).toThrowError(
                /not valid/
            )
        })
    })
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

    const funcOperator = findFunctionOperator(str)

    return {
        type: operator,
        value: findFunctionOperator(str),
        isCommutative: isCommutative(funcOperator),
    }
}
