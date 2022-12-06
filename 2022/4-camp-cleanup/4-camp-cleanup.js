const { readFileSync } = require('fs')

const sectionGroups = readFileSync('./input.txt', 'utf-8')
    .trim('\n')
    .split('\n')

const createSections = function (sectionString) {
    const [sectionsOne, sectionsTwo] = sectionString.split(',')

    const [sectionOneStart, sectionOneEnd] = sectionsOne.split('-')
    const [sectionTwoStart, sectionTwoEnd] = sectionsTwo.split('-')

    const s1 = [...Array(+sectionOneEnd - +sectionOneStart + 1).keys()].map(
        (i) => i + +sectionOneStart
    )
    const s2 = [...Array(+sectionTwoEnd - +sectionTwoStart + 1).keys()].map(
        (i) => i + +sectionTwoStart
    )

    return [s1, s2]
}

const isSubset = function (groupOne, groupTwo) {
    return groupOne.every((val) => groupTwo.includes(val))
}

const isOverlapping = function (groupOne, groupTwo) {
    let overlapping = false
    groupOne.forEach((val) => {
        if (groupTwo.includes(val)) overlapping = true
    })
    return overlapping
}

const amountOfSameSectors = sectionGroups.reduce((acc, cur) => {
    const [sectionGroupOne, sectionGroupTwo] = createSections(cur)

    if (
        isSubset(sectionGroupOne, sectionGroupTwo) ||
        isSubset(sectionGroupTwo, sectionGroupOne)
    ) {
        return ++acc
    }
    return acc
}, 0)

const amountOfOverlapping = sectionGroups.reduce((acc, cur) => {
    const [sectionGroupOne, sectionGroupTwo] = createSections(cur)

    if (isOverlapping(sectionGroupOne, sectionGroupTwo)) {
        return ++acc
    }
    return acc
}, 0)

console.log(amountOfSameSectors)
console.log(amountOfOverlapping)
