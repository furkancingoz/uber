const express = require('express')
const passengerRouter = require('./routes/passenger')
const indexRouter = require('./routes/index')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use('/passengers', passengerRouter)
app.use('/', indexRouter)


app.listen(3000, () => {
    console.log('started listening 3000')
})