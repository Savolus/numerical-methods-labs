// integrals
import leftRectangle from "./methods/integrals/leftRectangle.js";
import middleRectangle from "./methods/integrals/middleRectangle.js";
import simpson from "./methods/integrals/simpson.js";
import rightRectangle from "./methods/integrals/rightRectangle.js";
import trapezoidal from "./methods/integrals/trapezoidal.js";

// differentials
import euler from "./methods/differentials/euler.js";

const fx = x => Math.sin(x)
const a = 0, b = 2, n = 4, x0 = 3, y0 = 1

console.log('Left Rectangle Sum', leftRectangle(fx, a, b, n)) // 👌 30.25
console.log('Right Rectangle Sum', rightRectangle(fx, a, b, n)) // 👌 28.25
console.log('Middle Rectangle Sum', middleRectangle(fx, a, b, n)) // 👌 29.375
console.log('Trapezoidal Sum', trapezoidal(fx, a, b, n)) // 👌 29.25
console.log('Simpson\'s Sum', simpson(fx, a, b, n), '\n') // 👌 29.33333333333333

const fxy = (x, y) => -x * y

console.log('Euler differential', euler(fxy, a, b, x0, y0, 1000000)) // 👌 [ 90.01632115694818, 54.59778605365714, 12.18246147329657 ]

