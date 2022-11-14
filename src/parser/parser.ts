import { OPERATOR_SYMBOL } from '../domain/operator'

const templateNumber = `(\\d+[.|,]?)?\\d+`
const templateOperator = `\\s*[${OPERATOR_SYMBOL.join('')}]\\s*`

export function removeWhitespaces(str: string) {
    return str.replace(/\s+/g, '')
}

export function splitString(str: string) {
    const template = `([${OPERATOR_SYMBOL.join('')}])`
    const regexOperator = new RegExp(template)

    return str.split(regexOperator)
}

export function isNumber(str: string) {
    const template = `^${templateNumber}$`
    const regexNumber = new RegExp(template)

    return regexNumber.test(str)
}

// TODO str :  string pourrait être operator "+" | "-" | "*" | "/"
export function isOperator(str: string) {
    const template = `^${templateOperator}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}

export function isValid(str: string) {
    const template = `^(${templateNumber}${templateOperator})*${templateNumber}$`
    const regexOperator = new RegExp(template, 'g')

    return regexOperator.test(str)
}
