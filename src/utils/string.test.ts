import { describe, expect, test } from 'vitest'

import removeWhitespaces from './string'

describe('removeWhitespaces', () => {
    describe('Should return a string without whitespaces', () => {
        test('When passing a string', () => {
            expect(removeWhitespaces('a b c d e')).toBe('abcde')
        })
    })
})
