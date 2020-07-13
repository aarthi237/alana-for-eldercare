const {
    getEventsDataFromDb,
    insertEvent
} = require('./eventdata')
const moment = require('moment')

exports.getEvents = async (event_name) => {
    let data = await getEventsDataFromDb(event_name);
    console.log(data)
    let event_res_text = []
    if (data.length && data.length > 0) {
        event_res_text.push("There are few events happening with your requested crieteria.");
        event_res_text.push("Let me list for you");
        data.forEach(eventData => {
            const dateTime = new Date(eventData.datetime)
            const month = dateTime.toLocaleString('default', {
                month: 'long'
            });
            event_desc = `${eventData.name} event on ${dateTime.getDate()} ${month} at ${dateTime.getHours()} hour and ${dateTime.getMinutes()} minutes`;
            event_res_text.push(event_desc)
        });
    } else {
        event_res_text.push("Sorry there is no event for your request");
    }

    event_res = {
        event_res_text: event_res_text
    }
    return event_res;
};

exports.addEvent = async (param) => {
    const eId = param.event_id ? param.event_id : 1
    const eLocId = param.location_id ? param.location_id : 1;
    const type = param.type ? param.type : 'online';
    const payType = param.pay_type ? param.pay_type : 'free';
    const cost = param.cost ? param.cost : 0;
    const dateTime = param.date_time ? moment(param.date_time, "D/M/YYYY H:mm").unix() : Date.now();
    return await insertEvent(eId, eLocId, type, payType, cost, dateTime);
}