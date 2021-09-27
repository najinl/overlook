export default class Customer {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.bookings = [],
    this.totalSpent = 0;
  }

  addCustomerBooking(bookingData) {
    this.bookings = []; //<----feels like there is a better place to put this!
    bookingData.forEach(booking => {
      if(booking.userID === this.id) {
        this.bookings.push(booking);
      }
    })
  }

  calculateTotalSpent(rooms) {
    this.totalSpent = 0; //<---I think I'd need to zero this out each time I call the function, since it's only coming from the bookings.
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
      if(booking.date >= currentDate) {
        futureBookings.push(booking)
      }
    return futureBookings;
    }, [])
  }

  findPastBookings(currentDate) {
    return this.bookings.reduce((pastBookings, booking) => {
      if(booking.date < currentDate) {
        pastBookings.push(booking)
      }
    return pastBookings;
    }, [])
  }
}
