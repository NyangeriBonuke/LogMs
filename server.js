const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const port = process.env.port
const Producer = require('./producer')
const producer = new Producer()

app.use(bodyParser.json("application/json"))

app.post('/sendLog', async(req, res, next) => {
    await producer.publishMessage(req.body.logType, req.body.message)
    res.send()
})

app.listen(8000, () => {
    console.log(`Listening on port ${port}`)
})