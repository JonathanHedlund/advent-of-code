const { readFileSync } = require('fs')

const elfFoodCollection = readFileSync('./input.txt', 'utf-8').split('\n')

let elfIndex = 0
const elfTotalArray = elfFoodCollection.reduce((acc, cur) => {
    if (!acc[elfIndex]) acc[elfIndex] = 0
    cur === '' ? elfIndex++ : (acc[elfIndex] += +cur)
    return acc
}, [])

console.log('The largest calorie collection is: ' + Math.max(...elfTotalArray))
console.log(
    'The biggest boys collected a total of ' +
        elfTotalArray
            .sort()
            .slice(-4)
            .reduce((acc, cur) => acc + cur, 0) +
        ' calories.'
)
