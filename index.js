const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
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
            }
            // } else if (answers.selection = 'View all employees') {

            // } else if (answers.selection = 'Add a department') {

            // } else if (answers.selection = 'Add a role') {

            // } else if (answers.selection = 'Add an employee') {

            // } else if (answers.selection = 'Update an employee role') {

            // } else {

            // }
        });
}

function viewAllDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        console.log(err);
    });
}

whatToDo();