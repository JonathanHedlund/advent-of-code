const { readFileSync } = require('fs')

const file = readFileSync('./input.txt', 'utf-8').split('')

const floor = file.reduce((acc, cur, index) => {
    if (acc === -1) console.log('Into the basement at stairs ' + index)
    if (cur === '(') return (acc += 1)
    if (cur === ')') return (acc -= 1)
}, 0)

console.log(floor)
