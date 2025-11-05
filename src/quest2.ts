import { parseLines, runQuest } from './utils.js';

function multiply(a: [number, number], b: [number, number]): [number, number] {
    return [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
}

function add(a: [number, number], b: [number, number]): [number, number] {
    return [a[0] + b[0], a[1] + b[1]];
}

function divide(a: [number, number], b: [number, number]): [number, number] {
    return [Math.trunc(a[0] / b[0]), Math.trunc(a[1] / b[1])];
}

function solvePart1(input: string): string {
    const matches = parseLines(input)[0]?.match(/\d+/g)?.map(Number);
    if (!matches || matches.length < 2) {
        return '';
    }
    const sample = matches as [number, number];

    let result = sample;
    for (let i = 0; i < 2; i++) {
        result = multiply(result, result);
        result = divide(result, [10, 10]);
        result = add(result, sample);
    }

    return `[${result[0]},${result[1]}]`;
}

function solvePart2(input: string): string {
    // TODO: Implement your solution for part 2
    return '';
}

function solvePart3(input: string): string {
    // TODO: Implement your solution for part 3
    return '';
}

// Run the quest with the template
runQuest(
    'Quest 2: From Complex to Clarity',
    solvePart1,
    solvePart2,
    solvePart3
);
