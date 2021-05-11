import Graph from 'graph-data-structure'

const graph = Graph()

graph.addEdge('x1', 'x2')
graph.addEdge('x1', 'x3')
graph.addEdge('x2', 'x4')
graph.addEdge('x3', 'x2')
graph.addEdge('x3', 'x5')
graph.addEdge('x4', 'x3')
graph.addEdge('x4', 'x5')
graph.addEdge('x5', 'x4')

const serialized = graph.serialize()

const nodes = serialized['nodes']
const edges = serialized['links']

const matrixS = [], matrixI = []

for (let i = 0; i < nodes.length; i++) {
    matrixS[i] = []

    for (let j = 0; j < nodes.length; j++) {
        matrixS[i].push(0)
    }
}

for (let i = 0; i < nodes.length; i++) {
    matrixI[i] = []

    for (let j = 0; j < edges.length; j++) {
        matrixI[i].push(0)
    }
}

edges.forEach(edge => {
    const source = +edge['source'].slice(1) - 1
    const target = +edge['target'].slice(1) - 1

    matrixS[source][target] = 1
})

edges.forEach(edge => {
    const source = +edge['source'].slice(1) - 1
    const target = +edge['target'].slice(1) - 1

    if (source === nodes.length - 1) {
        matrixI[source][source + target] = 1
        matrixI[target][source + target] = -1
    } else {
        matrixI[source][source + target - 1] = 1
        matrixI[target][source + target - 1] = -1
    }
})

console.log('Degree of vertices:')
nodes.forEach(node => console.log(`${node.id}: ${graph.adjacent(node.id).length}`))

console.log('\nDisplay the degree of vertices:')
nodes.forEach(({id}) => {
    const str = graph.adjacent(id).reduce((acc, value) => acc += `${value}, `, '')
    console.log(`${id}: ${str.slice(0, str.length - 2)}`)
})

console.log('\nPrototypes the degree of vertices:')
nodes.forEach(({id}) => {
    const proto = edges.filter(({target}) => target === id)
    const str = proto.reduce((acc, {source}) => acc += `${source}, `, '')
    console.log(`${id}: ${str.slice(0, str.length - 2) || '∅'}`)
})

console.log('\nAdjacency matrix:')
console.table(matrixS)

console.log('\nIncidence matrix:')
console.table(matrixI)
