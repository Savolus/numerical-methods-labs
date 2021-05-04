export default function dom(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;

        for (let j = 0; j < matrix[i].length; j++) {
            if (i !== j) {
                sum += Math.abs(matrix[i][j])
            }
        }

        if (sum > Math.abs(matrix[i][i])) {
            return false
        }
    }

    return true
}
