const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./events_data.db');

exports.getEventsDataFromDb = async (event_name) => {
    var sql = `select en.name, e.type,e.payment_type, e.cost,datetime(e.datetime,'unixepoch') as datetime,
        en.category, l.city, l.address from events as e, event_name as en, location as 
        l where e.event_id = en.event_id AND e.location_id = l.location_id 
        AND en.name = "${event_name}"`
    try {
        const rows = await get_async(sql);
        console.log(rows);
        return Array.isArray(rows) ? rows : [rows]
    } catch (e) {
        console.log(e)
        return [];
    }
};

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