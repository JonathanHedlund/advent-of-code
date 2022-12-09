const { readFileSync } = require('fs')

const input = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')
const test = readFileSync('./test.txt', 'utf8').trim('\n').split('\n')
const test2 = readFileSync('./test2.txt', 'utf8').trim('\n').split('\n')

const amountOfPoints = 10

let knots = new Array(amountOfPoints).fill('0 0')

const tailFinalPos = []

const moveHead = function (curPos, dir) {
    let [curX, curY] = curPos.split(' ')

    if (dir === 'R') return `${++curX} ${curY}`
    if (dir === 'L') return `${--curX} ${curY}`
    if (dir === 'U') return `${curX} ${++curY}`
    if (dir === 'D') return `${curX} ${--curY}`
}

const moveTail = function (headPos, tailPos) {
    let [headX, headY] = headPos.split(' ').map((el) => parseInt(el))
    let [tailX, tailY] = tailPos.split(' ').map((el) => parseInt(el))

    if (Math.abs(tailX - headX) > 1 || Math.abs(tailY - headY) > 1) {
        const diffX = headX - tailX
        const diffY = headY - tailY

        tailX += Math.abs(diffX) === 2 ? diffX / 2 : diffX
        tailY += Math.abs(diffY) === 2 ? diffY / 2 : diffY
    }

    return `${tailX} ${tailY}`
}

input.forEach((move) => {
    const [dir, steps] = move.split(' ')

    for (let step = 0; step < parseInt(steps); step++) {
        knots[0] = moveHead(knots[0], dir)

        for (let i = 0; i < knots.length; i++) {
            if (i !== knots.length - 1) {
                knots[i + 1] = moveTail(knots[i], knots[i + 1], i, knots)
                continue
            }
            tailFinalPos.push(knots[i])
        }
    }
})

const uniquePositions = new Set(tailFinalPos)

console.log(uniquePositions.size)
