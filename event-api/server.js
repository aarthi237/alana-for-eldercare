const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/events', (req, res) => {
    let event_res = {}
    if (req.query.event_name == "yoga") {
        event_res = {
            event_res_text: ["There are few events happening with your requested crieteria. Let me list for you",
                "Monday morning 9o clock yoga class",
                "Saturday evening 6 o clock yoga class"
            ]
        }
    } else {
        event_res = {
            event_res_text: ["Sorry there is no event for your request"]
        }
    }

    res.status(200).json(event_res)
})

app.listen(3000, function () {
    console.log('listening on 3000')
})