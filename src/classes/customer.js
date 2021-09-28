export default class Customer {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0;
  }

  addCustomerBooking(bookingData) {
    this.bookings = [];
    bookingData.forEach(booking => {
      if(booking.userID === this.id) {
        this.bookings.push(booking);
      }
    })
  }

  calculateTotalSpent(rooms) {
    this.totalSpent = 0;
    this.bookings.forEach(booking => {
      rooms.forEach(room => {
        if(booking.roomNumber === room.number) {
          this.totalSpent += room.costPerNight;
        }
      })
    })
    return this.totalSpent.toFixed(2);
  }

  findFutureBookings(currentDate) {
    return this.bookings.reduce((futureBookings, booking) => {
      if(new Date(booking.date) >= new Date(currentDate)) {
        futureBookings.push(booking)
      }
    return futureBookings;
    }, [])
  }

  findPastBookings(currentDate) {
    return this.bookings.reduce((pastBookings, booking) => {
      if(new Date(booking.date) < new Date(currentDate)) {
        pastBookings.push(booking)
      }
    return pastBookings;
    }, [])
  }

  addNewCustomerBooking(addedBooking) {
    if(!this.bookings.includes(addedBooking)) {
    this.bookings.push(addedBooking);
    }
  }
}
