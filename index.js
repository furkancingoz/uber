const express = require('express')
const { passengerDatabase } = require('./database')
const flatted = require('flatted')

const app = express()

    app.set('view engine', 'pug')

app.get('/passengers', async (req, res) => {
    const passengers = await passengerDatabase.load()
    //res.send(flatted.stringify(passengers))
    res.render('passengers', { passengers })
})

app.get('/passengers/:passengerId', async (req, res) => {
    const passenger = await passengerDatabase.find(req.params.passengerId)
    if (!passenger) return res.status(404).send('Cannot find passengers')
    res.render('passenger', { passenger })
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('started listening 3000')
})