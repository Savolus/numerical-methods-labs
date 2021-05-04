export default (f, a, b, N) => {
    const deltX = (b - a) / N
    let I = 0

    for (let i = a; i < b; i += deltX) {
        I += f(i) + f(i + deltX) 
    }

    return I * (deltX / 2)
}
