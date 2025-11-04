/**
 * Utility function to parse input into lines
 */
export function parseLines(input: string): string[] {
    return input.split('\n');
}

/**
 * Utility function to parse input into a 2D grid
 */
export function parseGrid(input: string): string[][] {
    return parseLines(input).map(line => line.split(''));
}

/**
 * Utility function to measure execution time
 */
export function measureTime<T>(fn: () => T): { result: T; timeMs: number } {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return { result, timeMs: end - start };
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
    // Parse available parts from command line
    const args = process.argv.slice(2);
    const availablePartsIndex = args.findIndex(
        arg => arg === '--available-parts'
    );

    let availableParts: number[] = [1, 2, 3]; // default to all parts
    let inputs: string[] = [];

    if (availablePartsIndex !== -1 && availablePartsIndex + 1 < args.length) {
        // Extract available parts and corresponding inputs
        const partsArg = args[availablePartsIndex + 1];
        if (partsArg) {
            availableParts = partsArg.split(',').map(Number);
        }
        inputs = args.slice(0, availablePartsIndex);
    } else {
        // Fallback: assume first 3 arguments are inputs for parts 1, 2, 3
        inputs = args.slice(0, 3);
        // Only include parts that have inputs
        availableParts = [1, 2, 3].slice(
            0,
            inputs.filter(input => input?.trim()).length
        );
    }

    if (inputs.length === 0) {
        console.error('No inputs provided');
        process.exit(1);
    }

    console.info(`🐤 ${questTitle}`);

    try {
        let totalTime = 0;

        // Run available parts
        availableParts.forEach((partNum, index) => {
            if (index >= inputs.length) {
                console.warn(
                    `⚠️  Part ${partNum}: No input available - skipped`
                );
                return;
            }

            const input = inputs[index];
            if (!input?.trim()) {
                console.warn(`⚠️  Part ${partNum}: Empty input - skipped`);
                return;
            }

            let solveFn: (input: string) => number | string;

            switch (partNum) {
                case 1:
                    solveFn = solvePart1;
                    break;
                case 2:
                    solveFn = solvePart2;
                    break;
                case 3:
                    solveFn = solvePart3;
                    break;
                default:
                    console.warn(
                        `⚠️  Part ${partNum}: Unknown part number - skipped`
                    );
                    return;
            }

            const { result, timeMs } = measureTime(() => solveFn(input));
            console.log(
                `✅ Part ${partNum}: ${result} (${timeMs.toFixed(2)}ms)`
            );
            totalTime += timeMs;
        });

        if (availableParts.length < 3) {
            const missingParts = [1, 2, 3].filter(
                p => !availableParts.includes(p)
            );
            console.info(
                `⚠️  Parts ${missingParts.join(', ')} skipped (missing inputs)`
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
