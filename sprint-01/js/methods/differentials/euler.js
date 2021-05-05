const euler = (f, x, x0, y0, N) => {
    const D = (x - x0) / N
    let xi = x0, yi = y0

    for (let i = 0; i < N; i++) {
        yi += D * f(xi, yi)
        xi += D
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
