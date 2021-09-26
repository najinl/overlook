export default class Customer {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0;
  }

  addCustomerBooking(bookingData) {
    bookingData.forEach(booking => {
      if(booking.userID === this.id) {
        this.bookings.push(booking);
      }
    })
  }

  calculateTotalSpent(rooms) {
    this.bookings.forEach(booking => {
      rooms.forEach(room => {
        if(booking.roomNumber === room.number) {
          this.totalSpent += room.costPerNight;
        }
      })
    })
    return this.totalSpent.toFixed(2);
  }

}
