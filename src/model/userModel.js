const mysql = require('mysql2/promise');
const conn = require('../config/db_async.js').pool



async function getUser(name, password) {
    console.log(name, password)
    let user = await conn.query('SELECT id_user FROM user WHERE login_user = ? AND password_user = ?', [name, password])
    let employee = await conn.query('SELECT id_user, is_employee FROM user WHERE login_user = ? AND password_user = ?', [name, password])

    employee = employee[0]
    console.log("employee", employee)

    user = user[0]
    console.log("user", user)

    if (user === undefined || user.length <= 0 || employee === undefined || employee.length <= 0) {
        return null;
    }
    if (employee[0].is_employee == 1) {
        console.log('ADMIN ', name);
        return employee[0]

    } else {
        console.log('CLIENT ', name);
        return user[0]
    }
}

async function getUserById(id){
    let user = await conn.query('SELECT * FROM user WHERE id_user  = ?', [id])
    return user[0]
}

async function isAdmin(userId){
    await getUserById(userId).then((res) => {
        return res[0].is_employee == 1
    })
    
}


module.exports = {
    getUser: getUser, 
    isAdmin,
    getUserById
}


/*const db = require('../config/db')
conn = db.mysql

function getUser(name, password, callback) {
    conn.query(`SELECT id_user, is_employee FROM user WHERE login_user = "${name}" AND password_user = "${password}"`, function (error, results, fields) {
        if (error) throw error;
        callback(results[0])
    });
}


module.exports = {
    getUser: getUser
}

*/
