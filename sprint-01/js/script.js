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

// input a, b, n, x0 (for diff), y0 (for diff)

const integralActionChooser = document.querySelector('input[type=radio]#integral')
const differentialActionChooser = document.querySelector('input[type=radio]#differential')

const integralAction = document.querySelector('.action[data-integral]')
const differentialAction = document.querySelector('.action[data-differential]')

const calculateIntegral = integralAction.querySelector('.calculate')
const calculateDifferential = differentialAction.querySelector('.calculate')

const integralAnswerElement = integralAction.querySelector('#answer')
const differentialAnswerTableElement = differentialAction.querySelector('.answer-table')
const differentialAnswerElement = differentialAnswerTableElement.querySelector('.answer')

const title = document.querySelector('title')
const header = document.querySelector('h1')

const renderMessage = message => {
    const messageBoxElement = document.querySelector('.message-box')
    const messageElement = messageBoxElement.querySelector('.message')
    
    messageElement.innerText = message

    messageBoxElement.style.display = 'block'

    setTimeout(() => messageBoxElement.style.display = 'none', 2000)
}

integralActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'block'
    differentialAction.style.display = 'none'

    title.innerText = 'Integral Solver'
    header.innerText = 'Integral Solver'

    integralAnswerElement.value = ''
    integralAnswerElement.style.display = 'none'
})

differentialActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'none'
    differentialAction.style.display = 'block'

    title.innerText = 'Differential Solver'
    header.innerText = 'Differential Solver'

    differentialAnswerTableElement.style.display = 'none'
    differentialAnswerElement.innerHTML = ''
})

calculateIntegral.addEventListener('click', () => {
    const functionElement = integralAction.querySelector('#function')
    const methodElement = integralAction.querySelector('#method')
    const startElement = integralAction.querySelector('#start')
    const endElement = integralAction.querySelector('#end')
    const countElement = integralAction.querySelector('#count')

    const f = integrals[`f${functionElement.value}`]
    const a = +startElement.value
    const b = +endElement.value
    const n = +countElement.value

    try {
        let result = 0

        switch (methodElement.value) {
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

        integralAnswerElement.value = result.toString()
        integralAnswerElement.style.display = 'block'
    } catch(error) {
        integralAnswerElement.value = ''
        integralAnswerElement.style.display = 'none'

        renderMessage(error.message.slice(error.message.indexOf(': ') + 2))
    }
})

calculateDifferential.addEventListener('click', () => {
    const functionElement = differentialAction.querySelector('#function')
    const methodElement = differentialAction.querySelector('#method')
    const startElement = differentialAction.querySelector('#start')
    const endElement = differentialAction.querySelector('#end')
    const countElement = differentialAction.querySelector('#count')
    const x0Element = differentialAction.querySelector('#x0')
    const y0Element = differentialAction.querySelector('#y0')

    const f = differentials[`f${functionElement.value}`]
    const a = +startElement.value
    const b = +endElement.value
    const n = +countElement.value
    const x0 = +x0Element.value
    const y0 = +y0Element.value

    try {
        let result = 0

        switch (methodElement.value) {
            case '1':
                result = euler(f, a, b, x0, y0, n)
                break
            case '2':
                result = rungeKutta2(f, a, b, x0, y0, n)
                break
            case '3':
                result = rungeKutta3(f, a, b, x0, y0, n)
                break
            case '4':
                result = rungeKutta4(f, a, b, x0, y0, n)
                break
        }

        for (const answer of result) {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const input = document.createElement('input')

            input.type = 'text'
            input.readOnly = true
            input.value = answer

            console.log(f, answer)

            td.appendChild(input)
            tr.appendChild(td)

            differentialAnswerElement.appendChild(tr)
        }

        differentialAnswerTableElement.style.display = 'block'
    } catch(error) {
        differentialAnswerElement.innerHTML = ''
        differentialAnswerTableElement.style.display = 'none'

        renderMessage(error.message.slice(error.message.indexOf(': ') + 2))
    }
})

integralActionChooser.click()
