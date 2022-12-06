const { readFileSync } = require('fs')

const [startPileString, moves] = readFileSync('./input.txt', 'utf-8')
    .trim('\n')
    .split('\n\n')

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Some day I will learn reg ex

const createStackArray = function (stackString) {
    const stacks = stackString.reduce(
        (acc, cur) => {
            let stackPile = 0

            cur.split('').forEach((val, index) => {
                if (index >= 4 && index % 4 === 0) stackPile++
                if (letters.includes(val)) acc[stackPile].push(val)
            })
            return acc
        },
        [[], [], [], [], [], [], [], [], []]
    )
    return stacks
}

const parseMove = function (moveString) {
    const moveArray = moveString.split(' ')
    return [+moveArray[1], +moveArray[3] - 1, +moveArray[5] - 1]
}

const crateMover9000 = function (startPile, moves) {
    const piles = createStackArray(startPile.split('\n'))

    moves.forEach((moveString) => {
        const [amount, startPile, endPile] = parseMove(moveString)

        for (i = 0; i < amount; i++) {
            const crateToMove = piles[startPile].shift()
            piles[endPile].unshift(crateToMove)
        }
    })

    return piles
}

const crateMover9001 = function (startPile, moves) {
    const piles = createStackArray(startPile.split('\n'))

    moves.forEach((moveString) => {
        const [amount, startPile, endPile] = parseMove(moveString)

        const tempStack = []

        for (i = 0; i < amount; i++) {
            const crateToMove = piles[startPile].shift()
            tempStack.unshift(crateToMove)
        }

        tempStack.forEach((crate) => {
            piles[endPile].unshift(crate)
        })
    })

    return piles
}

const getTopRow = function (piles) {
    return piles.reduce((acc, cur) => {
        return (acc += cur[0])
    }, '')
}

const finishedStackOne = crateMover9000(startPileString, moves.split('\n'))
const finishedStackTwo = crateMover9001(startPileString, moves.split('\n'))

console.log(getTopRow(finishedStackOne))
console.log(getTopRow(finishedStackTwo))
