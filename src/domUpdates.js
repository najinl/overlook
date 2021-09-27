import {userFirstName, dateSelector, availableRooms, checkBoxes, userStatistics,
  statisticsBtn, bookingStation, bookingHomeBtn, bookingHistoryBtn,
  bookingHistory, futureBookings, pastBookings} from './domElements';

let domUpdates = {
  greetCustomer(customerName) {
    userFirstName.innerHTML = customerName;
  },

  updateCalendar(date) {
    dateSelector.innerHTML += `<label for="dateSelector">Choose Your Dates:</label>
    <input type="date" id="dateSelector" name="trip-start" value="${date}"
    min="2020-01-08" max="2024-12-31">`
  },
  findAvailableRooms(date, bookings) {
    availableRooms.innerHTML = '';
    let dateSelected = date.split('-'). join('/');
    dateSelected = new Date(dateSelected).toLocaleDateString();
      return bookings.reduce((acc, booking) => {
        if(booking.date === dateSelected) {
          acc.push(booking.roomNumber)
        }
        return acc;
      },[])
  },

  findFilteredRooms() {
    let roomTypes = [];
    checkBoxes.forEach(box => {
      if(box.checked) {
        roomTypes.push(box.value)
      }
    })
    return roomTypes;
  },

  filterByRoomType(date, rooms, bookings) {
    let roomsAvailable = this.findAvailableRooms(date, bookings);
    let selectedRoomType = this.findFilteredRooms();
    rooms.forEach(room => {
      let bidetStatus;
      if(room.bidet) {
        bidetStatus = 'Bidet Included'
      } else {
        bidetStatus = 'No Bidet'
      }
      if(!roomsAvailable.includes(room.number) && selectedRoomType.length < 1) {
        availableRooms.innerHTML += `<section class="room-card">
          <h2 class="room-type">${room.roomType.toUpperCase()}</h2>
          <div class="room-data">
            <img class="bed-img"src="./images/bed.svg" alt="Bed">
            <div class="flex-column">
              <p>Room Number: ${room.number}</p>
              <p>${room.numBeds} ${room.bedSize.toUpperCase()}</p>
              <p>${bidetStatus}</p>
              <p>$${room.costPerNight} per night</p>
            </div>
        </div>
        <button class="book-room" id="bookRoom">Book Room</button>
        </section>`
      } else if(!roomsAvailable.includes(room.number) && selectedRoomType.includes(room.roomType)) {
        availableRooms.innerHTML += `<section class="room-card">
          <h2 class="room-type">${room.roomType.toUpperCase()}</h2>
          <div class="room-data">
            <img class="bed-img"src="./images/bed.svg" alt="Bed">
            <div class="flex-column">
              <p>Room Number: ${room.number}</p>
              <p>${room.numBeds} ${room.bedSize.toUpperCase()}</p>
              <p>${bidetStatus}</p>
              <p>$${room.costPerNight} per night</p>
            </div>
          </div>
          <button class="book-room" id="bookRoom">Book Room</button>
        </section>`
      }
    })
  },
  returnCustomerExpense(customer, bookings, rooms) {
    userStatistics.innerHTML = '';
    // customer.addCustomerBooking(bookings)
    let total = customer.calculateTotalSpent(rooms);
    this.toggleToStatistics();
    userStatistics.innerHTML += `<div class= "amount-spent" id="amountSpent">
    <p>You've spent $${total} at The Overlook to date. Thank you for your loyalty!</p>
    </div>`;
    console.log(customer)
  },

  filterBookingHistory(customer, currentDate) {
    futureBookings.innerHTML = '<h2 class="reservation-type">FUTURE BOOKINGS</h2>';
    pastBookings.innerHTML = '<h2 class="reservation-type">PAST BOOKINGS</h2>';
    let allFutureBookings = customer.findFutureBookings(currentDate);
    let allPastBookings = customer.findPastBookings(currentDate);
    // console.log('UGH',futureBookings)
    // console.log('all', customer.bookings.length)
    allFutureBookings.forEach(book => {
      futureBookings.innerHTML += `
      <section class="booking-card" "flex-column">
        <h2 class="reservation-date">${book.date}</h2>
        <p>Room Number: ${book.roomNumber}</p>
        <p>Guest ID: ${book.userID}</p>
        <p>Cost per night: $${book.cost}</p>
      </section>`
    })

    allPastBookings.forEach(book => {
      pastBookings.innerHTML += `
      <section class="booking-card" "flex-column">
        <h2 class="reservation-date">${book.date}</h2>
        <p>Room Number: ${book.roomNumber}</p>
        <p>Guest ID: ${book.userID}</p>
        <p>Cost per night: $${book.cost}</p>
      </section>`
    })
  },

  toggleToHistory() {
      bookingHomeBtn.classList.remove('hidden');
      statisticsBtn.classList.add('hidden');
      bookingStation.classList.add('hidden');
      bookingHistoryBtn.classList.add('hidden');
      statisticsBtn.classList.add('hidden');
      bookingHistory.classList.remove('hidden');
      availableRooms.classList.add('hidden');
  },

  toggleToStatistics() {
    bookingStation.classList.add('hidden');
    statisticsBtn.classList.add('hidden');
    availableRooms.classList.add('hidden');
    userStatistics.classList.remove('hidden');
    bookingHomeBtn.classList.remove('hidden');
    bookingHistoryBtn.classList.add('hidden')
  },

  toggleToHome() {
    bookingStation.classList.remove('hidden');
    statisticsBtn.classList.remove('hidden');
    availableRooms.classList.remove('hidden');
    bookingHistoryBtn.classList.remove('hidden')
    userStatistics.classList.add('hidden');
    bookingHomeBtn.classList.add('hidden');
    bookingHistory.classList.add('hidden');
  },
}

export default domUpdates;
