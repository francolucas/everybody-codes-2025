/**
 * Utility function to parse input into lines
 */
export function parseLines(input: string): string[] {
    return input.split('\n');
}

/**
 * Utility function to measure execution time
 */
function measureTime<T>(fn: () => T): { result: T; timeMs: number } {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return { result, timeMs: end - start };
}

/**
 * Parse command line arguments for quest runner
 */
function parseQuestArgs(): { availableParts: number[]; inputs: string[] } {
    const args = process.argv.slice(2);
    const availablePartsIndex = args.indexOf('--available-parts');

    if (availablePartsIndex !== -1 && availablePartsIndex + 1 < args.length) {
        const partsArg = args[availablePartsIndex + 1];
        const availableParts = partsArg
            ? partsArg.split(',').map(Number)
            : [1, 2, 3];
        const inputs = args.slice(0, availablePartsIndex);
        return { availableParts, inputs };
    }

    const inputs = args.slice(0, 3);
    const availableParts = [1, 2, 3].slice(
        0,
        inputs.filter(input => input?.trim()).length
    );
    return { availableParts, inputs };
}

/**
 * Get solver function for the given part number
 */
function getSolverFunction(
    partNum: number,
    solvePart1: (input: string) => number | string,
    solvePart2: (input: string) => number | string,
    solvePart3: (input: string) => number | string
): (input: string) => number | string {
    switch (partNum) {
        case 1:
            return solvePart1;
        case 2:
            return solvePart2;
        case 3:
            return solvePart3;
    }

    throw new Error(`Unknown part number: ${partNum}`);
}

/**
 * Generic quest runner template for 3-part challenges
 */
export function runQuest(
    questTitle: string,
    solvePart1: (input: string) => number | string,
    solvePart2: (input: string) => number | string,
    solvePart3: (input: string) => number | string
) {
    const { availableParts, inputs } = parseQuestArgs();

    if (inputs.length === 0) {
        console.error('No inputs provided');
        process.exit(1);
    }

    console.info(`🐤 ${questTitle}`);

    try {
        let totalTime = 0;

        for (const [index, partNum] of availableParts.entries()) {
            if (index >= inputs.length) {
                console.warn(
                    `⏩ Part ${partNum}: No input available - skipped`
                );
                continue;
            }

            const input = inputs[index];
            if (!input?.trim()) {
                console.warn(`⏩ Part ${partNum}: Empty input - skipped`);
                continue;
            }

            const solveFn = getSolverFunction(
                partNum,
                solvePart1,
                solvePart2,
                solvePart3
            );
            if (!solveFn) {
                console.warn(
                    `⏩ Part ${partNum}: Unknown part number - skipped`
                );
                continue;
            }

            const { result, timeMs } = measureTime(() => solveFn(input));
            console.log(
                `✅ Part ${partNum}: ${result} (${timeMs.toFixed(2)}ms)`
            );
            totalTime += timeMs;
        }

        if (availableParts.length < 3) {
            const missingParts = [1, 2, 3].filter(
                p => !availableParts.includes(p)
            );
            console.info(
                `⏩ Parts ${missingParts.join(', ')} skipped (missing inputs)`
            );
        }

        console.info(`Total execution time: ${totalTime.toFixed(2)}ms`);
    } catch (error) {
        console.error(
            `Error: ${error instanceof Error ? error.message : String(error)}`
        );
        process.exit(1);
    }
}
