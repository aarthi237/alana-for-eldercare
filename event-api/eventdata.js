const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./events_data.db');

exports.getEventsDataFromDb = async (eName, locName, type, payType, dateRange) => {
    let sql = `select en.name, e.type,e.payment_type, e.cost,datetime(e.datetime,'unixepoch') as datetime,
        en.category, l.city, l.address from events as e, event_name as en, location as 
        l where e.event_id = en.event_id AND e.location_id = l.location_id 
        AND en.name LIKE "${eName}" AND l.city LIKE "${locName}" AND e.type LIKE "${type}"
        AND e.payment_type LIKE "${payType}" `

    if (dateRange != null) {
        sql += `AND e.datetime >= ${dateRange[0]} AND e.datetime <= ${dateRange[1]}`
    }
    try {
        console.log(sql)
        const rows = await get_async(sql);
        console.log(rows);
        return Array.isArray(rows) ? rows : [rows]
    } catch (e) {
        console.log(e)
        return [];
    }
};


exports.insertEvent = async (eventId, eventLocId, type, payType, cost, dateTime) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO events VALUES(?,?,?,?,?,?)`,
            [eventId, eventLocId, type, payType, cost, dateTime],
            function (err) {
                if (err) {
                    reject(err);
                }
                console.log(this.lastID);
                resolve(`A row has been inserted with rowid ${this.lastID}`);
            });
    });
}

get_async = (sql) => {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};