const express = require('express')
const { passengerDatabase } = require('./database')
const flatted = require('flatted')

const app = express()

app.get('/passengers', async (req, res) => {
    const passengers = await passengerDatabase.load()
    res.send(flatted.stringify(passengers))
})

app.get('/', (req, res) => {
    res.send('homepage')
})

app.listen(3000, () => {
    console.log('started listening 3000')
})