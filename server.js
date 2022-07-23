// const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
            // } else if (answers.selection = 'View all employees') {

            // } else if (answers.selection = 'Add a department') {

            // } else if (answers.selection = 'Add a role') {

            // } else if (answers.selection = 'Add an employee') {

            // } else {

            // } 
        });
}

function viewAllDepts(departments) {
    departments = 
}

whatToDo();