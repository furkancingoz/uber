const { passengerDatabase, driverDatabase } = require('./database');
const printBookingHistory = require('./lib/print-booking-history');

(async function main() {
  const stefan = await driverDatabase.findBy('name', 'Stefan');
  const armagan = await passengerDatabase.findByName('Armagan');

  if (!armagan) {
    console.log('Armagan not found');
    return;
  }

  armagan.book(stefan, 'Kreuzberg', 'Wannsee');

  await passengerDatabase.update(armagan);

  printBookingHistory(armagan);
})();