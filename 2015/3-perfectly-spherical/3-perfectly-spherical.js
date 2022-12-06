const { readFileSync } = require('fs')

const directions = readFileSync('./input.txt', 'utf-8').split('')

const deliverPackage = function (instruction) {
    if (instruction === '>') return [1, 0]
    if (instruction === '<') return [-1, 0]
    if (instruction === '^') return [0, 1]
    if (instruction === 'v') return [0, -1]
}

const moveSanta = function (position, newDirection) {
    const xCoord = +position[0] + newDirection[0]
    const yCoord = +position[1] + newDirection[1]

    return `${xCoord},${yCoord}`
}

const visitedHouses = directions.reduce(
    (acc, instruction, index) => {
        let x, y
        // if (index >= 1) {
        //     x = acc[index - 1].split(',')[0]
        //     y = acc[index - 1].split(',')[1]
        // } else {
        //     x = acc[index].split(',')[0]
        //     y = acc[index].split(',')[1]
        // }

        x = acc[index].split(',')[0]
        y = acc[index].split(',')[1]

        const newDirection = deliverPackage(instruction)

        const newPos = moveSanta([x, y], newDirection)

        acc.push(newPos)

        return acc
    },
    ['0,0']
)

const uniqueHouses = new Set(visitedHouses)

console.log(uniqueHouses.size, visitedHouses.length)
