import { parseLines, runQuest } from './utils.js';

/**
 * Quest 1: [Problem Title]
 */

function solvePart1(input: string): string {
    const lines = parseLines(input);

    const names = lines[0]?.split(',') || [];
    const instructions = lines[2]?.split(',') || [];
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        nameIndex =
            direction === 'L'
                ? Math.max(nameIndex - steps, 0)
                : Math.min(nameIndex + steps, names.length - 1);
    }

    return names[nameIndex] || '';
}

function solvePart2(input: string): number {
    const lines = parseLines(input);
    // TODO: Implement your solution for part 2
    return lines.length;
}

function solvePart3(input: string): number {
    const lines = parseLines(input);
    // TODO: Implement your solution for part 3
    return lines.length;
}

// Run the quest with the template
runQuest('Quest 1: Whispers in the Shell', solvePart1, solvePart2, solvePart3);
