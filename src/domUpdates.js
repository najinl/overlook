import {userFirstName, dateSelector, availableRooms, checkBoxes, userStatistics,
  statisticsBtn, bookingStation, bookingHomeBtn, bookingHistoryBtn,
  bookingHistory, futureBookings, pastBookings, loginError, loginStation,
  header, webApiError} from './domElements';

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
    let roomsUnavailable = this.findAvailableRooms(date, bookings);
    let selectedRoomType = this.findFilteredRooms();
    rooms.forEach(room => {
      let bidetStatus;
      if(room.bidet) {
        bidetStatus = 'Bidet Included'
      } else {
        bidetStatus = 'No Bidet'
      }
      if(roomsUnavailable.length === 25) {
        availableRooms.innerHTML = '<p class="apology">We are so sorry! Very, very sorry! There are no available rooms for this date. Please forgive us!Please try another date.</p>'
      }
      if(!roomsUnavailable.includes(room.number) && selectedRoomType.length < 1) {
        availableRooms.innerHTML += `<section class="room-card">
          <h2 class="room-type" aria-label="${room.roomType}">${room.roomType.toUpperCase()}</h2>
          <div class="room-data">
            <img class="bed-img"src="./images/bed.svg" alt="Bed">
            <div class="flex-column" aria-label="room details">
              <p aria-label="room number">Room Number: ${room.number}</p>
              <p aria-label="number of beds">${room.numBeds} ${room.bedSize.toUpperCase()}</p>
              <p>${bidetStatus}</p>
              <p aria-label="cost">$${room.costPerNight} per night</p>
            </div>
        </div>
        <button class="book-room" id="bookRoom">Book Room</button>
        </section>`
      } else if(!roomsUnavailable.includes(room.number) && selectedRoomType.includes(room.roomType)) {
        availableRooms.innerHTML += `<section class="room-card">
          <h2 class="room-type" aria-label="${room.roomType}">${room.roomType.toUpperCase()}</h2>
          <div class="room-data">
            <img class="bed-img"src="./images/bed.svg" alt="Bed">
            <div class="flex-column" aria-label="room details">
              <p aria-label="room number">Room Number: ${room.number}</p>
              <p aria-label="number of beds">${room.numBeds} ${room.bedSize.toUpperCase()}</p>
              <p>${bidetStatus}</p>
              <p aria-label="cost">$${room.costPerNight} per night</p>
            </div>
          </div>
          <button class="book-room" id="bookRoom">Book Room</button>
        </section>`
      }
    })
  },
  returnCustomerExpense(customer, bookings, rooms) {
    userStatistics.innerHTML = '';
    let total = customer.calculateTotalSpent(rooms);
    this.toggleToStatistics();
    userStatistics.innerHTML += `<div class= "amount-spent" id="amountSpent">
    <p>You've spent $${total} at The Overlook to date. Thank you for your loyalty!</p>
    </div>`;
  },

  filterBookingHistory(customer) {
    futureBookings.innerHTML = '<h2 class="reservation-type">FUTURE BOOKINGS</h2>';
    pastBookings.innerHTML = '<h2 class="reservation-type">PAST BOOKINGS</h2>';
    let allFutureBookings = customer.findFutureBookings();
    let allPastBookings = customer.findPastBookings();
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

  addClass(element, classList) {
    element.forEach(el => el.classList.add(classList))
  },

  removeClass(element, classList) {
    element.forEach(el => el.classList.remove(classList));
  },

  returnApiFailMsg(message) {
    this.addClass([bookingStation, header], 'hidden');
    this.removeClass([webApiError], 'hidden');
    webApiError.innerHTML = (`<p class="error-message-api">${message}</p>`);
  },

  returnFailureMessage() {
    loginError.classList.remove('hidden');
  },

  leaveLogin() {
    loginStation.classList.add('hidden');
    header.classList.remove('hidden');
  },

  toggleToHistory() {
    this.addClass([statisticsBtn, bookingStation, bookingHistoryBtn, availableRooms], 'hidden');
    this.removeClass([bookingHomeBtn, bookingHistory], 'hidden');
  },

  toggleToStatistics() {
    this.addClass([statisticsBtn, bookingStation, bookingHistoryBtn, availableRooms], 'hidden');
    this.removeClass([userStatistics, bookingHomeBtn], 'hidden');
  },

  toggleToHome() {
    this.addClass([userStatistics, bookingHomeBtn, bookingHistory], 'hidden');
    this.removeClass([bookingStation, statisticsBtn, availableRooms, bookingHistoryBtn], 'hidden');
  },
}

export default domUpdates;
