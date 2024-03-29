import arrayCopy from "../utils/arrayCopy.js"
import dom from "../utils/dom.js"

export default function jacobi(matrix, vector) {
    const determinant = arrayCopy(matrix)
    let result = []

    if (!dom(determinant)) {
        throw new Error('ConvergenceError: Matrix are not convergence')
    }

    for (let i = 0; i < determinant.length; i++) {
        result.push(0)
    }

    limit: while (true) {
        let newResult = [...result]

        for (let j = 0; j < determinant.length; j++) {
            let temp = 0
    
            for (let i = 0; i < determinant.length; i++) {
                if (j !== i) {
                    temp += determinant[j][i] * result[i]
                }
            }
    
            const prev = newResult[j]
            newResult[j] = (vector[j] - temp) / determinant[j][j]

            if (Math.abs(prev - newResult[j]) <= 1e-10) {
                result = [...newResult]

                break limit
            }

            if (!isFinite(newResult[j])) {
                throw new Error('CalculationError: Matrix are not convergence')
            }
        }

        result = [...newResult]
    }

    return result
}
