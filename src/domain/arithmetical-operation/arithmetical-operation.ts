import {
    createNumeral,
    isStrNumeral,
    numeral,
    Numeral,
    templateNumeral,
} from './numeral/numeral'
import {
    createOperator,
    isStrOperator,
    operator,
    Operator,
    STRING_OPERATOR,
    templateOperator,
} from './operator/operator'

const arithmeticalFormula = Symbol('arithmeticalFormula')

export type ArithmeticalElement = Numeral | Operator
export type ArithmeticalFormula = Array<Numeral | Operator>

// move in utils, or somewhere else
export function removeWhitespaces(str: string) {
    return str.replace(/\s+/g, '')
}

export type StrArithmeticalFormula = string & {
    __brand: typeof arithmeticalFormula
}

function parseArithmeticalFormula(
    formula: StrArithmeticalFormula
): ArithmeticalFormula {
    const template = `([${Object.values(STRING_OPERATOR).join('')}])`
    const regexOperator = new RegExp(template)

    return formula.split(regexOperator).map((element) => {
        if (isStrOperator(element)) {
            return createOperator(element)
        } else if (isStrNumeral(element)) {
            return createNumeral(element)
        }
        throw new Error(
            'not valid - Unable to parse arithmetical formula, this arithmetical element is not an StrOperator or a StrNumeral'
        )
    })
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest

    const STR_FORMULA = '1+4/6'

    const MOCK_ARITHMETICAL_FORMULA = STR_FORMULA.split('').map((elem) => {
        if (isStrOperator(elem)) {
            return createOperator(elem)
        } else if (isStrNumeral(elem)) {
            return createNumeral(elem)
        }
        throw new Error('not valid')
    })

    describe('parseArithmeticalFormula', () => {
        test('Should return a valid ArithmeticalFormula', () => {
            expect(
                parseArithmeticalFormula(STR_FORMULA as StrArithmeticalFormula)
            ).toEqual(MOCK_ARITHMETICAL_FORMULA)
        })

        test('Should throw when an uncorrect argument is passed', () => {
            expect(() =>
                parseArithmeticalFormula('ZIOAEJIEAJ' as StrArithmeticalFormula)
            ).toThrowError(/not valid/)
        })
    })
}

export function isStrArithmeticalFormula(
    str: string
): str is StrArithmeticalFormula {
    const template = `^(${templateNumeral}${templateOperator})*${templateNumeral}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

export function createArithmeticalFormula(str: string) {
    if (!isStrArithmeticalFormula(str))
        throw new Error(
            'not valid - This string is not an Arithmetical Formula'
        )

    return parseArithmeticalFormula(str)
}

export function isNumeral(element: ArithmeticalElement): element is Numeral {
    return element.type === numeral
}

export function isOperator(element: ArithmeticalElement): element is Operator {
    return element.type === operator
}
