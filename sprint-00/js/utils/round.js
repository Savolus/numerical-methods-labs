export default function round(number) {
    const rounded = Math.round(number)

    return Math.abs(rounded - number) <= 1e-5 ? rounded : number
}
