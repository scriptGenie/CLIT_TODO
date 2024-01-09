import { connectDB, disconnectDB} from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import chalk from 'chalk';
import ora from 'ora';

export default async function readTask() {
    try {
        await connectDB();

        const spinner = ora('Fetching Todos...').start();

        const todos = await Todos.find({});

        spinner.stop();

        if (todos.length === 0) {
            console.log(chalk.blueBright('You do not have any tasks'));
        } else {
            todos.forEach( todo => {
                console.log(
                    chalk.cyanBright('Todo Code: ') + todo.code + '\n' +
                    chalk.blueBright('Name: ') + todo.name + '\n' +
                    chalk.yellowBright('Description: ') + todo.detail + '\n'
                );
            });
        };

        await disconnectDB();

    } catch (error) {
        console.log('Something went wrong. --- Error: ', error);
        process.exit(1);
    }
};