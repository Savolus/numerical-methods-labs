import arrayCopy from "../utils/arrayCopy.js"

export default function jordan(matrix, vector) {
    const extended = arrayCopy(matrix)

    for (let i = 0; i < extended.length; i++) {
        extended[i].push(vector[i])
    }

    for (let i = 0; i < extended.length; i++) {
        let maxEmenet = Math.abs(extended[i][i])
        let maxRow = i

        for (let k = i + 1; k < extended.length; k++) {
            const currentElement = Math.abs(extended[k][i])

            if (currentElement > maxEmenet) {
                maxEmenet = currentElement
                maxRow = k
            }
        }

        for (let k = i; k < extended.length + 1; k++) {
            const temp = extended[maxRow][k]
            extended[maxRow][k] = extended[i][k]
            extended[i][k] = temp
        }

        for (let k = i + 1; k < extended.length; k++) {
            const current = -extended[k][i] / extended[i][i]

            for (let j = i; j < extended.length + 1; j++) {
                if (i === j) {
                    extended[k][j] = 0
                    continue
                }

                extended[k][j] += current * extended[i][j]
            }
        }
    }

    for (let i = extended.length - 1; i > -1; i--) {
        for (let k = extended[i].length - 1; k > -1; k--) {
            extended[i][k] /= extended[i][i]
        }

        for (let k = i - 1; k > -1; k--) {
            const current = -extended[k][i] / extended[i][i]

            for (let j = extended[k].length - 1; j > -1; j--) {
                extended[k][j] += current * extended[i][j]
            }
        }
    }

    const result = []

    for (let i = 0; i < extended.length; i++) {
        result.push(0)
    }

    for (let i = extended.length - 1; i > -1; i--) {
        result[i] = extended[i][extended.length] / extended[i][i]

        for (let k = i - 1; k > -1; k--) {
            extended[k][extended.length] -= extended[k][i] * result[i]
        }
    }

    return result
}
