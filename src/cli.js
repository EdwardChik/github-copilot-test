/**
 * CLI tool for support engineers.
 *
 * Provides the following commands:
 * - health-check: Check the health status of the system.
 * - parse-logs <file>: Parse logs from the specified file, with an option to show only error logs.
 * - track-incident <id>: Track the status of an incident by ID.
 *
 * @module cli
 * @version 1.0.0
 * @example
 * // Check system health
 * $ support-cli health-check
 *
 * // Parse all logs from a file
 * $ support-cli parse-logs server.log
 *
 * // Parse only error logs from a file
 * $ support-cli parse-logs server.log --error
 *
 * // Track an incident by ID
 * $ support-cli track-incident 12345
 */

const { program } = require('commander');

program
    .name('support-cli')
    .description('CLI tool for support engineers')
    .version('1.0.0');

// health-check command
program
    .command('health-check')
    .description('Check the health status of the system')
    .action(() => {
        console.log('System health: OK');
    });

// parse-logs command
program
    .command('parse-logs <file>')
    .description('Parse logs from the specified file')
    .option('-e, --error', 'Show only error logs')
    .action((file, options) => {
        if (options.error) {
            console.log(`Parsing error logs from ${file}...`);
        } else {
            console.log(`Parsing all logs from ${file}...`);
        }
    });

// track-incident command
program
    .command('track-incident <id>')
    .description('Track the status of an incident by ID')
    .action((id) => {
        console.log(`Tracking incident with ID: ${id}`);
    });

// Show help and examples
program.addHelpText('after', `
Examples:
    $ support-cli health-check
    $ support-cli parse-logs server.log
    $ support-cli parse-logs server.log --error
    $ support-cli track-incident 12345
`);

program.parse(process.argv);