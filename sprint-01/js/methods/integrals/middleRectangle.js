export default (f, a, b, N) => {
    const deltX = (b - a) / N 
    let I = 0

    for (let i = a; i < b; i += deltX) {
        const x = (2 * i + deltX) / 2
        I += f(x)
    }

    return I * deltX
}
