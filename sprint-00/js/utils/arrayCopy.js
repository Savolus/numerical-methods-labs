export default function arrayCopy(array) {
    const copy = []

    for (const value of array) {
        copy.push(value instanceof Array ? arrayCopy(value) : value)
    }

    return copy
}
