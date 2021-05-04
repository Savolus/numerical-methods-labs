// integrals
import leftRectangle from "./methods/integrals/leftRectangle.js";
import middleRectangle from "./methods/integrals/middleRectangle.js";
import simpson from "./methods/integrals/simpson.js";
import rightRectangle from "./methods/integrals/rightRectangle.js";
import trapezoidal from "./methods/integrals/trapezoidal.js";

// differentials
import euler from "./methods/differentials/euler.js";
import rungeKutta2 from "./methods/differentials/rungeKutta2.js";
import rungeKutta3 from "./methods/differentials/rungeKutta3.js";
import rungeKutta4 from "./methods/differentials/rungeKutta4.js";

// function
import { integrals, differentials } from './methods/utils/functions.js'

// input a, b, n, x0 (for diff), y0 (for diff)

const fx = integrals.f1
const a = 0, b = 2, n = 1_000_000, x0 = 3, y0 = 1

console.log('Left Rectangle Sum', leftRectangle(fx, a, b, n)) // 👌
console.log('Right Rectangle Sum', rightRectangle(fx, a, b, n)) // 👌
console.log('Middle Rectangle Sum', middleRectangle(fx, a, b, n)) // 👌
console.log('Trapezoidal Sum', trapezoidal(fx, a, b, n)) // 👌
console.log('Simpson\'s Sum', simpson(fx, a, b, n), '\n') // 👌

const fxy = differentials.f1

console.log('Euler differential', euler(fxy, a, b, x0, y0, n)) // 👌
console.log('Range-Kutta 2 differential', rungeKutta2(fxy, a, b, x0, y0, n)) // 👌
console.log('Range-Kutta 3 differential', rungeKutta3(fxy, a, b, x0, y0, n)) // 👌
console.log('Range-Kutta 4 differential', rungeKutta4(fxy, a, b, x0, y0, n)) // 👌
