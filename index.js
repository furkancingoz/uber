const express = require('express')
const { passengerDatabase } = require('./database')

const flatted = require('flatted')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.get('/passengers', async (req, res) => {
    const passengers = await passengerDatabase.load()
    //res.send(flatted.stringify(passengers))
    res.render('passengers', { passengers })
})

app.post('/passengers', async (req, res) => {
    const passenger =  await passengerDatabase.insert(passenger)
   
    res.send(passenger)
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