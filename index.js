const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');
const {
    deptChoices, employeeChoices, roleChoices
} = require('./questions');

const questArr = [];

async function whatToDo() {
    inquirer
        .prompt([
            {
            message: 'What would you like to do?',
            name: 'selection',
            type: 'list',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit the program'
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
                message: 'Under which role is this employee?',
                name: 'addEmployeeRole',
                type: 'list',
                choices: await roleChoices(),
                when: (answers) => answers.selection === 'Add an employee',
            },
            {
                message: `Who is this employee's manager?`,
                name: 'addEmployeeManager',
                type: 'list',
                choices: await employeeChoices(),
                when: (answers) => answers.selection === 'Add an employee',
            },
            {
                message: 'Please select the employee whose role you would like to update.',
                name: 'selectEmployee',
                type: 'list',
                choices: await employeeChoices(),
                when: (answers) => answers.selection === 'Update an employee role',
            },
            {
                message: `Please select the employee's new role.`,
                name: 'updateEmployeeRole',
                type: 'list',
                choices: await roleChoices(),
                when: (answers) => answers.selection === 'Update an employee role',
            },
            {
                message: `Are you sure you want to exit?`,
                name: 'exitProgram',
                type: 'list',
                choices: [
                    'Yes',
                    'No',
                ],
                when: (answers) => answers.selection === 'Exit the program',
            },
        ])
        .then(answers => {
            console.log(answers.selection);
            if (answers.selection === 'View all departments') {
                // Display table showing all departments
                return viewAllDepts();
            } else if (answers.selection === 'View all roles') {
                // Display a table showing all roles including job title, role ID, dept that role belongs to, and the salary for that role.
                return viewAllRoles();
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
            } else /* if (answers.selection === 'Exit the program')*/ {
                return exitProgram(answers);
            }
        });
}
// ===========================================================================

// View All Departments function
function viewAllDepts() {
    db.query(`\n\n
    SELECT department.id AS 'Department ID', department.name AS 'Department Name'
    FROM department;\n`, function (err, results) {
        console.table(results);
        console.log(err);
    });

    whatToDo();
}

// View All Roles function
function viewAllRoles() {
    db.query(`SELECT role.id AS 'Role ID', role.title AS Title, department.name AS Department, CONCAT('$', role.salary) AS Salary
    FROM role
    LEFT JOIN department ON role.department_id=department.id;;\n`, function(err, results) {
        console.table(results);
        console.log(err);
    });

    whatToDo();
}

// View All Employees function
function viewAllEmployees() {
    db.query(`SELECT employee.id AS 'Employee ID', 
    CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', 
    role.title AS 'Job Title', 
    department.name AS 'Department', 
    CONCAT('$', role.salary) AS 'Salary', 
    CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee
        INNER JOIN role ON employee.role_id=role.id 
        INNER JOIN department ON role.department_id=department.id
        LEFT JOIN employee AS m ON employee.manager_id=m.id;\n`, function (err, results) {
        console.table(results);
        console.log(err);
    });

    whatToDo();
}

// Add Department function
function addDept(answers) {
    db.query('INSERT INTO department(name) VALUES(?);\n', [answers.addDepartment], function (err, results) {     
        console.table(results);
        viewAllDepts();
        console.log('Department successfully added!\n');
        console.log(err);
    });

    whatToDo();
}

// Add Role function
function addRole(answers) {
    db.query('INSERT INTO role(title, salary) VALUES(?, ?);\n', [answers.addRole, answers.addSalary], function (err, results) {
        console.table(results);
        viewAllRoles();
        console.log(err);
    });

    whatToDo();
}

// Add New Employee function
function addNewEmployee(answers) {
    console.log(answers);
    db.query('INSERT INTO employee(first_name, last_name) VALUES(?, ?);\n', [answers.addEmployeeFirstName, answers.addEmployeeLastName], function(err, results) {
        console.table(results);
        viewAllEmployees();
        console.log(err);
    });

    whatToDo();
}

// Update Employee Role function
function updateEmployeeRole(answers) {
    console.log(answers);
    db.query('UPDATE employee SET role_id = ? WHERE id = ?;\n', [answers.updateEmployeeRole, answers.selectEmployee], function(err, results) {
        console.table(results);
        viewAllEmployees();
        console.log(err);
    });

    whatToDo();
}

function exitProgram(answers) {
    if (answers.exitProgram === 'Yes') {
        console.log(`\n
 _______                           __                         __ 
/       \                         /  |                       /  |
$$$$$$$  |__    __  ______        $$ |____  __    __  ______ $$ |
$$ |__$$ /  |  /  |/      \       $$      \/  |  /  |/      \$$ |
$$    $$<$$ |  $$ /$$$$$$  |      $$$$$$$  $$ |  $$ /$$$$$$  $$ |
$$$$$$$  $$ |  $$ $$    $$ |      $$ |  $$ $$ |  $$ $$    $$ $$/ 
$$ |__$$ $$ \__$$ $$$$$$$$/       $$ |__$$ $$ \__$$ $$$$$$$$/ __ 
$$    $$/$$    $$ $$       |      $$    $$/$$    $$ $$       /  |
$$$$$$$/  $$$$$$$ |$$$$$$$/       $$$$$$$/  $$$$$$$ |$$$$$$$/$$/ 
         /  \__$$ |                        /  \__$$ |            
         $$    $$/                         $$    $$/             
          $$$$$$/                           $$$$$$/              `);
    } else {
        whatToDo();
    }
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

displayHeader();
whatToDo();