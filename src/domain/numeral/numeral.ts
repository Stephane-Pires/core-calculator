const numeral = Symbol('numeral')
export const templateNumeral = `(\\d+[.|,]?)?\\d+`

export type Numeral = string & {
    __brand: typeof numeral
}

export function isNumeral(str: string): str is Numeral {
    const template = `^${templateNumeral}$`
    const regexNumber = new RegExp(template)

    return regexNumber.test(str)
}
