const { readFileSync } = require('fs')

const input = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')
const test = readFileSync('./test.txt', 'utf8').trim('\n').split('\n')

const trees = []

input.forEach((tree) => {
    trees.push(tree.split(''))
})

const checkNorth = function (treeHeight, x, y) {
    let clearTrees = 0
    for (curX = x - 1; curX >= 0; curX--) {
        ++clearTrees
        if (treeHeight <= trees[curX][y]) return [false, clearTrees]
    }

    return [true, clearTrees]
}

const checkSouth = function (treeHeight, x, y) {
    let clearTrees = 0
    for (curX = x + 1; curX <= trees.length - 1; curX++) {
        ++clearTrees
        if (treeHeight <= trees[curX][y]) return [false, clearTrees]
    }

    return [true, clearTrees]
}

const checkEast = function (treeHeight, x, y) {
    let clearTrees = 0
    for (curY = y + 1; curY <= trees.length - 1; curY++) {
        ++clearTrees
        if (treeHeight <= trees[x][curY]) return [false, clearTrees]
    }

    return [true, clearTrees]
}

const checkWest = function (treeHeight, x, y) {
    let clearTrees = 0
    for (curY = y - 1; curY >= 0; curY--) {
        ++clearTrees
        if (treeHeight <= trees[x][curY]) return [false, clearTrees]
    }

    return [true, clearTrees]
}

const checkIfEdge = function (x, y, trees) {
    if (x === 0 || x === trees.length - 1) {
        return true
    }
    if (y === 0 || y === trees.length - 1) {
        return true
    }
    return false
}

const sum = trees.reduce(
    (tot, treeRow, x) => {
        treeRow.forEach((tree, y) => {
            if (checkIfEdge(x, y, trees)) return (tot[0] += 1)

            const [visible1, score1] = checkSouth(tree, x, y)
            const [visible2, score2] = checkNorth(tree, x, y)
            const [visible3, score3] = checkEast(tree, x, y)
            const [visible4, score4] = checkWest(tree, x, y)

            if (visible1 || visible2 || visible3 || visible4) {
                tot[0] += 1
            }

            const scenicScore = score1 * score2 * score3 * score4

            if (scenicScore > tot[1]) tot[1] = scenicScore
        })
        return tot
    },
    [0, 0]
)

console.log(sum)
