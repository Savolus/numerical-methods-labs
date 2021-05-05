// integrals
import leftRectangle from "./methods/integrals/leftRectangle.js";
import rightRectangle from "./methods/integrals/rightRectangle.js";
import middleRectangle from "./methods/integrals/middleRectangle.js";
import trapezoidal from "./methods/integrals/trapezoidal.js";
import simpson from "./methods/integrals/simpson.js";

// differentials
import euler from "./methods/differentials/euler.js";
import rungeKutta2 from "./methods/differentials/rungeKutta2.js";
import rungeKutta3 from "./methods/differentials/rungeKutta3.js";
import rungeKutta4 from "./methods/differentials/rungeKutta4.js";

// function
import { integrals, differentials } from './methods/utils/functions.js'

const integralActionChooser = document.querySelector('input[type=radio]#integral')
const differentialActionChooser = document.querySelector('input[type=radio]#differential')

const integralAction = document.querySelector('.action[data-integral]')
const differentialAction = document.querySelector('.action[data-differential]')

const calculateIntegral = integralAction.querySelector('.calculate')
const calculateDifferential = differentialAction.querySelector('.calculate')

const compareIntegral = integralAction.querySelector('.compare')

const integralActionAnswersElement = integralAction.querySelector('.action-answers')
const integralActionAnswersTbodyElement = integralActionAnswersElement.querySelector('tbody')

const integralActionAnswerElement = integralAction.querySelector('.action-answer')
const differentialActionAnswerElement = differentialAction.querySelector('.action-answer')

const integralAnswerElement = integralActionAnswerElement.querySelector('#answer')
const differentialAnswerElement = differentialActionAnswerElement.querySelector('.answer')

const integralMethodElement = integralAction.querySelector('#method')
const differentialMethodElement = differentialAction.querySelector('#method')

const integralFunctionElement = integralAction.querySelector('#function')
const differentialFunctionElement = differentialAction.querySelector('#function')

const differentialChartElement = differentialAction.querySelector('.action-chart')
const differentialChart = differentialChartElement.querySelector('#chart')
const differentialChartContext = differentialChart.getContext('2d')

const title = document.querySelector('title')
const header = document.querySelector('h1')

let chart = null

const renderMessage = message => {
    const messageBoxElement = document.querySelector('.message-box')
    const messageElement = messageBoxElement.querySelector('.message')
    
    messageElement.innerText = message
    messageBoxElement.style.display = 'block'

    setTimeout(() => messageBoxElement.style.display = 'none', 2000)
}

integralMethodElement.addEventListener('change', () => {
    integralActionAnswerElement.style.display === 'block' && calculateIntegral.click()
})

differentialMethodElement.addEventListener('change', () => {
    differentialActionAnswerElement.style.display === 'block' && calculateDifferential.click()
})

integralFunctionElement.addEventListener('change', () => {
    integralActionAnswerElement.style.display === 'block' && calculateIntegral.click()
    integralActionAnswersElement.style.display === 'block' && compareIntegral.click()
})

differentialFunctionElement.addEventListener('change', () => {
    differentialActionAnswerElement.style.display === 'block' && calculateDifferential.click()
})

integralActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'block'
    differentialAction.style.display = 'none'

    title.innerText = 'Integral Solver'
    header.innerText = 'Integral Solver'

    integralAnswerElement.value = ''
    integralActionAnswerElement.style.display = 'none'
    integralActionAnswersElement.style.display = 'none'
})

differentialActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'none'
    differentialAction.style.display = 'block'

    title.innerText = 'Differential Solver'
    header.innerText = 'Differential Solver'

    differentialAnswerElement.innerHTML = ''
    differentialActionAnswerElement.style.display = 'none'
    differentialChartElement.style.display = 'none'
})

calculateIntegral.addEventListener('click', () => {
    const startElement = integralAction.querySelector('#start')
    const endElement = integralAction.querySelector('#end')
    const countElement = integralAction.querySelector('#count')

    const f = integrals[`f${integralFunctionElement.value}`]
    const a = +startElement.value
    const b = +endElement.value
    const n = +countElement.value

    try {
        let result = 0

        if (a >= b) {
            throw new Error('InputError: b must be greater than a')
        }

        integralActionAnswersElement.style.display = 'none'

        switch (integralMethodElement.value) {
            case '1':
                result = leftRectangle(f, a, b, n)
                break
            case '2':
                result = rightRectangle(f, a, b, n)
                break
            case '3':
                result = middleRectangle(f, a, b, n)
                break
            case '4':
                result = trapezoidal(f, a, b, n)
                break
            case '5':
                result = simpson(f, a, b, n)
                break
        }

        integralAnswerElement.value = `I = ${result}`
        integralActionAnswerElement.style.display = 'block'
    } catch(error) {
        integralAnswerElement.value = ''
        integralActionAnswerElement.style.display = 'none'
        integralActionAnswersElement.style.display = 'none'

        renderMessage(error.message.slice(error.message.indexOf(': ') + 2))
    }
})

calculateDifferential.addEventListener('click', () => {
    const startElement = differentialAction.querySelector('#start')
    const endElement = differentialAction.querySelector('#end')
    const countElement = differentialAction.querySelector('#count')
    const y0Element = differentialAction.querySelector('#y0')

    const f = differentials[`f${differentialFunctionElement.value}`]
    const a = +startElement.value
    const b = +endElement.value
    const n = +countElement.value
    const y0 = +y0Element.value

    try {
        let result = [], name = null

        if (a >= b) {
            throw new Error('InputError: b must be greater than a')
        }

        chart && chart.destroy()
        differentialAnswerElement.innerHTML = ''

        switch (differentialMethodElement.value) {
            case '1':
                name = 'Euler'
                result = euler(f, a, b, y0, n)
                break
            case '2':
                name = 'Runge-Kutta 2'
                result = rungeKutta2(f, a, b, y0, n)
                break
            case '3':
                name = 'Runge-Kutta 3'
                result = rungeKutta3(f, a, b, y0, n)
                break
            case '4':
                name = 'Runge-Kutta 4'
                result = rungeKutta4(f, a, b, y0, n)
                break
        }

        const labels = []

        for (let i = 0; i < result.length; i++) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const input = document.createElement('input')

            labels.push(`y(x${i + 1})`)

            input.type = 'text'
            input.readOnly = true
            input.value = `${labels[i]} = ${result[i]}`

            td.appendChild(input)
            tr.appendChild(td)

            differentialAnswerElement.appendChild(tr)
        }

        chart = new Chart(differentialChartContext, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: name,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: result
                }]
            }
        })

        differentialChartElement.style.display = 'block'
        differentialActionAnswerElement.style.display = 'block'
    } catch(error) {
        differentialAnswerElement.innerHTML = ''
        differentialChartElement.style.display = 'none'
        differentialActionAnswerElement.style.display = 'none'

        chart && chart.destroy()

        renderMessage(error.message.slice(error.message.indexOf(': ') + 2))
    }
})

compareIntegral.addEventListener('click', () => {
    integralActionAnswerElement.style.display = 'none'
    integralActionAnswersTbodyElement.innerHTML = ''

    const startElement = integralAction.querySelector('#start')
    const endElement = integralAction.querySelector('#end')
    const countElement = integralAction.querySelector('#count')

    const f = integrals[`f${integralFunctionElement.value}`]
    const a = +startElement.value
    const b = +endElement.value
    const n = +countElement.value

    try {
        if (a >= b) {
            throw new Error('InputError: b must be greater than a')
        }

        const results = [
            leftRectangle(f, a, b, n),
            rightRectangle(f, a, b, n),
            middleRectangle(f, a, b, n),
            trapezoidal(f, a, b, n),
            simpson(f, a, b, n)
        ]

        const tr = document.createElement('tr')

        for (const answer of results) {
            const td = document.createElement('td')
            const input = document.createElement('input')

            input.type = 'text'
            input.classList.add('centered')
            input.readOnly = true
            input.value = answer

            td.appendChild(input)
            tr.appendChild(td)
        }

        integralActionAnswersTbodyElement.appendChild(tr)

        integralActionAnswersElement.style.display = 'block'
    } catch(error) {
        integralAnswerElement.value = ''
        integralActionAnswerElement.style.display = 'none'
        integralActionAnswersElement.style.display = 'none'

        renderMessage(error.message.slice(error.message.indexOf(': ') + 2))
    }
})

integralActionChooser.click()
