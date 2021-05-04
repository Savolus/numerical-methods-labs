const integrals = {
    f1: x => Math.exp(-x),
    f2: x => Math.sin(x),
    f3: x => Math.exp(-(x ** 2)),
    f4: x => Math.exp(-4 * x - x ** 3)
}

const differentials = {
    f1: (x, y) => -x * y,
    f2: (x, y) => x + y,
    f3: (x, y) => (3 * x - 12 * x ** 2) * y
}

export {
    integrals,
    differentials
}
