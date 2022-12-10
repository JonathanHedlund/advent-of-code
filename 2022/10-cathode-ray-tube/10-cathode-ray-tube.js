const { readFileSync, writeFileSync } = require('fs')

const test = readFileSync('./test.txt', 'utf8').trim('\n').split('\n')
const input = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')

const xStrengths = [1]
const cyclesToCheck = '20 60 100 140 180 220'.split(' ')

input.forEach((line) => {
    const xCur = xStrengths[xStrengths.length - 1]
    xStrengths.push(xCur)

    if (line.split(' ')[1]) xStrengths.push(xCur + +line.split(' ')[1])
})

const task1 = cyclesToCheck.reduce((acc, cur) => {
    return (acc += xStrengths[+cur - 1] * +cur)
}, 0)

const task2 = xStrengths.map((cur, index) => {
    return Math.abs((index % 40) - cur) <= 1 ? '&' : ' '
})

console.log(task1)
// console.log(task2)

writeFileSync('./output.txt', task2.join(''))
