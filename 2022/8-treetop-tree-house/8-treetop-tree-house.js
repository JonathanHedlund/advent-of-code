const { readFileSync } = require('fs')

const input = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')
const test = readFileSync('./test.txt', 'utf8').trim('\n').split('\n')

const trees = []

input.forEach((tree) => {
    trees.push(tree.split(''))
})

const checkSouth = function (treeHeight, x, y) {
    let clearTrees = 0
    if (x === trees.length - 1) return [true, clearTrees]

    for (k = x + 1; k <= trees.length - 1; k++) {
        clearTrees++

        if (treeHeight <= trees[k][y]) {
            return [false, clearTrees]
        }
    }
    return [true, clearTrees]
}

const checkEast = function (treeHeight, x, y) {
    let clearTrees = 0
    if (y === trees.length - 1) return [true, clearTrees]

    for (k = y + 1; k <= trees.length - 1; k++) {
        clearTrees++
        if (treeHeight <= trees[x][k]) {
            return [false, clearTrees]
        }
    }
    return [true, clearTrees]
}

const checkNorth = function (treeHeight, x, y) {
    let clearTrees = 0
    if (x === 0) return [true, clearTrees]

    for (k = x - 1; k >= 0; k--) {
        ++clearTrees
        if (treeHeight <= trees[k][y]) {
            return [false, clearTrees]
        }
    }
    return [true, clearTrees]
}

const checkWest = function (treeHeight, x, y) {
    let clearTrees = 0
    if (y === 0) return [true, clearTrees]

    for (k = y - 1; k >= 0; k--) {
        ++clearTrees
        if (treeHeight <= trees[x][k]) {
            return [false, clearTrees]
        }
    }
    return [true, clearTrees]
}

const sum = trees.reduce(
    (tot, treeRow, x) => {
        treeRow.forEach(
            (tree, y) => {
                const [visible1, score1] = checkSouth(tree, x, y)
                const [visible2, score2] = checkNorth(tree, x, y)
                const [visible3, score3] = checkEast(tree, x, y)
                const [visible4, score4] = checkWest(tree, x, y)

                if (visible1 || visible2 || visible3 || visible4) {
                    tot[0] += 1
                }

                const scenicScore = score1 * score2 * score3 * score4

                if (scenicScore > tot[1]) tot[1] = scenicScore
            },
            [0, 0]
        )
        return tot
    },
    [0, 0]
)

console.log(sum)
