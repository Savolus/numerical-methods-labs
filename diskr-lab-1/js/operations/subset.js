export default (set1, set2) => !set1.map(value => set2.includes(value)).includes(false)
