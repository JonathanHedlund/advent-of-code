const { readFileSync } = require('fs')

const rucksacks = readFileSync('./input.txt', 'utf-8').trim('\n').split('\n')

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const findPriority = function (letter) {
    return letters.findIndex((char) => char === letter) + 1
}

const splitCompartments = function (rucksack) {
    return [
        rucksack.slice(0, rucksack.length / 2).split(''),
        rucksack.slice(rucksack.length / 2, rucksack.length).split(''),
    ]
}

const groups = function (rucksacks) {
    let group = ''
    return rucksacks.reduce((acc, cur, index) => {
        group += cur + ' '
        if (index > 2 && index % 3 === 0) {
            acc.push(group)
            group = ''
        }
        return acc
    }, [])
}

const findLetter = function (letter, string) {
    return string.split('').find((val) => letter === val)
}

const priority = rucksacks.reduce((acc, cur) => {
    const [firstCompartment, secondCompartment] = splitCompartments(cur)
    return (
        acc +
        firstCompartment.reduce((acc, letter) => {
            if (secondCompartment.find((val) => letter === val))
                return findPriority(letter)
            return acc
        }, 0)
    )
}, 0)

const groupsSep = groups(rucksacks)

const priority2 = groupsSep.reduce((acc, cur) => {
    const [firstGroup, secondGroup, thirdGroup] = cur.split(' ')
    return (
        acc +
        firstGroup.split('').reduce((acc, cur) => {
            if (findLetter(cur, secondGroup) && findLetter(cur, thirdGroup))
                return findPriority(cur)
            return acc
        }, 0)
    )
}, 0)

console.log(priority)
console.log(priority2)
