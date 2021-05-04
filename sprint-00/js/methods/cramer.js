import arrayCopy from "../utils/arrayCopy.js"
import det from "../utils/det.js"

export default function cramer(matrix, vector) {
    const determinant = det(matrix)

    if (determinant === 0) {
        throw new Error('CalculationError: Determinant is equal to 0')
    }

    if (matrix.length > 3) {
        throw new Error('OptimizationError: Determinant size is more than 3')
    }

    const determinants = []

    let matrix_i = arrayCopy(matrix)

    for (let column = 0; column < matrix.length; column++) {
        for (let row = 0; row < matrix.length; row++) {
            matrix_i[row][column] = vector[row]
        }

        determinants.push(det(matrix_i))

        matrix_i = arrayCopy(matrix)
    }

    return determinants.map(determinant_i => determinant_i / determinant)
}
