const sqlite3 = require('sqlite3').verbose();
const logdb = new sqlite3.Database('./chat_log.db');

exports.getLogDataFromDb = async (senderId) => {
    let sql = `select * from events where sender_id LIKE "${senderId}" order by timestamp`;

    try {
        //console.log(sql)
        const rows = await get_async(sql);
        //console.log(rows);
        return Array.isArray(rows) ? rows : [rows]
    } catch (e) {
        console.log(e)
        return [];
    }
};


exports.getUserSessions = async () => {
    let sql = `select DISTINCT sender_id from events order by timestamp`;

    try {
        //console.log(sql)
        const rows = await get_async(sql);
        //console.log(rows);
        return Array.isArray(rows) ? rows : [rows]
    } catch (e) {
        console.log(e)
        return [];
    }
};



const get_async = (sql) => {
    return new Promise((resolve, reject) => {
        logdb.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};