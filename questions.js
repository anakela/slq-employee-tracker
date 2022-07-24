const db = require('./db/connection');

const deptChoices = async () => {
    return new Promise(function (resolve, reject) {
        db.query('SELECT id AS value, name FROM department;', function (err, results) {

            if (err) {
                reject(err);
            };
            resolve(results);
        });
    });

};

(async () => {
    const test = await deptChoices();
    console.log(test);
})();

// const deptChoices = async () => {
//     let allDepts;
//     db.query('SELECT id AS value, name FROM department;', function (err, results) {
//         // console.log(results);
//         // console.log(err);
//         allDepts = results;
//         console.log(allDepts);
//     });
//     // console.log(allDepts);
//     return allDepts;
// };

// deptChoices();

module.exports = {
    deptChoices,
}