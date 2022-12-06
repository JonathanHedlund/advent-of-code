const { readFileSync } = require('fs')

const file = readFileSync('./input.txt', 'utf-8').split('')

const twoOfSame = function (buffer) {
    let bool = false
    buffer.forEach((el, ind) => {
        buffer.find((ele, inde) => {
            if (ind !== inde && el === ele) bool = true
        })
    })
    return bool
}

const calcFirstUniqueString = function (messageLength, file) {
    const buffer = []
    for (i = 1; i <= file.length; i++) {
        if (buffer.length > messageLength) {
            buffer.shift()
        }
        buffer.push(file[i])

        if (!twoOfSame(buffer) && i > 4) {
            return i
        }
    }
}

const packetMarker = calcFirstUniqueString(4, file)
const messageMarker = calcFirstUniqueString(14, file)

console.log(packetMarker, messageMarker)
