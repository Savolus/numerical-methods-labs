const rungeKutta2 = (f, x, x0, y0, N) => {
    const H = (x - x0) / N
    let xi = x0, yi = y0

    for (let i = 0; i < N; i++) {
        const k1 = f(xi, yi)
        const k2 = f(xi + H / 2, yi + H * k1 / 2)

        yi += H * (k1 + 2 * k2) / 6
        xi += H
    }

    return yi
}

export default (f, a, b, x0, y0, N) => {
    const results = []

    for (let i = a; i <= b; i++) {
        results.push(rungeKutta2(f, i, x0, y0, N))
    }

    return results
}