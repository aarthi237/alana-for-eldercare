const {
    getEventsDataFromDb,
    insertEvent
} = require('./eventdata')
const moment = require('moment')

exports.getEvents = async (param) => {
    const eName = param.event_name ? param.event_name : "%"
    const locName = param.location_name ? param.location_name : "%";
    const type = param.type ? param.type : '%';
    const payType = param.pay_type ? param.pay_type : '%';
    //const cost = param.cost ? param.cost : 0;
    const dateTime = param.event_datetime ? param.event_datetime : "any";
    const dateRange = translateDate(dateTime);
    let data = await getEventsDataFromDb(eName, locName, type, payType, dateRange);
    //console.log(data)
    let event_res_text = []
    let result = true;
    if (data.length && data.length > 0) {
        //event_res_text.push("There are few events happening with your requested crieteria.");
        //event_res_text.push("Let me list for you");
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
        result = false
    }

    event_res = {
        event_res_text: event_res_text,
        result: result
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

function translateDate(dateStr) {
    console.log(dateStr)
    dateStr = dateStr.replace(/\s+/g, '').toLowerCase();
    let startday = moment().day()
    let endday = moment().day()
    switch (dateStr) {
        case 'monday':
            startday = moment().day() > 1 ? moment().day(8) : moment().day(1);
            endday = startday;
            break;
        case 'tuesday':
            startday = moment().day() > 2 ? moment().day(9) : moment().day(2);
            endday = startday;
            break;
        case 'wednesday':
            startday = moment().day() > 3 ? moment().day(10) : moment().day(3);
            endday = startday;
            break;
        case 'thursday':
            startday = moment().day() > 4 ? moment().day(11) : moment().day(4);
            endday = startday;
            break;
        case 'friday':
            startday = moment().day() > 5 ? moment().day(12) : moment().day(5);
            endday = startday;
            break;
        case 'saturday':
            startday = moment().day() > 6 ? moment().day(13) : moment().day(6);
            endday = startday;
            break;
        case 'sunday':
            startday = moment().day() > 7 ? moment().day(14) : moment().day(7);
            endday = startday;
            break;
        case 'weekday':
            startday = moment().day(moment().day());
            endday = moment().day(5);
            break;
        case 'weekend':
            startday = moment().day(6);
            endday = moment().day(7);
            break;
        default:
            startday = moment().day()
            endday = startday
            break;
    }

    fromTime = getStart(startday)
    toTime = getEnd(endday)
    console.log(92, fromTime, toTime)
    console.log('fromtime ', moment.unix(fromTime).local());
    console.log('totime ', moment.unix(toTime).local());
    return [fromTime, toTime]
}


function getStart(dateStr) {
    console.log(dateStr)
    fromTime = moment(dateStr, 'D/M/YYYY');
    fromTime.set({
        hour: 0,
        minute: 0,
        second: 0
    });
    console.log(107, fromTime)
    console.log(107, fromTime.unix())
    return fromTime.unix()
}


function getEnd(dateStr) {
    toTime = moment(dateStr, 'D/M/YYYY');
    toTime.set({
        hour: 23,
        minute: 59,
        second: 59
    });
    console.log(127, toTime)
    console.log(127, toTime.unix())
    return toTime.unix()
}