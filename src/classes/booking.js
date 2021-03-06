export default class Booking {
  constructor(booking) {
    this.id = booking.id,
    this.userID = parseInt(booking.userID),
    this.date = new Date(booking.date).toLocaleDateString(),
    this.roomNumber = parseInt(booking.roomNumber),
    this.roomServiceCharges = [];
    this.cost = 0;
  }

  calculateBookingCost(rooms) {
    rooms.forEach(room => {
      if(room.number === this.roomNumber) {
        this.cost = room.costPerNight;
      }
    })
  }
}
