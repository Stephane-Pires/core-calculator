export const numeral = Symbol('numeral')
export const templateNumeral = `(\\d+[.|,]?)?\\d+`

export type StrNumeral = string & {
    __brand: typeof numeral
}

export interface Numeral {
    type: typeof numeral
    value: number
}

export function isStrNumeral(str: string): str is StrNumeral {
    const template = `^${templateNumeral}$`
    const regexNumber = new RegExp(template)

    return regexNumber.test(str)
}

export function createNumeral(str: string): Numeral {
    if (!isStrNumeral(str))
        throw new Error('not valid - This string is not a StrNumeral')

    return {
        type: numeral,
        value: Number(str),
    }
}
