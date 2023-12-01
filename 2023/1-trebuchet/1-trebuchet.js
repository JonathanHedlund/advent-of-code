const { readFileSync } = require("fs");

const calibrationLines = readFileSync("./example.txt", "utf-8")
	.trim("\n")
	.split("\n");

const numbers = "12334567890".split("");

const wordNumbers = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

const calibrationSum = calibrationLines.reduce((acc, line) => {
	let calibrationValue = "";

	const convertedLine = wordNumbers.reduce((acc, cur, index) => {
		const split = acc.split(cur);
		if (split.length > 1) {
			for (let i = 0; i < split.length - 1; i++) {
				split[i] =
					split[i] + cur.slice(0, 1) + index + cur.slice(1, cur.length);
			}
			return split.join("");
		}
		return split.join(cur);
	}, line);

	convertedLine.split("").forEach((char) => {
		if (numbers.includes(char)) {
			if (calibrationValue.length === 0) {
				calibrationValue = char;
			} else {
				calibrationValue = calibrationValue[0] + char;
			}
		}
	});

	return (acc +=
		calibrationValue.length === 1
			? +(calibrationValue + calibrationValue)
			: +calibrationValue);
}, 0);

console.log(calibrationSum);
