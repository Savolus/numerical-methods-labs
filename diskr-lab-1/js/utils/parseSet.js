export default str => {
    const newString = str.trim().replace(/\s+/g, '')

    return newString.slice(1, newString.length - 1).split(',')
}
