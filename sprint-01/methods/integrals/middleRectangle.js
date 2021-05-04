export default (f = x => x, a = 0, b = 1, N = 1_000_000) => {
    const deltX = (b - a) / N 
    let I = 0

    for (let i = a; i < b; i += deltX) {
        const x = (2 * i + deltX) / 2
        I += f(x)
    }

    return I * deltX
}
