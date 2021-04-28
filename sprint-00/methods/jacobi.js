import arrayCopy from "../utils/arrayCopy.js"

export default function jacobi(matrix, vector) {
    const determinant = arrayCopy(matrix)
    const result = []

    for (let i = 0; i < determinant.length; i++) {
        result.push(0)
    }

    let prev = result[0]

    limit: while (true) {
        for (let j = 0; j < determinant.length; j++) {
            let temp = 0
    
            for (let i = 0; i < determinant.length; i++) {
                if (j !== i) {
                    temp += determinant[j][i] * result[i]
                }
            }
    
            prev = result[j]
            result[j] = (vector[j] - temp) / determinant[j][j]
    
            if (Math.abs(prev - result[j]) < 0.00001) {
                break limit
            }
        }
    }

    return result
}
