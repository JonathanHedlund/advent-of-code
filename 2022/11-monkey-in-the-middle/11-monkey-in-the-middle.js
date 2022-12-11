const { readFileSync } = require('fs')

const test = readFileSync('./test.txt', 'utf-8').trim('\n').split('\n\n')
const input = readFileSync('./input.txt', 'utf-8').trim('\n').split('\n\n')

// Got help from this with part 2: https://www.reddit.com/r/adventofcode/comments/zih7gf/comment/izr79go/?utm_source=share&utm_medium=web2x&context=3
supermod = 1

class Monkey {
    constructor(items, operation, testOp, testDiv, testCond1, testCond2) {
        this.items = items
        this.operation = operation
        this.testDiv = testDiv
        this.testOp = testOp
        this.testCond1 = testCond1
        this.testCond2 = testCond2

        this.inspectTotal = 0
    }

    getItems() {
        return this.items
    }

    inspectAndThrowItem() {
        this.inspectTotal++
        let item = this.items.shift() % supermod

        if (this.operation === 'old') item = item * item
        else if (this.testOp === '*') item = item * +this.operation
        else if (this.testOp === '+') item = item + +this.operation

        return [
            item % this.testDiv === 0 ? this.testCond1 : this.testCond2,
            item,
        ]
    }

    catchItem(item) {
        this.items.push(item)
    }
}

const monkeys = input.map((monkey) => {
    // Ugly parsing
    const mnky = monkey.split('\n')
    const starting = mnky[1].split(': ')[1].split(', ')
    const operation = mnky[2].split(' ')
    const testDiv = mnky[3].split(' ')
    const testCond1 = mnky[4].split(' ')
    const testCond2 = mnky[5].split(' ')

    supermod *= +testDiv[testDiv.length - 1]

    return new Monkey(
        starting.map((el) => +el),
        operation[operation.length - 1],
        operation[operation.length - 2],
        +testDiv[testDiv.length - 1],
        +testCond1[testCond1.length - 1],
        +testCond2[testCond2.length - 1]
    )
})

for (i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
        while (monkey.getItems().length !== 0) {
            const thrownToAndItem = monkey.inspectAndThrowItem()
            monkeys[thrownToAndItem[0]].catchItem(thrownToAndItem[1])
        }
    })
}

const totalInspects = monkeys
    .map((monkey) => monkey.inspectTotal)
    .sort((a, b) => b - a)

console.log(totalInspects, totalInspects[0] * totalInspects[1])
