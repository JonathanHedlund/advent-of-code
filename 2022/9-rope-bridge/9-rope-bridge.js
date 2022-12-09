const { readFileSync } = require('fs')

const input = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')
const test = readFileSync('./test.txt', 'utf8').trim('\n').split('\n')
const test2 = readFileSync('./test2.txt', 'utf8').trim('\n').split('\n')

const amountOfPoints = 10

let knots = new Array(amountOfPoints).fill('0 0')

const tailFinalPos = []

const moveHead = function (knots, dir) {
    let [curX, curY] = knots[0].split(' ')

    if (dir === 'R') {
        knots[0] = `${++curX} ${curY}`
    }
    if (dir === 'L') {
        knots[0] = `${--curX} ${curY}`
    }
    if (dir === 'U') {
        knots[0] = `${curX} ${++curY}`
    }
    if (dir === 'D') {
        knots[0] = `${curX} ${--curY}`
    }
}

const moveTail = function (hCur, tCur) {
    let [headX, headY] = hCur.split(' ').map((el) => parseInt(el))
    let [tailX, tailY] = tCur.split(' ').map((el) => parseInt(el))

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
        moveHead(knots, dir)

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

console.log(uniquePositions)
console.log(uniquePositions.size)
