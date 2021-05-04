export default (f = x => x, a = 0, b = 1, N = 1_000_000) => {
    const deltX = (b - a) / N
    let I = 0

    for (let i = a; i < b; i += deltX) {
        I += f(i) + f(i + deltX) 
    }

    return I * (deltX / 2)
}
