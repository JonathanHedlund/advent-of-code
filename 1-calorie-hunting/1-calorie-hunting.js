const { readFileSync } = require('fs')

const elfFoodCollection = readFileSync('./input.txt', 'utf-8').split('\n\n')

const elfTotalArray = elfFoodCollection.map((elfInv) =>
    elfInv.split('\n').reduce((acc, cur) => acc + +cur, 0)
)

console.log('The largest calorie collection is: ' + Math.max(...elfTotalArray))
console.log(
    'The biggest boys collected a total of ' +
        elfTotalArray
            .sort()
            .slice(-4)
            .reduce((acc, cur) => acc + cur, 0) +
        ' calories.'
)
