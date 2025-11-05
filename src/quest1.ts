import { parseLines, runQuest } from './utils.js';

function getData(input: string): {
    names: string[];
    instructions: string[];
    size: number;
} {
    const lines = parseLines(input);
    const names = lines[0]?.split(',') || [];
    const instructions = lines[2]?.split(',') || [];
    return { names, instructions, size: names.length };
}

function solvePart1(input: string): string {
    const { names, instructions, size } = getData(input);
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        nameIndex =
            direction === 'L'
                ? Math.max(nameIndex - steps, 0)
                : Math.min(nameIndex + steps, size - 1);
    }

    return names[nameIndex] || '';
}

function solvePart2(input: string): string {
    const { names, instructions, size } = getData(input);
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        if (direction === 'L') {
            nameIndex = nameIndex - steps;
            if (nameIndex < 0) {
                if (Math.abs(nameIndex) > size) {
                    nameIndex = size - (Math.abs(nameIndex) % size);
                } else {
                    nameIndex = size - Math.abs(nameIndex);
                }
            }
        } else {
            nameIndex = nameIndex + steps;
            if (nameIndex >= size) {
                nameIndex = nameIndex % size;
            }
        }
    }

    return names[nameIndex] || '';
}

function solvePart3(input: string): string {
    const { names, instructions, size } = getData(input);
    let nameIndex = 0;

    for (const instruction of instructions) {
        const direction = instruction[0];
        const steps = parseInt(instruction.slice(1), 10);

        if (direction === 'L') {
            nameIndex = nameIndex - steps;
            if (nameIndex < 0) {
                if (Math.abs(nameIndex) > size) {
                    nameIndex = size - (Math.abs(nameIndex) % size);
                } else {
                    nameIndex = size - Math.abs(nameIndex);
                }
            }
        } else {
            nameIndex = nameIndex + steps;
            if (nameIndex >= size) {
                nameIndex = nameIndex % size;
            }
        }

        const firstName = names[0] || '';
        names[0] = names[nameIndex] || '';
        names[nameIndex] = firstName;
        nameIndex = 0;
    }

    return names[0] || '';
}

// Run the quest with the template
runQuest('Quest 1: Whispers in the Shell', solvePart1, solvePart2, solvePart3);
