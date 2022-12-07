const { readFileSync } = require('fs')

const input = readFileSync('./input.txt', 'utf8')
    .trim('\n')
    .trim('\n')
    .split('\n')

const route = []
const filesInRoute = {}

input.forEach((command) => {
    const curRoute = route.join('')

    if (command.startsWith('$ cd')) {
        const location = command.split(' ')[2]

        if (location === '..') {
            if (route.length === 0) route.push('/')
            return route.pop()
        }

        if (!filesInRoute[curRoute]) filesInRoute[curRoute] = ''
        return route.push(location)
    }

    if (!command.startsWith('$') && !command.startsWith('dir')) {
        const fileSize = command.split(' ')[0]

        if (!filesInRoute[curRoute]) filesInRoute[curRoute] = ''

        filesInRoute[curRoute] += ` ${fileSize}`
    }
})

const dirMax = {}

for (const key in filesInRoute) {
    for (const route in filesInRoute) {
        const fileSizes = filesInRoute[route]
            .split(' ')
            .reduce((acc, cur) => (acc += +cur), 0)

        if (!dirMax[key]) dirMax[key] = 0

        if (route.includes(key)) dirMax[key] += fileSizes
    }
}

const taskOne = Object.values(dirMax).reduce((acc, cur) => {
    if (cur <= 100000) acc += cur
    return acc
}, 0)

const usedSpace = Math.max(...Object.values(dirMax))
const diskSize = 70000000
const spaceToUpdate = 30000000

const taskTwo = Object.values(dirMax).reduce((acc, cur) => {
    const neededToRmv = Math.abs(diskSize - usedSpace - spaceToUpdate)

    if (
        Math.abs(neededToRmv - cur) < Math.abs(neededToRmv - acc) &&
        neededToRmv - cur <= 0
    ) {
        acc = cur
    }
    return acc
}, 0)

console.log(taskOne)
console.log(taskTwo)
