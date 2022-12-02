import { describe, expect, test } from 'vitest'

import isCommutative from './math'

describe('isCommutative', () => {
    describe('Should return true', () => {
        test('When passing a function that is commutative', () => {
            expect(isCommutative((a, b) => a + b)).toBe(true)
        })

        describe('Should return false', () => {
            test('When passing a function that is NOT commutative', () => {
                expect(isCommutative((a, b) => a - b)).toBe(false)
            })
        })
    })
})
