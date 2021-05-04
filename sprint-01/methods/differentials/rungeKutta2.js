// this is euler
const rungeKutta = (f, x, x0, y0, N) => {
    const D = (x - x0) / N
    let xi = x0, yi = y0

    for (let i = 0; i < N; i++) {
        const xl = xi, yl = yi

        xi += D
        yi += D * f(xl, yl)
    }

    return yi
}

export default (f, a, b, x0, y0, N) => {
    const results = []

    for (let i = a; i <= b; i++) {
        results.push(euler(f, i, x0, y0, N))
    }

    return results
}
