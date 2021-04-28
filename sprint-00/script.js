import cramer from './methods/cramer.js'
import gauss from './methods/gauss.js'
import seidel from './methods/seidel.js'
import jordan from './methods/jordan.js'
import jacobi from './methods/jacobi.js'
import test from './utils/test.js'

const matrix = [
    [ 2, 1, -1 ],
    [ -3, -1, 2 ],
    [ -2, 1, 2 ]
]

const vector = [
    8,
    -11,
    -3
]

try {
    console.table(cramer(matrix, vector)) // ✔
} catch(error) {
    console.error(error.message)
}

console.table(gauss(matrix, vector)) // ✔ 
console.table(seidel(matrix, vector)) // ✔ 
console.table(jordan(matrix, vector)) // ✔ 
console.table(jacobi(matrix, vector)) // ✔ 

console.log(test(matrix, vector, cramer(matrix, vector)))
console.log(test(matrix, vector, gauss(matrix, vector)))
console.log(test(matrix, vector, seidel(matrix, vector)))
console.log(test(matrix, vector, jordan(matrix, vector)))
console.log(test(matrix, vector, jacobi(matrix, vector)))
