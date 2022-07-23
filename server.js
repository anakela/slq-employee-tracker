// const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: 'employees_db',
    },
    console.log('Connected to the employees_db database.')
);

const questArr = [];

function whatToDo() {
    inquirer
        .prompt({
            message: 'What would you like to do?',
            name: 'selection',
            type: 'list',
            choices: [
                'View all departments',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
            ]
        })
        .then(answers => {
            console.log(answers.selection);
            if (answers.selection = 'View all departments') {
                viewAllDepts(); // Add function for displaying table showing all departments
            } else if (answers.selection = 'View all employees') {

            } else if (answers.selection = 'Add a department') {

            } else if (answers.selection = 'Add a role') {

            } else if (answers.selection = 'Add an employee') {

            } else {

            }
        });
}

function viewAllDepts(departments) {
    departments = 
}

whatToDo();