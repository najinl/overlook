import {dateSelector, availableRooms, checkBoxes, userStatistics, statisticsBtn,
  bookingStation, bookingHomeBtn} from './domElements';


let domUpdates = {
  updateCalendar(date) {
    dateSelector.innerHTML += `<label for="dateSelector">Choose Your Dates:</label>
    <input type="date" id="dateSelector" name="trip-start" value="${date}"
    min="2020-01-08" max="2024-12-31">`
  },

  // displayAvailableRooms(date, rooms, bookings) {
  //   availableRooms.innerHTML = '';
  //   let dateSelected = date.split('-'). join('/');
  //     let roomsAvailable = bookings.reduce((acc, booking) => {
  //       if(booking.date === dateSelected) {
  //         acc.push(booking.roomNumber)
  //       }
  //       return acc;
  //     },[])
  //
  //   rooms.forEach(room => {
  //     let bidetStatus;
  //     if(room.bidet) {
  //       bidetStatus = 'Bidet Included'
  //     } else {
  //       bidetStatus = 'No Bidet'
  //     }
  //     if(!roomsAvailable.includes(room.number)) {
  //       availableRooms.innerHTML += `<section class="room-card">
  //         <h2 class="room-type">${room.roomType.toUpperCase()}</h2>
  //         <div class="room-data">
  //           <img class="bed-img"src="./images/bed.svg" alt="Bed">
  //           <div class="flex-column">
  //             <p>Room Number: ${room.number}</p>
  //             <p>${room.numBeds} ${room.bedSize.toUpperCase()}</p>
  //             <p>${bidetStatus}</p>
  //             <p>$${room.costPerNight} per night</p>
  //           </div>
  //       </div>
  //       </section>`
  //     }
  //   })
  // },
  findAvailableRooms(date, bookings) {
    availableRooms.innerHTML = '';
    let dateSelected = date.split('-'). join('/');
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
        </section>`
      }
    })
  },
  toggleToStatistics() {
    bookingStation.classList.add('hidden');
    userStatistics.classList.remove('hidden');
    statisticsBtn.classList.add('hidden');
    bookingHomeBtn.classList.remove('hidden');
  },
  returnCustomerExpense(customer, bookings, rooms) {
    customer.addCustomerBooking(bookings)
    let total = customer.calculateTotalSpent(rooms);
    this.toggleToStatistics();
    userStatistics.innerHTML += `<div class= "amount-spent" id="amountSpent">
    <p>You've spent $${total} at The Overlook to date. Thank you for your loyalty!</p>
    </div>`;
  },

}


export default domUpdates;
