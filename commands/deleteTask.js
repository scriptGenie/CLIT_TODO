import inquirer from "inquirer";
import Todos from '../schema/TodoSchema.js';
import { connectDB, disconnectDB } from "../db/connectDB.js";
import ora from "ora";
import chalk from "chalk";


export async function getTaskCode() {
    try {
        // prompt for todo code
        const answers = await inquirer.prompt([
            {name: 'code', 'message': 'Enter code of Todo to delete: ', type: 'input'}
        ]);

        answers.code = answers.code.trim();

        return answers;

    } catch (error) {
        console.log('Something went wrong...\n', error);
    };
};


export default async function deleteTask() {
    try {
        // obtain todo code provided by user
        const userCode = await getTaskCode();

        await connectDB();

        const spinner = ora('Finding and Deleting Todo...').start();

        const response = await Todos.deleteOne({code: userCode.code});

        spinner.stop();

        // check delete operation
        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Delete Failed --- Could not find Todo matching provided code.'))

        } else {
            console.log(chalk.blueBright('Delete Task Successful'));
        };

        await disconnectDB();

    } catch (error) {
        console.log('Something went wrong --- Error: ', error);
        process.exit(1);
    };
};