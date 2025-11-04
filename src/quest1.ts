import { parseLines, runQuest } from './utils.js';

function getNamesAndInstructions(input: string): {
    names: string[];
    instructions: string[];
} {
    const lines = parseLines(input);
    const names = lines[0]?.split(',') || [];
    const instructions = lines[2]?.split(',') || [];
    return { names, instructions };
}

function solvePart1(input: string): string {
    const { names, instructions } = getNamesAndInstructions(input);
    const namesCount = names.length;
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        nameIndex =
            direction === 'L'
                ? Math.max(nameIndex - steps, 0)
                : Math.min(nameIndex + steps, namesCount - 1);
    }

    return names[nameIndex] || '';
}

function solvePart2(input: string): string {
    const { names, instructions } = getNamesAndInstructions(input);
    const namesCount = names.length;
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        if (direction === 'L') {
            nameIndex = nameIndex - steps;
            if (nameIndex < 0) {
                if (Math.abs(nameIndex) > namesCount) {
                    nameIndex = namesCount - (Math.abs(nameIndex) % namesCount);
                } else {
                    nameIndex = namesCount - Math.abs(nameIndex);
                }
            }
        } else {
            nameIndex = nameIndex + steps;
            if (nameIndex >= namesCount) {
                nameIndex = nameIndex % namesCount;
            }
        }
    }

    return names[nameIndex] || '';
}

function solvePart3(input: string): number {
    const lines = parseLines(input);
    // TODO: Implement your solution for part 3
    return lines.length;
}

// Run the quest with the template
runQuest('Quest 1: Whispers in the Shell', solvePart1, solvePart2, solvePart3);
