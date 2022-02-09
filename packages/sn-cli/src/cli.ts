import process from 'process';
import { Command } from 'commander';

const app = new Command();

app.version(``);



app.parse(process.argv);