export default (f = x => x, a = 0, b = 1, N = 1_000_000) => {
    if (N % 2 !== 0) {
        throw new Error('CalculationError: N should be even')
    }
    
    const deltX = (b - a) / N
    let I = f(a) + f(b)

    let mult = 4

    for (let i = a + deltX; i < b; i += deltX) {
        I += mult * f(i)

        if (mult === 4) {
            mult = 2
        } else {
            mult = 4
        }
    }

    return I * (deltX / 3)
}
