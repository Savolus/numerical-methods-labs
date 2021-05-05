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

const title = document.querySelector('title')
const header = document.querySelector('h1')

integralActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'block'
    differentialAction.style.display = 'none'

    title.innerText = 'Integral Solver'
    header.innerText = 'Integral Solver'
})

differentialActionChooser.addEventListener('click', () => {
    integralAction.style.display = 'none'
    differentialAction.style.display = 'block'

    title.innerText = 'Differential Solver'
    header.innerText = 'Differential Solver'
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

        console.log(result)

        integralAction.querySelector('#answer').value = result.toString()
    } catch(error) {

    }
})

calculateDifferential.addEventListener('click', () => {

})

integralActionChooser.click()


// const fx = integrals.f1
// const a = 0, b = 2, n = 1_000_000, x0 = 3, y0 = 1

// console.log('Left Rectangle Sum', leftRectangle(fx, a, b, n)) // 👌
// console.log('Right Rectangle Sum', rightRectangle(fx, a, b, n)) // 👌
// console.log('Middle Rectangle Sum', middleRectangle(fx, a, b, n)) // 👌
// console.log('Trapezoidal Sum', trapezoidal(fx, a, b, n)) // 👌
// console.log('Simpson\'s Sum', simpson(fx, a, b, n), '\n') // 👌

// const fxy = differentials.f1

// console.log('Euler differential', euler(fxy, a, b, x0, y0, n)) // 👌
// console.log('Range-Kutta 2 differential', rungeKutta2(fxy, a, b, x0, y0, n)) // 👌
// console.log('Range-Kutta 3 differential', rungeKutta3(fxy, a, b, x0, y0, n)) // 👌
// console.log('Range-Kutta 4 differential', rungeKutta4(fxy, a, b, x0, y0, n)) // 👌

console.log(euler(differentials.f1, 0, 5, 0, 5, 10))
