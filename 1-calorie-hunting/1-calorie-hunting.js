const { readFileSync } = require('fs')

const elfFoodCollection = readFileSync('./input.txt', 'utf-8').split('\n')

let bagOfFood = 0
const finishedList = elfFoodCollection.reduce((acc, cur) => {
    if (cur === '') {
        acc.push(bagOfFood)
        bagOfFood = 0
        return acc
    }
    bagOfFood += parseInt(cur)
    return acc
}, [])

console.log('The biggest load is: ' + Math.max(...finishedList))
console.log(
    'The biggest bois collect: ' +
        finishedList
            .sort()
            .slice(-4, -1)
            .reduce((acc, cur) => acc + cur, 0)
)
