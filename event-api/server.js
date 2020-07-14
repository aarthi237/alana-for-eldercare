const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {
    getEvents,
    addEvent
} = require('./helper')

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

app.post('/event', async (req, res) => {
    let event_res = {}
    const data = await addEvent(req.query)
    console.log(data)
    res.status(200).send(data)
})

app.listen(3000, function () {
    console.log('listening on 3000')
})