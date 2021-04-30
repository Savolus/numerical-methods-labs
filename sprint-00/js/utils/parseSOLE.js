export default function parseSOLE(matrixElement, vectorElement) {
    const matrix = [], vector = []

    const matrixTRS = matrixElement.querySelectorAll('tr')

    matrixTRS.forEach(tr => {
        const tds = tr.querySelectorAll('td')
        const row = []

        tds.forEach(td => row.push(+td.querySelector('input').value))

        matrix.push(row)
    })

    const vectorTRS = vectorElement.querySelectorAll('tr')

    vectorTRS.forEach(tr => vector.push(+tr.querySelector('input').value))

    return [ matrix, vector ]
}
