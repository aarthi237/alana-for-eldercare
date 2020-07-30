const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {
    getEvents,
    addEvent
} = require('./event-data/eventHelper')
const {
    getLogStats,
    getAllLogStats
} = require('./stat-data/statHelper')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/events', async (req, res) => {
    let event_res = {}
    const data = await getEvents(req.query)
    res.status(200).json(data)
})

app.get('/log-stats', async (req, res) => {
    let event_res = {}
    let param = req.query
    const data = await getLogStats(param.sender_id)
    res.status(200).json(data)
})

app.get('/all-log', async (req, res) => {
    let event_res = {}
    const data = await getAllLogStats()
    res.status(200).json(data)
})

app.post('/event', async (req, res) => {
    let event_res = {}
    const data = await addEvent(req.query)
    console.log(data)
    res.status(200).send(data)
})

app.listen(3000, function () {
    console.log('listening on 3000')
})