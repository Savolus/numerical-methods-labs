import det from "./det.js";

export default function invertible(matrix) {
    return matrix.length > 1 && matrix.length === matrix[0].length && !!det(matrix)
}
