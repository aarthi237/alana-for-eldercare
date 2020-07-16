const {
    getEventsDataFromDb,
    insertEvent
} = require('./eventdata')
const moment = require('moment')

exports.getEvents = async (param) => {
    const eName = translateName(param.event_name);
    const locName = translateLocName(param.location_name);
    const type = param.type ? param.type : '%';
    const payType = param.pay_type ? param.pay_type : '%';
    const dateRange = translateDate(param.event_datetime);

    let data = await getEventsDataFromDb(eName, locName, type, payType, dateRange);
    let event_res_text = []
    let result = true;
    if (data.length && data.length > 0) {
        data.forEach(eventData => {
            const dateTime = new Date(eventData.datetime)
            const month = dateTime.toLocaleString('default', {
                month: 'long'
            });
            event_desc = `${eventData.name} event on ${dateTime.getDate()} ${month} in ${eventData.address}, ${eventData.city} at ${dateTime.getHours()} hour and ${dateTime.getMinutes()} minutes`;
            event_res_text.push(event_desc)
        });
    } else {
        event_res_text = []
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

function trimString(str) {
    return str.replace(/\s+/g, '').toLowerCase();
}

function translateDate(dateStr) {
    if (!dateStr) {
        return null;
    }
    dateStr = trimString(dateStr);
    const anyDay = ["anyday", "anydate", "alldate", "allday"];
    if (anyDay.includes(dateStr)) {
        return null
    }

    let startday = moment().isoWeekday()
    let endday = moment().isoWeekday()
    console.log('startday', startday)
    switch (dateStr) {
        case 'monday':
            startday = moment().isoWeekday() > 1 ? moment().day(8) : moment().day(1);
            endday = startday;
            break;
        case 'tuesday':
            startday = moment().isoWeekday() > 2 ? moment().day(9) : moment().day(2);
            endday = startday;
            break;
        case 'wednesday':
            startday = moment().isoWeekday() > 3 ? moment().day(10) : moment().day(3);
            endday = startday;
            break;
        case 'thursday':
            startday = moment().isoWeekday() > 4 ? moment().day(11) : moment().day(4);
            endday = startday;
            break;
        case 'friday':
            startday = moment().isoWeekday() > 5 ? moment().day(12) : moment().day(5);
            endday = startday;
            break;
        case 'saturday':
            startday = moment().isoWeekday() > 6 ? moment().day(13) : moment().day(6);
            endday = startday;
            break;
        case 'sunday':
            startday = moment().isoWeekday() > 7 ? moment().day(14) : moment().day(7);
            endday = startday;
            break;
        case 'weekday':
            startday = moment().day(moment().isoWeekday());
            endday = moment().day(5);
            break;
        case 'weekend':
            startday = moment().day(6);
            endday = moment().day(7);
            break;
        case 'today':
            startday = moment().day(moment().isoWeekday());
            endday = startday;
            break;
        case 'tomorrow':
            startday = moment().day(moment().isoWeekday() + 1);
            endday = startday;
            break;
        case 'dayaftertomorrow':
            startday = moment().day(moment().isoWeekday() + 2);
            endday = startday;
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


function getStart(startday) {
    console.log(startday)
    fromTime = moment(startday, 'D/M/YYYY');
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

function translateName(ename) {
    if (!ename) {
        return '%'
    }
    ename = trimString(ename);
    const anyEvent = ['anyevent', 'allevent', '']
    if (anyEvent.includes(ename)) {
        return '%'
    }
    return ename;
}

function translateLocName(locName) {
    if (!locName) {
        return '%'
    }
    locName = trimString(locName);
    const anyLoc = ['anylocation', 'alllocation', 'anyplace', 'alllocation']
    if (anyLoc.includes(locName)) {
        return '%'
    }
    return locName;
}