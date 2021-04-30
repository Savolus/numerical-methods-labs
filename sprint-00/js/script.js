import cramer from './methods/cramer.js'
import gauss from './methods/gauss.js'
import seidel from './methods/seidel.js'
import jordan from './methods/jordan.js'
import jacobi from './methods/jacobi.js'
import test from './utils/test.js'
import invertible from './utils/invertible.js'
import parseSOLE from './utils/parseSOLE.js'

const sizeElement = document.querySelector('#sole-size')
const methodElement = document.querySelector('#sole-method')
const fileElement = document.querySelector('#sole-file')
const calculateElement = document.querySelector('.calculate-button')
const answerElement = document.querySelector('.answer')

const matrixElement = document.querySelector('tbody[data-matrix]')
const vectorElement = document.querySelector('tbody[data-vector]')
const answerVectorElement = document.querySelector('tbody[data-answer-vector]')

const matrix = []
const vector = []

let method = null

function renderSOLE(size, matrix = null, vector = null) {
    answerVectorElement.innerHTML = ''
    answerElement.style.display = 'none'
    matrixElement.innerHTML = ''
    vectorElement.innerHTML = ''
    sizeElement.value = size
    method = methodElement.value
    
    // matrix render
    for (let row = 0; row < size; row++) {
        const tr = document.createElement('tr')

        for (let column = 0; column < size; column++) {
            const td = document.createElement('td')
            const input = document.createElement('input')

            input.type = 'number'
            input.value = matrix ? matrix[row][column] : 0

            td.appendChild(input)
            tr.appendChild(td)
        }

        matrixElement.appendChild(tr)
    }

    // vector render
    for (let row = 0; row < size; row++) {
        const tr = document.createElement('tr')
        const td = document.createElement('td')
        const input = document.createElement('input')

        input.type = 'number'
        input.value = vector ? vector[row] : 0

        td.appendChild(input)
        tr.appendChild(td)
        vectorElement.appendChild(tr)
    }
}

sizeElement.addEventListener('change', event => {
    renderSOLE(event.target.value)
})

methodElement.addEventListener('change', event => {
    method = event.target.value

    if (answerElement.style.display !== 'none') {
        calculateElement.click()
    }
})

fileElement.addEventListener('change', event => {
    const file = event.target.files[0]
    const reader = new FileReader()

    if (file) {
        reader.readAsText(file)
    }

    reader.addEventListener('load', () => {
        const content = reader.result

        if (!content) {
            return
        }

        matrix.length = 0
        vector.length = 0

        const lines = content.split('\n')
        const size = +lines[0]
        const matrixLines = lines.slice(1, size + 1)
        const vectorLines = lines.slice(size + 1, size * 2 + 1)

        for (let i = 0; i < size; i++) {
            const arr = []
            const line = matrixLines[i].split(',')

            for (let j = 0; j < size; j++) {
                arr.push(+line[j])
            }

            matrix.push(arr)
        }

        for (let i = 0; i < size; i++) {
            vector.push(+vectorLines[i])
        }

        renderSOLE(size, matrix, vector)
    })
})

calculateElement.addEventListener('click', () => {
    const [ matrix, vector ] = parseSOLE(matrixElement, vectorElement)

    try {
        let result = null

        if (!invertible(matrix)) {
            throw new Error('CalculationError: SOLE is not invertible')
        }

        switch (method) {
            case 'cramer':
                result = cramer(matrix, vector)
                break
            case 'gauss':
                result = gauss(matrix, vector)
                break
            case 'seidel':
                result = seidel(matrix, vector)
                break
            case 'jordan':
                result = jordan(matrix, vector)
                break
            case 'jacobi':
                result = jacobi(matrix, vector)
                break
        }

        renderSOLE(sizeElement.value, matrix, vector)

        answerVectorElement.innerHTML = ''
        answerElement.style.display = 'block'

        for (let row = 0; row < result.length; row++) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const input = document.createElement('input')
    
            input.value = result[row]
            input.readOnly = true
            input.style.width = 'fit-content'
    
            td.appendChild(input)
            tr.appendChild(td)
            answerVectorElement.appendChild(tr)
        }
    } catch(error) {
        answerVectorElement.innerHTML = ''
        answerElement.style.display = 'none'

        const messageBoxElement = document.querySelector('.message-box')
        const messageElement = messageBoxElement.querySelector('.message')
        
        messageElement.innerText = error.message.slice(error.message.indexOf(': ') + 2)

        messageBoxElement.style.display = 'block'

        setTimeout(() => messageBoxElement.style.display = 'none', 2500)
    }
})

renderSOLE(sizeElement.value)
