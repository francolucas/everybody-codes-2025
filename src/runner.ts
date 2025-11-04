#!/usr/bin/env tsx

import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

/**
 * Quest runner script that executes the appropriate quest script
 */

function main() {
    const inputArgs = process.argv.slice(2);

    if (inputArgs.length === 0) {
        console.error('Please provide a quest number');
        console.info('Usage: npm run quest N');
        console.info('Examples:');
        console.info('  npm run quest 1');
        console.info('  npm run quest 15');
        console.info('  npm run quest 25');
        process.exit(1);
    }

    const questNumber = inputArgs[0] || '';

    if (!questNumber || !/^\d+$/.test(questNumber)) {
        console.error(`Invalid quest number: ${questNumber}`);
        console.info('Quest number must be a positive integer');
        process.exit(1);
    }

    const questFile = resolve(process.cwd(), 'src', `quest${questNumber}.ts`);
    const inputFile1 = resolve(
        process.cwd(),
        'inputs',
        `quest${questNumber}_1.txt`
    );
    const inputFile2 = resolve(
        process.cwd(),
        'inputs',
        `quest${questNumber}_2.txt`
    );
    const inputFile3 = resolve(
        process.cwd(),
        'inputs',
        `quest${questNumber}_3.txt`
    );

    if (!existsSync(questFile)) {
        console.error(`Quest ${questNumber} script not found: ${questFile}`);
        console.info(
            `Create the file src/quest${questNumber}.ts to get started`
        );
        console.info(`You can copy from src/quest1.ts as a template`);
        process.exit(1);
    }

    // Check which input files exist
    const availableInputs = [];
    const missingFiles = [];

    if (existsSync(inputFile1)) {
        availableInputs.push({ file: inputFile1, part: 1 });
    } else {
        missingFiles.push(`quest${questNumber}_1.txt`);
    }

    if (existsSync(inputFile2)) {
        availableInputs.push({ file: inputFile2, part: 2 });
    } else {
        missingFiles.push(`quest${questNumber}_2.txt`);
    }

    if (existsSync(inputFile3)) {
        availableInputs.push({ file: inputFile3, part: 3 });
    } else {
        missingFiles.push(`quest${questNumber}_3.txt`);
    }

    if (availableInputs.length === 0) {
        console.error(`No input files found for quest ${questNumber}`);
        console.info(
            `Create at least one of the following files in the inputs/ directory:`
        );
        missingFiles.forEach(file => console.info(`  inputs/${file}`));
        process.exit(1);
    }

    console.info(`Running Quest ${questNumber}...`);

    // Read available input files and build arguments
    const spawnArgs = ['tsx', questFile];
    availableInputs.forEach(({ file }) => {
        const content = readFileSync(file, 'utf-8').trim();
        spawnArgs.push(content);
    });

    // Add a flag to indicate which parts are available
    spawnArgs.push(
        '--available-parts',
        availableInputs.map(({ part }) => part).join(',')
    );

    // Execute the quest script with available inputs
    const child = spawn('npx', spawnArgs, {
        stdio: 'inherit',
        cwd: process.cwd(),
    });

    child.on('exit', code => {
        process.exit(code || 0);
    });

    child.on('error', error => {
        console.error(`Failed to run quest ${questNumber}: ${error.message}`);
        process.exit(1);
    });
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
