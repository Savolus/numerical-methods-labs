export default (set1, set2) => [...set1, ...set2].filter((value, index, arr) => arr.indexOf(value) === index )
