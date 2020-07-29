const {
    getLogDataFromDb,
} = require('./logdata')
const moment = require('moment')

exports.getLogStats = async (param) => {
    console.log(param);

    let dataFromDb = await getLogDataFromDb(param.sender_id);
    return processLogs(dataFromDb);
};


function processLogs(data) {
    responsetimes = []
    conversation = []
    turns = []
    usertime = 0
    bottime = 0
    totalUserTurns = 0
    searchCount = 0
    userTurnsPerSearch = 0
    data.forEach(event => {
        //console.log(event)

        eventData = JSON.parse(event.data)
        if (event.type_name === "bot") {
            //console.log('bot', eventData.text, eventData.timestamp)
            conversation.push('bot: ' + eventData.text)
            if (getResponseTime(usertime, eventData.timestamp)) {
                responsetimes.push(getResponseTime(usertime, eventData.timestamp))
            }
            usertime = 0
            bottime = 0
            if (checkEventSearchStart(eventData.text)) {
                userTurnsPerSearch = 0
            }
            if (checkEventSearchEnd(eventData.text)) {
                searchCount++;
                turns.push(userTurnsPerSearch)
            }
        }
        if (event.type_name === "user") {
            //console.log('user', eventData.text, eventData.timestamp)
            conversation.push('user: ' + eventData.text)
            usertime = eventData.timestamp
            totalUserTurns++;
            userTurnsPerSearch++;
        }
    });

    return {
        "resTimes": responsetimes,
        "avgResTime": getAverage(responsetimes),
        "conversation": conversation,
        "totalUserTurns": totalUserTurns,
        "eventSearchCount": searchCount,
        "turnsPerSearch": turns
    }
}


function getResponseTime(usertime, bottime) {
    if (usertime == 0 || bottime == 0) {
        return 0;
    } else {
        return (bottime - usertime);
    }
}

function getAverage(resTimes) {
    if (resTimes.length == 0) {
        return 0;
    }
    let sum = resTimes.reduce((previous, current) => current += previous);
    return sum / resTimes.length;
}

function checkEventSearchStart(botText) {
    console.log(botText)
    const whichEvent = ["Would you like to take part in any social events around you?",
        "Are you interested in attending any social events around you? ",
        "Do you prefer to take part in any social events around you? ",
        "Some social events are happening around, do you wish to take part? ",
        "Which event you wish to attend?"
    ]
    const found = whichEvent.find(e => botText.includes(e))
    return found ? true : false;
}

function checkEventSearchEnd(botText) {
    console.log(botText)
    const whichEvent = ["Would you be interested in any other events",
        "would you like to search for a different event"
    ]
    const found = whichEvent.find(e => botText.includes(e))
    return found ? true : false;
}