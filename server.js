// const express = require('express');
const inquirer = require('inquirer');

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
                // Add function for displaying table showing all departments
            } else if {
                
            }
        });
}



whatToDo();