// integrals
import leftRectangle from "./methods/integrals/leftRectangle.js";
import middleRectangle from "./methods/integrals/middleRectangle.js";
import simpson from "./methods/integrals/simpson.js";
import rightRectangle from "./methods/integrals/rightRectangle.js";
import trapezoidal from "./methods/integrals/trapezoidal.js";

// differentials

const f = x => 16 - x ** 2
const a = 0, b = 2, n = 4

console.log('Left Rectangle Sum', leftRectangle(f, a, b, n)) // 👌 30.25
console.log('Right Rectangle Sum', rightRectangle(f, a, b, n)) // 👌 28.25
console.log('Middle Rectangle Sum', middleRectangle(f, a, b, n)) // 👌 29.375
console.log('Trapezoidal Sum', trapezoidal(f, a, b, n)) // 👌 29.25
console.log('Paraboloid Sum', simpson(f, a, b, n)) // 👌 29.33333333333333


