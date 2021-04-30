function minor(matrix, index) {
    const temp = []

    for (let i = 0; i < matrix.length; i++) {
        temp.push(matrix[i].slice(0))
    }

    temp.splice(0,1)

    for (let i = 0; i < temp.length; i++) {
        temp[i].splice(index, 1)
    }

    return temp
}

export default function det(matrix) {
    if (matrix.length === 2) {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0])
    }

    let answer = 0

    for (let i = 0; i < matrix.length; i++) {
        answer += ((-1) ** i) * matrix[0][i] * det(minor(matrix, i))
    }

    return answer
}
