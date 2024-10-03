const BaseDatabase = require('./base-database')
const Passenger = require('../models/passenger')

class PassengerDatabase extends BaseDatabase {
  async findByName(name) {
    const objects = await this.load(); // Await ile diziyi bekleyin

    return objects.find(o => o.name === name); // Burada artık dizi üzerinden find çalıştırabilirsiniz
  }
}

module.exports = new PassengerDatabase(Passenger)
