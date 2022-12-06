const { readFileSync } = require('fs')

const boxes = readFileSync('./input.txt', 'utf-8').trim('\n').split('\n')

const calcSurfaceArea = function (dimensions) {
    const [length, width, height] = dimensions.split('x')

    const calc1 = 2 * length * width
    const calc2 = 2 * width * height
    const calc3 = 2 * height * length

    return calc1 + calc2 + calc3 + Math.min(calc1, calc2, calc3) / 2
}

const calcRibbon = function (dimensions) {
    const [length, width, height] = dimensions.split('x')
    const [side1, side2] = [length, width, height].sort((a, b) => a - b)

    const calc1 = 2 * side1 + 2 * side2
    const calc2 = length * width * height

    return calc1 + calc2
}

const totalSqrFeet = boxes.reduce(
    (acc, cur) => {
        acc[0] += calcSurfaceArea(cur)
        acc[1] += calcRibbon(cur)
        return acc
    },
    [0, 0]
)

console.log(totalSqrFeet)
