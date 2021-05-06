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
    const set1Value = set1Element.value ? set1Element.value : set1Element.placeholder
    const set2Value = set2Element.value ? set2Element.value : set2Element.placeholder

    const set1 = parseSet(set1Value)
    const set2 = parseSet(set2Value)

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

    const operand1 = isReversed ? set2Value : set1Value
    const operand2 = isReversed ? set1Value : set2Value

    if (isSubset) {
        operation = result ? operation : '&#8840;'

        answerElement.innerHTML = `${operand1} ${operation} ${operand2}`

        return
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

    answerElement.innerHTML = `${operand1} ${operation} ${operand2} = ${output}`
})
