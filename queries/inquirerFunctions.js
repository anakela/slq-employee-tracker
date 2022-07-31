// const db = require('../db/connection');
// const {
//     whatToDo,
// } = require('../index');

// // View All Departments function
// function viewAllDepts() {
//     db.query(`\n\n
//     SELECT department.id AS 'Department ID', department.name AS 'Department Name'
//     FROM department
//     ORDER BY department.id;\n`, function (err, results) {
//         console.table(results);
//         console.log(err);
//     });

//     whatToDo();
// }

// // View All Roles function
// function viewAllRoles() {
//     db.query(`SELECT role.id AS 'Role ID', role.title AS Title, department.name AS Department, CONCAT('$', role.salary) AS Salary
//     FROM role
//     LEFT JOIN department ON role.department_id=department.id
//     ORDER BY role.id;\n`, function(err, results) {
//         console.table(results);
//         console.log(err);
//     });

//     whatToDo();
// }

// // View All Employees function
// function viewAllEmployees() {
//     db.query(`SELECT employee.id AS 'Employee ID', 
//     CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', 
//     role.title AS 'Job Title', 
//     department.name AS 'Department', 
//     CONCAT('$', role.salary) AS 'Salary', 
//     CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
//     FROM employee
//         INNER JOIN role ON employee.role_id=role.id 
//         INNER JOIN department ON role.department_id=department.id
//         LEFT JOIN employee AS m ON employee.manager_id=m.id
//     ORDER BY employee.id;\n`, function (err, results) {
//         console.table(results);
//         console.log(err);
//     });

//     whatToDo();
// }

// // Add Department function
// function addDept(answers) {
//     db.query('INSERT INTO department(name) VALUES(?);\n', [answers.addDepartment], function (err, results) {     
//         console.table(results);
//         viewAllDepts();
//         console.log('Department successfully added!\n');
//         console.log(err);
//     });
// }

// // Add Role function
// function addRole(answers) {
//     db.query('INSERT INTO role(title, salary) VALUES(?, ?);\n', [answers.addRole, answers.addSalary], function (err, results) {
//         console.table(results);
//         viewAllRoles();
//         console.log(err);
//     });
// }

// // Add New Employee function
// function addNewEmployee(answers) {
//     console.log(answers);
//     db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);\n`, [answers.addEmployeeFirstName, answers.addEmployeeLastName, answers.addEmployeeRole, answers.addEmployeeManager], function(err, results) {
//         console.table(results);
//         viewAllEmployees();
//         console.log(err);
//     });
// }

// // Update Employee Role function
// function updateEmployeeRole(answers) {
//     console.log(answers);
//     db.query(`UPDATE employee SET role_id = ? WHERE id = ?;\n`, [answers.updateEmployeeRole, answers.selectEmployee], function(err, results) {
//         console.table(results);
//         viewAllEmployees();
//         console.log(err);
//     });
// }

// function exitProgram(answers) {
//     if (answers.exitProgram === 'Yes') {
//         console.log(`\n
//  _______                           __                         __ 
// /       \                         /  |                       /  |
// $$$$$$$  |__    __  ______        $$ |____  __    __  ______ $$ |
// $$ |__$$ /  |  /  |/      \       $$      \/  |  /  |/      \$$ |
// $$    $$<$$ |  $$ /$$$$$$  |      $$$$$$$  $$ |  $$ /$$$$$$  $$ |
// $$$$$$$  $$ |  $$ $$    $$ |      $$ |  $$ $$ |  $$ $$    $$ $$/ 
// $$ |__$$ $$ \__$$ $$$$$$$$/       $$ |__$$ $$ \__$$ $$$$$$$$/ __ 
// $$    $$/$$    $$ $$       |      $$    $$/$$    $$ $$       /  |
// $$$$$$$/  $$$$$$$ |$$$$$$$/       $$$$$$$/  $$$$$$$ |$$$$$$$/$$/ 
//          /  \__$$ |                        /  \__$$ |            
//          $$    $$/                         $$    $$/             
//           $$$$$$/                           $$$$$$/              `);
//     } else {
//         whatToDo();
//     }
// }

// function displayHeader() {
//     console.log(`\n
//      ________                       __                                     
//     /        |                     /  |                                    
//     $$$$$$$$/ _____  ____   ______ $$ | ______  __    __  ______   ______  
//     $$ |__   /     \/    \ /      \$$ |/      \/  |  /  |/      \ /      \ 
//     $$    |  $$$$$$ $$$$  /$$$$$$  $$ /$$$$$$  $$ |  $$ /$$$$$$  /$$$$$$  |
//     $$$$$/   $$ | $$ | $$ $$ |  $$ $$ $$ |  $$ $$ |  $$ $$    $$ $$    $$ |
//     $$ |_____$$ | $$ | $$ $$ |__$$ $$ $$ \__$$ $$ \__$$ $$$$$$$$/$$$$$$$$/ 
//     $$       $$ | $$ | $$ $$    $$/$$ $$    $$/$$    $$ $$       $$       |
//     $$$$$$$$/$$/  $$/  $$/$$$$$$$/ $$/ $$$$$$/  $$$$$$$ |$$$$$$$/ $$$$$$$/ 
//                           $$ |                 /  \__$$ |                  
//      __       __          $$ |                 $$    $$/                   
//     /  \     /  |         $$/                   $$$$$$/                    
//     $$  \   /$$ | ______  _______   ______   ______   ______   ______      
//     $$$  \ /$$$ |/      \/       \ /      \ /      \ /      \ /      \     
//     $$$$  /$$$$ |$$$$$$  $$$$$$$  |$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  |    
//     $$ $$ $$/$$ |/    $$ $$ |  $$ |/    $$ $$ |  $$ $$    $$ $$ |  $$/     
//     $$ |$$$/ $$ /$$$$$$$ $$ |  $$ /$$$$$$$ $$ \__$$ $$$$$$$$/$$ |          
//     $$ | $/  $$ $$    $$ $$ |  $$ $$    $$ $$    $$ $$       $$ |          
//     $$/      $$/ $$$$$$$/$$/   $$/ $$$$$$$/ $$$$$$$ |$$$$$$$/$$/           
//                                            /  \__$$ |                      
//                                            $$    $$/                       
//                                             $$$$$$/                        \n`);
// }

// module.exports = {
//     viewAllDepts,
//     viewAllRoles,
//     viewAllEmployees,
//     addDept,
//     addRole,
//     addNewEmployee,
//     updateEmployeeRole,
//     exitProgram,
//     displayHeader,
// }