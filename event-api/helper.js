const {
    getEventsDataFromDb
} = require('./eventdata')

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