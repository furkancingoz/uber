const { passengerDatabase, driverDatabase } = require('../database')
const flatted = require('flatted')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const passengers = await passengerDatabase.load()
    //res.send(flatted.stringify(passengers))
    res.render('passengers', { passengers })
})

router.post('/', async (req, res) => {
    const passenger = await passengerDatabase.insert(req.body)
    res.send(passenger)
})

router.delete('/:passengerId', async (req, res) => {
    await passengerDatabase.removeBy('id', (req.params.passengerId))

    res.send('OK')
})

router.get('/:passengerId', async (req, res) => {
    const passenger = await passengerDatabase.find(req.params.passengerId)
    if (!passenger) return res.status(404).send('Cannot find passengers')

    res.render('passenger', { passenger })
})  

router.post('/:passengerId/bookings', async (req, res) => {
    const { driverId, origin, destination } = req.body
    const { passengerId } = req.params

    const passenger = await passengerDatabase.find(passengerId)
    const driver = await driverDatabase.find(driverId)
    
    passenger.book(driver, origin, destination)
    await passengerDatabase.update(passenger)

    res.send(flatted.stringify(passenger))
})

module.exports = router