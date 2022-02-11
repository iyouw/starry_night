import process from 'process';
import { Command } from 'commander';
import { site } from './index.js';

const program = new Command();

program.version(`0.0.1`);

program
    .command('site')
    .description('luanch site')
    .option('--prod','build site for deploy')
    .action(site)


program.parse(process.argv);