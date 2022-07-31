const db = require('../db/connection');

const deptChoices = async () => {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT id AS 'Department ID', name AS 'Department Name' FROM department;`, function (err, results) {
            if (err) {
                reject(err);
            };
            resolve(results);
        });
    });

};

const roleChoices = async () => {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT id AS value, title AS name FROM role;`, function (err, results) {
            if (err) {
                reject(err);
            };
            resolve(results);
        });
    });
};

const employeeChoices = async () => {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT id AS value, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee;`, function (err, results) {
            if (err) {
                reject(err);
            };
            resolve(results);
        });
    });
};

// (async () => {
//     const test = await deptChoices();
//     const test = await roleChoices();
//     const test = await employeeChoices();
//     console.log(test);
// })();

module.exports = {
    deptChoices,
    roleChoices,
    employeeChoices,
}