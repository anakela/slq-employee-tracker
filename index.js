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
    displayHeader();

    inquirer
        .prompt([
            {
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
            },
            {
                message: 'Which department would you like to add?',
                name: 'addDepartment',
                type: 'input',
                when: (answers) => answers.selection === 'Add a department',
            },
            {
                message: 'Which role would you like to add?',
                name: 'addRole',
                type: 'input',
                when: (answers) => answers.selection === 'Add a role',
            },
            {
                message: "What is the new role's salary? (Please only input numbers and decimals.)",
                name: 'addSalary',
                type: 'input',
                when: (answers) => answers.selection === 'Add a role',
            },
            {
                message: 'What is the first name of the employee you would like to add?',
                name: 'addEmployeeFirstName',
                type: 'input',
                when: (answers) => answers.selection === 'Add an employee',
            },
            {
                message: 'What is the last name of the employee you would like to add?',
                name: 'addEmployeeLastName',
                type: 'input',
                when: (answers) => answers.selection === 'Add an employee',
            },
            {
                message: 'Under which department is this new employee?',
                name: 'addEmployeeDepartment',
                type: 'list',
                choices: [
                    db.query('SELECT * FROM department', function (err, results) {
                        console.log(results);
                        console.log(err);
                    })
                ],
                when: (answers) => answers.selection === 'Add an employee',
            },
        ])
        .then(answers => {
            console.log(answers.selection);
            if (answers.selection === 'View all departments') {
                // Add function for displaying table showing all departments
                return viewAllDepts();
            } else if (answers.selection === 'View all employees') {
                // Add a function for displaying table showing all employees
                return viewAllEmployees(); 
            } else if (answers.selection === 'Add a department') {
                // Add a function for adding a department
                return addDept(answers);
            } else if (answers.selection === 'Add a role') {
                // Add a function for adding a role
                return addRole(answers);
            } 
            /* else if (answers.selection === 'Add an employee') {

            } else if (answers.selection === 'Update an employee role') {

            } else {

            }*/
        });
}

// View All Departments function
function viewAllDepts() {
    db.query('SELECT * FROM department;\n', function (err, results) {
        console.table(results);
        console.log(err);
    });
}

// View All Employees function
function viewAllEmployees() {
    db.query('SELECT * FROM employee;\n', function (err, results) {
        console.table(results);
        console.log(err);
    });
}

// View All Roles function
function viewAllRoles() {
    db.query('SELECT * FROM role;\n', function (err, results) {
        console.table(results);
        console.log(err);
    });
}

// Add Department function
function addDept(answers) {
    db.query('INSERT INTO department (name) VALUES(?);\n', [answers.addDepartment], function (err, results) {     
        console.table(results);
        viewAllDepts();
        console.log('Department successfully added!\n');
        console.log(err);
    });
    console.log('Hit me!');
}

// Add Role function
function addRole(answers) {
    db.query('INSERT INTO role(title, salary) VALUES(?, ?);\n', [answers.addRole, answers.addSalary], function (err, results) {
        console.table(results);
        viewAllRoles();
        console.log(err);
    });
}








function displayHeader() {
    console.log(`\n
     ________                       __                                     
    /        |                     /  |                                    
    $$$$$$$$/ _____  ____   ______ $$ | ______  __    __  ______   ______  
    $$ |__   /     \/    \ /      \$$ |/      \/  |  /  |/      \ /      \ 
    $$    |  $$$$$$ $$$$  /$$$$$$  $$ /$$$$$$  $$ |  $$ /$$$$$$  /$$$$$$  |
    $$$$$/   $$ | $$ | $$ $$ |  $$ $$ $$ |  $$ $$ |  $$ $$    $$ $$    $$ |
    $$ |_____$$ | $$ | $$ $$ |__$$ $$ $$ \__$$ $$ \__$$ $$$$$$$$/$$$$$$$$/ 
    $$       $$ | $$ | $$ $$    $$/$$ $$    $$/$$    $$ $$       $$       |
    $$$$$$$$/$$/  $$/  $$/$$$$$$$/ $$/ $$$$$$/  $$$$$$$ |$$$$$$$/ $$$$$$$/ 
                          $$ |                 /  \__$$ |                  
     __       __          $$ |                 $$    $$/                   
    /  \     /  |         $$/                   $$$$$$/                    
    $$  \   /$$ | ______  _______   ______   ______   ______   ______      
    $$$  \ /$$$ |/      \/       \ /      \ /      \ /      \ /      \     
    $$$$  /$$$$ |$$$$$$  $$$$$$$  |$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  |    
    $$ $$ $$/$$ |/    $$ $$ |  $$ |/    $$ $$ |  $$ $$    $$ $$ |  $$/     
    $$ |$$$/ $$ /$$$$$$$ $$ |  $$ /$$$$$$$ $$ \__$$ $$$$$$$$/$$ |          
    $$ | $/  $$ $$    $$ $$ |  $$ $$    $$ $$    $$ $$       $$ |          
    $$/      $$/ $$$$$$$/$$/   $$/ $$$$$$$/ $$$$$$$ |$$$$$$$/$$/           
                                           /  \__$$ |                      
                                           $$    $$/                       
                                            $$$$$$/                        \n`);
}

whatToDo();