const { readFileSync } = require('fs')

const input = readFileSync('input.txt', 'utf-8').trim().split('\n')

function parseInput() {
    const res = {
        start: {},
        end: {},
        map: [],
    }
    res.map = input.map((line, y) =>
        [...line].map((value, x) => {
            if (value === 'S') {
                res.start = {
                    y,
                    x,
                }
                return 0
            }
            if (value === 'E') {
                res.end = { y, x }
                return 25
            }
            return value.charCodeAt(0) - 'a'.charCodeAt(0)
        })
    )
    return res
}

function intToXY(int) {
    return {
        x: int % 1000,
        y: Math.floor(int / 1000),
    }
}

function xyToInt(x, y) {
    return y * 1e3 + x
}

const findNeighbors = function (x, y, map) {
    const avaNeighbors = []
    //up
    if (y !== 0 && map[y - 1][x] >= map[y][x] - 1)
        avaNeighbors.push(xyToInt(x, y - 1))
    //down
    if (y !== map.length - 1 && map[y + 1][x] >= map[y][x] - 1)
        avaNeighbors.push(xyToInt(x, y + 1))

    //left
    if (x !== 0 && map[y][x - 1] >= map[y][x] - 1)
        avaNeighbors.push(xyToInt(x - 1, y))

    //right
    if (x !== map[y].length && map[y][x + 1] >= map[y][x] - 1)
        avaNeighbors.push(xyToInt(x + 1, y))

    return avaNeighbors
}

const dijkstra = function (map, start, end) {
    let dist = {}
    let prev = {}
    let sptSet = []

    for (y = 0; y < map.length; y++) {
        for (x = 0; x < map[y].length; x++) {
            const id = xyToInt(x, y)
            dist[id] = Infinity

            sptSet.push(id)
        }
    }

    dist[xyToInt(start.x, start.y)] = 0

    while (sptSet.length) {
        let u = null

        for (const current of sptSet) {
            if (u === null || dist[current] < dist[u]) {
                u = current
            }
        }

        const point = intToXY(u)
        if (map[point.y][point.x] === 0) {
            return dist[u]
        }
        sptSet = sptSet.filter((x) => x !== u)

        const neighbors = findNeighbors(point.x, point.y, map)
        for (const v of neighbors) {
            if (sptSet.includes(v)) {
                const alt = dist[u] + 1
                if (alt < dist[v]) {
                    dist[v] = alt
                    prev[v] = u
                }
            }
        }
    }
    // return [dist, prev]
}

const parsedInput = parseInput()
console.log(parsedInput)
const part1 = dijkstra(parsedInput.map, parsedInput.end, parsedInput.end)
console.log(part1)

// console.log(part1[0][xyToInt(parsedInput.end.x, parsedInput.end.y)])
