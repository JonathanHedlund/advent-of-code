const { readFileSync } = require('fs')

const instructions = readFileSync('./input.txt', 'utf8').trim('\n').split('\n')

const lightArrangement = []

for (x = 0; x < 1000; x++) {
    lightArrangement.push([])
    for (y = 0; y < 1000; y++) {
        lightArrangement[x].push([])
    }
}

const lightAccordingInstruction = function (instruction) {
    const instArr = instruction.split(' ')
    const option = instArr[0] === 'toggle' ? 'toggle' : instArr[1]

    let [xStart, yStart] =
        instArr[2] !== 'through' ? instArr[2].split(',') : instArr[1].split(',')
    let [xEnd, yEnd] = instArr[4]
        ? instArr[4].split(',')
        : instArr[3].split(',')

    // console.log(xStart, xEnd)
    // console.log(yStart, yEnd)

    for (x = xStart; x <= xEnd + 1; x++) {
        for (y = yStart; y <= yEnd; y++) {
            // console.log(lightArrangement[x][y])
            // console.log(x, y)
            lightArrangement[x][y] = lightSwitchCase(
                option,
                lightArrangement[x][y]
            )
            if (y === 999) break
        }
        if (x === 999) return
    }
}

const lightSwitchCase = function (option, current) {
    // console.log(option)
    if (option === 'on') return 1
    if (option === 'off') return 0
    if (option === 'toggle') return 1 - current
}

// console.log(lightArrangement[999][999])
// console.log(lightArrangement)

// console.log(lightArrangement)
instructions.forEach((instruction) => {
    lightAccordingInstruction(instruction)
})

// lightAccordingInstruction('toggle 0,0 through 999,1')
// const total = lightArrangement.reduce((acc, cur, index) => {
//     // console.log(cur[index])
//     const hej = cur.reduce((acc, cur, index) => {
//         console.log(acc)
//         return (acc += 1)
//     }, 0)
//     acc += hej
//     return (acc += +cur[index])
// }, 0)

let tot = 0
for (x = 0; x < 1000; x++) {
    for (y = 0; y < 1000; y++) {
        tot += +lightArrangement[x][y]
    }
}
console.log(tot)
// console.log(lightArrangement)
// console.log(lightArrangement[1])
console.log(lightArrangement[1].length)
