var mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'dm_pw',
    password: 'password',
    database: 'su_lifang_fleuriste'
})

module.exports = {
    pool
}