import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input() {
    const answers = await inquirer.prompt(
        [
            {name: 'name', message: 'Enter Task Name:', type: 'input'},
            { name: 'detail', message: 'Enter Task Description:', type: 'input' }
        ]
    );

    return answers;
};


const askQuestions = async() => {

    const todoArray = [];
    let loop = false;

    do {
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQ = await inquirer.prompt(
            [
                {name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm'}
            ]
        );

        if (confirmQ.confirm) {
            loop = true;
        } else {
            loop = false;
        };
    } while (loop);

    return todoArray;
};