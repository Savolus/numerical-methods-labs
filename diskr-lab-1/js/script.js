import union from "./operations/union.js";
import intersection from "./operations/intersection.js";
import subset from "./operations/subset.js";
import difference from "./operations/difference.js";
import symmetric from "./operations/symmetric.js";
import parseSet from "./utils/parseSet.js";

const set1Element = document.querySelector('#set-1')
const set2Element = document.querySelector('#set-2')

const operationElement = document.querySelector('#operation')

const calculateElement = document.querySelector('.calculate')

const answerActionElement = document.querySelector('.action-answer')
const answerElement = document.querySelector('.answer')

calculateElement.addEventListener('click', () => {
    const set1 = parseSet(set1Element.value)
    const set2 = parseSet(set2Element.value)

    set1.sort()
    set2.sort()

    let result = false, isSubset = false, isReversed = false, operation = null

    switch (operationElement.value) {
        case '1':
            result = union(set1, set2)
            operation = '&#8899;'
            break
        case '2':
            result = intersection(set1, set2)
            operation = '&#8898;'
            break
        case '3':
            result = subset(set1, set2)
            isSubset = true
            operation = '&#8838'
            break
        case '4':
            result = subset(set2, set1)
            isSubset = true
            isReversed = true
            operation = '&#8838'
            break
        case '5':
            result = difference(set1, set2)
            operation = '&#92;'
            break
        case '6':
            result = difference(set2, set1)
            isReversed = true
            operation = '&#92;'
            break
        case '7':
            result = symmetric(set2, set1)
            operation = '&#9651;'
            break
    }

    answerActionElement.style.display = 'block'

    if (isSubset) {
        answerElement.innerHTML = `${isReversed ? set2Element.value : set1Element.value} ${operation} ${isReversed ? set1Element.value : set2Element.value} = ${result}<br>`

        return alert(`${isReversed ? 'B' : 'A'} is${result ? '' : "n't"} subset of ${isReversed ? 'A' : 'B'}`)
    }

    result.sort()

    let output = '{'

    for (let i = 0; i < result.length; i++) {
        output += result[i]

        if (i !== result.length - 1) {
            output += ', '
        }
    }

    output += '}'

    answerElement.innerHTML = `${isReversed ? set2Element.value : set1Element.value} ${operation} ${isReversed ? set1Element.value : set2Element.value} = ${output}<br>`
})
