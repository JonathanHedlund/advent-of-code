const { readFileSync } = require('fs')

const strings = readFileSync('./input.txt', 'utf8').split('\n')

const vowels = 'aeiou'

const boboStrings = ['ab', 'cd', 'pq', 'xy']

const threeVowels = function (string) {
    return (
        string.split('').reduce((acc, cur) => {
            if (vowels.includes(cur)) return ++acc
            return acc
        }, 0) >= 3
    )
}

const doubleLetter = function (string) {
    const stringArray = string.split('')

    for (i = 0; i < stringArray.length - 1; i++) {
        if (stringArray[i] === stringArray[i + 1]) return true
    }
    return false
}

const containsBadString = (string, badStrings) => {
    let bool = true

    badStrings.forEach((str) => {
        if (string.includes(str)) bool = false
    })
    return bool
}

const twoPairsOfLetters = function (string) {
    const loopArr = string.split('')
    for (i = 0; i < string.split('').length - 2; i++) {
        if (
            loopArr
                .slice(2)
                .join('')
                .includes([loopArr[0], loopArr[1]].join(''))
        ) {
            return true
        }
        loopArr.shift()
    }
    return false
}

const oneLetterBetweenSameLetters = function (string) {
    const stringArray = string.split('')

    for (i = 0; i < stringArray.length - 2; i++) {
        if (stringArray[i] === stringArray[i + 2]) {
            return true
        }
    }
    return false
}

const niceStrings = strings.reduce((acc, cur) => {
    if (
        threeVowels(cur) &&
        doubleLetter(cur) &&
        containsBadString(cur, boboStrings)
    )
        return ++acc
    return acc
}, 0)

const niceStrings2 = strings.reduce((acc, cur) => {
    if (twoPairsOfLetters(cur) && oneLetterBetweenSameLetters(cur)) return ++acc
    return acc
}, 0)

console.log('Task two: ' + niceStrings)
console.log('Task one: ' + niceStrings2)
