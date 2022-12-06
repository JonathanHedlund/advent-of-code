const { readFileSync } = require('fs')

const gameInput = readFileSync('./game-input.txt', 'utf-8').split('\n')

const calcScore = function (input1, input2) {
    if (input1 == 'A') {
        if (input2 === 'X') return 4
        if (input2 === 'Y') return 8
        if (input2 === 'Z') return 3
    }
    if (input1 == 'B') {
        if (input2 === 'X') return 1
        if (input2 === 'Y') return 5
        if (input2 === 'Z') return 9
    }
    if (input1 == 'C') {
        if (input2 === 'Y') return 2
        if (input2 === 'X') return 7
        if (input2 === 'Z') return 6
    }
    return 0
}

const calcWhichMove = function (theirInput, condition) {
    if (condition == 'Z') {
        if (theirInput === 'A') return 'Y'
        if (theirInput === 'B') return 'Z'
        if (theirInput === 'C') return 'X'
    }
    if (condition == 'Y') {
        if (theirInput === 'A') return 'X'
        if (theirInput === 'B') return 'Y'
        if (theirInput === 'C') return 'Z'
    }
    if (condition == 'X') {
        if (theirInput === 'A') return 'Z'
        if (theirInput === 'B') return 'X'
        if (theirInput === 'C') return 'Y'
    }
}

const totalWithFirstInstructions = gameInput.reduce(
    (acc, cur) => acc + calcScore(cur.split(' ')[0], cur.split(' ')[1]),
    0
)

const totalWithSecondInstructions = gameInput.reduce((acc, cur) => {
    const [theirMove, myMove] = cur.split(' ')
    return acc + calcScore(theirMove, calcWhichMove(theirMove, myMove))
}, 0)

console.log(totalWithFirstInstructions)
console.log(totalWithSecondInstructions)
