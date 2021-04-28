export default function test(matrix, vector, results) {
    for (let i = 0; i < matrix.length; i++) {
        let result = 0

        for (let j = 0; j < matrix.length; j++) {
            result += matrix[i][j] * results[j]
        }

        if (Math.abs(vector[i] - result) > 0.00001) {
            return false
        }
    }

    return true
}
