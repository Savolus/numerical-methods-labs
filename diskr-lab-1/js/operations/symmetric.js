import union from "./union.js"
import difference from "./difference.js"

export default (set1, set2) => union(difference(set1, set2), difference(set2, set1))
