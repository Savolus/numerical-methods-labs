import union from "./union.js";

export default (set1, set2) => union(set1.filter(value => set2.includes(value)), set2.filter(value => set1.includes(value)))
