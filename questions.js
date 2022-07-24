const inquirer = require('inquirer');

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
            },
            {
                message: 'Please type the name of the department you would like to add.',
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
                name: 'addEmployeeLastName',
                type: 'list',
                choices: [
                    db.query('SELECT * FROM department', function (err, results) {
                        console.log(results);
                        console.log(err);
                    })
                ],
                when: (answers) => answers.selection === 'Add an employee',
            },
        )
        .then(answers => {
            console.log(answers.selection);
            if (answers.selection === 'View all departments') {
                return viewAllDepts(); // Add function for displaying table showing all departments
            } else if (answers.selection === 'View all employees') {
                return viewAllEmployees(); // Add a function for displaying table showing all employees
            } else if (answers.selection === 'Add a department') {
                return addDept();
            }
            // else if (answers.selection === 'Add a role') {

            // } else if (answers.selection === 'Add an employee') {

            // } else if (answers.selection === 'Update an employee role') {

            // } else {

            // }
        });
}

whatToDo();