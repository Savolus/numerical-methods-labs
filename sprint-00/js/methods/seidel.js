import arrayCopy from "../utils/arrayCopy.js"
import dom from "../utils/dom.js"

export default function seidel(matrix, vector) {
    const determinant = arrayCopy(matrix)
    const result = []

    if (!dom(determinant)) {
        throw new Error('ConvergenceError: Matrix are not convergence')
    }

    for (let i = 0; i < determinant.length; i++) {
        result.push(0)
    }

    limit: while (true) {
        for (let j = 0; j < determinant.length; j++) {
            let temp = 0
    
            for (let i = 0; i < determinant.length; i++) {
                if (j !== i) {
                    temp += determinant[j][i] * result[i]
                }
            }
    
            const prev = result[j]
            result[j] = (vector[j] - temp) / determinant[j][j]

            if (Math.abs(prev - result[j]) <= 1e-10) {
                break limit
            }

            if (!isFinite(result[j])) {
                throw new Error('CalculationError: Matrix are not convergence')
            }
        }
    }

    return result
}
