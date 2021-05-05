const euler = (f, x, x0, y0, N) => {
    const D = (x - x0) / N
    let xi = x0, yi = y0

    for (let i = 0; i < N; i++) {
        yi += D * f(xi, yi)
        xi += D
    }

    return yi
}

export default (f, a, b, y0, N) => {
    const results = []
    const h = (b - a) / N

    for (let i = a + h; i <= b; i += h) {
        results.push(euler(f, i, a, y0, N))
    }

    return results
}
