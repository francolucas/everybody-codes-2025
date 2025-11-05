import { parseLines, runQuest } from './utils.js';

function getData(input: string): {
    names: string[];
    instructions: string[];
} {
    const lines = parseLines(input);
    const names = lines[0]?.split(',') || [];
    const instructions = lines[2]?.split(',') || [];
    return { names, instructions };
}

function findNameIndex(
    names: string[],
    instruction: string,
    nameIndex: number,
    loop: boolean
): number {
    const size = names.length;

    const direction = instruction[0];
    const steps = Number.parseInt(instruction.slice(1), 10);

    if (!loop) {
        return direction === 'L'
            ? Math.max(nameIndex - steps, 0)
            : Math.min(nameIndex + steps, size - 1);
    }

    if (direction === 'L') {
        const newIndex = nameIndex - steps;

        if (newIndex >= 0) {
            return newIndex;
        }

        if (Math.abs(newIndex) > size) {
            return size - (Math.abs(newIndex) % size);
        }
        return size - Math.abs(newIndex);
    }

    const newIndex = nameIndex + steps;
    if (newIndex >= size) {
        return newIndex % size;
    }

    return newIndex;
}

function solvePart1(input: string): string {
    const { names, instructions } = getData(input);
    let nameIndex = 0;

    for (const instruction of instructions) {
        nameIndex = findNameIndex(names, instruction, nameIndex, false);
    }

    return names[nameIndex] || '';
}

function solvePart2(input: string): string {
    const { names, instructions } = getData(input);
    let nameIndex = 0;

    for (const instruction of instructions) {
        nameIndex = findNameIndex(names, instruction, nameIndex, true);
    }

    return names[nameIndex] || '';
}

function solvePart3(input: string): string {
    const { names, instructions } = getData(input);

    for (const instruction of instructions) {
        const swapIndex = findNameIndex(names, instruction, 0, true);

        const firstItem = names[0] || '';
        names[0] = names[swapIndex] || '';
        names[swapIndex] = firstItem;
    }

    return names[0] || '';
}

// Run the quest with the template
runQuest('Quest 1: Whispers in the Shell', solvePart1, solvePart2, solvePart3);
