const {
    getEventsDataFromDb,
    insertEvent
} = require('./eventdata')
const moment = require('moment')

exports.getEvents = async (param) => {
    console.log(param);
    const eName = translateName(param.event_name);
    const locName = translateLocName(param.location_name);
    const type = param.type ? param.type : '%';
    const payType = param.pay_type ? param.pay_type : '%';

    let dataFromDb = await getEventsDataFromDb(eName, locName, type, payType);
    const data = filterDataByDayTime(dataFromDb, param.event_datetime, param.event_session);
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
    }
    if (event_res_text.length == 0) {
        result = false;
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
    const dateTime = param.date_time ? moment(param.date_time, "D/M/YYYY H:mm").unix() : moment().unix();
    return await insertEvent(eId, eLocId, type, payType, cost, dateTime);
}

function trimString(str) {
    return str.replace(/\s+/g, '').toLowerCase();
}

function filterDataByDayTime(data, dateStr, daySess) {
    const daySession = translateDaySession(daySess);
    const allowedDays = getAllowedDays(dateStr)
    let filterdData = []
    if (data.length) {
        data.forEach(eventData => {
            const dateTime = new Date(eventData.datetime)
            const day = dateTime.getDay()
            if (allowedDays.includes(day)) {
                if (daySession != null) {
                    if (daySession[0] <= dateTime.getHours() && daySession[1] >= dateTime.getHours()) {
                        filterdData.push(eventData)
                    }
                } else {
                    filterdData.push(eventData)
                }
            }
        });
    }
    return filterdData
}


function getAllowedDays(dateStr) {
    if (!dateStr) {
        return [0, 1, 2, 3, 4, 5, 6];
    }
    let allowedDays = []
    dateStr = trimString(dateStr);
    const anyDay = ["anyday", "anydate", "alldate", "allday"];
    if (anyDay.includes(dateStr)) {
        return [0, 1, 2, 3, 4, 5, 6];
    }

    switch (dateStr) {
        case 'monday':
            return [1];
            break;
        case 'tuesday':
            return [2];
            break;
        case 'wednesday':
            return [3];
            break;
        case 'thursday':
            return [4];
            break;
        case 'friday':
            return [5];
            break;
        case 'saturday':
            return [6]
            break;
        case 'sunday':
            return [0]
            break;
        case 'weekday':
            return [1, 2, 3, 4, 5]
            break;
        case 'weekend':
            return [0, 6]
            break;
        case 'today':
            return [moment().day()];
            break;
        case 'tomorrow':
            return [(moment().day() + 1) % 7];
            break;
        case 'dayaftertomorrow':
            return [(moment().day() + 2) % 7];
            break;
        default:
            return [moment().day()]
            break;
    }
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

function translateDaySession(daySession) {
    if (!daySession) {
        return null
    }
    daySession = trimString(daySession);
    let starttime = 0
    let endtime = 23
    switch (daySession) {
        case 'morning':
        case 'mornings':
            starttime = 0;
            endtime = 11;
            break;
        case 'afternoon':
        case 'afternoons':
        case 'noon':
        case 'noons':
            starttime = 12;
            endtime = 15;
            break;
        case 'evening':
        case 'evenings':
            starttime = 16;
            endtime = 23;
            break;
        default:
            starttime = 0;
            endtime = 23;
            break;
    }
    return [starttime, endtime];
}