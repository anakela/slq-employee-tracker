const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');
const {
    deptChoices
} = require('./questions');

const questArr = [];

async function whatToDo() {
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
                choices: await deptChoices(),
                when: (answers) => answers.selection === 'Add an employee',
            },
            {
                message: 'Under which department is this new employee?',
                name: 'addEmployeeDepartment',
                type: 'list',
                choices: await deptChoices(),
                when: (answers) => answers.selection === 'Update an employee role',
            },
        ])
        .then(answers => {
            console.log(answers.selection);
            if (answers.selection === 'View all departments') {
                // Display table showing all departments
                return viewAllDepts();
            } else if (answers.selection === 'View all employees') {
                // Display table showing all employees
                return viewAllEmployees(); 
            } else if (answers.selection === 'Add a department') {
                // Add a department
                return addDept(answers);
            } else if (answers.selection === 'Add a role') {
                // Add a role
                return addRole(answers);
            } else if (answers.selection === 'Add an employee') {
                // Add a new employee
                return addNewEmployee(answers);
            } else if (answers.selection === 'Update an employee role') {
                // Update an employee role
                return updateEmployeeRole(answers);
            } /* else {

            } */
        });
}
// ===========================================================================

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
}

// Add Role function
function addRole(answers) {
    db.query('INSERT INTO role(title, salary) VALUES(?, ?);\n', [answers.addRole, answers.addSalary], function (err, results) {
        console.table(results);
        viewAllRoles();
        console.log(err);
    });
}

// Add New Employee function
function addNewEmployee(answers) {
    db.query('INSERT INTO employee(first_name, last_name) VALUES(?, ?);\n', [answers.addEmployeeFirstName, answers.addEmployeeLastName], function(err, results) {
        console.table(results);
        viewAllEmployees();
        console.log(err);
    });
}

function updateEmployeeRole(answers) {

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