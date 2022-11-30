export default function isCommutative(f: (a: number, b: number) => number) {
    const a = 5
    const b = -12
    return f(a, b) === f(b, a)
}
